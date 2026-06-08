// ============================================================
//  VILA TECH HUB — Apps Script v5.0 DEFINITIVO
//  Conta: atendimento@vilatechub.com.br
//  Sincroniza: Google Sheets → Google Calendar
//              Google Sheets → GitHub → Vercel (site público)
// ============================================================

const CONFIG = {
  calendario: "atendimento@vilatechub.com.br",
  abaMestre: "📅 Calendário Mestre",
  linhaInicio: 5,
  col: {
    data:1, dia:2, inicio:3, fim:4, tipo:5, titulo:6,
    subtitulo:7, descritivo:8, palestrante:9, publico:11,
    modalidade:12, local:13, vagas:14, valor:15,
    linkInscricao:16, status:17, observacoes:18, id:19
  },
  cores: { "Palestra":"9", "Curso":"10", "Evento":"6" },
  local: "Vila Tech Hub — Itu, SP",
  pausa: 2000
};

// ── FUNÇÃO PRINCIPAL ─────────────────────────────────────────
function sincronizarCalendario() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.abaMestre);
  if (!sheet) { Logger.log("❌ Aba não encontrada"); return; }

  var cal = CalendarApp.getCalendarById(CONFIG.calendario);
  if (!cal) { Logger.log("❌ Calendário não encontrado: " + CONFIG.calendario); return; }

  var ultimaLinha = sheet.getLastRow();
  var tiposValidos = ["Palestra", "Curso", "Evento"];

  for (var row = CONFIG.linhaInicio; row <= ultimaLinha; row++) {
    var r = sheet.getRange(row, 1, 1, CONFIG.col.id).getValues()[0];

    var tipo = (r[CONFIG.col.tipo - 1] || "").toString().trim();
    if (!tiposValidos.includes(tipo)) continue;

    var titulo = (r[CONFIG.col.titulo - 1] || "").toString().trim();
    if (!titulo) continue;

    var dataVal = r[CONFIG.col.data - 1];
    if (!dataVal) continue;

    var status = (r[CONFIG.col.status - 1] || "").toString().trim();

    if (status === "Cancelado") {
      _remover(sheet, row, r, cal);
      Utilities.sleep(CONFIG.pausa);
      continue;
    }

    if (status !== "Confirmado" && status !== "Realizado") continue;

    var ev = _montarEvento(r, tipo, titulo);
    if (!ev) { Logger.log("⚠️ Linha " + row + ": não foi possível montar evento"); continue; }

    var idAtual = (r[CONFIG.col.id - 1] || "").toString().trim();

    if (idAtual && idAtual.includes("@google.com")) {
      _atualizar(sheet, row, ev, idAtual, cal);
    } else {
      if (idAtual) { sheet.getRange(row, CONFIG.col.id).setValue(""); SpreadsheetApp.flush(); }
      _criar(sheet, row, ev, cal);
    }

    Utilities.sleep(CONFIG.pausa);
  }

  Logger.log("✅ Sincronização concluída: " + new Date());
}

