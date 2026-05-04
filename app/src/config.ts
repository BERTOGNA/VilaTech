// =============================================================================
// Vila Tech Hub - Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  logo: string;
  whatsappLink: string;
}

export const siteConfig: SiteConfig = {
  title: "Vila Tech Hub - Hub de Inovação em Itu, SP",
  description: "Vila Tech Hub é um ecossistema de inovação que conecta tecnologia, educação e criatividade através de três pilares: Educação, Coworking e Clube.",
  language: "pt-BR",
  logo: "/images/logo-vila-tech.svg",
  whatsappLink: "https://wa.link/2wbzbb",
};


// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId?: string;
  path?: string;
  icon: "disc" | "play" | "calendar" | "music" | "book" | "building" | "users" | "rocket" | "mail" | "globe" | "eye" | "target" | "shield";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string; // We'll keep it as string in the interface but will use it differently in the config or update the interface if needed. Wait, let's update the interface to string[] to be more explicit for the animation.
  subtitlePhrases: string[];
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  youtubeId: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/images/hero-bg.jpg",
  brandName: "Vila Tech Hub",
  decodeText: "COWORKING\nEDUCAÇÃO\nINOVAÇÃO",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*",
  subtitle: "Faça parte do ecossistema de inovação do Vila Tech Hub",
  subtitlePhrases: ["Faça parte do ecossistema de inovação do Vila Tech Hub"],
  ctaPrimary: "fale com o time",
  ctaPrimaryTarget: "contact",
  ctaSecondary: "Conheça nosso espaço",
  ctaSecondaryTarget: "parallax-gallery",
  cornerLabel: "Scroll",
  cornerDetail: "Down",
  youtubeId: "lGHrDIdafdI",
  navItems: [
    { label: "Coworking", sectionId: "coworking", icon: "building" },
    { label: "Educação", sectionId: "education", icon: "book" },
    { label: "Clube", sectionId: "club", icon: "users" },
    { label: "Instituto", path: "/instituto", icon: "globe" },
    { label: "Contato", sectionId: "contact", icon: "mail" },
  ],
};

// -- Album Cube Section (Three Pillars) ---------------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "EDUCAÇÃO",
      subtitle: "Novas metodologias,\nnovas habilidades, novos futuros",
      image: "/images/cube-education.jpg",
    },
    {
      id: 2,
      title: "COWORKING",
      subtitle: "Espaço que impulsiona startups\ncom colaboração e criatividade",
      image: "/images/cube-coworking.jpg",
    },
    {
      id: 3,
      title: "CLUBE",
      subtitle: "Comunidade da inovação,\nonde conhecimentos viram conexões",
      image: "/images/cube-club.jpg",
    },
  ],
  cubeTextures: [
    "/images/cube-education.jpg",
    "/images/cube-coworking.jpg",
    "/images/cube-innovation.jpg",
    "/images/cube-transform.jpg",
    "/images/cube-club.jpg",
    "/images/cube-network.jpg",
  ],
  scrollHint: "Role para explorar os pilares",
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "NOSSO ESPAÇO",
  sectionTitle: "Ambiente inspirador para criar e conectar",
  marqueeTexts: [
    "COWORKING",
    "EDUCAÇÃO",
    "INOVAÇÃO",
    "COMUNIDADE",
    "TECNOLOGIA",
    "NETWORKING",
    "STARTUPS",
    "TRANSFORMAÇÃO",
  ],
  endCtaText: "Agende uma visita",
  parallaxImagesTop: [
    { id: 1, src: "/images/imgs_coworking/Recepção Vila Tech Hub.png", alt: "Recepção Vila Tech Hub" },
    { id: 2, src: "/images/imgs_coworking/Copa e Café.png", alt: "Copa e Café" },
    { id: 3, src: "/images/imgs_coworking/Estações de trabalho.png", alt: "Estações de trabalho" },
    { id: 4, src: "/images/imgs_coworking/Estações de trabalho 1.png", alt: "Estações de trabalho 1" },
    { id: 5, src: "/images/imgs_coworking/Estações de trabalho 2.png", alt: "Estações de trabalho 2" },
    { id: 6, src: "/images/imgs_coworking/Auditório com cadeiras.png", alt: "Auditório com cadeiras" },
    { id: 7, src: "/images/imgs_coworking/Auditório com mesas.png", alt: "Auditório com mesas" },
    { id: 8, src: "/images/imgs_coworking/Auditório com telão.png", alt: "Auditório com telão" },
  ],
  parallaxImagesBottom: [],
};

