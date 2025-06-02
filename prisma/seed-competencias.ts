import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function extractTextFromPDF(filePath: string): Promise<string> {
  console.log(`Tentando ler o arquivo: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  const dataBuffer = fs.readFileSync(filePath);
  console.log(`Arquivo lido com sucesso. Tamanho: ${dataBuffer.length} bytes`);
  
  const pdf = await import('pdf-parse');
  const data = await pdf.default(dataBuffer);
  console.log(`PDF processado. Número de páginas: ${data.numpages}`);
  
  // Mostrar as primeiras linhas do texto
  const firstLines = data.text.split('\n').slice(0, 10).join('\n');
  console.log('Primeiras linhas do texto:');
  console.log(firstLines);
  
  return data.text;
}

async function processCompetencias(text: string, ensino: string): Promise<Array<{ nome: string; descricao: string; area: string }>> {
  console.log(`Processando texto para ${ensino}. Tamanho do texto: ${text.length} caracteres`);
  
  const competencias: Array<{ nome: string; descricao: string; area: string }> = [];
  
  // Dividir o texto em linhas
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  console.log(`Número de linhas encontradas: ${lines.length}`);
  
  let currentArea = '';
  let currentCompetencia = '';
  let currentDescricao = '';
  
  for (const line of lines) {
    // Verificar se é uma área
    if (line.match(/^Área:/i)) {
      if (currentCompetencia && currentDescricao) {
        competencias.push({
          nome: currentCompetencia,
          descricao: currentDescricao,
          area: currentArea
        });
      }
      currentArea = line.replace(/^Área:/i, '').trim();
      currentCompetencia = '';
      currentDescricao = '';
      console.log(`Nova área encontrada: ${currentArea}`);
    }
    // Verificar se é uma competência
    else if (line.match(/^Competência:/i)) {
      if (currentCompetencia && currentDescricao) {
        competencias.push({
          nome: currentCompetencia,
          descricao: currentDescricao,
          area: currentArea
        });
      }
      currentCompetencia = line.replace(/^Competência:/i, '').trim();
      currentDescricao = '';
      console.log(`Nova competência encontrada: ${currentCompetencia}`);
    }
    // Se não for área nem competência, é parte da descrição
    else if (currentCompetencia) {
      currentDescricao += (currentDescricao ? ' ' : '') + line;
    }
  }
  
  // Adicionar a última competência
  if (currentCompetencia && currentDescricao) {
    competencias.push({
      nome: currentCompetencia,
      descricao: currentDescricao,
      area: currentArea
    });
  }
  
  console.log(`Total de competências encontradas para ${ensino}: ${competencias.length}`);
  return competencias;
}

async function main() {
  try {
    console.log('Limpando tabela de competências...');
    await prisma.competenciaBNCC.deleteMany();

    // Processar competências do Ensino Fundamental
    console.log('Processando competências do Ensino Fundamental...');
    const fundamentalPath = path.join(process.cwd(), 'competencias_fundamental.pdf');
    console.log(`Caminho do arquivo fundamental: ${fundamentalPath}`);
    
    const fundamentalText = await extractTextFromPDF(fundamentalPath);
    const competenciasFundamental = await processCompetencias(fundamentalText, 'fundamental');
    
    console.log(`Inserindo ${competenciasFundamental.length} competências do Ensino Fundamental...`);
    for (const competencia of competenciasFundamental) {
      await prisma.competenciaBNCC.create({
        data: {
          ...competencia,
          ensino: 'fundamental'
        }
      });
    }

    // Processar competências do Ensino Médio
    console.log('Processando competências do Ensino Médio...');
    const medioPath = path.join(process.cwd(), 'competencias_medio.pdf');
    console.log(`Caminho do arquivo médio: ${medioPath}`);
    
    const medioText = await extractTextFromPDF(medioPath);
    const competenciasMedio = await processCompetencias(medioText, 'medio');
    
    console.log(`Inserindo ${competenciasMedio.length} competências do Ensino Médio...`);
    for (const competencia of competenciasMedio) {
      await prisma.competenciaBNCC.create({
        data: {
          ...competencia,
          ensino: 'medio'
        }
      });
    }

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