// ── MONTA EVENTO ─────────────────────────────────────────────
function _montarEvento(r, tipo, titulo) {
  try {
    var dataVal = r[CONFIG.col.data - 1];
    var dia, mes, ano;

    if (dataVal instanceof Date) {
      var d = new Date(dataVal.getTime() + 3 * 60 * 60 * 1000);
      dia = d.getUTCDate(); mes = d.getUTCMonth() + 1; ano = d.getUTCFullYear();
    } else {
      var partes = dataVal.toString().split("/");
      if (partes.length !== 3) return null;
      dia = parseInt(partes[0]); mes = parseInt(partes[1]); ano = parseInt(partes[2]);
    }

    function parseHora(val) {
      var s = "";
      if (val instanceof Date) {
        s = Utilities.formatDate(val, "America/Sao_Paulo", "HH:mm");
      } else {
        s = val.toString().replace("h", ":").trim();
        if (s.length > 5) s = s.slice(0, 5);
      }
      var p = s.split(":");
      return { h: parseInt(p[0]) || 0, m: parseInt(p[1]) || 0 };
    }

    var ini = parseHora(r[CONFIG.col.inicio - 1] || "09:00");
    var fim = parseHora(r[CONFIG.col.fim - 1]    || "11:00");

    var pad = function(n){ return String(n).padStart(2, "0"); };
    var inicio = new Date(ano+"-"+pad(mes)+"-"+pad(dia)+"T"+pad(ini.h)+":"+pad(ini.m)+":00-03:00");
    var fimDt  = new Date(ano+"-"+pad(mes)+"-"+pad(dia)+"T"+pad(fim.h)+":"+pad(fim.m)+":00-03:00");

    if (isNaN(inicio.getTime()) || isNaN(fimDt.getTime())) return null;
    if (inicio >= fimDt) { Logger.log("⚠️ Horário inválido na linha (início >= fim): "+titulo); return null; }

    var sub    = (r[CONFIG.col.subtitulo - 1]   || "").toString();
    var desc   = (r[CONFIG.col.descritivo - 1]  || "").toString();
    var palest = (r[CONFIG.col.palestrante - 1] || "").toString();
    var pub    = (r[CONFIG.col.publico - 1]     || "").toString();
    var modal  = (r[CONFIG.col.modalidade - 1]  || "").toString();
    var vagas  = (r[CONFIG.col.vagas - 1]       || "").toString();
    var valor  = (r[CONFIG.col.valor - 1]       || "").toString();
    var link   = (r[CONFIG.col.linkInscricao-1] || "").toString();
    var obs    = (r[CONFIG.col.observacoes - 1] || "").toString().replace(/IDs GCal:.*$/s, "").trim();

    var emoji = {"Palestra":"🎤","Curso":"📚","Evento":"🎉"}[tipo] || "📌";
    var descricao = emoji + " " + tipo.toUpperCase();
    if (sub)    descricao += " — " + sub;
    descricao += "\n\n";
    if (desc)   descricao += desc + "\n\n";
    if (palest) descricao += "🗣️ " + palest + "\n";
    if (pub)    descricao += "👥 Público: " + pub + "\n";
    if (modal)  descricao += "📍 Modalidade: " + modal + "\n";
    if (vagas)  descricao += "🪑 Vagas: " + vagas + "\n";
    if (valor)  descricao += "🎟️ Valor: " + valor + "\n";
    if (link)   descricao += "🔗 Inscrições: " + link + "\n";
    if (obs)    descricao += "\n📝 Obs: " + obs + "\n";
    descricao += "\n---\nInstituto Cultural e Educacional Vila Tech\nvilatechub.com.br";

    var local = (r[CONFIG.col.local - 1] || "").toString() || CONFIG.local;
    var cor   = CONFIG.cores[tipo] || "7";

    return { titulo:titulo, inicio:inicio, fim:fimDt, descricao:descricao, local:local, cor:cor };

  } catch(e) { Logger.log("⚠️ Erro montarEvento: " + e.message); return null; }
}

// ── CRIAR ─────────────────────────────────────────────────────
function _criar(sheet, row, ev, cal) {
  try {
    _limparDuplicatas(cal, ev);
    Utilities.sleep(500);
    var novo = cal.createEvent(ev.titulo, ev.inicio, ev.fim, { description:ev.descricao, location:ev.local });
    novo.setColor(ev.cor);
    sheet.getRange(row, CONFIG.col.id).setValue(novo.getId());
    SpreadsheetApp.flush();
    Logger.log("✅ Criado: " + ev.titulo + " | " + ev.inicio);
  } catch(e) { Logger.log("❌ Criar: " + e.message); }
}

// ── ATUALIZAR ─────────────────────────────────────────────────
function _atualizar(sheet, row, ev, id, cal) {
  try {
    var evento = null;
    try { evento = cal.getEventById(id); } catch(e) {}
    if (evento) {
      evento.setTitle(ev.titulo);
      evento.setTime(ev.inicio, ev.fim);
      evento.setDescription(ev.descricao);
      evento.setLocation(ev.local);
      evento.setColor(ev.cor);
      Logger.log("🔄 Atualizado: " + ev.titulo + " | " + ev.inicio);
    } else {
      sheet.getRange(row, CONFIG.col.id).setValue(""); SpreadsheetApp.flush();
      _limparDuplicatas(cal, ev); Utilities.sleep(500);
      var novo = cal.createEvent(ev.titulo, ev.inicio, ev.fim, { description:ev.descricao, location:ev.local });
      novo.setColor(ev.cor);
      sheet.getRange(row, CONFIG.col.id).setValue(novo.getId()); SpreadsheetApp.flush();
      Logger.log("✅ Recriado: " + ev.titulo);
    }
  } catch(e) { Logger.log("❌ Atualizar: " + e.message); }
}

