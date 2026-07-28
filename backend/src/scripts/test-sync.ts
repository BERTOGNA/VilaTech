import { db } from '../config/firebase';

const mockEvents = [
  {
    data: "11/06/2026",
    dia: 11,
    semana: "Qui",
    inicio: "18:30",
    fim: "21:30",
    tipo: "Palestra",
    titulo: "A Inovação da IA nos Negócios (Mock)",
    sub: "Bloco com 4 perspectivas: Direito, Tributário, Estratégia e Negócios",
    speakers: "Felipe Scalet | Carla Bertoncelo | Gilberto Moura | Carlos Tabosa",
    local: "Auditório VTH",
    valor: "Gratuito",
    linkInscricao: "https://example.com/inscricao",
    googleCalendarId: "h1mi39tpuv3i6vug8a44indu28_mock"
  },
  {
    data: "13/06/2026",
    dia: 13,
    semana: "Sáb",
    inicio: "19:00",
    fim: "22:00",
    tipo: "Evento",
    titulo: "HH da Copa (Mock)",
    sub: "Happy Hour temático da Copa do Mundo",
    speakers: "Equipe Vila Tech Hub",
    local: "Vila Tech Hub",
    valor: "Gratuito / Membros",
    linkInscricao: "",
    googleCalendarId: "0aq0h01ee1ivd46fcm3aril2oc_mock"
  }
];

async function testSync() {
  console.log('--- Iniciando teste de sincronização do Firestore ---');
  try {
    const batch = db.batch();
    
    // 1. Limpar eventos anteriores de teste
    const snapshot = await db.collection('events').get();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // 2. Inserir mockEvents com conversão de dataISO
    mockEvents.forEach(event => {
      let dataISO = '';
      let mesParsed = '';
      const parts = event.data.split('/');
      if (parts.length === 3) {
        dataISO = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        
        const monthIdx = parseInt(parts[1], 10);
        const MESES_ORDEM = [
          "janeiro", "fevereiro", "março", "abril", "maio", "junho",
          "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        if (monthIdx >= 1 && monthIdx <= 12) {
          mesParsed = MESES_ORDEM[monthIdx - 1];
        }
      }

      const speakersArray = event.speakers
        .split(/[|,;]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);

      const cleanEvent = {
        data: event.data,
        dataISO: dataISO,
        dia: event.dia,
        mes: mesParsed,
        semana: event.semana,
        inicio: event.inicio,
        fim: event.fim,
        tipo: event.tipo,
        titulo: event.titulo,
        sub: event.sub,
        descritivo: 'Descrição de teste para validar o campo descritivo da sincronização.',
        speakers: speakersArray,
        miniBio: 'Biografia resumida de teste.',
        publicoAlvo: 'Profissionais e interessados em tecnologia.',
        modalidade: 'Presencial',
        local: event.local,
        vagas: '50',
        valor: event.valor,
        linkInscricao: event.linkInscricao,
        status: 'Confirmado',
        observacoes: 'Sem observações.',
        googleCalendarId: event.googleCalendarId,
        updatedAt: new Date().toISOString()
      };

      const docRef = db.collection('events').doc(event.googleCalendarId);
      batch.set(docRef, cleanEvent);
    });

    await batch.commit();
    console.log('Sucesso: Eventos de teste adicionados com sucesso no Firestore.');

    // 3. Consultar e imprimir os eventos adicionados
    const checkSnapshot = await db.collection('events').get();
    console.log(`Documentos na coleção 'events' agora: ${checkSnapshot.size}`);
    checkSnapshot.forEach(doc => {
      console.log(`- [${doc.id}]: ${doc.data().titulo} (${doc.data().dataISO})`);
    });

  } catch (error) {
    console.error('Erro durante o teste de sincronização:', error);
  } finally {
    process.exit(0);
  }
}

testSync();
