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
}

export const siteConfig: SiteConfig = {
  title: "Vila Tech Hub - Hub de Inovação em Itu, SP",
  description: "Vila Tech Hub é um ecossistema de inovação que conecta tecnologia, educação e criatividade através de três pilares: Educação, Coworking e Clube.",
  language: "pt-BR",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music" | "book" | "building" | "users" | "rocket" | "mail";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/images/hero-bg.jpg",
  brandName: "Vila Tech Hub",
  decodeText: "TECNOLOGIA + INOVAÇÃO + EDUCAÇÃO",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*",
  subtitle: "Ecossistema onde desenvolvimento, conhecimento e conexões significativas entre mentes inovadoras acontecem",
  ctaPrimary: "Fale com a equipe",
  ctaPrimaryTarget: "contact",
  ctaSecondary: "Conheça nosso espaço",
  ctaSecondaryTarget: "coworking",
  cornerLabel: "Itu, SP",
  cornerDetail: "Novo Centro",
  navItems: [
    { label: "Educação", sectionId: "education", icon: "book" },
    { label: "Coworking", sectionId: "coworking", icon: "building" },
    { label: "Clube", sectionId: "club", icon: "users" },
    { label: "Startups", sectionId: "startups", icon: "rocket" },
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
      subtitle: "Novas metodologias, novas habilidades, novos futuros",
      image: "/images/cube-education.jpg",
    },
    {
      id: 2,
      title: "COWORKING",
      subtitle: "Espaço que impulsiona startups com colaboração e criatividade",
      image: "/images/cube-coworking.jpg",
    },
    {
      id: 3,
      title: "CLUBE",
      subtitle: "Comunidade da inovação, onde conhecimentos viram conexões",
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
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "NOSSO ESPAÇO",
  sectionTitle: "Ambiente inspirador para criar e conectar",
  galleryLabel: "GALERIA",
  galleryTitle: "Conheça o Vila Tech Hub",
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
    { id: 1, src: "/images/coworking-space.jpg", alt: "Espaço de Coworking" },
    { id: 2, src: "/images/sala-reuniao.jpg", alt: "Sala de Reunião" },
    { id: 3, src: "/images/area-convivencia.jpg", alt: "Área de Convivência" },
    { id: 4, src: "/images/auditorio.jpg", alt: "Auditório" },
    { id: 5, src: "/images/estudio-podcast.jpg", alt: "Estúdio de Podcast" },
    { id: 6, src: "/images/evento-hub.jpg", alt: "Evento no Hub" },
  ],
  parallaxImagesBottom: [
    { id: 1, src: "/images/auditorio.jpg", alt: "Auditório" },
    { id: 2, src: "/images/estudio-podcast.jpg", alt: "Estúdio de Podcast" },
    { id: 3, src: "/images/evento-hub.jpg", alt: "Evento no Hub" },
    { id: 4, src: "/images/coworking-space.jpg", alt: "Espaço de Coworking" },
    { id: 5, src: "/images/area-convivencia.jpg", alt: "Área de Convivência" },
    { id: 6, src: "/images/sala-reuniao.jpg", alt: "Sala de Reunião" },
  ],
  galleryImages: [
    { id: 1, src: "/images/coworking-space.jpg", title: "Espaço de Coworking", date: "40 postos de trabalho" },
    { id: 2, src: "/images/sala-reuniao.jpg", title: "Salas de Reunião", date: "4 salas equipadas" },
    { id: 3, src: "/images/auditorio.jpg", title: "Auditório", date: "Até 70 pessoas" },
    { id: 4, src: "/images/estudio-podcast.jpg", title: "Estúdio de Podcast", date: "Gravação profissional" },
    { id: 5, src: "/images/area-convivencia.jpg", title: "Área de Convivência", date: "Café e networking" },
    { id: 6, src: "/images/evento-hub.jpg", title: "Eventos", date: "Palestras e workshops" },
  ],
};

