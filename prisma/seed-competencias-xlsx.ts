import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import * as path from 'path';

const prisma = new PrismaClient();

interface CompetenciaRow {
  Ensino: string;
  Nomes: string;
  Competencias: string;
}

async function readXLSX(filePath: string): Promise<CompetenciaRow[]> {
  console.log(`Lendo arquivo: ${filePath}`);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Configurar para ler todas as linhas, incluindo o cabeçalho
  const data = XLSX.utils.sheet_to_json<CompetenciaRow>(worksheet, {
    header: ['Ensino', 'Nomes', 'Competencias'],
    range: 0, // Começar da primeira linha
    raw: false // Converter valores para string
  });
  
  console.log(`Dados lidos: ${data.length} linhas`);
  if (data.length > 0) {
    console.log('Chaves da primeira linha:', Object.keys(data[0]));
    console.log('Primeira linha:', data[0]);
  }
  return data;
}

async function main() {
  try {
    console.log('Limpando tabela de competências...');
    await prisma.competenciaBNCC.deleteMany();

    // Processar competências do Ensino Fundamental
    console.log('Processando competências do Ensino Fundamental...');
    const fundamentalPath = path.join(process.cwd(), 'competencias_fundamental.xlsx');
    const fundamentalData = await readXLSX(fundamentalPath);
    
    let fundamentalCount = 0;
    for (const row of fundamentalData) {
      // Pular a linha do cabeçalho
      if (row.Nomes === 'Nomes' || !row.Nomes) continue;
      
      const area = row.Nomes.split('de ')[1] || '';
      const ensino = row.Ensino.toLowerCase();
      
      // Criar um nome único para a competência
      const nomeUnico = `${row.Nomes} - ${fundamentalCount + 1}`;
      
      await prisma.competenciaBNCC.create({
        data: {
          nome: nomeUnico,
          descricao: row.Competencias,
          area: area,
          ensino: ensino
        }
      });
      fundamentalCount++;
      console.log(`Competência criada: ${row.Competencias.substring(0, 50)}...`);
    }
    console.log(`Total de competências do Fundamental criadas: ${fundamentalCount}`);

    // Processar competências do Ensino Médio
    console.log('Processando competências do Ensino Médio...');
    const medioPath = path.join(process.cwd(), 'competencias_medio.xlsx');
    const medioData = await readXLSX(medioPath);
    
    let medioCount = 0;
    for (const row of medioData) {
      // Pular a linha do cabeçalho
      if (row.Nomes === 'Nomes' || !row.Nomes) continue;
      
      const area = row.Nomes.split('de ')[1] || '';
      const ensino = row.Ensino.toLowerCase();
      
      // Criar um nome único para a competência
      const nomeUnico = `${row.Nomes} - ${medioCount + 1}`;
      
      await prisma.competenciaBNCC.create({
        data: {
          nome: nomeUnico,
          descricao: row.Competencias,
          area: area,
          ensino: ensino
        }
      });
      medioCount++;
      console.log(`Competência criada: ${row.Competencias.substring(0, 50)}...`);
    }
    console.log(`Total de competências do Médio criadas: ${medioCount}`);
    console.log(`Total geral de competências criadas: ${fundamentalCount + medioCount}`);

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 