# Especificações Técnicas e Arquiteturais — Vila Tech Hub 2026

---

## 1. Visão Geral do Sistema e Arquitetura

O **Vila Tech Hub** é a plataforma digital completa do centro de inovação, tecnologia e empreendedorismo sediado em Itu, SP. O ecossistema abrange desde o portal institucional/comercial para captação de clientes e participantes até uma plataforma interna de **CRM administrativo**, gestão de espaços (coworking/salas de reunião), catálogo de cursos do Instituto Vila Tech e agenda comunitária de eventos.

### 1.1 Arquitetura de Monorepo / Estrutura Globais
O repositório é estruturado em duas aplicações principais desacopladas mais diretórios de documentação e integrações:

```
SITE_VILA_TECH_HUB_2026/
├── app/                        # Frontend Web (React 19 + TypeScript + Vite + Tailwind)
│   ├── public/                 # Assets estáticos (imagens, favicons, logos, modelos 3D)
│   └── src/
│       ├── components/         # Componentes globais (Nav, Footer, Modais, Proteção, SEO)
│       ├── config/             # Configuração estática global (config.ts com todo o conteúdo)
│       ├── context/            # Contextos React (AuthContext)
│       ├── hooks/              # Custom Hooks (useLenis, useScrollTrigger, use-mobile)
│       ├── layouts/            # Layouts de página (AdminLayout)
│       ├── pages/              # Páginas públicas e administrativas
│       │   └── admin/          # Módulos do CRM / Painel Admin
│       ├── sections/           # Seções modulares da Landing Page e Coworking Page
│       └── services/           # Camada de comunicação HTTP (Axios API + Firebase Auth)
├── backend/                    # Backend REST API (Node.js + Express 5 + Firebase Admin)
│   └── src/
│       ├── config/             # Credenciais Firebase Admin SDK
│       ├── controllers/        # Controladores das rotas (Leads, Bookings, Events, Tasks)
│       ├── middleware/         # Middleware de Auth (JWT Bearer Token validation)
│       ├── models/             # Interfaces e Types dos documentos do Firestore
│       ├── routes/             # Definição das rotas REST Express
│       └── server.ts           # Ponto de entrada do servidor Express (Porta 3001)
├── docs/                       # Documentação técnica e scripts de automação externa
│   ├── GoogleAppsScript.js     # Script de sincronização bidirecional com Google Sheets
│   └── ESPECIFICACOES_TECNICAS.md # Este documento de referência técnica
└── vercel.json                 # Configurações de roteamento SPA e Serverless na Vercel
```

---

## 2. Stack Tecnológica Completa

| Categoria | Tecnologia | Versão | Propósito no Projeto |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `19.2.0` | Renderização e componentes de UI reativos. |
| **Linguagem Core** | TypeScript | `5.9.3` | Tipagem estática rigorosa para dados, formulários e props. |
| **Bundler & Build Tool** | Vite | `7.2.4` | Server dev ultra-rápido e bundling HMR otimizado. |
| **Roteamento Frontend** | React Router DOM | `7.13.1` | Navegação cliente SPA para páginas públicas e sub-rotas do Admin. |
| **Estilização & CSS** | Tailwind CSS | `3.4.19` | Utility-first CSS com estendibilidade de temas cyberpunk/neon. |
| **Animações 2D/Scroll** | GSAP + ScrollTrigger | `3.14.2` | Animações complexas guiadas por scroll, timelines e pins. |
| **Smooth Scroll** | Lenis | `1.3.17` | Rolagem suave desacoplada de alto desempenho sincronizada ao GSAP. |
| **Gráficos 3D** | Three.js + R3F + Drei | `0.182.0` / `9.5.0` | Cubo 3D interativo dos 3 Pilares do Vila Tech na Hero/Destaque. |
| **Ícones & UI Base** | Lucide React + Radix UI | `0.562.0` | Primitivas acessíveis (Accordion, Dialog, Tabs, Popover, Select). |
| **Kanban Drag-and-Drop**| `@hello-pangea/dnd` | `18.0.1` | Gestão visual de pipelines de Leads e Tarefas no CRM. |
| **Gráficos e Analytics**| Recharts | `2.15.4` | Gráficos de conversão, ocupação e receita no dashboard Admin. |
| **Formulários & Zod** | React Hook Form + Zod | `7.70` / `4.3` | Validação declarativa de dados de Leads, Cursos e Agendamentos. |
| **Backend Core** | Node.js + Express | `5.2.1` | Servidor API RESTful seguro com TypeScript. |
| **Banco de Dados** | Firebase Firestore | `12.10.0` / Admin `13.7` | Banco NoSQL orientados a documentos em tempo real. |
| **Autenticação** | Firebase Authentication | `12.10.0` | Login administrativo via e-mail/senha com tokens Bearer JWT. |