// -- Tour Schedule Section (Startups & Partners) ------------------------------
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
  sectionLabel: "ECOSSISTEMA",
  sectionTitle: "Startups do Vila Tech Hub",
  vinylImage: "/images/cube-innovation.jpg",
  buyButtonText: "Conhecer",
  detailsButtonText: "Detalhes",
  bottomNote: "Junte-se ao ecossistema de inovação",
  bottomCtaText: "Quero ser parceiro",
  statusLabels: {
    onSale: "Ativa",
    soldOut: "Scale-up",
    comingSoon: "Nova",
    default: "Conectar",
  },
  tourDates: [
    {
      id: 1,
      date: "2025.01.15",
      time: "EduTech",
      city: "Educa Brasil",
      venue: "Plataforma de educação digital",
      status: "on-sale",
      image: "/images/cube-education.jpg",
    },
    {
      id: 2,
      date: "2025.02.20",
      time: "FinTech",
      city: "SETFIN",
      venue: "Soluções financeiras",
      status: "on-sale",
      image: "/images/cube-coworking.jpg",
    },
    {
      id: 3,
      date: "2025.03.10",
      time: "FinTech",
      city: "plano.",
      venue: "Planejamento financeiro",
      status: "coming-soon",
      image: "/images/cube-club.jpg",
    },
    {
      id: 4,
      date: "2025.04.05",
      time: "LegalTech",
      city: "EASYJUR",
      venue: "Automação jurídica",
      status: "on-sale",
      image: "/images/cube-innovation.jpg",
    },
    {
      id: 5,
      date: "2025.05.12",
      time: "AdTech",
      city: "green cave",
      venue: "Marketing digital",
      status: "coming-soon",
      image: "/images/cube-transform.jpg",
    },
    {
      id: 6,
      date: "2025.06.18",
      time: "TaxTech",
      city: "TaxWay",
      venue: "Soluções tributárias",
      status: "on-sale",
      image: "/images/cube-network.jpg",
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
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/images/archetype-einstein.jpg",
  portraitAlt: "Albert Einstein - Arquétipo do Clube Vila Tech Hub",
  heroTitle: "CRIAR • APRENDER • CONECTAR • TRANSFORMAR",
  heroSubtitle: "Junte-se à comunidade de inovadores",
  artistLabel: "HUB DE INOVAÇÃO",
  artistName: "Vila Tech Hub",
  artistSubtitle: "Itu, São Paulo",
  brandName: "Vila Tech Hub",
  brandDescription: "Hub de inovação que conecta tecnologia, educação e criatividade em Itu, SP. Nosso ecossistema impulsiona projetos, alimenta mentes e cria conexões transformadoras.",
  quickLinksTitle: "Links Rápidos",
  quickLinks: ["Educação", "Coworking", "Clube", "Startups", "Investidores", "Localização", "Contato"],
  contactTitle: "Contato",
  emailLabel: "Email",
  email: "contato@vilatehhub.com.br",
  phoneLabel: "Telefone",
  phone: "(11) 0000-0000",
  addressLabel: "Endereço",
  address: "Rua Francisco José Ferreira Sampaio, 90 - Itu Novo Centro",
  newsletterTitle: "Receba novidades",
  newsletterDescription: "Inscreva-se para receber atualizações sobre cursos, eventos e novidades do Vila Tech Hub.",
  newsletterButtonText: "Inscrever",
  subscribeAlertMessage: "Obrigado por se inscrever! Em breve você receberá nossas novidades.",
  copyrightText: "© 2025 Vila Tech Hub. Todos os direitos reservados.",
  bottomLinks: ["Termos de Uso", "Política de Privacidade"],
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "https://instagram.com/vilatehhub" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/vilatehhub" },
    { icon: "facebook", label: "Facebook", href: "https://facebook.com/vilatehhub" },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com/vilatehhub" },
  ],
  galleryImages: [
    { id: 1, src: "/images/coworking-space.jpg" },
    { id: 2, src: "/images/sala-reuniao.jpg" },
    { id: 3, src: "/images/auditorio.jpg" },
    { id: 4, src: "/images/estudio-podcast.jpg" },
    { id: 5, src: "/images/area-convivencia.jpg" },
    { id: 6, src: "/images/evento-hub.jpg" },
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
  sectionTitle: "Transformando conhecimento tecnológico em potência humana",
  description: "Programas on e offline, formando profissionais na era da IA e empresas mais preparadas. Interseção entre IA, negócios, programação, audiovisual e games.",
  archetypeImage: "/images/archetype-ada.jpg",
  archetypeName: "Ada Lovelace",
  ctaText: "Quero saber mais sobre Educação",
  trails: [
    {
      id: 1,
      title: "IA para Negócios",
      description: "Contabilidade, finanças, marketing, vendas, direito, indústria",
      icon: "brain",
    },
    {
      id: 2,
      title: "Programação e Dados",
      description: "Python, SQL, .NET, JavaScript, desenvolvimento web, automação",
      icon: "code",
    },
    {
      id: 3,
      title: "Empreendedorismo",
      description: "Planejamento estratégico, processos, gestão comercial",
      icon: "rocket",
    },
    {
      id: 4,
      title: "Audiovisual",
      description: "Drone, edição com IA, animação, prototipagem",
      icon: "video",
    },
    {
      id: 5,
      title: "Games",
      description: "Game design, roteirização, UX/UI, Unreal Engine, Unity",
      icon: "gamepad",
    },
  ],
};

// -- Coworking Section Configuration ------------------------------------------
export interface CoworkingFeature {
  id: number;
  value: string;
  label: string;
  icon: string;
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
  description: "Espaço vivo, charmoso e descolado em Itu para startups, empresas digitais e times que buscam ambiente inspirador com infraestrutura completa.",
  archetypeImage: "/images/archetype-davinci.jpg",
  archetypeName: "Leonardo Da Vinci",
  ctaText: "Agendar visita ao Coworking",
  features: [
    { id: 1, value: "40", label: "Postos de trabalho", icon: "users" },
    { id: 2, value: "4", label: "Salas de reunião", icon: "door-open" },
    { id: 3, value: "70", label: "Lugares no auditório", icon: "presentation" },
    { id: 4, value: "1", label: "Estúdio de podcast", icon: "mic" },
    { id: 5, value: "∞", label: "Café ilimitado", icon: "coffee" },
    { id: 6, value: "✓", label: "Endereço fiscal", icon: "map-pin" },
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
  description: "Clube de experiências com acesso a atividades do Vila Tech Hub: cursos, palestras, eventos, networking. Combos que unem coworking, educação e benefícios com parceiros.",
  archetypeImage: "/images/archetype-einstein.jpg",
  archetypeName: "Albert Einstein",
  keywords: ["Criar", "Aprender", "Conectar", "Transformar"],
  ctaText: "Quero fazer parte da Liga da Inovação",
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
  categories: PartnerCategory[];
}

export const partnersConfig: PartnersConfig = {
  sectionLabel: "PARCEIROS",
  sectionTitle: "Investidores e parceiros que acreditam no Vila Tech Hub",
  description: "O hub conta com empresas de tecnologia, consultorias, audiovisual, design, suporte e instituições de ensino e desenvolvimento regional.",
  ctaText: "Quero ser parceiro do Vila Tech Hub",
  categories: [
    {
      id: 1,
      name: "Tecnologia",
      partners: ["OPAH IT", "JOY internet", "iCode"],
    },
    {
      id: 2,
      name: "Consultoria",
      partners: ["seven sete"],
    },
    {
      id: 3,
      name: "Audiovisual",
      partners: ["bee drones", "Maranna Filmes", "Motim Criativo"],
    },
    {
      id: 4,
      name: "Design e Arquitetura",
      partners: ["HYBRID", "Lucilla Almeida"],
    },
    {
      id: 5,
      name: "Suporte",
      partners: ["KASI", "SAVI Advocacia"],
    },
    {
      id: 6,
      name: "Institucionais",
      partners: ["Fatec Itu", "ACI Itu", "Parque Tecnológico de Sorocaba"],
    },
  ],
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
  zipCode: "13310-000",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.1234567890123!2d-47.29999999999999!3d-23.266666666666666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE2JzAwLjAiUyA0N8KwMTgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr",
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
  sectionTitle: "Fale com a gente",
  description: "Preencha o formulário e nossa equipe entrará em contato em breve para apresentar as melhores soluções para você ou sua empresa.",
  nameLabel: "Nome",
  emailLabel: "E-mail",
  phoneLabel: "Telefone/WhatsApp",
  interestLabel: "Tenho interesse em",
  messageLabel: "Mensagem",
  submitText: "Enviar mensagem",
  successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
  interests: ["Educação", "Coworking", "Clube", "Investidor/Parceiro"],
};
