import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

async function testConnection() {
  try {
    // Tenta fazer uma consulta simples
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('Conexão bem sucedida:', result)
  } catch (error) {
    console.error('Erro na conexão:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 