// -- Tour Schedule (Agenda de Palestras) Section ------------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "AGENDA",
  sectionTitle: "Agenda de Palestras",
  vinylImage: "/images/evento-hub.jpg",
  buyButtonText: "Inscrição",
  detailsButtonText: "Detalhes",
  bottomNote: "Participe dos nossos encontros e eventos de inovação",
  bottomCtaText: "Ver agenda completa",
  statusLabels: {
    onSale: "Aberta",
    soldOut: "Esgotado",
    comingSoon: "Em Breve",
    default: "Evento",
  },
  tourDates: [
    {
      id: 1,
      date: "2026.04.15",
      time: "19:00",
      city: "Vila Tech Hub",
      venue: "Palestra: O Futuro da Inteligência Artificial",
      status: "on-sale",
      image: "/images/auditorio.jpg",
    },
    {
      id: 2,
      date: "2026.04.22",
      time: "18:30",
      city: "Vila Tech Hub",
      venue: "Workshop: Inovação Jurídica",
      status: "on-sale",
      image: "/images/sala-reuniao.jpg",
    },
    {
      id: 3,
      date: "2026.05.10",
      time: "14:00",
      city: "Vila Tech Hub",
      venue: "Hackathon FinTech",
      status: "coming-soon",
      image: "/images/coworking-space.jpg",
    },
    {
      id: 4,
      date: "2026.05.25",
      time: "20:00",
      city: "Vila Tech Hub",
      venue: "Painel: Investimentos em Startups",
      status: "on-sale",
      image: "/images/auditorio.jpg",
    },
    {
      id: 5,
      date: "2026.06.05",
      time: "19:00",
      city: "Vila Tech Hub",
      venue: "Meetup: Ecossistema de Itu",
      status: "sold-out",
      image: "/images/area-convivencia.jpg",
    },
    {
      id: 6,
      date: "2026.06.20",
      time: "18:00",
      city: "Vila Tech Hub",
      venue: "Apresentação de Startups (Pitch Day)",
      status: "coming-soon",
      image: "/images/evento-hub.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music" | "linkedin" | "facebook";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/images/archetype-einstein-2.png",
  portraitAlt: "Albert Einstein - Arquétipo do Clube Vila Tech Hub",
  heroTitle: "CRIAR • APRENDER • CONECTAR • TRANSFORMAR",
  heroSubtitle: "Junte-se à comunidade de inovadores",
  artistLabel: "Arquétipo",
  artistName: "Albert Einstein",
  artistSubtitle: "Clube Vila Tech Hub",
  brandName: "Vila Tech Hub",
  brandDescription: "Hub de inovação que conecta tecnologia, educação e criatividade em Itu, SP. Nosso ecossistema impulsiona projetos, alimenta mentes e cria conexões transformadoras.",
  quickLinksTitle: "Links Rápidos",
  quickLinks: ["Coworking", "Educação", "Clube", "Parceiros", "Localização", "Contato"],
  contactTitle: "Contato",
  emailLabel: "Email",
  email: "contato@vilatehhub.com.br",
  phoneLabel: "Telefone",
  phone: "+55 11 99266-6654",
  addressLabel: "Endereço",
  address: "Rua Francisco José Ferreira Sampaio, 90 - Itu Novo Centro",
  newsletterTitle: "Receba novidades",
  newsletterDescription: "Inscreva-se para receber atualizações sobre cursos, eventos e novidades do Vila Tech Hub.",
  newsletterButtonText: "Inscrever",
  subscribeAlertMessage: "Obrigado por se inscrever! Em breve você receberá nossas novidades.",
  copyrightText: "© 2025 Vila Tech Hub. Todos os direitos reservados.",
  bottomLinks: ["Termos de Uso", "Política de Privacidade"],
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/vilatechub/" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/vila-tech-hub/" },
    { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/@vilatechitu597" },
  ],
};

