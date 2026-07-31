# Guia de Onboarding & Setup para Desenvolvedores — Vila Tech Hub 2026

Seja bem-vindo(a) ao time de desenvolvimento do **Vila Tech Hub**! 🚀

Este guia passo a passo foi elaborado para que você consiga configurar todo o ambiente na sua máquina local, entender a dinâmica de trabalho com o **Google Antigravity**, rodar os servidores locais (Frontend e Backend) e realizar suas primeiras contribuições no repositório com total autonomia e segurança.

---

## 📌 Checklist Rápido de Instalação

- [ ] Aceitar o convite de colaboração no GitHub do projeto.
- [ ] Ter o **Node.js** (`v18.x` ou `v20.x LTS`) e **Git** instalados.
- [ ] Clonar o repositório em seu computador.
- [ ] Instalar e configurar a extensão / CLI do **Antigravity**.
- [ ] Instalar dependências nas pastas `app/` e `backend/`.
- [ ] Configurar os arquivos `.env.local` (`app/`) e `.env` (`backend/`).
- [ ] Executar o frontend e o backend localmente com sucesso.

---

## 1. Acesso ao Repositório Git (Colaborador)

### 1.1 Aceitar o Convite
1. Verifique a caixa de e-mail cadastrada na sua conta do GitHub.
2. Acesse o e-mail de convite com o título **"Invited you to collaborate on SITE_VILA_TECH_HUB_2026"** e clique em **Accept Invitation**.
3. (Opção alternativa) Acesse diretamente a URL do repositório no GitHub logado na sua conta e aceite a barra de notificação verde no topo da página.

### 1.2 Configuração de Autenticação Git (SSH ou PAT)
Recomendamos utilizar uma chave SSH para evitar digitar senhas constantemente:

```bash
# Verificar se você já possui uma chave SSH
ssh-add -l

# Caso não possua, gere uma nova chave SSH (substitua pelo seu e-mail do GitHub)
ssh-keygen -t ed25519 -C "seu-email@exemplo.com"

# Copie a chave pública e adicione no GitHub (Settings -> SSH and GPG keys)
cat ~/.ssh/id_ed25519.pub
```

