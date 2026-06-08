# Vila Tech Hub — Agenda de Atividades
### Instituto Cultural e Educacional Vila Tech

---

## Estrutura do Projeto

```
vth-agenda/
├── index.html      → Página principal da agenda
├── style.css       → Estilos e identidade visual
├── data.js         → FONTE DE DADOS — edite aqui para adicionar/alterar eventos
├── app.js          → Lógica da aplicação (filtros, render, animações)
├── vercel.json     → Configuração de deploy no Vercel
└── README.md       → Este arquivo
```

---

## Como Adicionar ou Editar Eventos

**Edite apenas o arquivo `data.js`.**

Adicione um objeto ao array `EVENTOS`:

```javascript
{
  mes: "agosto",          // mês em minúsculas
  dia: 15,                // número do dia
  semana: "Sáb",          // abreviação do dia da semana
  inicio: "09:00",        // horário início HH:MM
  fim: "12:00",           // horário fim HH:MM
  tipo: "Curso",          // "Palestra" | "Curso" | "Evento"
  titulo: "Nome do Curso",
  sub: "Subtítulo resumido para o card",
  descritivo: "Texto completo de divulgação para redes e e-mail.",
  speakers: ["Nome Palestrante 1", "Nome Palestrante 2"],
  local: "Vila Tech Hub",
  valor: "Gratuito",
  linkInscricao: "https://sympla.com.br/..."  // deixe "" se não tiver
},
```

---

## Deploy no Vercel — Passo a Passo

### Pré-requisitos
- Conta no GitHub: https://github.com
- Conta no Vercel: https://vercel.com (pode entrar com o GitHub)

### 1. Criar repositório no GitHub

```bash
# No terminal (ou Git Bash no Windows):
git init
git add .
git commit -m "feat: Vila Tech Hub agenda v1.0"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/vth-agenda.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse https://vercel.com e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `vth-agenda`
4. Clique em **"Deploy"** — sem configurações adicionais necessárias
5. Em ~30 segundos o deploy estará live em uma URL como:
   `https://vth-agenda.vercel.app`

### 3. Domínio personalizado (opcional)

Para usar `agenda.vilatechub.com.br`:
1. No painel Vercel → seu projeto → **Settings → Domains**
2. Adicione: `agenda.vilatechub.com.br`
3. No painel do seu provedor DNS, adicione um registro CNAME:
   - Nome: `agenda`
   - Valor: `cname.vercel-dns.com`
4. Aguarde propagação (até 24h, geralmente minutos)

---

## Incorporar no Site vilatechub.com.br

Cole este código HTML em qualquer página do site:

```html
<iframe 
  src="https://agenda.vilatechub.com.br" 
  width="100%" 
  height="900" 
  frameborder="0" 
  style="border: none; background: #0a0a0a; display: block;"
  title="Vila Tech Hub — Agenda de Atividades">
</iframe>
```

Para abrir como página completa, basta linkar para `https://agenda.vilatechub.com.br`.

---

## Atualização Automática via Google Apps Script

Para que qualquer edição na planilha `VTH_Calendario_Mestre` no Google Sheets
atualize automaticamente a agenda no site, siga os passos abaixo.

### Passo 1 — Gerar token do GitHub

1. Acesse https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Nome: `VTH Agenda Deploy`
4. Expiration: **No expiration**
5. Marque o escopo: `repo` (acesso completo ao repositório)
6. Clique em **Generate token**
7. **Copie o token** — ele só aparece uma vez

### Passo 2 — Adicionar o token como Secret no Apps Script

1. Abra o Apps Script da planilha (Extensões → Apps Script)
2. Clique em **"Configurações do projeto"** (ícone de engrenagem ⚙️)
3. Role até **"Propriedades do script"**
4. Clique em **"Adicionar propriedade"**
5. Nome: `GITHUB_TOKEN` | Valor: cole o token gerado
6. Nome: `GITHUB_REPO`  | Valor: `SEU_USUARIO/vth-agenda`
7. Salve

### Passo 3 — Adicionar função de deploy ao Apps Script

Cole esta função no mesmo arquivo do script existente:

