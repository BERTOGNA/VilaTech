export interface AgendaEvent {
  mes: string;
  dia: number;
  semana: string;
  inicio: string;
  fim: string;
  tipo: 'Palestra' | 'Curso' | 'Evento';
  titulo: string;
  sub?: string;
  speakers: string[];
  local?: string;
  valor?: string;
  linkInscricao?: string;
  descritivo?: string;
  data?: string;
  dataISO?: string;
  googleCalendarId?: string;
  modalidade?: string;
}



export const EVENTOS: AgendaEvent[] = [
  {
    mes: "junho",
    dia: 11,
    semana: "Qui",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Palestra",
    titulo: "Palestras Inovação nos Negócios VTH",
    sub: "A inovação da IA nos negócios — bloco de 4 palestras",
    speakers: ["Felipe Scalet", "Carla Bertoncelo", "Gilberto Moura", "Carlos Tabosa"],
    local: "Vila Tech Hub – Auditório (até 70 pessoas)",
    valor: "Gratuito",
    modalidade: "Presencial",
    googleCalendarId: "h1mi39tpuv3i6vug8a44indu28@google.com"
  },
  {
    mes: "junho",
    dia: 13,
    semana: "Sáb",
    inicio: "15:00",
    fim: "22:00",
    tipo: "Evento",
    titulo: "Happy Copa",
    sub: "Happy Hour Copa do Mundo",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "Gratuito / Membros",
    modalidade: "Presencial",
    googleCalendarId: "0aq0h01ee1ivd46fcm3aril2oc@google.com"
  },
  {
    mes: "junho",
    dia: 25,
    semana: "Qui",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Curso",
    titulo: "Curso: Planejamento Estratégico Parte 1",
    sub: "Crescimento sustentável com planejamento e gestão estratégica",
    speakers: ["Gilberto Moura"],
    local: "Vila Tech Hub",
    valor: "Curso Pago",
    modalidade: "Presencial",
    googleCalendarId: "e3lnsdi8qmtc52ddoa15uls7b4@google.com"
  },
  {
    mes: "junho",
    dia: 27,
    semana: "Sáb",
    inicio: "09:00",
    fim: "13:00",
    tipo: "Curso",
    titulo: "Curso: IA para Negócios - Curso 1",
    sub: "Curso 1: Contabilidade e Finanças",
    speakers: ["Carlos Tabosa"],
    local: "Vila Tech Hub",
    valor: "Curso Pago",
    modalidade: "Presencial",
    googleCalendarId: "8oelfk04e480lgu2e19a5h69no@google.com"
  },
  {
    mes: "julho",
    dia: 2,
    semana: "Qui",
    inicio: "18:30",
    fim: "22:00",
    tipo: "Curso",
    titulo: "Curso: Planejamento Estratégico Parte 2",
    sub: "Crescimento sustentável com planejamento e gestão estratégica",
    speakers: ["Gilberto Moura"],
    local: "Vila Tech Hub – Auditório",
    valor: "Curso pago",
    modalidade: "Presencial",
    googleCalendarId: "a9qtgm6cqamlmcubhkgakfaf78@google.com"
  },
  {
    mes: "julho",
    dia: 11,
    semana: "Sáb",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Palestra",
    titulo: "IA e os impactos na produção Audiovisual",
    sub: "Criatividade com IA na produção Audiovisual e Games",
    speakers: ["Bruno Bertogna", "Dino Paiva", "Marcelo Zampini", "Achilles Milan Neto", "Tiago Castro/Adobe", "Gui Oller"],
    local: "Vila Tech Hub – Auditório",
    valor: "Gratuito",
    modalidade: "Presencial",
    googleCalendarId: "oitpuqa0qopdrg2b321ocd5o54@google.com"
  },
  {
    mes: "julho",
    dia: 16,
    semana: "Qui",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Curso",
    titulo: "Curso: A Nova Legislação Tributária",
    sub: "Dominando e aplicando o novo regime tributário brasileiro",
    speakers: ["Carla Bertoncelo"],
    local: "Vila Tech Hub",
    valor: "Curso Pago",
    modalidade: "Presencial",
    googleCalendarId: "5iupvj0kt07hnrhuoll6ivmna4@google.com"
  },
  {
    mes: "julho",
    dia: 18,
    semana: "Sáb",
    inicio: "09:00",
    fim: "13:00",
    tipo: "Curso",
    titulo: "Curso: IA para Negócios - Curso 2",
    sub: "Curso 2: Aplicações de IA para Marketing e vendas",
    speakers: ["Carlos Tabosa"],
    local: "Vila Tech Hub – Auditório",
    valor: "Curso pago",
    modalidade: "Presencial",
    googleCalendarId: "rtuq2lh2bladmddit7ic5gihic@google.com"
  },
  {
    mes: "julho",
    dia: 25,
    semana: "Sáb",
    inicio: "09:00",
    fim: "12:00",
    tipo: "Palestra",
    titulo: "Palestra: Você faz parte do game?",
    sub: "Muito além do E-Sport. Um universo de alternativas para o seu futuro",
    speakers: ["Dino Paiva", "Danilo Fiocco", "Jonathan Gamers Club", "Henrique Andrade- Unreal", "Sergio Silva - Epic"],
    local: "Vila Tech Hub",
    valor: "Gratuito",
    modalidade: "Presencial",
    googleCalendarId: "rttdvcq7bv828l3420c8chjhmk@google.com"
  },
  {
    mes: "julho",
    dia: 30,
    semana: "Qui",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Curso",
    titulo: "Curso: IA na advocacia",
    sub: "Aplicação prática de IA no exercício da advocacia",
    speakers: ["Felipe Scalet"],
    local: "Vila Tech Hub",
    valor: "Curso Pago",
    modalidade: "Presencial",
    googleCalendarId: "d9vpn8m4sjba7vf336gm4ola28@google.com"
  },
  {
    mes: "julho",
    dia: 31,
    semana: "Sex",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Evento",
    titulo: "HH do Cinema",
    sub: "Happy Hour temático com exibição e debate sobre cinema",
    speakers: [],
    local: "Vila Tech Hub",
    valor: "Gratuito / Membros",
    modalidade: "Presencial",
    googleCalendarId: "b9gkiu7hfb697nbunjq2pm8o4c@google.com"
  }
];

export const MESES_ORDEM = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

export const MESES_LABEL: Record<string, string> = {
  janeiro: "Janeiro",
  fevereiro: "Fevereiro",
  março: "Março",
  abril: "Abril",
  maio: "Maio",
  junho: "Junho",
  julho: "Julho",
  agosto: "Agosto",
  setembro: "Setembro",
  outubro: "Outubro",
  novembro: "Novembro",
  dezembro: "Dezembro"
};