---

## 3. Guia de Design, Identidade Visual & Animações

### 3.1 Paleta de Cores (Design Tokens)
A estética visual do Vila Tech Hub combina **Dark Mode Tecnológico (Cyberpunk/Neon)** com acentos vibrantes e minimalistas.

- **Void Black (`#050508`)**: Fundo principal de todas as páginas públicas.
- **Void Dark (`#0A0A0F`)**: Fundo secundário para cards, seções elevadas e modais.
- **Neon Cyan (`#00D4FF`)**: Cor de destaque principal (buttons, glows, links ativos, destaques do cubo).
- **Neon Blue (`#4D9FFF`)**: Acento secundário para gradientes e badges ativos.
- **Soft Blue (`#9DC4FF`)**: Cor terciária para bordas e textos secundários.
- **Text Primary (`#FFFFFF`)**: Títulos e textos em alto contraste.
- **Text Muted (`#94A3B8`)**: Descrições e rótulos secundários em cinza pastel.

### 3.2 Tipografia
- **Display / Títulos**: `Inter` (Font weight 800/700, tracking -0.02em) — Usada em headings, botões e identidades de marca.
- **Monospace / Código / Rótulos**: `JetBrains Mono` — Usada para tags de data, status badges, coordenadas e efeito de decodificação de texto (*Text Decode Effect*).

### 3.3 Motor de Animação e Interações
1. **Text Decode Scramble**: Efeito de embaralhamento de caracteres alfanuméricos na Hero principal (`Hero.tsx`) implementado com timers de intervalo controlados.
2. **Cubo 3D Rotacional (`AlbumCube.tsx`)**: Canvas Three.js renderizando uma geometria cúbica com 6 texturas aplicadas. Rotação sincronizada com a rolagem do usuário via `useFrame` e GSAP.
3. **Parallax Image Strips (`ParallaxGallery.tsx`)**: Duas faixas horizontais de imagens com movimento oposto no scroll (uma desloca para a esquerda e outra para a direita).
4. **Horizontal Pinned Scroll**: Seção de galeria que trava a rolagem vertical do navegador para deslizar imagens horizontalmente antes de prosseguir a página.
5. **Infinite Marquee Ticker**: Ticker contínuo em CSS/GSAP com frases da marca rodando em loop infinito.

---

## 4. Detalhamento Exaustivo das Páginas e Seções Públicas

### 4.1 Home / Landing Page (`/`)
Componente base: `app/src/pages/LandingPage.tsx`

- **TopNavigation (`TopNavigation.tsx`)**: Barra de navegação fixa com blur glassmorphism, links com scroll suave para seções internas e atalhos para `/coworking`, `/instituto`, `/cursos`, `/agenda`.
- **Hero (`Hero.tsx`)**: Apresentação principal com título animado via *Text Decode*, player de vídeo YouTube incorporado, botões de ação e pílulas de navegação.
- **AlbumCube / Três Pilares (`AlbumCube.tsx`)**: Renderização 3D dos três pilares estratégicos do Hub: **Educação**, **Coworking** e **Clube**.
- **Seção Coworking (`Coworking.tsx`)**: Resumo dos planos corporativos, mesas flexíveis e salas privativas.
- **Seção Instituto (`InstituteSection.tsx`)**: Apresentação da vertente de educação e impacto social.
- **Seção Clube / Ecossistema (`Club.tsx`)**: Benefícios da comunidade de membros e startups.
- **Seção Startups (`Startups.tsx`)**: Hub de aceleração e empresas residentes.
- **Seção Parceiros (`Partners.tsx`)**: Marquee com logotipos de patrocinadores e parceiros de inovação.
- **Galeria Parallax (`ParallaxGallery.tsx`)**: Galeria de imagens com paralaxe duplo e scroll horizontal.
- **Localização (`Location.tsx`)**: Endereço físico em Itu, SP, com integração do Google Maps e informações de acesso.
- **Formulário de Contato (`ContactForm.tsx`)**: Formulário com validação Zod que envia leads diretamente para o banco Firestore/API.
- **Rodapé (`Footer.tsx`)**: Links rápidos, newsletter, contatos operacionais e retrato institucional.

