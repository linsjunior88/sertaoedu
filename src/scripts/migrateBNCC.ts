import { BNCCSyncService } from '../services/bnccSync';

async function migrateBNCC() {
  console.log('Iniciando migração dos dados da BNCC...');
  
  try {
    const syncService = new BNCCSyncService();
    
    // Sincroniza todas as competências e disciplinas
    await syncService.syncAll();
    
    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
    process.exit(1);
  }
}

// Executa a migração
migrateBNCC(); 