// -- Education Section Configuration ------------------------------------------
export interface EducationTrail {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface EducationConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  archetypeImage: string;
  archetypeName: string;
  ctaText: string;
  trails: EducationTrail[];
}

export const educationConfig: EducationConfig = {
  sectionLabel: "EDUCAÇÃO",
  sectionTitle: "Formação ágil\nem tecnologia,\nIA e inovação.",
  description: "Turmas abertas e In Company\nCursos e palestras com profissionais renomados\nformando os novos profissionais\nna era da IA.",
  archetypeImage: "/images/archetype-ada-2.png",
  archetypeName: "Ada Lovelace",
  ctaText: "Conheça os cursos e palestras",
  trails: [
    {
      id: 1,
      title: "CORPORATIVO",
      description: "Tecnologia e Inteligência Artificial aplicadas para crescimento, otimização de processos e escalabilidade empresarial.",
      icon: "building",
    },
    {
      id: 2,
      title: "INOVAÇÃO CRIATIVA",
      description: "Audiovisual, criatividade e produção artística potencializadas por novas tecnologias e ferramentas digitais.",
      icon: "lightbulb",
    },
    {
      id: 3,
      title: "GAME DEVELOPMENT",
      description: "Criação completa de jogos, desenvolvimento de universos virtuais e experiências digitais imersivas.",
      icon: "gamepad",
    },
  ],
};

// -- Coworking Section Configuration ------------------------------------------
export interface CoworkingFeature {
  id: number;
  title: string;
  icon: string;
  description?: string;
}

export interface CoworkingConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  archetypeImage: string;
  archetypeName: string;
  ctaText: string;
  features: CoworkingFeature[];
}

export const coworkingConfig: CoworkingConfig = {
  sectionLabel: "COWORKING",
  sectionTitle: "Onde as ideias trabalham, pessoas se conectam e negócios crescem",
  description: "Um Coworking planejado para quem quer trabalhar e crescer em um espaço inspirador, onde irá compartilhar idéias inovadoras e ver sua rede de conexões crescer naturalmente enquanto toma um café\n\nNo espaço do Vila Tech Hub você tem:\n\n• Estações de trabalho exclusivas\n• Espaços personalizáveis para empresas com equipes maiores\n• Salas de reunião\n• Auditório para eventos corporativos\n• Café & Copa\n• internet de alta velocidade\n• Estacionamento próprio\n• Localização privilegiada no Itu Novo Centro",
  archetypeImage: "/images/archetype-davinci-2.png",
  archetypeName: "Leonardo Da Vinci",
  ctaText: "Fale com a gente agora e reserve seu espaço",
  features: [
    { id: 1, title: "Endereço Fiscal e Comercial", icon: "map-pin" },
    { id: 2, title: "Estudio Podcast", icon: "mic" },
    { id: 3, title: "Área de descompressão", icon: "sofa" },
    { id: 4, title: "Honest market", icon: "shopping-cart" },
  ],
};

// -- Club Section Configuration -----------------------------------------------
export interface ClubBenefit {
  id: number;
  title: string;
  description: string;
}

export interface ClubConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  archetypeImage: string;
  archetypeName: string;
  keywords: string[];
  ctaText: string;
  benefits: ClubBenefit[];
}