### 4.2 Portal Coworking (`/coworking`)
Componente base: `app/src/pages/CoworkingPage.tsx`

- **CoworkingHero**: Apresentação dos espaços físicos de trabalho, salas de reunião e estúdios.
- **Workspaces**: Exibição detalhada de Mesas Compartilhadas (Hot Desk), Mesas Dedicadas e Salas Privativas.
- **OnDemandSpaces**: Reserva por hora de Salas de Reunião, Auditório para Eventos e Estúdio de Podcast.
- **VirtualOffice**: Planos de Endereço Fiscal, Endereço Comercial e Gestão de Correspondências.
- **PricingTable**: Tabela comparativa de preços, benefícios inclusos e gatilhos para reserva ou contato direto via WhatsApp.
- **ClubCombos & VilaTechClub**: Planos combinados que unem coworking + passe de eventos + mentorias.
- **CafeAndCommunity**: Apresentação da infraestrutura de convivência, café especial e networking.
- **InnovationPrograms**: Programas corporativos para empresas e validação de MVPs.
- **CoworkingFAQ**: Accordion interativo com perguntas frequentes sobre horários, internet por fibra redundante e acesso 24/7.

### 4.3 Instituto Vila Tech (`/instituto`)
Componente base: `app/src/pages/InstitutePage.tsx`

- **Missão e Propósito Social**: Foco na capacitação de novos talentos para o mercado de tecnologia.
- **Métricas de Impacto**: Contadores visuais com total de alunos formados, bolsas concedidas e taxa de empregabilidade.
- **Programas de Formação**: Bootcamps de Desenvolvedor Fullstack, Inteligência Artificial, UX/UI Design e Gestão de Produtos.
- **Depoimentos e Cases de Sucesso**: Histórias de alunos que migraram para a área de tecnologia.

### 4.4 Catálogo de Cursos (`/cursos` & `/cursos/:id`)
Componentes base: `app/src/pages/CoursesLandingPage.tsx` e `app/src/pages/CourseDetailPage.tsx`

- **Filtro de Cursos**: Busca por palavra-chave e filtros por nível (Iniciante, Intermediário, Avançado) e formato (Presencial, Híbrido, Online).
- **Cards de Cursos**: Duração, carga horária, investimento e próxima turma.
- **Página de Detalhes (`/cursos/:id`)**:
  - Ementa módulo por módulo.
  - Perfil dos instrutores/mentores.
  - Pré-requisitos técnicos.
  - Modal de inscrição direta que registra o lead no funil do CRM.

### 4.5 Agenda e Eventos da Comunidade (`/agenda`)
Componente base: `app/src/pages/AgendaPage.tsx`

- **Calendário Dinâmico de Eventos**: Filtro por categoria (Meetup, Workshop, Hackathon, Networking, Palestra).
- **Cards de Eventos**: Data, horário, palestrantes convidados, capacidade limite de vagas e local no hub.
- **Sistema de RSVP**: Modal de inscrição no evento com confirmação instantânea no Firestore.

### 4.6 Sistema de Reservas de Espaços (`/reservas` e `/reservas/minhas`)
Componentes base: `app/src/pages/BookingsPage.tsx` e `app/src/pages/MyBookingsPage.tsx`

