import * as fs from 'fs';
import * as path from 'path';
import { db } from '../config/firebase';

const CSV_PATH = path.join(
  'C:',
  'Users',
  'b_ber',
  '.gemini',
  'antigravity',
  'brain',
  '51fb1be5-9eaf-43f0-b9d8-02499eab3bcf',
  '.system_generated',
  'steps',
  '34',
  'content.md'
);

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      // Se tiver duas aspas duplas seguidas dentro de aspas, é um escape de aspas
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // pula a próxima aspa
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function importCsv() {
  console.log('--- Iniciando importação do Calendário Mestre para o Firestore ---');
  
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Erro: Arquivo CSV não encontrado no caminho especificado: ${CSV_PATH}`);
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    
    const events: any[] = [];
    let isHeaderFound = false;

    for (const line of lines) {
      // Ignorar metadados do cabeçalho da resposta
      if (line.startsWith('Title:') || line.startsWith('Description:') || line.startsWith('Source:') || line.startsWith('---')) {
        continue;
      }
      
      const row = parseCsvLine(line);
      
      // Ignorar linhas vazias ou de título geral da planilha
      if (row.length < 5 || !row[0]) {
        continue;
      }

      // Identificar o cabeçalho real da tabela para começar a ler a partir dele
      if (row[0] === 'Data' && row[4] === 'Tipo') {
        isHeaderFound = true;
        continue;
      }

      if (!isHeaderFound) {
        continue;
      }

      // Ignorar linhas de agrupamento de mês (ex: "▶ JUNHO 2026")
      if (row[0].startsWith('▶') || row[0].includes('JUNHO') || row[0].includes('JULHO') || row[0].includes('AGOSTO')) {
        continue;
      }

      const rawData = row[0];
      const rawTitulo = row[5];
      const tipo = row[4]; // Palestra | Curso | Evento

      // Se não houver data ou título, ignorar
      if (!rawData || !rawTitulo || !tipo) {
        continue;
      }

      // Extrair e converter data DD/MM/YYYY para ISO
      let dataISO = '';
      let mesParsed = '';
      const parts = rawData.split('/');
      if (parts.length === 3) {
        const dia = parts[0].padStart(2, '0');
        const mesNum = parts[1].padStart(2, '0');
        const ano = parts[2];
        dataISO = `${ano}-${mesNum}-${dia}`;

        const monthIdx = parseInt(mesNum, 10);
        const MESES_ORDEM = [
          "janeiro", "fevereiro", "março", "abril", "maio", "junho",
          "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        if (monthIdx >= 1 && monthIdx <= 12) {
          mesParsed = MESES_ORDEM[monthIdx - 1];
        }
      }

      // Tratar palestrantes (speakers)
      const speakersArray = (row[8] || '')
        .split(/[|,;]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);

      const cleanEvent = {
        data: rawData,
        dataISO: dataISO,
        dia: parseInt(parts[0], 10) || 0,
        mes: mesParsed,
        semana: row[1] || '',
        inicio: row[2] || '',
        fim: row[3] || '',
        tipo: tipo,
        titulo: rawTitulo,
        sub: row[6] || '', // Subtítulo / Tema
        descritivo: row[7] || '',
        speakers: speakersArray,
        miniBio: row[9] || '',
        publicoAlvo: row[10] || '',
        modalidade: row[11] || 'Presencial',
        local: row[12] || '',
        vagas: row[13] || '',
        valor: row[14] || '',
        linkInscricao: row[15] || '',
        status: row[16] || 'Confirmado',
        observacoes: row[17] || '',
        googleCalendarId: row[18] || '',
        updatedAt: new Date().toISOString()
      };

      events.push(cleanEvent);
    }

    console.log(`Encontrados ${events.length} eventos válidos para importação.`);

    // Preparar gravação em lote
    let batch = db.batch();
    let count = 0;

    // 1. Limpar banco existente
    const existingSnapshot = await db.collection('events').get();
    console.log(`Limpando ${existingSnapshot.size} eventos antigos...`);
    existingSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // 2. Gravar novos eventos
    batch = db.batch();
    for (const event of events) {
      let docRef;
      if (event.googleCalendarId) {
        // Higienizar ID
        const docId = event.googleCalendarId.replace(/[^a-zA-Z0-9-_]/g, '_');
        docRef = db.collection('events').doc(docId);
      } else {
        docRef = db.collection('events').doc();
      }

      batch.set(docRef, event);
      count++;

      if (count >= 400) {
        await batch.commit();
        batch = db.batch();
        count = 0;
      }
    }

    if (count > 0) {
      await batch.commit();
    }

    console.log(`Sucesso: ${events.length} eventos foram populados no Firestore.`);

  } catch (error) {
    console.error('Erro ao processar importação:', error);
  } finally {
    process.exit(0);
  }
}

importCsv();