```javascript
function atualizarSiteVercel() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GITHUB_TOKEN');
  var repo  = props.getProperty('GITHUB_REPO');

  var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('📅 Calendário Mestre');
  var eventos = extrairEventosDaPlanilha(sheet);
  var conteudo = gerarDataJs(eventos);

  var url     = 'https://api.github.com/repos/' + repo + '/contents/data.js';
  var headers = { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' };

  // Busca SHA atual do arquivo
  var getSha  = UrlFetchApp.fetch(url, { headers: headers, muteHttpExceptions: true });
  var sha     = JSON.parse(getSha.getContentText()).sha || '';

  var payload = JSON.stringify({
    message: 'chore: atualização automática via Sheets - ' + new Date().toLocaleString('pt-BR'),
    content: Utilities.base64Encode(conteudo, Utilities.Charset.UTF_8),
    sha: sha
  });

  var result = UrlFetchApp.fetch(url, {
    method: 'PUT',
    headers: headers,
    payload: payload,
    muteHttpExceptions: true
  });

  var status = result.getResponseCode();
  if (status === 200 || status === 201) {
    Logger.log('✅ Site atualizado com sucesso! Status: ' + status);
    SpreadsheetApp.getUi().alert('✅ Site atualizado!\n\nA agenda em agenda.vilatechub.com.br será atualizada em ~30 segundos pelo Vercel.');
  } else {
    Logger.log('❌ Erro ao atualizar: ' + result.getContentText());
    SpreadsheetApp.getUi().alert('❌ Erro ao atualizar o site.\nVerifique o token GitHub nas propriedades do script.');
  }
}

function extrairEventosDaPlanilha(sheet) {
  var dados       = sheet.getDataRange().getValues();
  var eventos     = [];
  var MESES_MAP   = {
    '06':'junho','07':'julho','08':'agosto','09':'setembro',
    '10':'outubro','11':'novembro','12':'dezembro','01':'janeiro',
    '02':'fevereiro','03':'março','04':'abril','05':'maio'
  };
  var DIAS_MAP    = { '0':'Dom','1':'Seg','2':'Ter','3':'Qua','4':'Qui','5':'Sex','6':'Sáb' };

  for (var i = 4; i < dados.length; i++) {
    var row = dados[i];
    if (!row[0] || !row[5]) continue;
    if (row[16] === 'Cancelado') continue;
    if (typeof row[0] === 'string' && row[0].toUpperCase() === row[0]) continue;

    var dataVal = row[0];
    var dataObj = dataVal instanceof Date ? dataVal : null;
    if (!dataObj) {
      var partes = dataVal.toString().split('/');
      if (partes.length === 3) dataObj = new Date(partes[2], partes[1]-1, partes[0]);
    }
    if (!dataObj) continue;

    var dia    = dataObj.getDate();
    var mesNum = String(dataObj.getMonth() + 1).padStart(2, '0');
    var mes    = MESES_MAP[mesNum] || 'junho';
    var semana = DIAS_MAP[String(dataObj.getDay())] || '';

    var inicio = row[2] ? row[2].toString().replace(/:\d\d$/, '').slice(0,5) : '09:00';
    var fim    = row[3] ? row[3].toString().replace(/:\d\d$/, '').slice(0,5) : '12:00';

    var speakers = row[8] ? row[8].toString().split('|').map(function(s){ return s.trim(); }).filter(Boolean) : [];

    eventos.push({
      mes: mes, dia: dia, semana: semana,
      inicio: inicio, fim: fim,
      tipo: row[4] || 'Evento',
      titulo: row[5] || '',
      sub: row[6] || '',
      descritivo: row[7] || '',
      speakers: speakers,
      local: row[12] || 'Vila Tech Hub',
      valor: row[14] || '',
      linkInscricao: row[15] || ''
    });
  }
  return eventos;
}

function gerarDataJs(eventos) {
  var linhas = eventos.map(function(ev) {
    return '  {\n' +
      '    mes:"' + ev.mes + '", dia:' + ev.dia + ', semana:"' + ev.semana + '",\n' +
      '    inicio:"' + ev.inicio + '", fim:"' + ev.fim + '",\n' +
      '    tipo:"' + ev.tipo + '",\n' +
      '    titulo:' + JSON.stringify(ev.titulo) + ',\n' +
      '    sub:' + JSON.stringify(ev.sub) + ',\n' +
      '    descritivo:' + JSON.stringify(ev.descritivo) + ',\n' +
      '    speakers:' + JSON.stringify(ev.speakers) + ',\n' +
      '    local:' + JSON.stringify(ev.local) + ',\n' +
      '    valor:' + JSON.stringify(ev.valor) + ',\n' +
      '    linkInscricao:' + JSON.stringify(ev.linkInscricao) + '\n' +
      '  }';
  });

  return '// Gerado automaticamente pelo Google Apps Script\n' +
    '// Atualizado em: ' + new Date().toLocaleString("pt-BR", {timeZone:"America/Sao_Paulo"}) + '\n\n' +
    'const EVENTOS = [\n' + linhas.join(',\n') + '\n];\n\n' +
    'const MESES_ORDEM = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];\n' +
    'const MESES_LABEL = {janeiro:"Janeiro",fevereiro:"Fevereiro",março:"Março",abril:"Abril",maio:"Maio",junho:"Junho",julho:"Julho",agosto:"Agosto",setembro:"Setembro",outubro:"Outubro",novembro:"Novembro",dezembro:"Dezembro"};\n';
}
```

### Passo 4 — Adicionar ao menu do Google Sheets

Dentro da função `onOpen()` já existente no script, adicione:

```javascript
.addItem("Publicar no Site (Vercel)", "atualizarSiteVercel")
```

### Passo 5 — Usar

A partir de agora, quando quiser publicar as mudanças da planilha no site:
1. Abra a planilha no Google Sheets
2. Menu **"🗓️ Vila Tech Hub"** → **"Publicar no Site (Vercel)"**
3. Em ~30 segundos o site estará atualizado

---

## Fluxo Completo

```
Planilha Google Sheets
        ↓  (edição manual ou automática via Apps Script)
   Google Calendar (achilles + atendimento)
        ↓  (botão "Publicar no Site" no menu)
   GitHub (repositório vth-agenda)
        ↓  (deploy automático Vercel)
   https://agenda.vilatechub.com.br
        ↓  (iframe incorporado)
   vilatechub.com.br/agenda
```

---

## Suporte

Instituto Cultural e Educacional Vila Tech  
achilles@vilatechub.com.br  
vilatechub.com.br