// ── REMOVER ───────────────────────────────────────────────────
function _remover(sheet, row, r, cal) {
  var id = (r[CONFIG.col.id - 1] || "").toString().trim();
  if (!id || !id.includes("@google.com")) return;
  try {
    var ev = null; try { ev = cal.getEventById(id); } catch(e) {}
    if (ev) { ev.deleteEvent(); Logger.log("🗑️ Removido linha " + row); }
  } catch(e) { Logger.log("❌ Remover: " + e.message); }
  sheet.getRange(row, CONFIG.col.id).setValue(""); SpreadsheetApp.flush();
}

// ── LIMPAR DUPLICATAS ─────────────────────────────────────────
function _limparDuplicatas(cal, ev) {
  try {
    cal.getEventsForDay(ev.inicio).forEach(function(e){
      if (e.getTitle() === ev.titulo) { e.deleteEvent(); Utilities.sleep(300); Logger.log("🧹 Duplicata: " + ev.titulo); }
    });
  } catch(e) { Logger.log("⚠️ LimparDuplicatas: " + e.message); }
}

// ── PUBLICAR NO SITE (GitHub → Vercel) ───────────────────────
function publicarNoSite() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GITHUB_TOKEN');
  var repo  = props.getProperty('GITHUB_REPO');

  if (!token || !repo) {
    SpreadsheetApp.getUi().alert(
      "⚠️ Configuração necessária\n\n" +
      "Acesse: Extensões → Apps Script → Configurações do projeto → Propriedades do script\n\n" +
      "Adicione:\n• GITHUB_TOKEN = seu token do GitHub\n• GITHUB_REPO = usuario/vth-agenda"
    );
    return;
  }

  var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.abaMestre);
  var eventos = _extrairEventos(sheet);
  var conteudo = _gerarDataJs(eventos);

  var url     = 'https://api.github.com/repos/' + repo + '/contents/data.js';
  var headers = { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' };

  var getSha = UrlFetchApp.fetch(url, { headers:headers, muteHttpExceptions:true });
  var sha    = JSON.parse(getSha.getContentText()).sha || '';

  var result = UrlFetchApp.fetch(url, {
    method: 'PUT',
    headers: headers,
    payload: JSON.stringify({
      message: 'chore: atualização automática ' + new Date().toLocaleString('pt-BR'),
      content: Utilities.base64Encode(conteudo, Utilities.Charset.UTF_8),
      sha: sha
    }),
    muteHttpExceptions: true
  });

  var status = result.getResponseCode();
  if (status === 200 || status === 201) {
    Logger.log('✅ Site atualizado! Status: ' + status);
    SpreadsheetApp.getUi().alert('✅ Site atualizado!\n\nagenda.vilatechub.com.br será atualizado em ~30 segundos.');
  } else {
    Logger.log('❌ Erro: ' + result.getContentText());
    SpreadsheetApp.getUi().alert('❌ Erro ao publicar. Verifique o GITHUB_TOKEN nas propriedades do script.');
  }
}

