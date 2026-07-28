export interface CourseModule {
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  trail: 'negocios' | 'criativo' | 'games';
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  coupon: string;
  discount: string;
  symplaLink: string;
  learnTopics: string[];
  modules?: CourseModule[];
  quote: string;
  teacher: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
}

export const coursesData: Course[] = [
  {
    id: "inteligencia-tributaria",
    title: "A Nova Legislação Tributária",
    subtitle: "Dominando e aplicando o novo regime tributário brasileiro",
    trail: "negocios",
    categoryLabel: "CURSO • LEGISLAÇÃO TRIBUTÁRIA",
    date: "16/07",
    time: "18:30 às 21:30h",
    location: "Vila Tech Hub (Itu, SP)",
    coupon: "VilaTech_ACI",
    discount: "50%",
    symplaLink: "https://www.sympla.com.br/evento/inteligencia-tributaria/3461950?qrcode=true",
    quote: "A pergunta não é se sua empresa vai precisar se adaptar. É se vai fazer isso no tempo certo ou correndo atrás do prejuízo.",
    learnTopics: [
      "O que é Inteligência Tributária — e por que vai muito além da contabilidade convencional",
      "A Reforma Tributária (EC 132/2023): o que muda, o que está em vigor e o que está por vir",
      "Prazo crítico SET/2026: Simples Nacional e a opção pelo Regime Híbrido",
      "Recuperação de Créditos de PIS/COFINS: prazos legais e como identificar valores a recuperar",
      "Novos campos nas notas fiscais: adequação imediata para evitar rejeições e autuações",
      "As 7 frentes da Inteligência Tributária Integrada: revisão fiscal, planejamento, contencioso",
      "Como transformar a gestão fiscal em alavanca estratégica de crescimento e competitividade"
    ],
    teacher: {
      name: "Carla Bertoncello",
      role: "Diretora Executiva — Tax Way Consultoria",
      image: "/images/professores/carla.jpeg",
      bio: "Especialista em inteligência tributária, compliance e governança fiscal e contábil. Com formação em Direito e base técnica em Contabilidade, atua na interpretação prática da legislação e na estruturação de soluções que ajudam empresas a reduzir riscos, recuperar créditos, organizar processos e tomar decisões com mais segurança."
    }
  },
  {
    id: "ia-advocacia",
    title: "IA na Advocacia",
    subtitle: "Aplicação prática de IA no exercício da advocacia",
    trail: "negocios",
    categoryLabel: "CURSO • IA & DIREITO",
    date: "30/07",
    time: "18:30 às 21:30h",
    location: "Vila Tech Hub (Itu, SP)",
    coupon: "VilaTech_OAB",
    discount: "50%",
    symplaLink: "https://www.sympla.com.br/evento/ia-aplicada-a-advocacia/3462030?qrcode=true",
    quote: "A IA não elimina o advogado — mas o advogado que não dominar essa tecnologia vai ficar para trás.",
    learnTopics: [
      "Como a IA funciona de fato: LLMs, tokens e janela de contexto — o que todo advogado precisa saber",
      "O risco das alucinações: por que a IA inventa jurisprudência e como evitar armadilhas",
      "Engenharia de Prompt para o Direito: o método de 6 etapas para extrair o máximo com segurança",
      "Ecossistema de ferramentas: ChatGPT, Gemini e NotebookLM — quando e como usar cada um",
      "Aplicações práticas: produtividade, qualidade estrutural, gestão de informação e estratégia",
      "Como transformar o uso improvisado da IA em um processo jurídico seguro e repetível"
    ],
    teacher: {
      name: "Felipe Scalet",
      role: "Advogado — Direito Bancário, IA, Compliance e LGPD",
      image: "/images/professores/felipe.png",
      bio: "Advogado com atuação em Direito Bancário, compliance, Inteligência Artificial, privacidade e proteção de dados. Conecta prática jurídica, estratégia e tecnologia para tornar a advocacia mais eficiente, segura e preparada para os novos desafios do mercado."
    }
  },
  {
    id: "planejamento-estrategico",
    title: "Planejamento Estratégico na Prática",
    subtitle: "Do Caos ao Plano de Ação — Metodologias ágeis para resultados concretos",
    trail: "negocios",
    categoryLabel: "CURSO • ESTRATÉGIA",
    date: "25/06 e 02/07",
    time: "18:30 às 21:30h (25/06) & 18:30 às 22h (02/07)",
    location: "Vila Tech Hub (Itu, SP)",
    coupon: "VilaTech_ACI",
    discount: "50%",
    symplaLink: "https://www.sympla.com.br/evento/planejamento-estrategico/3462087?qrcode=true",
    quote: "Sem método, a empresa apenas reage. Com planejamento, ela assume o controle e decide seu futuro.",
    learnTopics: [
      "Identidade Organizacional: Missão, Visão, Propósito — a bússola que orienta todas as decisões",
      "Análise PESTEL: como olhar para fora antes que o mercado surpreenda o seu negócio",
      "Business Model Canvas: conectando proposta de valor, clientes e modelo de receita em um quadro",
      "Balanced Scorecard: as 4 perspectivas que transformam estratégia em indicadores e gestão",
      "Matriz GUT + Metas SMART: priorizando ações com critério e definindo metas que geram resultado",
      "SWOT Cruzada e Análise de Mercado: convertendo diagnóstico em execução prática e sustentável",
      "Matriz BCG, 5W2H e Rituais de Gestão: do caos ao cronograma de prioridades reais"
    ],
    teacher: {
      name: "Gilberto de Moura",
      role: "Sócio e Diretor de Planejamento — GMG Consultoria Empresarial",
      image: "/images/professores/gilberto.png",
      bio: "Administrador pela PUC, pós-graduado em Marketing pela FGV e ex-aluno do MBA da USP. Com mais de 30 anos no mercado B2B (Coca-Cola, KaVo, Danaher, Karsten, Schincariol), ajuda empresários e diretores a transformar planos em decisões, processos e rotinas de gestão com clareza, método, previsibilidade e consistência."
    }
  },
  {
    id: "ia-negocios",
    title: "IA para Negócios",
    subtitle: "Curso 1: Contabilidade e Finanças | Curso 2: Marketing e Vendas",
    trail: "negocios",
    categoryLabel: "CURSO • IA NOS NEGÓCIOS",
    date: "27/06 e 18/07",
    time: "09:00 às 13:00h",
    location: "Vila Tech Hub (Itu, SP)",
    coupon: "VilaTech_ACI",
    discount: "50%",
    symplaLink: "https://www.sympla.com.br/evento/inteligencia-artificial-aplicada-aos-negocios-modulo-1---contabilidade-e-financeiro/3462190?qrcode=true",
    quote: "A IA não veio para substituir o humano — e sim potencializá-lo.",
    learnTopics: [
      "Da teoria à prática: casos reais de uso de IA nas áreas contábil, financeira, marketing e vendas.",
      "Alfabetização em IA: por que dominar essa tecnologia é tão essencial quanto aprender um novo idioma",
      "IA, Machine Learning, Deep Learning e IA Generativa: entendendo o ecossistema de uma vez por todas"
    ],
    modules: [
      {
        title: "Módulo 1 — Contabilidade e Finanças (27/06)",
        description: "Automação, redução de erros e geração de insights em processos fiscais e financeiros."
      },
      {
        title: "Módulo 2 — Marketing e Vendas (18/07)",
        description: "Geração de conteúdo, segmentação inteligente e aceleração comercial utilizando inteligência artificial."
      }
    ],
    teacher: {
      name: "Carlos Tabosa",
      role: "VP de Tecnologia — OPAH IT Digital | Top Voice in IA",
      image: "/images/professores/carlos.jpg",
      bio: "Executivo de tecnologia com mais de 20 anos de experiência. MBA FGV, especialização em Blockchain (MIT), certificação em IA (IBM). Professor convidado da USP e StartSe, Consultor da ONU e Manus Fellow — parceiro oficial da Manus no Brasil. Com atuação em tecnologia, transformação digital, inovação e IA, conecta o conhecimento técnico à realidade prática das empresas."
    }
  }
];