export const clubConfig: ClubConfig = {
  sectionLabel: "CLUBE",
  sectionTitle: "Onde as mentes inquietas se encontram",
  description: "Muito networking em eventos com parceiros\ne expoentes do mundo da Tecnologia, Negócios e Criatividade.\nUm clube de experiências onde os sócios\ntêm acesso a programas e benefícios exclusivos.",
  archetypeImage: "/images/archetype-einstein-2.png",
  archetypeName: "Albert Einstein",
  keywords: ["Criar", "Aprender", "Conectar", "Transformar"],
  ctaText: "Quero fazer parte do Clube",
  benefits: [
    {
      id: 1,
      title: "Acesso Prioritário",
      description: "Acesso prioritário a eventos, cursos e palestras do hub",
    },
    {
      id: 2,
      title: "Combinações Especiais",
      description: "Combinações de uso de espaços + educação + networking",
    },
    {
      id: 3,
      title: "Rede de Descontos",
      description: "Descontos com parceiros locais: bares, restaurantes, academias",
    },
    {
      id: 4,
      title: "Comunidade Exclusiva",
      description: "Faça parte de uma comunidade de inovadores e empreendedores",
    },
  ],
};

// -- Partners Section Configuration -------------------------------------------
export interface PartnerCategory {
  id: number;
  name: string;
  partners: string[];
}

export interface PartnersConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  ctaText: string;
  institutionalLogos: { src: string; alt: string }[];
  categories: PartnerCategory[];
}

export const partnersConfig: PartnersConfig = {
  sectionLabel: "PARCEIROS",
  sectionTitle: "Investidores e parceiros que acreditam no Vila Tech Hub",
  description: "O hub conta com empresas de tecnologia, consultorias, audiovisual, design, suporte e instituições de ensino e desenvolvimento regional.",
  ctaText: "Quero ser parceiro do Vila Tech Hub",
  institutionalLogos: [
    { src: "/images/logos_institucionais/PARCEIROS/ASSO_COME_ITU.jpg", alt: "Associação Comercial Itu" },
    { src: "/images/logos_institucionais/PARCEIROS/BEE-DRONES.jpg", alt: "Bee Drones" },
    { src: "/images/logos_institucionais/PARCEIROS/JOY-INTERNET.jpg", alt: "Joy Internet" },
    { src: "/images/logos_institucionais/PARCEIROS/KASI.jpg", alt: "Kasi" },
    { src: "/images/logos_institucionais/PARCEIROS/LUCILLA.jpg", alt: "Lucilla Almeida" },
    { src: "/images/logos_institucionais/PARCEIROS/OPAHit.jpg", alt: "OPAH IT" },
    { src: "/images/logos_institucionais/PARCEIROS/SAVI.jpg", alt: "Savi" },
    { src: "/images/logos_institucionais/PARCEIROS/fatec.jpg", alt: "Fatec" },
    { src: "/images/logos_institucionais/PARCEIROS/lorenzon.jpg", alt: "Lorenzon" },
    { src: "/images/logos_institucionais/PARCEIROS/maranha.png", alt: "Maranha Filmes" },
    { src: "/images/logos_institucionais/PARCEIROS/motim.jpg", alt: "Motim Criativo" },
    { src: "/images/logos_institucionais/PARCEIROS/seven7.jpg", alt: "Seven Sete" },
    { src: "/images/logos_institucionais/PARCEIROS/torricelli.jpg", alt: "Torricelli" },
  ],
  categories: [],
};

// -- Startups Section Configuration -------------------------------------------
export interface StartupsConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  ctaText: string;
  institutionalLogos: { src: string; alt: string }[];
  categories: PartnerCategory[];
}

