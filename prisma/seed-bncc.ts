import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

async function main() {
  try {
    // Ler o arquivo XLSX
    const workbook = XLSX.readFile('dados_bncc.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Processar os dados
    for (const row of data as any[]) {
      const ensino = row['ENSINO'];
      const nome = row['NOME DA COMPETENCIA POR DISCIPLINA'];
      const descricao = row['DESCRICAO DA COMPETENCIA'];
      const area = row['AREA'];

      // Verificar se já existe uma unidade temática com o mesmo nome, série e disciplina
      const unidadeExistente = await prisma.unidadeTematica.findFirst({
        where: {
          nome: nome,
          serie: ensino,
          disciplina: area,
        },
      });

      if (!unidadeExistente) {
        // Criar unidade temática apenas se não existir
        const unidadeTematica = await prisma.unidadeTematica.create({
          data: {
            nome: nome,
            serie: ensino,
            disciplina: area,
            objetos: {
              create: {
                nome: nome,
                habilidades: {
                  create: {
                    codigo: nome.split(' ')[0], // Usando o primeiro termo como código
                    descricao: descricao
                  }
                }
              }
            }
          }
        });

        console.log(`Criada unidade temática: ${unidadeTematica.nome}`);
      } else {
        console.log(`Unidade temática já existe: ${nome}`);
      }
    }

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 