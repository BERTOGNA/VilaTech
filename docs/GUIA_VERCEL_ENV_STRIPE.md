# Guia: Configurar Variáveis de Ambiente do Stripe na Vercel

Este guia é destinado ao **administrador do projeto na Vercel**.  
O objetivo é configurar as chaves de integração com o Stripe para habilitar a funcionalidade de doações do site Vila Tech.

---

## Pré-requisitos

- Ter acesso de **Owner ou Admin** ao projeto no painel da Vercel.
- Ter a **Vercel CLI** instalada. Se não tiver, instale com:
  ```bash
  npm install -g vercel
  ```
- Estar autenticado na Vercel CLI. Se não estiver, rode:
  ```bash
  vercel login
  ```

---

## Opção A — Via Terminal (Recomendado se você usa Antigravity)

Abra um terminal na raiz do projeto e cole os comandos abaixo **um de cada vez**:

### 1. Vincular o projeto local à Vercel (só precisa fazer uma vez)
```bash
vercel link
```
> Siga as instruções na tela para selecionar o projeto correto.

### 2. Adicionar a chave secreta do Stripe
```bash
vercel env add STRIPE_SECRET_KEY
```
Quando perguntado:
- **Value:** cole a chave secreta `sk_live_...` fornecida separadamente de forma segura
- **Environments:** selecione `Production`, `Preview` e `Development`

### 3. Adicionar a URL do frontend (para redirecionamentos pós-pagamento)
```bash
vercel env add FRONTEND_URL
```
Quando perguntado:
- **Value:** `https://www.vilatech.org.br` *(ou a URL real do site em produção)*
- **Environments:** selecione `Production`

Para Preview (testes de deploy):
```bash
vercel env add FRONTEND_URL
```
- **Value:** URL de preview do projeto na Vercel (ex: `https://vilatech-git-main.vercel.app`)
- **Environments:** selecione `Preview`

### 4. Verificar se as variáveis foram criadas corretamente
```bash
vercel env ls
```
Você deve ver `STRIPE_SECRET_KEY` e `FRONTEND_URL` listados.

### 5. Fazer o redeploy para aplicar as variáveis
```bash
vercel --prod
```

---

## Opção B — Via Painel Web da Vercel

1. Acesse [vercel.com](https://vercel.com) e entre no projeto **VilaTech**.
2. Vá em **Settings → Environment Variables**.
3. Adicione as seguintes variáveis:

| Nome | Valor | Ambientes |
|------|-------|-----------|
| `STRIPE_SECRET_KEY` | `sk_live_...` *(fornecida separadamente)* | Production, Preview, Development |
| `FRONTEND_URL` | `https://www.vilatech.org.br` | Production |
| `FRONTEND_URL` | URL de preview da Vercel | Preview |

4. Clique em **Save** para cada variável.
5. Vá em **Deployments**, clique no último deploy e selecione **Redeploy** para aplicar as mudanças.

---

## Como funciona a integração

- Em **desenvolvimento local**: o frontend se comunica com o backend Express local (`localhost:3001/api/stripe/...`).
- Em **produção (Vercel)**: o frontend chama diretamente a Serverless Function em `/api/stripe/create-checkout-session`, que usa a `STRIPE_SECRET_KEY` configurada acima.
- O Stripe redireciona o usuário para `/doacao-sucesso` ou `/doacao-cancelada` após o pagamento, usando a `FRONTEND_URL` como base.

---

## Verificação após o deploy

1. Acesse o site em produção e vá para a página `/doar`.
2. Selecione um valor, preencha nome e e-mail e clique em **Continuar para Pagamento**.
3. Você deve ser redirecionado para a página de checkout do Stripe.
4. Após o pagamento, você deve ser redirecionado para `/doacao-sucesso`.

---

## Segurança — O que NÃO fazer

- ❌ **Nunca** coloque a `STRIPE_SECRET_KEY` diretamente em arquivos de código (`.ts`, `.tsx`, `.js`).
- ❌ **Nunca** commite arquivos `.env` no Git (já estão protegidos no `.gitignore`).
- ✅ A chave **publicável** (`pk_live_...`) poderia aparecer no frontend com segurança, mas na arquitetura atual ela não é necessária.
- ✅ Envie a chave secreta apenas por canais seguros (WhatsApp, Signal, etc.) — nunca por e-mail.

---

## Dúvidas?

Peça ajuda ao Antigravity com o seguinte prompt:
> *"Antigravity, preciso configurar as variáveis de ambiente do Stripe na Vercel para o projeto Vila Tech. Me guie pelo processo."*
