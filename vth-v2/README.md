# Vila Tech Hub — Agenda de Atividades
### Instituto Cultural e Educacional Vila Tech

---

## Estrutura do Projeto

```
vth-agenda/
├── index.html              → Página pública da agenda
├── style.css               → Identidade visual VTH
├── data.js                 → Fonte de dados dos eventos
├── app.js                  → Lógica de filtros e renderização
├── vercel.json             → Configuração de deploy
├── VTH_AppsScript_v5.gs    → Script do Google Sheets (colar no Apps Script)
└── README.md               → Este arquivo
```

---

## PROMPT PARA ANTIGRAVITY
### Execute este prompt no Antigravity para configurar toda a automação

```
Você é um especialista em automação Google Workspace + Vercel.
Preciso que você configure a automação completa do Vila Tech Hub:

CONTEXTO:
- Temos uma planilha Google Sheets chamada "VTH_Calendario_Mestre"
  na conta atendimento@vilatechub.com.br
  URL: https://docs.google.com/spreadsheets/d/1ppSSOuvpKn6exK7LHCNRwVjtLFxMJ44e7g4yTJSaMf4
- Temos um Google Calendar na mesma conta (atendimento@vilatechub.com.br)
- Temos um repositório GitHub chamado "vth-agenda" com os arquivos
  index.html, style.css, data.js, app.js e vercel.json
- O site está publicado no Vercel em agenda.vilatechub.com.br

AUTOMAÇÃO JÁ CONFIGURADA:
1. Google Sheets → Google Calendar: Apps Script v5.0 instalado e funcionando
   com gatilhos "Ao editar" e "A cada 30 minutos"
2. O script sincroniza criação, atualização e cancelamento de eventos
3. O menu "🗓️ Vila Tech Hub" na planilha tem os botões:
   - "Sincronizar Calendário Agora"
   - "📡 Publicar no Site (Vercel)"
   - "Configurar Gatilhos"

O QUE PRECISO AGORA:
1. Configure o GITHUB_TOKEN e GITHUB_REPO nas propriedades do Apps Script
   para que o botão "Publicar no Site" funcione
2. Faça o deploy inicial do repositório vth-agenda no Vercel
3. Configure o domínio personalizado agenda.vilatechub.com.br
4. Configure o iframe no site vilatechub.com.br para incorporar a agenda
5. Teste o fluxo completo:
   - Editar planilha → Calendar atualiza (automático)
   - Clicar "Publicar no Site" → data.js atualiza no GitHub → Vercel republica

CREDENCIAIS NECESSÁRIAS:
- Acesso à conta atendimento@vilatechub.com.br
- Token GitHub com escopo "repo"
- Acesso ao painel Vercel
- Acesso ao DNS do domínio vilatechub.com.br
```

---

## Deploy Manual — Passo a Passo

### 1. Criar repositório no GitHub

```bash
# Na pasta do projeto:
git init
git add .
git commit -m "feat: VTH Agenda v2.0"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/vth-agenda.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse https://vercel.com → login com GitHub
2. "Add New Project" → selecione `vth-agenda`
3. Clique "Deploy" — sem configurações adicionais
4. Em ~30 segundos: `https://vth-agenda.vercel.app`

### 3. Domínio personalizado

No Vercel → Settings → Domains → adicione `agenda.vilatechub.com.br`

No DNS do domínio, adicione:
```
Tipo:  CNAME
Nome:  agenda
Valor: cname.vercel-dns.com
```

### 4. Configurar publicação automática via Apps Script

No Apps Script da planilha:
1. Clique em ⚙️ "Configurações do projeto"
2. "Propriedades do script" → "Adicionar propriedade"
3. Adicione:
   - `GITHUB_TOKEN` = token gerado em github.com/settings/tokens (escopo: repo)
   - `GITHUB_REPO`  = `seu-usuario/vth-agenda`
4. Salve

A partir daí: menu **🗓️ Vila Tech Hub** → **📡 Publicar no Site** atualiza o site em ~30 segundos.

### 5. Incorporar no site vilatechub.com.br

```html
<iframe
  src="https://agenda.vilatechub.com.br"
  width="100%"
  height="900"
  frameborder="0"
  style="border:none; background:#0a0a0a; display:block;"
  title="Vila Tech Hub — Agenda">
</iframe>
```

---

## Fluxo Completo

```
Planilha Google Sheets (atendimento@vilatechub.com.br)
    │
    ├─── Ao editar / A cada 30min (automático)
    │         ↓
    │    Google Calendar (atendimento@vilatechub.com.br)
    │
    └─── Botão "Publicar no Site" (manual)
              ↓
         GitHub → vth-agenda/data.js
              ↓
         Vercel (deploy automático ~30s)
              ↓
         agenda.vilatechub.com.br
              ↓
         vilatechub.com.br (via iframe)
```

---

## Como Adicionar Eventos

**Na planilha:** adicione uma linha com todos os campos preenchidos,
Status = "Confirmado" → o Calendar atualiza automaticamente.

**No site:** clique em "📡 Publicar no Site" no menu da planilha.

---

Instituto Cultural e Educacional Vila Tech
atendimento@vilatechub.com.br | vilatechub.com.br