- **Fluxo de Reserva de Salas (`BookingsPage.tsx`)**:
  1. Seleção do Recurso: Sala Reunião (6 pessoas), Sala Treinamento (20 pessoas), Estúdio Podcast, Desk Individual.
  2. Seleção de Data e Horário (Grid interativo por slots de 1 hora).
  3. Preenchimento de dados do responsável/empresa.
  4. Envio do pedido de agendamento (Status inicial: `pending` ou `confirmed`).
- **Portal "Minhas Reservas" (`MyBookingsPage.tsx`)**: Consulta de reservas pelo e-mail ou código de confirmação, permitindo ver detalhes ou solicitar cancelamento.

---

## 5. Painel Administrativo e CRM Vila Tech Hub (`/admin`)

O painel administrativo é uma aplicação SPA protegida por autenticação Firebase Auth, projetada para a equipe de vendas, comunidade e operações do Vila Tech Hub.

### 5.1 Mecanismo de Autenticação e Rotas Protegidas
- **Login (`LoginPage.tsx`)**: Autenticação por e-mail e senha utilizando Firebase Auth.
- **Contexto de Autenticação (`AuthContext.tsx`)**: Armazena o usuário autenticado atual (`User | null`) e disponibiliza métodos de login/logout.
- **Guard Route (`ProtectedRoute.tsx`)**: Intercepta acessos a qualquer sub-rota `/admin/*`. Se não houver usuário autenticado, redireciona para `/admin/login`.
- **Interceptor HTTP Bearer (`api.ts`)**: Injeta automaticamente o token JWT do Firebase (`getIdToken()`) no cabeçalho `Authorization: Bearer <token>` de todas as chamadas para a API REST Node.js/Express.

### 5.2 Módulos do Painel Admin

#### 1. CRM Kanban e Gestão de Pipelines (`/admin/pipelines` e `/admin/leads`)
Componentes: `app/src/pages/admin/PipelinesPage.tsx`, `app/src/pages/admin/LeadsListPage.tsx`, `app/src/pages/admin/LeadDetailPage.tsx`

- **Quadro Kanban Drag-and-Drop**: Visualização interativa dos estágios de vendas do Vila Tech Hub:
  - `Novo Lead` ➔ `Primeiro Contato` ➔ `Reunião / Visita` ➔ `Proposta Enviada` ➔ `Fechado / Ganho` ➔ `Perdido`.
- **Movimentação de Cards**: Arrastar e soltar atualiza instantaneamente o estágio do lead no Firestore via API.
- **Listagem e Filtros (`LeadsListPage.tsx`)**: Tabela completa com busca por nome, e-mail, telefone, empresa, interesse (Coworking, Cursos, Eventos) e exportação em CSV.
- **Ficha Detalhada do Lead (`LeadDetailPage.tsx`)**: Histórico de interações, notas da equipe, valor estimado do contrato e ações de contato rápido (link direto para WhatsApp com mensagem pré-formatada).

#### 2. Gestão de Reservas (`/admin/bookings`)
Componente: `app/src/pages/admin/BookingsAdminPage.tsx`

- Visão em grade e lista de todas as solicitações de reserva de salas de reunião e estúdios.
- Ações administrativas: Aprovar Reserva, Rejeitar Reserva, Cancelar ou Marcar como Pago.
- Bloqueio de horários para manutenção ou eventos internos do hub.

#### 3. Gestão de Tarefas Operacionais (`/admin/tasks`)
Componente: `app/src/pages/admin/TasksPage.tsx`

- Sistema de gerenciamento de tarefas para a equipe interna do Vila Tech Hub (Limpeza de salas, configuração de áudio/vídeo para meetups, recepção de clientes, infraestrutura).
- Status das tarefas: `A Fazer`, `Em Progresso`, `Concluído`.
- Prioridades: Alta, Média, Baixa.

#### 4. Dashboard de Relatórios e Métricas (`/admin/reports`)
Componente: `app/src/pages/admin/ReportsPage.tsx`

- Visualizações gráficas em Recharts:
  - **Funil de Conversão de Leads**: Quantidade de leads por etapa do pipeline.
  - **Origem dos Leads**: Distribuição percentual (Site, WhatsApp, Instagram, Eventos, Indicação).
  - **Taxa de Ocupação do Coworking**: Utilização de salas de reunião por dia/semana.
  - **Faturamento e Projeções**: Valor total de contratos fechados no mês.

