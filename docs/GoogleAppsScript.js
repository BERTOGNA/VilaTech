/**
 * CÓDIGO DO GOOGLE APPS SCRIPT — SINCRO MESTRE (SITE + GOOGLE CALENDAR)
 * Versão 3.0 (Revisão e Otimização Profunda)
 * 
 * Este script deve ser copiado para o editor de scripts da sua Planilha do Google:
 * 1. Abra a planilha
 * 2. Clique em Extensões > Apps Script
 * 3. Delete todo o código antigo e cole este conteúdo
 * 4. Salve e execute a sincronização manual uma vez para autorizar as novas permissões.
 */

const CONFIG = {
  // URL de produção do seu backend no Vercel
  API_URL: 'https://backend-dun-ten-90.vercel.app/api/events/sync',
  
  // O mesmo token configurado como API_TOKEN no seu arquivo .env do backend
  API_TOKEN: 'super_secret_crm_token_2026',
  
  // Nome exato da aba (sheet) que contém os eventos
  SHEET_NAME: 'VTH_Calendario_Mestre',

  // ID do Google Calendar do Vila Tech Hub
  CALENDAR_ID: 'atendimento@vilatechub.com.br'
};

/**
 * Cria o menu na planilha ao abrir
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Vila Tech Hub')
      .addItem('Sincronizar Site e Google Calendar', 'syncEventsToWebsite')
      .addToUi();
  } catch (e) {
    Logger.log('Interface do usuário indisponível neste contexto: ' + e.toString());
  }
}

/**
 * Validador de data para pular cabeçalhos e linhas de separação
 */
function isValidDate(val) {
  if (val instanceof Date) {
    return !isNaN(val.getTime());
  }
  if (typeof val === 'string') {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(val.trim());
  }
  return false;
}

/**
 * Analisa data e hora convertendo-as para um objeto Date respeitando o fuso horário da planilha.
 * Isso impede que as horas sofram alterações devido a diferenças de fuso horário do servidor do Google.
 */