export const startupsConfig: StartupsConfig = {
  sectionLabel: "STARTUPS",
  sectionTitle: "Inovação no Ecossistema Vila Tech Hub",
  description: "Conheça as startups aceleradas e integradas ao nosso ecossistema.",
  ctaText: "Acelere sua startup aqui",
  institutionalLogos: [
    { src: "/images/logos_institucionais/STARTUPS/EASYJUR.jpg", alt: "Easyjur" },
    { src: "/images/logos_institucionais/STARTUPS/EATS FOR YOU.jpg", alt: "Eats For You" },
    { src: "/images/logos_institucionais/STARTUPS/EDUCA BRASIL.jpg", alt: "Educa Brasil" },
    { src: "/images/logos_institucionais/STARTUPS/GREEN_CABE.jpg", alt: "Green Cave" },
    { src: "/images/logos_institucionais/STARTUPS/PLANO.jpg", alt: "Plano" },
    { src: "/images/logos_institucionais/STARTUPS/RESTIN.jpg", alt: "Restin" },
    { src: "/images/logos_institucionais/STARTUPS/SETFIN.jpg", alt: "Setfin" },
    { src: "/images/logos_institucionais/STARTUPS/TAXWAY.jpg", alt: "Taxway" },
    { src: "/images/logos_institucionais/STARTUPS/madcc.jpg", alt: "MADCC" },
  ],
  categories: [],
};

// -- Location Section Configuration -------------------------------------------
export interface LocationConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  mapUrl: string;
  ctaText: string;
}

export const locationConfig: LocationConfig = {
  sectionLabel: "LOCALIZAÇÃO",
  sectionTitle: "No coração do novo centro de Itu",
  description: "O hub está em um dos bairros mais valorizados e promissores de Itu, próximo a restaurantes, serviços e com fácil acesso.",
  address: "Rua Francisco José Ferreira Sampaio, 90",
  city: "Itu Novo Centro",
  state: "SP",
  zipCode: "13303-536",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.208453472065!2d-47.28898132464731!3d-23.27533747907577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf51543715c613%3A0x6b80369864295a70!2sRua%20Francisco%20Jos%C3%A9%20Ferreira%20Sampaio%2C%2090%20-%20Itu%20Novo%20Centro%2C%20Itu%20-%20SP%2C%2013303-536%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1712770000000!5m2!1spt-BR!2sbr",
  ctaText: "Ver rota no mapa",
};

// -- Contact Form Configuration -----------------------------------------------
export interface ContactFormConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  interestLabel: string;
  messageLabel: string;
  submitText: string;
  successMessage: string;
  interests: string[];
}

export const contactFormConfig: ContactFormConfig = {
  sectionLabel: "CONTATO",
  sectionTitle: "Venha para o Vila Tech Hub",
  description: "Entre em contato com o nosso time para encontrar seu melhor espaço de trabalho ou aquele curso que vai alavancar sua carreira ou sua empresa",
  nameLabel: "Nome",
  emailLabel: "E-mail",
  phoneLabel: "Telefone/WhatsApp",
  interestLabel: "Tenho interesse em",
  messageLabel: "Mensagem",
  submitText: "Enviar mensagem",
  successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
  interests: ["Educação", "Coworking", "Clube", "Investidor/Parceiro"],
};

// -- Institute Section Configuration -----------------------------------------
export interface InstitutePillar {
  id: number;
  title: string;
  description: string;
  icon: "book" | "rocket" | "users" | "brain" | "heart" | "globe";
}

export interface InstituteConfig {
  hero: {
    title: string;
    decodeText: string;
    subtitle: string;
    backgroundImage: string;
  };
  mission: {
    title: string;
    text: string;
  };
  vision: {
    title: string;
    text: string;
  };
  values: {
    title: string;
    description: string;
  }[];
  pillars: InstitutePillar[];
  cta: {
    title: string;
    text: string;
    buttonText: string;
  };
}

export const instituteNavItems: HeroNavItem[] = [
  { label: "Visão", sectionId: "visao", icon: "eye" },
  { label: "Missão", sectionId: "missao", icon: "target" },
  { label: "Valores", sectionId: "valores", icon: "shield" },
  { label: "Conselho", sectionId: "conselho", icon: "users" },
  { label: "Doar", sectionId: "contato", icon: "mail" },
];

