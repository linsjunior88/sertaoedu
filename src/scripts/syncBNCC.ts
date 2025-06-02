const { BNCCSyncService } = require("../services/bnccSync");

async function main() {
  try {
    console.log("Iniciando sincronização dos dados da BNCC...");
    const syncService = new BNCCSyncService();
    await syncService.syncAll();
    console.log("Sincronização concluída com sucesso!");
  } catch (error) {
    console.error("Erro durante a sincronização:", error);
    process.exit(1);
  }
}

main(); 