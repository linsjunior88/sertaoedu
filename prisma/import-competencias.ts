import { PrismaClient } from '@prisma/client';
import * as ExcelJS from 'exceljs';

const prisma = new PrismaClient();

async function importCompetencias() {
  try {
    // Importar competências do fundamental
    const workbookFundamental = new ExcelJS.Workbook();
    await workbookFundamental.xlsx.readFile('competencias_fundamental.xlsx');
    const worksheetFundamental = workbookFundamental.getWorksheet(1);

    // Importar competências do médio
    const workbookMedio = new ExcelJS.Workbook();
    await workbookMedio.xlsx.readFile('competencias_medio.xlsx');
    const worksheetMedio = workbookMedio.getWorksheet(1);

    // Processar competências do fundamental
    for (let rowNumber = 2; rowNumber <= (worksheetFundamental?.rowCount || 0); rowNumber++) {
      const row = worksheetFundamental?.getRow(rowNumber);
      if (row) {
        const nome = row.getCell(1).value?.toString() || '';
        const descricao = row.getCell(2).value?.toString() || '';
        const area = row.getCell(3).value?.toString() || '';

        if (nome && descricao) {
          try {
            await prisma.competenciaBNCC.upsert({
              where: {
                nome_ensino: {
                  nome,
                  ensino: 'fundamental'
                }
              },
              update: {
                descricao,
                area
              },
              create: {
                nome,
                descricao,
                ensino: 'fundamental',
                area
              }
            });
            console.log(`Competência fundamental importada: ${nome}`);
          } catch (error) {
            console.error(`Erro ao importar competência fundamental ${nome}:`, error);
          }
        }
      }
    }

    // Processar competências do médio
    for (let rowNumber = 2; rowNumber <= (worksheetMedio?.rowCount || 0); rowNumber++) {
      const row = worksheetMedio?.getRow(rowNumber);
      if (row) {
        const nome = row.getCell(1).value?.toString() || '';
        const descricao = row.getCell(2).value?.toString() || '';
        const area = row.getCell(3).value?.toString() || '';

        if (nome && descricao) {
          try {
            await prisma.competenciaBNCC.upsert({
              where: {
                nome_ensino: {
                  nome,
                  ensino: 'medio'
                }
              },
              update: {
                descricao,
                area
              },
              create: {
                nome,
                descricao,
                ensino: 'medio',
                area
              }
            });
            console.log(`Competência médio importada: ${nome}`);
          } catch (error) {
            console.error(`Erro ao importar competência médio ${nome}:`, error);
          }
        }
      }
    }

    console.log('Importação de competências concluída!');
  } catch (error) {
    console.error('Erro durante a importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importCompetencias()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 