export const instituteConfig: InstituteConfig = {
  hero: {
    title: "Instituto Vila Tech",
    decodeText: "CULTURA + EDUCAÇÃO + INOVAÇÃO",
    subtitle: "Transformação social e profissional por meio da tecnologia e do desenvolvimento humano",
    backgroundImage: "/images/hero-bg.jpg", // Using same high-quality background
  },
  mission: {
    title: "Missão",
    text: "O Instituto Cultural e Educacional Vila Tech tem como objetivo promover a transformação social e profissional por meio da educação, tecnologia, arte e cultura, criando pontes entre o conhecimento técnico, a inovação criativa e o desenvolvimento humano e a democratização do acesso às novas tecnologias através de metodologias de aprendizado inovadoras, estimulando o protagonismo e a inclusão digital de jovens e comunidades.",
  },
  vision: {
    title: "Visão",
    text: "Ser referência nacional em educação tecnológica e criativa, reconhecida por formar profissionais preparados para os desafios do futuro e por inspirar um ecossistema sustentável de inovação, empreendedorismo e impacto social. Tornar-se um dos principais polos de cultura, educação e tecnologia do interior paulista, através do Projeto Vila Tech Hub como plataforma de aprendizado contínuo e colaboração entre pessoas, empresas e instituições.",
  },
  values: [
    {
      title: "Inovação com propósito",
      description: "aplicar a tecnologia para melhorar vidas e promover impacto positivo.",
    },
    {
      title: "Educação que transforma",
      description: "estimular o pensamento crítico, a criatividade e o aprendizado colaborativo.",
    },
    {
      title: "Inclusão e sustentabilidade",
      description: "garantir acesso igualitário às oportunidades de formação e desenvolvimento.",
    },
    {
      title: "Cultura e diversidade",
      description: "valorizar as expressões artísticas e as múltiplas identidades como motor de evolução.",
    },
    {
      title: "Ética e transparência",
      description: "agir com responsabilidade social, integridade e respeito nas relações institucionais.",
    },
    {
      title: "Colaboração",
      description: "fomentar redes de conhecimento e empreendedorismo entre empresas, startups e indivíduos.",
    },
    {
      title: "Excelência e protagonismo",
      description: "formar agentes de mudança preparados para liderar a inovação no país.",
    },
  ],
  pillars: [
    {
      id: 1,
      title: "Educação & Tecnologia",
      description: "Democratização do acesso com metodologias inovadoras.",
      icon: "book",
    },
    {
      id: 2,
      title: "Empreendedorismo",
      description: "Preparação para criar oportunidades e acessar o mercado com confiança.",
      icon: "rocket",
    },
    {
      id: 3,
      title: "Inclusão Digital",
      description: "Fortalecendo negócios e estimulando o protagonismo juvenil.",
      icon: "users",
    },
  ],
  cta: {
    title: "Impulsione o Futuro",
    text: "Também impulsionamos o empreendedorismo e a empregabilidade, preparando pessoas para criar oportunidades, fortalecer seus negócios e acessar o mercado de trabalho com mais confiança e qualificação.",
    buttonText: "Seja um parceiro do Instituto",
  },
};

// -- Institute Teaser Configuration (Home Page) ------------------------------
export interface InstituteTeaserConfig {
  sectionLabel: string;
  sectionTitle: string;
  description: string;
  ctaText: string;
  ctaPath: string;
  backgroundImage: string;
  backgroundVideo?: string;
}

export const instituteTeaserConfig: InstituteTeaserConfig = {
  sectionLabel: "INSTITUTO",
  sectionTitle: "Inovação com Propósito",
  description: "Promovemos a transformação por meio da educação, tecnologia e cultura, democratizando o acesso e impulsionando o protagonismo de jovens e comunidades.",
  ctaText: "Conheça o Instituto",
  ctaPath: "/instituto",
  backgroundImage: "/images/hero-bg.jpg",
  backgroundVideo: "/images/institute-bg.mp4", // Coloque seu vídeo MP4 escuro nesta pasta
};
