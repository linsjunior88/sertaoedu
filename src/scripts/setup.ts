import { execSync } from "child_process";
import { BNCCSyncService } from "../services/bnccSync";

async function setup() {
  try {
    console.log("🚀 Iniciando setup do SertãoEdu...");

    // Executa as migrações do Prisma
    console.log("📦 Executando migrações do banco de dados...");
    execSync("npx prisma migrate dev", { stdio: "inherit" });

    // Sincroniza os dados da BNCC
    console.log("📚 Sincronizando dados da BNCC...");
    const syncService = new BNCCSyncService();
    await syncService.syncAll();

    console.log("✅ Setup concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o setup:", error);
    process.exit(1);
  }
}

setup(); 