#### 5. Configurações Globais (`/admin/settings`)
Componente: `app/src/pages/admin/SettingsPage.tsx`

- Parametrização dos dados de contato da unidade.
- Configuração de Webhooks para notificação no WhatsApp / Discord / Slack.
- Gerenciamento de credenciais e chave do Google Apps Script.

---

## 6. Arquitetura Backend API & Banco de Dados (Firestore Schema)

O servidor backend é construído em Node.js com Express 5 e utiliza o Firebase Admin SDK para interagir de forma privileged com o Firebase Firestore.

### 6.1 Rotas Express da API Backend (`backend/src/routes/`)

1. **`leadRoutes.ts` (`/api/leads`)**:
   - `GET /api/leads`: Lista todos os leads (requer Auth).
   - `POST /api/leads`: Cria um novo lead (Público via site ou Privado via Admin).
   - `GET /api/leads/:id`: Obtém detalhes de um lead específico.
   - `PUT /api/leads/:id`: Atualiza dados ou estágio do lead.
   - `DELETE /api/leads/:id`: Remove um lead do banco.

2. **`bookingRoutes.ts` (`/api/bookings`)**:
   - `GET /api/bookings`: Consulta reservas ativas com suporte a filtros de data/recurso.
   - `POST /api/bookings`: Cria solicitação de agendamento de sala.
   - `PUT /api/bookings/:id/status`: Altera status (`confirmed`, `cancelled`, `pending`).

3. **`eventRoutes.ts` (`/api/events`)**:
   - `GET /api/events`: Lista eventos publicados na agenda.
   - `POST /api/events/:id/rsvp`: Inscrição de participantes em um evento.

4. **`pipelineRoutes.ts` (`/api/pipelines`)**:
   - Gestão das colunas/estágios do CRM Kanban.

5. **`taskRoutes.ts` (`/api/tasks`)**:
   - CRUD de tarefas operacionais da equipe.

6. **`resourceRoutes.ts` (`/api/resources`)**:
   - Cadastro dos recursos físicos (Salas de Reunião, Auditório, Estúdio Podcast).

### 6.2 Modelagem de Dados no Firestore (Collections)

#### Coleção `leads`
```json
{
  "id": "lead_abc123",
  "name": "Carlos Silva",
  "email": "carlos@empresa.com.br",
  "phone": "+5511998765432",
  "company": "Tech Solutions",
  "interest": "coworking", // "coworking" | "cursos" | "instituto" | "eventos"
  "stageId": "stage_meeting", // ID da coluna no Kanban
  "source": "site_form",
  "notes": "Interessado em sala privativa para 6 pessoas.",
  "value": 2500.00,
  "createdAt": "2026-07-29T10:00:00.000Z",
  "updatedAt": "2026-07-29T10:30:00.000Z"
}
```

#### Coleção `bookings`
```json
{
  "id": "book_xyz789",
  "resourceId": "room_meeting_01",
  "resourceName": "Sala Inovação (6 pessoas)",
  "userName": "Mariana Souza",
  "userEmail": "mariana@design.com",
  "userPhone": "+5511976543210",
  "date": "2026-08-10",
  "startTime": "14:00",
  "endTime": "16:00",
  "totalPrice": 160.00,
  "status": "confirmed", // "pending" | "confirmed" | "cancelled" | "completed"
  "createdAt": "2026-07-29T10:15:00.000Z"
}
```

#### Coleção `events`
```json
{
  "id": "evt_ai_meetup",
  "title": "Meetup de IA Generativa & Agentes",
  "category": "Meetup",
  "date": "2026-08-15",
  "time": "19:00 - 21:30",
  "location": "Auditório Vila Tech Hub",
  "speaker": "Gabriel Santos (Dev Senior)",
  "capacity": 50,
  "registeredCount": 38,
  "description": "Discussão prática sobre a aplicação de IA em negócios locais.",
  "bannerUrl": "/images/events/ai-meetup.jpg"
}
```