function parseDateTimeInSpreadsheetTimeZone(dateStr, timeStr, spreadsheetTimeZone) {
  try {
    const dateParts = dateStr.split('/');
    const timeParts = timeStr.split(':');
    if (dateParts.length !== 3 || timeParts.length !== 2) {
      return null;
    }
    
    const year = dateParts[2];
    const month = dateParts[1].padStart(2, '0');
    const day = dateParts[0].padStart(2, '0');
    const hours = timeParts[0].padStart(2, '0');
    const minutes = timeParts[1].padStart(2, '0');
    
    // Criamos um objeto Date temporário para calcular o offset correto para essa data específica
    const tempDate = new Date(year, parseInt(month, 10) - 1, day, hours, minutes);
    const rawOffset = Utilities.formatDate(tempDate, spreadsheetTimeZone, "Z"); // Retorna ex: "-0300"
    const offsetFormatted = rawOffset.slice(0, 3) + ":" + rawOffset.slice(3); // Converte para ex: "-03:00"
    
    // Constrói string ISO 8601 exata
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00${offsetFormatted}`;
    return new Date(isoString);
  } catch (e) {
    Logger.log('Erro ao analisar data/hora com fuso horário: ' + e.toString());
    return null;
  }
}

/**
 * Função principal de sincronização
 */
function syncEventsToWebsite() {
  // Controle de concorrência para evitar execuções simultâneas que estouram a cota
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(8000); // Aguarda até 8 segundos para obter o controle
  } catch (e) {
    Logger.log('Ignorando execução concorrente para poupar cota da API do Google Calendar.');
    return;
  }

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME) || spreadsheet.getActiveSheet();
    const tz = spreadsheet.getSpreadsheetTimeZone(); // Obter fuso horário da planilha (ex: America/Sao_Paulo)
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      Logger.log('Planilha sem linhas de dados suficientes.');
      return;
    }
    
    // 1. Inicializar Conexão do Google Calendar
    let calendar = null;
    try {
      calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
      if (!calendar) {
        Logger.log('Erro: Não foi possível conectar ao Google Calendar. Verifique o ID: ' + CONFIG.CALENDAR_ID);
      }
    } catch (err) {
      Logger.log('Erro de acesso ao Google Calendar: ' + err.toString());
    }
    
    // 2. Leitura otimizada em lote (Batch Read)
    const range = sheet.getRange(2, 1, lastRow - 1, 19); 
    const values = range.getValues();
    const displayValues = range.getDisplayValues();
    
    const events = [];
    const activeCalendarIds = {}; // Para limpeza posterior de eventos excluídos
    let sheetNeedsUpdate = false;
    
    // 3. Processamento dos eventos
    for (let i = 0; i < values.length; i++) {
      const row = values[i];
      const rawData = row[0];
      const rawTitulo = row[5];
      
      // Ignora linhas sem data ou sem título
      if (!rawData || !rawTitulo) {
        continue;
      }
      
      // Ignora cabeçalhos secundários ou linhas de meses
      if (!isValidDate(rawData)) {
        continue;
      }
      
      // Usar valores de exibição para datas e horários (corrige desvios de timezone)
      const formattedDate = displayValues[i][0].trim();
      const inicio = displayValues[i][2].trim();
      const fim = displayValues[i][3].trim();
      
      const speakersArray = String(row[8] || '')
        .split(/[|,;]/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

      let gCalId = String(row[18] || '').trim();
      
      // Sincronizar com o Google Calendar se disponível
      if (calendar) {
        const startDateTime = parseDateTimeInSpreadsheetTimeZone(formattedDate, inicio, tz);
        const endDateTime = parseDateTimeInSpreadsheetTimeZone(formattedDate, fim, tz);
        
        if (startDateTime && endDateTime) {
          const eventTitle = rawTitulo;
          const eventDetails = {
            description: (row[6] ? row[6] + '\n\n' : '') + (row[7] || '') + '\n\nPalestrantes: ' + speakersArray.join(', ') + '\nValor: ' + (row[14] || 'Gratuito'),
            location: row[12] || 'Vila Tech Hub'
          };
          
          let eventObj = null;
          
          if (gCalId) {
            try {
              eventObj = calendar.getEventById(gCalId);
              if (eventObj) {
                // COMPARAR ANTES DE GRAVAR (Poupa cota e evita o erro de "excluiu/criou muitos eventos")
                const currentTitle = eventObj.getTitle();
                const currentStart = eventObj.getStartTime().getTime();
                const currentEnd = eventObj.getEndTime().getTime();
                const currentDesc = eventObj.getDescription();
                const currentLoc = eventObj.getLocation();
                
                if (currentTitle !== eventTitle || 
                    currentStart !== startDateTime.getTime() || 
                    currentEnd !== endDateTime.getTime() || 
                    currentDesc !== eventDetails.description || 
                    currentLoc !== eventDetails.location) {
                  
                  eventObj.setTitle(eventTitle);
                  eventObj.setTime(startDateTime, endDateTime);
                  eventObj.setDescription(eventDetails.description);
                  eventObj.setLocation(eventDetails.location);
                  Logger.log(`Evento atualizado no Google Calendar: "${eventTitle}"`);
                }
                activeCalendarIds[gCalId] = true;
              } else {
                // ID existia na planilha mas evento foi apagado no calendário do Google. Criar novamente.
                eventObj = calendar.createEvent(eventTitle, startDateTime, endDateTime, eventDetails);
                gCalId = eventObj.getId();
                values[i][18] = gCalId; // Atualiza a matriz local
                sheetNeedsUpdate = true;
                activeCalendarIds[gCalId] = true;
                Logger.log(`Novo evento criado (ID órfão restaurado): "${eventTitle}"`);
              }
            } catch (e) {
              // Se der erro ao buscar ID inválido, cria novo
              eventObj = calendar.createEvent(eventTitle, startDateTime, endDateTime, eventDetails);
              gCalId = eventObj.getId();
              values[i][18] = gCalId; // Atualiza a matriz local
              sheetNeedsUpdate = true;
              activeCalendarIds[gCalId] = true;
              Logger.log(`Novo evento criado (ID inválido corrigido): "${eventTitle}"`);
            }
          } else {
            // Criar novo evento se o ID do Google Calendar estiver vazio
            eventObj = calendar.createEvent(eventTitle, startDateTime, endDateTime, eventDetails);
            gCalId = eventObj.getId();
            values[i][18] = gCalId; // Atualiza a matriz local
            sheetNeedsUpdate = true;
            activeCalendarIds[gCalId] = true;
            Logger.log(`Novo evento criado no Google Calendar: "${eventTitle}"`);
          }
        }
      }
      
      // Objeto estruturado para envio ao backend do site
      const event = {
        data: formattedDate,
        dia: parseInt(formattedDate.split('/')[0], 10) || 0,
        semana: String(row[1] || '').trim(),
        inicio: inicio,
        fim: fim,
        tipo: String(row[4] || '').trim(),
        titulo: String(row[5] || '').trim(),
        sub: String(row[6] || '').trim(),
        descritivo: String(row[7] || '').trim(),
        speakers: speakersArray,
        miniBio: String(row[9] || '').trim(),
        publicoAlvo: String(row[10] || '').trim(),
        modalidade: String(row[11] || '').trim(),
        local: String(row[12] || '').trim(),
        vagas: String(row[13] || '').trim(),
        valor: String(row[14] || '').trim(),
        linkInscricao: String(row[15] || '').trim(),
        status: String(row[16] || '').trim(),
        observacoes: String(row[17] || '').trim(),
        googleCalendarId: gCalId
      };
      
      events.push(event);
    }
    
    // 4. Gravação otimizada em lote (Batch Write) - Evita loop infinito e reduz consumo de quota
    if (sheetNeedsUpdate) {
      const idColumnValues = [];
      for (let k = 0; k < values.length; k++) {
        idColumnValues.push([values[k][18]]);
      }
      // Escreve apenas a coluna S (ID do Google Calendar) de uma só vez
      sheet.getRange(2, 19, lastRow - 1, 1).setValues(idColumnValues);
      SpreadsheetApp.flush();
      Logger.log('IDs do Google Calendar gravados de volta na planilha.');
    }

    // 5. Opcional: Limpeza de eventos órfãos no Google Calendar (Apenas se rodar manualmente)
    // Remove eventos do Google Calendar que foram deletados da planilha.
    if (calendar && Object.keys(activeCalendarIds).length > 0) {
      try {
        const now = new Date();
        const startSearch = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 dias atrás
        const endSearch = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000); // 180 dias no futuro
        const calEvents = calendar.getEvents(startSearch, endSearch);
        
        let deletedCount = 0;
        for (const calEvent of calEvents) {
          const calEventId = calEvent.getId();
          if (calEventId.endsWith('@google.com') && !activeCalendarIds[calEventId]) {
            const desc = calEvent.getDescription() || '';
            if (desc.includes('Palestrantes:') && (desc.includes('Vila Tech Hub') || calEvent.getLocation().includes('Vila Tech Hub'))) {
              calEvent.deleteEvent();
              deletedCount++;
            }
          }
        }
        if (deletedCount > 0) {
          Logger.log(`Removidos ${deletedCount} eventos excluídos/órfãos do Google Calendar.`);
        }
      } catch (cleanErr) {
        Logger.log('Aviso ao limpar calendário: ' + cleanErr.toString());
      }
    }

    // 6. Enviar dados para a API do site
    Logger.log(`Enviando ${events.length} eventos para o site...`);
    const payload = JSON.stringify({ events: events });
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + CONFIG.API_TOKEN
      },
      payload: payload,
      muteHttpExceptions: true
    };
    
    try {
      const response = UrlFetchApp.fetch(CONFIG.API_URL, options);
      const responseCode = response.getResponseCode();
      const responseText = response.getContentText();
      
      if (responseCode === 200) {
        Logger.log('Sincronização com o site concluída com sucesso!');
        SpreadsheetApp.getActiveSpreadsheet().toast('Sincronização Concluída (Site + Calendar)!', 'Vila Tech Hub', 5);
      } else {
        Logger.log(`Erro na API do site. Código: ${responseCode}. Detalhes: ${responseText}`);
      }
    } catch (error) {
      Logger.log('Erro de conexão ao enviar dados para o site: ' + error.toString());
    }
  } finally {
    // Libera o lock para próximas execuções
    lock.releaseLock();
  }
}