function _extrairEventos(sheet) {
  var dados = sheet.getDataRange().getValues();
  var eventos = [];
  var tiposValidos = ["Palestra","Curso","Evento"];
  var MESES_MAP = {
    '01':'janeiro','02':'fevereiro','03':'março','04':'abril',
    '05':'maio','06':'junho','07':'julho','08':'agosto',
    '09':'setembro','10':'outubro','11':'novembro','12':'dezembro'
  };
  var DIAS_MAP = {'0':'Dom','1':'Seg','2':'Ter','3':'Qua','4':'Qui','5':'Sex','6':'Sáb'};

  for (var i = 4; i < dados.length; i++) {
    var row = dados[i];
    var tipo = (row[4] || "").toString().trim();
    if (!tiposValidos.includes(tipo)) continue;
    if (!row[5]) continue;
    var status = (row[16] || "").toString().trim();
    if (status === 'Cancelado' || (status !== 'Confirmado' && status !== 'Realizado')) continue;

    var dataVal = row[0];
    var dataObj = dataVal instanceof Date ? dataVal : null;
    if (!dataObj) {
      var p = dataVal.toString().split('/');
      if (p.length === 3) dataObj = new Date(p[2], p[1]-1, p[0]);
    }
    if (!dataObj) continue;

    var dia    = dataObj.getDate();
    var mesNum = String(dataObj.getMonth() + 1).padStart(2, '0');
    var mes    = MESES_MAP[mesNum] || 'junho';
    var semana = DIAS_MAP[String(dataObj.getDay())] || '';

    function fmtHora(val) {
      if (val instanceof Date) return Utilities.formatDate(val, "America/Sao_Paulo", "HH:mm");
      return val.toString().replace("h",":").trim().slice(0,5);
    }

    var speakers = row[8] ? row[8].toString().split('|').map(function(s){return s.trim();}).filter(Boolean) : [];

    eventos.push({
      mes:mes, dia:dia, semana:semana,
      inicio:fmtHora(row[2]||"09:00"), fim:fmtHora(row[3]||"11:00"),
      tipo:tipo, titulo:row[5].toString(),
      sub:(row[6]||"").toString(), speakers:speakers,
      local:(row[12]||"Vila Tech Hub").toString(),
      valor:(row[14]||"").toString(),
      linkInscricao:(row[15]||"").toString()
    });
  }
  return eventos;
}

function _gerarDataJs(eventos) {
  var linhas = eventos.map(function(ev){
    return '  {\n' +
      '    mes:'+JSON.stringify(ev.mes)+', dia:'+ev.dia+', semana:'+JSON.stringify(ev.semana)+',\n'+
      '    inicio:'+JSON.stringify(ev.inicio)+', fim:'+JSON.stringify(ev.fim)+',\n'+
      '    tipo:'+JSON.stringify(ev.tipo)+',\n'+
      '    titulo:'+JSON.stringify(ev.titulo)+',\n'+
      '    sub:'+JSON.stringify(ev.sub)+',\n'+
      '    speakers:'+JSON.stringify(ev.speakers)+',\n'+
      '    local:'+JSON.stringify(ev.local)+',\n'+
      '    valor:'+JSON.stringify(ev.valor)+',\n'+
      '    linkInscricao:'+JSON.stringify(ev.linkInscricao)+'\n'+
      '  }';
  });
  return '// Gerado automaticamente — ' + new Date().toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"}) + '\n\n' +
    'const EVENTOS = [\n' + linhas.join(',\n') + '\n];\n\n' +
    'const MESES_ORDEM = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];\n' +
    'const MESES_LABEL = {janeiro:"Janeiro",fevereiro:"Fevereiro",março:"Março",abril:"Abril",maio:"Maio",junho:"Junho",julho:"Julho",agosto:"Agosto",setembro:"Setembro",outubro:"Outubro",novembro:"Novembro",dezembro:"Dezembro"};\n';
}

// ── GATILHOS ──────────────────────────────────────────────────
function configurarGatilho() {
  ScriptApp.getProjectTriggers().forEach(function(g){
    if (g.getHandlerFunction()==="sincronizarCalendario") ScriptApp.deleteTrigger(g);
  });
  ScriptApp.newTrigger("sincronizarCalendario").forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  ScriptApp.newTrigger("sincronizarCalendario").timeBased().everyMinutes(30).create();
  SpreadsheetApp.getUi().alert("✅ Gatilhos configurados!\n\n• Ao editar → imediato\n• A cada 30min → automático\n\nCalendário: atendimento@vilatechub.com.br");
}

// ── MENU ──────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🗓️ Vila Tech Hub")
    .addItem("Sincronizar Calendário Agora", "sincronizarCalendario")
    .addSeparator()
    .addItem("📡 Publicar no Site (Vercel)", "publicarNoSite")
    .addSeparator()
    .addItem("Configurar Gatilhos", "configurarGatilho")
    .addToUi();
}