### 6.3 Sincronização Externa (Google Apps Script)
No arquivo `docs/GoogleAppsScript.js`, há um script de integração configurado para sincronizar novas submissões de formulário do site com planilhas do Google Sheets em tempo real. Ele atua como backup de retenção de dados e facilita o acompanhamento imediato pela equipe comercial caso o painel admin não esteja aberto no momento.

---

## 7. Padrão de Configuração Centralizada (`src/config.ts`)

Todas as páginas públicas obtêm seu conteúdo textual, caminhos de imagens, links de WhatsApp, textos do cubo 3D e itens de menu a partir de um único arquivo de configuração: `app/src/config.ts`.

### Vantagens do Padrão
1. **Separação entre Código e Conteúdo**: Alterações de texto, valores de planos ou fotos não exigem modificações nos componentes React.
2. **Segurança de Tipos**: Cada objeto de configuração implementa uma interface TypeScript rigorosa (`SiteConfig`, `HeroConfig`, `AlbumCubeConfig`, `ParallaxGalleryConfig`, `TourScheduleConfig`, `FooterConfig`).
3. **Resiliência de Renderização**: Os componentes das seções checam se os campos estão preenchidos antes de renderizar, evitando erros de tela em branco caso algum atributo opcional esteja ausente.

---

## 8. Guia Prático para Desenvolvedores (Manutenção & Deploy)

### 8.1 Requisitos do Ambiente
- **Node.js**: Versão `18.x` ou superior (recomendado `20.x`).
- **NPM**: Versão `9.x` ou superior.

### 8.2 Execução em Ambiente Local

#### 1. Iniciar o Frontend Web (`app`)
```bash
# Navegar até o diretório do frontend
cd app

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento Vite (Porta padrão: http://localhost:5173)
npm run dev
```

#### 2. Iniciar o Backend REST API (`backend`)
```bash
# Navegar até o diretório do backend
cd backend

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento Express via ts-node-dev (Porta padrão: http://localhost:3001)
npm run dev
```

### 8.3 Variáveis de Ambiente Necessárias

#### No arquivo `app/.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_FIREBASE_API_KEY=sua_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=vila-tech-hub.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vila-tech-hub
VITE_FIREBASE_STORAGE_BUCKET=vila-tech-hub.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

#### No arquivo `backend/.env`:
```env
PORT=3001
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccount.json
CORS_ORIGIN=http://localhost:5173
```

### 8.4 Comandos de Build e Verificação
```bash
# No diretório /app:
npm run build      # Compila o TypeScript e gera o bundle minificado na pasta /dist
npm run preview    # Executa um preview local do build gerado

# No diretório /backend:
npx tsc --noEmit   # Valida a tipagem TypeScript sem emitir arquivos
```

### 8.5 Instruções de Deploy na Vercel
A estrutura do repositório possui o arquivo `vercel.json` configurado na raiz e nas subpastas para tratar o roteamento SPA das páginas do React Router DOM:

1. Importar o repositório na conta Vercel.
2. Definir a pasta raiz (`Root Directory`) como `app`.
3. Adicionar as Variáveis de Ambiente da produção (`VITE_API_URL`, credenciais do Firebase).
4. O build command executará automaticamente `npm run build` gerando a distribuição otimizada.

---

## 9. Boas Práticas e Recomendações para os Próximos Devs

1. **Nunca editar componentes para mudar textos**: Qualquer mudança de conteúdo textual ou imagens da Landing Page e Coworking deve ser feita estritamente no arquivo `app/src/config.ts`.
2. **Preservar Smooth Scroll e Lenis**: Ao criar novas seções com animações guiadas por scroll, certifique-se de utilizar os hooks `useLenis` e `useScrollTrigger` para garantir compatibilidade e evitar travamentos na rolagem.
3. **Validação de Formulários**: Todos os formulários públicos e administrativos utilizam `zod` com `react-hook-form`. Sempre defina um schema de validação antes de submeter novos formulários para a API.
4. **Segurança de Endpoints no Backend**: Rotas administrativas no backend **devem** obrigatoriamente incluir o middleware de autenticação JWT do Firebase Admin SDK.
