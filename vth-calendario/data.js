/* ============================================================
   VILA TECH HUB — data.js
   Fonte de dados dos eventos.
   
   COMO ATUALIZAR:
   Adicione, edite ou remova objetos do array EVENTOS abaixo.
   
   Campos obrigatórios: mes, dia, semana, inicio, fim, tipo, titulo
   Campos opcionais:    sub, speakers, local, valor, linkInscricao, descritivo
   
   tipo: "Palestra" | "Curso" | "Evento"
   mes:  "junho" | "julho" | "agosto" | (qualquer mês em minúsculas)
   ============================================================ */

const EVENTOS = [

  // ── JUNHO 2026 ────────────────────────────────────────────

  {
    mes: "junho", dia: 11, semana: "Qui",
    inicio: "18:30", fim: "21:30",
    tipo: "Palestra",
    titulo: "A Inovação da IA nos Negócios",
    sub: "Bloco com 4 perspectivas: Direito, Tributário, Estratégia e Negócios",
    descritivo: "Sessão multi-palestrante reunindo perspectivas de IA aplicada ao Direito, à Tributação, ao Planejamento Estratégico e às soluções práticas para empresas.",
    speakers: ["Felipe Scalet", "Carla Bertoncelo", "Gilberto Moura", "Carlos Tabosa"],
    local: "Auditório VTH",
    valor: "Gratuito",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 13, semana: "Sáb",
    inicio: "19:00", fim: "22:00",
    tipo: "Evento",
    titulo: "HH da Copa",
    sub: "Happy Hour temático da Copa do Mundo",
    descritivo: "Evento de networking e confraternização com transmissão dos jogos da Copa. Drinks, petiscos e muita animação.",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "Gratuito / Membros",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 23, semana: "Ter",
    inicio: "18:30", fim: "21:30",
    tipo: "Curso",
    titulo: "IA no Direito",
    sub: "Aplicação prática de IA no exercício da advocacia",
    descritivo: "Curso completo sobre como a IA está transformando a prática jurídica: triagem de processos, análise de contratos, pesquisa de jurisprudência e automação de peças.",
    speakers: ["Felipe Scalet"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 25, semana: "Qui",
    inicio: "18:00", fim: "21:00",
    tipo: "Palestra",
    titulo: "IA para Criatividade",
    sub: "Processos criativos, audiovisual, games e universos narrativos com IA",
    descritivo: "Sessão multi-palestrante explorando a interseção entre IA e criatividade: processos criativos assistidos por IA, produção audiovisual, desenvolvimento de games.",
    speakers: ["Achilles Milan Neto", "Bruno Bertogna", "Dino Paiva", "Danilo Fiocco"],
    local: "Auditório VTH",
    valor: "Gratuito",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 25, semana: "Qui",
    inicio: "18:30", fim: "21:30",
    tipo: "Curso",
    titulo: "A Nova Legislação Tributária",
    sub: "Impactos da Reforma Tributária para empresas e profissionais",
    descritivo: "Curso prático sobre a Reforma Tributária: o que mudou, impactos para empresas e profissionais, cronograma de implantação e estratégias de adaptação.",
    speakers: ["Carla Bertoncelo"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 26, semana: "Sex",
    inicio: "18:30", fim: "21:30",
    tipo: "Curso",
    titulo: "Planejamento Estratégico",
    sub: "Ferramentas e metodologias para crescimento sustentável",
    descritivo: "Curso focado em ferramentas e metodologias de planejamento estratégico para pequenas e médias empresas: análise de cenários, OKRs, gestão por processos.",
    speakers: ["Gilberto Moura"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 27, semana: "Sáb",
    inicio: "09:00", fim: "16:00",
    tipo: "Curso",
    titulo: "IA para Negócios — Contabilidade e Finanças",
    sub: "Imersão de 7h: automação, análise preditiva e IA financeira",
    descritivo: "Imersão prática de 7 horas sobre como usar IA na rotina contábil e financeira: automação de lançamentos, análise preditiva e ferramentas disponíveis no mercado.",
    speakers: ["Carlos Tabosa"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "junho", dia: 30, semana: "Ter",
    inicio: "18:30", fim: "21:30",
    tipo: "Curso",
    titulo: "IA no Audiovisual",
    sub: "Do roteiro ao produto final com ferramentas de IA",
    descritivo: "Curso prático sobre ferramentas de IA para criação e edição de vídeos: da concepção ao produto final. Roteiro com IA, edição automatizada e distribuição de conteúdo.",
    speakers: ["Bruno Bertogna"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },

  // ── JULHO 2026 ─────────────────────────────────────────────

  {
    mes: "julho", dia: 4, semana: "Sáb",
    inicio: "09:00", fim: "13:00",
    tipo: "Palestra",
    titulo: "Games e Criação",
    sub: "Game design, intercâmbio educacional e criação com Unreal Engine",
    descritivo: "Manhã de palestras reunindo especialistas em game design, intercâmbio educacional e criação com Unreal Engine.",
    speakers: ["Tomoto", "Danilo Fiocco", "Dino Paiva"],
    local: "Auditório VTH",
    valor: "Gratuito",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 8, semana: "Qua",
    inicio: "18:30", fim: "21:30",
    tipo: "Palestra",
    titulo: "Drone Creator + Roteiro de Animação + Criatividade X IA",
    sub: "Captação aérea, animação e o debate humano vs. IA",
    descritivo: "Noite de palestras sobre captação aérea com drones, técnicas de roteiro para animação e o debate sobre criatividade humana versus IA.",
    speakers: ["Ale Sirega", "Motim Criativo", "Achilles Milan Neto"],
    local: "Vila Tech Hub",
    valor: "Gratuito",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 10, semana: "Sex",
    inicio: "18:30", fim: "21:30",
    tipo: "Evento",
    titulo: "Vinho Tech — Clube dos CEOs",
    sub: "Degustação comentada, networking e troca entre fundadores",
    descritivo: "Encontro exclusivo do Clube dos CEOs com degustação comentada de vinhos, networking de alto nível e troca de experiências entre fundadores e executivos.",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "Membros / A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 11, semana: "Sáb",
    inicio: "09:00", fim: "12:00",
    tipo: "Curso",
    titulo: "IA no Marketing",
    sub: "Automação de campanhas, análise de dados e crescimento com IA",
    descritivo: "Curso prático sobre aplicação de IA em estratégias de marketing: análise de dados, automação de campanhas, personalização de conteúdo. Co-realizado com OPAH.",
    speakers: ["Carlos Tabosa", "OPAH"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 16, semana: "Qui",
    inicio: "09:00", fim: "12:00",
    tipo: "Evento",
    titulo: "Negócios CIESP",
    sub: "Rodada de negócios com o Centro das Indústrias do Estado de São Paulo",
    descritivo: "Evento de networking e rodada de negócios em parceria com o CIESP. Apresentações de startups, conexão com investidores e empresas do ecossistema.",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 18, semana: "Sáb",
    inicio: "09:00", fim: "12:00",
    tipo: "Curso",
    titulo: "Produção Criativa com Unreal Engine",
    sub: "Cenários, personagens e animações com Unreal Engine",
    descritivo: "Curso prático de criação de cenários, personagens e animações com Unreal Engine. Do básico ao intermediário, com foco em pipelines criativos.",
    speakers: ["Dino Paiva"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 21, semana: "Ter",
    inicio: "18:30", fim: "21:30",
    tipo: "Curso",
    titulo: "Produção Audiovisual com IA",
    sub: "Da ideia ao vídeo: roteiro, edição inteligente e distribuição",
    descritivo: "Curso avançado de produção de vídeos usando ferramentas de IA: roteirização automatizada, edição inteligente, geração de imagens e distribuição multiplataforma.",
    speakers: ["Bruno Bertogna"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 25, semana: "Sáb",
    inicio: "09:00", fim: "13:00",
    tipo: "Curso",
    titulo: "Roteiro de Animação",
    sub: "Universo narrativo, personagens e storyboard com Motim Criativo",
    descritivo: "Oficina de criação e desenvolvimento de projetos de animação: universo narrativo, personagens, técnicas de roteiro e storyboard.",
    speakers: ["Motim Criativo"],
    local: "Vila Tech Hub",
    valor: "A confirmar",
    linkInscricao: ""
  },
  {
    mes: "julho", dia: 31, semana: "Sex",
    inicio: "18:30", fim: "21:30",
    tipo: "Evento",
    titulo: "HH do Cinema",
    sub: "Sessão, debate e networking para a comunidade criativa",
    descritivo: "Sessão de cinema seguida de debate e networking. Exibição de curta ou longa-metragem com discussão temática, drinks e petiscos.",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "Gratuito / Membros",
    linkInscricao: ""
  }

  // ── AGOSTO 2026 — adicionar aqui ──────────────────────────
  // {
  //   mes: "agosto", dia: X, semana: "Xxx",
  //   inicio: "HH:MM", fim: "HH:MM",
  //   tipo: "Palestra", // ou "Curso" ou "Evento"
  //   titulo: "Título do evento",
  //   sub: "Subtítulo resumido",
  //   descritivo: "Texto completo de divulgação.",
  //   speakers: ["Nome do Palestrante"],
  //   local: "Vila Tech Hub",
  //   valor: "Gratuito",
  //   linkInscricao: "https://..."
  // },

];

// Ordem dos meses para exibição
const MESES_ORDEM = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

// Nomes de exibição dos meses
const MESES_LABEL = {
  janeiro:"Janeiro", fevereiro:"Fevereiro", março:"Março", abril:"Abril",
  maio:"Maio", junho:"Junho", julho:"Julho", agosto:"Agosto",
  setembro:"Setembro", outubro:"Outubro", novembro:"Novembro", dezembro:"Dezembro"
};
