import { db } from '../config/firebase';

async function clearLeads() {
    console.log('--- Iniciando limpeza de leads ---');
    try {
        const leadsRef = db.collection('leads');
        const snapshot = await leadsRef.get();
        
        if (snapshot.empty) {
            console.log('Nenhum lead encontrado para deletar.');
            return;
        }

        console.log(`Encontrados ${snapshot.size} leads. Deletando...`);

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('Sucesso: Todos os leads foram removidos.');

        // Opcional: Limpar também o histórico/eventos se estiverem em outra coleção
        // No momento os eventos parecem estar dentro do documento do lead ou vinculados por ID.
        
    } catch (error) {
        console.error('Erro ao limpar leads:', error);
    } finally {
        process.exit(0);
    }
}

clearLeads();
