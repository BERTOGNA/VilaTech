// ============================================================
//  VILA TECH HUB — data.js
//  FONTE DE DADOS DOS EVENTOS
//
//  Como adicionar um evento:
//  1. Copie um bloco existente
//  2. Preencha os campos
//  3. Salve o arquivo
//  4. O Vercel republica automaticamente em ~30 segundos
//
//  tipo: "Palestra" | "Curso" | "Evento"
//  mes:  nome do mês em minúsculas (ex: "agosto")
// ============================================================

const EVENTOS = [

  // ── JUNHO 2026 ──────────────────────────────────────────────

  {
    mes:"junho", dia:11, semana:"Qui", inicio:"18:30", fim:"21:30",
    tipo:"Palestra",
    titulo:"A Inovação da IA nos Negócios",
    sub:"Bloco com 4 perspectivas: Direito, Tributário, Estratégia e Negócios",
    speakers:["Felipe Scalet","Carla Bertoncelo","Gilberto Moura","Carlos Tabosa"],
    local:"Auditório VTH", valor:"Gratuito", linkInscricao:""
  },
  {
    mes:"junho", dia:13, semana:"Sáb", inicio:"19:00", fim:"22:00",
    tipo:"Evento",
    titulo:"HH da Copa",
    sub:"Happy Hour temático da Copa do Mundo",
    speakers:[], local:"Vila Tech Hub", valor:"Gratuito / Membros", linkInscricao:""
  },
  {
    mes:"junho", dia:25, semana:"Qui", inicio:"18:00", fim:"21:00",
    tipo:"Palestra",
    titulo:"Palestras: IA para Criatividade",
    sub:"Processos criativos, audiovisual, games e universos narrativos com IA",
    speakers:["Achilles Milan Neto","Bruno Bertogna","Dino Paiva","Danilo Fiocco"],
    local:"Auditório VTH", valor:"Gratuito", linkInscricao:""
  },
  {
    mes:"junho", dia:25, semana:"Qui", inicio:"18:30", fim:"21:30",
    tipo:"Curso",
    titulo:"Curso: A Nova Legislação Tributária",
    sub:"Impactos da Reforma Tributária para empresas e profissionais",
    speakers:["Carla Bertoncelo"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"junho", dia:26, semana:"Sex", inicio:"18:30", fim:"21:30",
    tipo:"Curso",
    titulo:"Curso: Planejamento Estratégico",
    sub:"Ferramentas e metodologias para crescimento sustentável",
    speakers:["Gilberto Moura"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"junho", dia:27, semana:"Sáb", inicio:"09:00", fim:"16:00",
    tipo:"Curso",
    titulo:"Curso: IA para Negócios — Contabilidade e Finanças",
    sub:"Imersão de 7h: automação, análise preditiva e IA financeira",
    speakers:["Carlos Tabosa"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"junho", dia:30, semana:"Ter", inicio:"18:30", fim:"21:30",
    tipo:"Curso",
    titulo:"Curso: IA no Audiovisual",
    sub:"Do roteiro ao produto final com ferramentas de IA",
    speakers:["Bruno Bertogna"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },

  // ── JULHO 2026 ──────────────────────────────────────────────

  {
    mes:"julho", dia:4, semana:"Sáb", inicio:"09:00", fim:"13:00",
    tipo:"Palestra",
    titulo:"Palestras: Games e Criação",
    sub:"Game design, intercâmbio educacional e criação com Unreal Engine",
    speakers:["Tomoto","Danilo Fiocco","Dino Paiva"],
    local:"Auditório VTH", valor:"Gratuito", linkInscricao:""
  },
  {
    mes:"julho", dia:7, semana:"Ter", inicio:"18:30", fim:"21:30",
    tipo:"Curso",
    titulo:"Curso: IA no Direito",
    sub:"Aplicação prática de IA no exercício da advocacia",
    speakers:["Felipe Scalet"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:8, semana:"Qua", inicio:"18:30", fim:"21:30",
    tipo:"Palestra",
    titulo:"Drone Creator + Roteiro de Animação + Criatividade X IA",
    sub:"Captação aérea, animação e o debate humano vs. IA",
    speakers:["Ale Sirega","Motim Criativo","Achilles Milan Neto"],
    local:"Vila Tech Hub", valor:"Gratuito", linkInscricao:""
  },
  {
    mes:"julho", dia:10, semana:"Sex", inicio:"18:30", fim:"21:30",
    tipo:"Evento",
    titulo:"Vinho Tech — Clube dos CEOs",
    sub:"Degustação comentada, networking e troca entre fundadores",
    speakers:[], local:"Vila Tech Hub", valor:"Membros / A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:11, semana:"Sáb", inicio:"09:00", fim:"12:00",
    tipo:"Curso",
    titulo:"Curso: IA no Marketing",
    sub:"Automação de campanhas, análise de dados e crescimento com IA",
    speakers:["Carlos Tabosa","OPAH"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:16, semana:"Qui", inicio:"09:00", fim:"12:00",
    tipo:"Evento",
    titulo:"Negócios CIESP",
    sub:"Rodada de negócios com o Centro das Indústrias do Estado de São Paulo",
    speakers:[], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:18, semana:"Sáb", inicio:"09:00", fim:"12:00",
    tipo:"Curso",
    titulo:"Curso: Produção Criativa com Unreal Engine",
    sub:"Cenários, personagens e animações com Unreal Engine",
    speakers:["Dino Paiva"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:21, semana:"Ter", inicio:"18:30", fim:"21:30",
    tipo:"Curso",
    titulo:"Curso: Produção Audiovisual com IA",
    sub:"Da ideia ao vídeo: roteiro, edição inteligente e distribuição",
    speakers:["Bruno Bertogna"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:25, semana:"Sáb", inicio:"09:00", fim:"13:00",
    tipo:"Curso",
    titulo:"Curso: Roteiro de Animação",
    sub:"Universo narrativo, personagens e storyboard com Motim Criativo",
    speakers:["Motim Criativo"], local:"Vila Tech Hub", valor:"A confirmar", linkInscricao:""
  },
  {
    mes:"julho", dia:31, semana:"Sex", inicio:"18:30", fim:"21:30",
    tipo:"Evento",
    titulo:"HH do Cinema",
    sub:"Sessão, debate e networking para a comunidade criativa",
    speakers:[], local:"Vila Tech Hub", valor:"Gratuito / Membros", linkInscricao:""
  },

  // ── AGOSTO 2026 — adicionar eventos abaixo ──────────────────
  // {
  //   mes:"agosto", dia:X, semana:"Xxx", inicio:"HH:MM", fim:"HH:MM",
  //   tipo:"Palestra", // ou "Curso" ou "Evento"
  //   titulo:"Título do evento",
  //   sub:"Subtítulo resumido",
  //   speakers:["Nome"],
  //   local:"Vila Tech Hub", valor:"Gratuito", linkInscricao:""
  // },

];

// Ordem de exibição dos meses
const MESES_ORDEM = [
  "janeiro","fevereiro","março","abril","maio","junho",
  "julho","agosto","setembro","outubro","novembro","dezembro"
];

// Labels de exibição
const MESES_LABEL = {
  janeiro:"Janeiro", fevereiro:"Fevereiro", março:"Março", abril:"Abril",
  maio:"Maio", junho:"Junho", julho:"Julho", agosto:"Agosto",
  setembro:"Setembro", outubro:"Outubro", novembro:"Novembro", dezembro:"Dezembro"
};