### 1.3 Clonando o Repositório na Sua Máquina
Abra o seu terminal (Terminal do VS Code, Git Bash ou PowerShell) na pasta onde você costuma guardar seus projetos de programação (ex: `C:\Projetos\` ou `~/Projetos/`):

```bash
# Clonar o repositório via SSH (Recomendado)
git clone git@github.com:SEU_USUARIO_OU_ORG/SITE_VILA_TECH_HUB_2026.git

# Ou clonar via HTTPS
git clone https://github.com:SEU_USUARIO_OU_ORG/SITE_VILA_TECH_HUB_2026.git

# Entrar no diretório do projeto
cd SITE_VILA_TECH_HUB_2026
```

---

## 2. Preparação do Ambiente de Desenvolvimento

### 2.1 Requisitos do Sistema
- **Node.js**: Versão `20.x` LTS (ou no mínimo `18.x`).
- **NPM**: Versão `9.x` ou `10.x` (já vem junto com o Node.js).  
- **VS Code**: Editor recomendado.

Para verificar se você possui as versões corretas instaladas, rode:

```bash
node -v   # Deve retornar v18.x.x ou v20.x.x
npm -v    # Deve retornar 9.x.x ou superior
git --version
```

*(Se não tiver o Node.js instalado, baixe a versão LTS em: [nodejs.org](https://nodejs.org/))*

### 2.2 Extensões Recomendadas no VS Code
Abra o projeto no VS Code (`code .`) e instale as seguintes extensões a partir da aba de extensões (`Ctrl+Shift+X`):

1. **Tailwind CSS IntelliSense**: Autocompletar de classes utilitárias do Tailwind.
2. **ESLint**: Identificação de erros sintáticos e boas práticas em JavaScript/TypeScript.
3. **Prettier - Code formatter**: Formatação automática do código ao salvar.
4. **Console Ninja** (Opcional): Exibe logs do `console.log` diretamente ao lado das linhas de código.

---

## 3. Como Usar o Google Antigravity no Projeto

O **Google Antigravity (AGY)** é a nossa ferramenta oficial de Pair Programming guiada por IA. Ele atua como um desenvolvedor sênior assistente integrado diretamente ao seu fluxo de trabalho no VS Code ou terminal.

### 3.1 Instalação e Ativação do Antigravity
1. **Google Antigravity IDE / Extension**: Certifique-se de que o plugin do Antigravity está ativo no seu VS Code ou Antigravity IDE.
2. **Antigravity CLI (`agy`)**: Se estiver utilizando via linha de comando, certifique-se de que a CLI está autenticada no seu ambiente.

### 3.2 Como Pedir Ajuda ao Antigravity (Prompts Eficazes)
Sempre que você for realizar uma tarefa ou resolver um bug, use prompts claros especificando a pasta ou componente envolvido.

#### Exemplo 1: Alterando Conteúdo do Site
> *"Antigravity, preciso atualizar o telefone de contato da unidade e os valores dos planos de coworking no site."*
>
> 💡 **O Antigravity saberá que**: Não deve mexer em arquivos de componente JSX/TSX, mas sim alterar o arquivo central [app/src/config.ts](file:///c:/Users/b_ber/OneDrive/%C3%81rea%20de%20Trabalho/SITE_VILA_TECH_HUB_2026/app/src/config.ts).

#### Exemplo 2: Criando uma Nova Funcionalidade
> *"Antigravity, crie um novo componente de filtro por nível de dificuldade para o catálogo de cursos em `app/src/pages/CoursesLandingPage.tsx`."*

#### Exemplo 3: Depurando Erros
> *"Antigravity, estou recebendo um erro de CORS ao tentar salvar um lead no admin. Analise os logs do backend e proponha a correção."*

### 3.3 Regras de Ouro no Antigravity para Devs Júnior
1. **Regra do `config.ts`**: Alterações de textos, slogans, fotos e dados comerciais da Landing Page devem ser feitas **apenas** no arquivo `app/src/config.ts`.
2. **Verificação antes de commitar**: Peça sempre ao Antigravity para rodar a verificação de build (`npm run build` na pasta `app`) antes de commitar qualquer alteração.
3. **Nunca suba chaves privadas no Git**: Se precisar alterar variáveis de ambiente, mexa apenas nos arquivos `.env.local` e `.env` (que estão no `.gitignore`).

---

## 4. Instalando Dependências e Variáveis de Ambiente

O projeto possui duas pastas principais que possuem suas próprias dependências de pacotes.

### 4.1 Passo A: Configurando o Frontend (`app/`)

```bash
# 1. Entre na pasta app
cd app

# 2. Instale os pacotes npm
npm install

# 3. Crie o arquivo .env.local
```

Crie o arquivo `.env.local` dentro da pasta `app/` com o seguinte conteúdo:

```env
# URL da API REST Local (Porta do backend)
VITE_API_URL=http://localhost:3001/api

# Credenciais Públicas do Firebase Web SDK
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=vila-tech-hub.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vila-tech-hub
VITE_FIREBASE_STORAGE_BUCKET=vila-tech-hub.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

*(Solicite as chaves reais do Firebase com o dev sênior da equipe pelo WhatsApp/Slack)*.

### 4.2 Passo B: Configurando o Backend (`backend/`)

```bash
# 1. Abra outro terminal e entre na pasta backend
cd backend

# 2. Instale os pacotes npm
npm install
```

Crie o arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
PORT=3001
CORS_ORIGIN=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccount.json
```

---

## 5. Rodando a Aplicação Localmente

Para desenvolver no projeto, você precisa manter dois terminais abertos rodando o Frontend e o Backend simultaneamente.

### Terminal 1: Executando o Frontend (Vite + React)
```bash
cd app
npm run dev
```
- 🌐 Acesse no navegador: `http://localhost:5173`
- 🔒 Acesse o Painel Admin em: `http://localhost:5173/admin/login`

### Terminal 2: Executando o Backend (Express API)
```bash
cd backend
npm run dev
```
- ⚡ O servidor backend iniciará na porta `3001`: `http://localhost:3001/api`

---

## 6. Fluxo Completo de Trabalho Git (Git Workflow)

Para manter o código da equipe organizado, **NUNCA faça commits diretos na branch `main`**. Siga sempre o fluxo abaixo:

### Passo 1: Atualizar a `main` e Criar uma Branch de Feature
Antes de começar qualquer tarefa, atualize seu repositório local e crie uma branch com o nome da sua tarefa:

```bash
# Garantir que está na main
git checkout main

# Baixar as últimas atualizações do time
git pull origin main

# Criar e mudar para a sua nova branch
git checkout -b feature/ajuste-card-cursos
# ou
git checkout -b fix/corrigir-link-whatsapp
```

### Passo 2: Fazer as Alterações e Testar o Build
Realize as edições necessárias no código ou no `config.ts`. Antes de commitar, valide se o TypeScript não possui erros de compilação:

```bash
cd app
npm run build
```
*(Se o build passar sem erros em vermelho, o código está pronto para envio!)*

### Passo 3: Adicionar e Commitar suas Alterações
Siga o padrão de **Commits Semânticos**:

```bash
# Adicionar os arquivos modificados
git add .

# Criar o commit com uma mensagem clara
git commit -m "feat(cursos): adiciona filtro por categoria no catálogo de cursos"
# ou
git commit -m "fix(header): ajusta espaçamento do menu em telas móbile"
```

### Passo 4: Enviar a Branch para o GitHub (Push)
```bash
git push origin feature/ajuste-card-cursos
```

### Passo 5: Abrir um Pull Request (PR)
1. Vá até o repositório no GitHub.
2. Você verá um botão amarelo no topo com a indicação **"Compare & pull request"**. Clique nele.
3. Descreva brevemente o que você fez no formulário do PR.
4. Solicite o review do Dev Sênior da equipe.
5. Após a aprovação, o código será mesclado na branch `main`.

---

## 7. Solução de Problemas Comuns (Troubleshooting)

### ❓ Erro: `Port 5173 is in use` ou `Port 3001 is in use`
- **Causa**: Ficou algum processo do Node rodando em segundo plano preso na porta.
- **Solução (Windows)**:
  ```powershell
  # Matar processos Node presos no Windows
  taskkill /F /IM node.exe
  ```
- **Solução (Linux/Mac)**:
  ```bash
  npx kill-port 5173
  npx kill-port 3001
  ```

### ❓ Erro de compilação ao rodar `npm run dev`
- **Causa**: Incompatibilidade de versão de pacotes no `node_modules`.
- **Solução**: Apague a pasta `node_modules` e o `package-lock.json` e reinstale:
  ```bash
  # Na pasta app ou backend
  rm -rf node_modules package-lock.json
  npm install
  ```

### ❓ O formulário de contato ou login admin não responde
- **Causa**: O servidor Backend na porta `3001` não está rodando ou o arquivo `.env.local` está ausente na pasta `app`.
- **Solução**: Certifique-se de que executou `npm run dev` dentro da pasta `backend/` e que a URL `VITE_API_URL=http://localhost:3001/api` está presente no `.env.local`.

---

## 💡 Precisa de Ajuda?
1. Pergunte diretamente ao **Antigravity** no seu editor.
2. Consulte o documento de especificações técnicas em `docs/ESPECIFICACOES_TECNICAS.md`.
3. Chame o líder técnico da equipe no canal oficial do time! Boa codificação! 💻🔥
