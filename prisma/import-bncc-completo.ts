import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as path from 'path';

const prisma = new PrismaClient();

// Interfaces para os dados do fundamental
interface HabilidadeFundamental {
  nome_habilidade: string;
}

interface ObjetoConhecimentoFundamental {
  nome_objeto: string;
  habilidades: HabilidadeFundamental[];
}

interface UnidadeTematicaFundamental {
  nome_unidade: string;
  objeto_conhecimento: ObjetoConhecimentoFundamental[];
}

interface AnoFundamental {
  nome_ano: string[];
  unidades_tematicas: UnidadeTematicaFundamental[];
}

interface DisciplinaFundamental {
  nome_disciplina: string;
  ano: AnoFundamental[];
}

// Interfaces para os dados do médio
interface HabilidadeMedio {
  nome_codigo: string;
  nome_habilidade: string;
}

interface AnoMedio {
  nome_ano: string[];
  codigo_habilidade: HabilidadeMedio[];
}

interface DisciplinaMedio {
  nome_disciplina: string;
  ano: AnoMedio[];
}

// Interface para competências Excel
interface CompetenciaRow {
  Ensino: string;
  Nomes: string;
  Competencias: string;
}

async function limparDados() {
  console.log('🧹 Limpando dados existentes...');
  await prisma.habilidadeBNCC.deleteMany();
  await prisma.disciplinaBNCC.deleteMany();
  await prisma.competenciaBNCC.deleteMany();
  console.log('✅ Dados limpos com sucesso!');
}

async function importarDadosFundamental() {
  console.log('📚 Importando dados do Ensino Fundamental...');
  
  const dataFundamental = JSON.parse(
    fs.readFileSync('competencias_bncc_fundamental.json', 'utf-8')
  ) as Record<string, DisciplinaFundamental>;

  for (const [codigo, disciplina] of Object.entries(dataFundamental)) {
    console.log(`Processando disciplina: ${disciplina.nome_disciplina}`);
    
    for (const anoData of disciplina.ano) {
      const anos = anoData.nome_ano;
      
      for (const ano of anos) {
        // Extrair todas as unidades temáticas
        const unidadesTematicas = anoData.unidades_tematicas.map(ut => ut.nome_unidade);
        
        // Extrair todos os objetos de conhecimento
        const objetosConhecimento: string[] = [];
        anoData.unidades_tematicas.forEach(ut => {
          ut.objeto_conhecimento.forEach(oc => {
            objetosConhecimento.push(oc.nome_objeto);
          });
        });
        
        // Extrair todas as habilidades
        const habilidades: { codigo: string; descricao: string }[] = [];
        anoData.unidades_tematicas.forEach(ut => {
          ut.objeto_conhecimento.forEach(oc => {
            oc.habilidades.forEach(hab => {
              // Extrair código da habilidade (ex: (EF01LP01))
              const match = hab.nome_habilidade.match(/\(([^)]+)\)/);
              const codigoHabilidade = match ? match[1] : `${codigo}_${habilidades.length + 1}`;
              
              habilidades.push({
                codigo: codigoHabilidade,
                descricao: hab.nome_habilidade
              });
            });
          });
        });

        try {
          // Determinar área baseada na disciplina
          let area = 'Linguagens';
          if (disciplina.nome_disciplina.toLowerCase().includes('matemática')) {
            area = 'Matemática';
          } else if (disciplina.nome_disciplina.toLowerCase().includes('ciências') || 
                     disciplina.nome_disciplina.toLowerCase().includes('geografia') ||
                     disciplina.nome_disciplina.toLowerCase().includes('história')) {
            area = 'Ciências Humanas';
          }

          const disciplinaCriada = await prisma.disciplinaBNCC.create({
            data: {
              codigo: `${codigo}_${ano}`,
              nome: disciplina.nome_disciplina,
              area: area,
              ano: `${ano}º Ano EF`,
              unidades_tematicas: unidadesTematicas,
              objetos_conhecimento: objetosConhecimento,
              habilidades: {
                create: habilidades
              }
            }
          });
          
          console.log(`✅ Disciplina criada: ${disciplinaCriada.nome} - ${disciplinaCriada.ano} (${habilidades.length} habilidades)`);
        } catch (error) {
          console.error(`❌ Erro ao criar disciplina ${disciplina.nome_disciplina} - ${ano}º:`, error);
        }
      }
    }
  }
}

async function importarDadosMedio() {
  console.log('🎓 Importando dados do Ensino Médio...');
  
  const dataMedio = JSON.parse(
    fs.readFileSync('competencias_bncc_medio.json', 'utf-8')
  ) as Record<string, DisciplinaMedio>;

  for (const [codigo, disciplina] of Object.entries(dataMedio)) {
    console.log(`Processando disciplina: ${disciplina.nome_disciplina}`);
    
    for (const anoData of disciplina.ano) {
      const anos = anoData.nome_ano;
      
      for (const ano of anos) {
        // Para o ensino médio, as habilidades estão diretamente no ano
        const habilidades = anoData.codigo_habilidade.map(hab => ({
          codigo: hab.nome_codigo,
          descricao: hab.nome_habilidade
        }));

        try {
          // Determinar área baseada na disciplina
          let area = 'Linguagens';
          if (disciplina.nome_disciplina.toLowerCase().includes('matemática')) {
            area = 'Matemática';
          } else if (disciplina.nome_disciplina.toLowerCase().includes('ciências') || 
                     disciplina.nome_disciplina.toLowerCase().includes('natureza')) {
            area = 'Ciências da Natureza';
          } else if (disciplina.nome_disciplina.toLowerCase().includes('humanas')) {
            area = 'Ciências Humanas';
          }

          const disciplinaCriada = await prisma.disciplinaBNCC.create({
            data: {
              codigo: `${codigo}_${ano}`,
              nome: disciplina.nome_disciplina,
              area: area,
              ano: ano,
              unidades_tematicas: [], // Ensino médio não tem unidades temáticas específicas
              objetos_conhecimento: [], // Ensino médio não tem objetos de conhecimento específicos
              habilidades: {
                create: habilidades
              }
            }
          });
          
          console.log(`✅ Disciplina criada: ${disciplinaCriada.nome} - ${disciplinaCriada.ano} (${habilidades.length} habilidades)`);
        } catch (error) {
          console.error(`❌ Erro ao criar disciplina ${disciplina.nome_disciplina} - ${ano}:`, error);
        }
      }
    }
  }
}

async function readXLSX(filePath: string): Promise<CompetenciaRow[]> {
  console.log(`📖 Lendo arquivo: ${filePath}`);
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data = XLSX.utils.sheet_to_json<CompetenciaRow>(worksheet, {
    header: ['Ensino', 'Nomes', 'Competencias'],
    range: 1, // Pular cabeçalho
    raw: false
  });
  
  console.log(`📊 Dados lidos: ${data.length} linhas`);
  return data.filter(row => row.Nomes && row.Competencias); // Filtrar linhas vazias
}

async function importarCompetencias() {
  console.log('🎯 Importando competências dos arquivos Excel...');
  
  // Processar competências do Ensino Fundamental
  console.log('📚 Processando competências do Ensino Fundamental...');
  const fundamentalPath = path.join(process.cwd(), 'competencias_fundamental.xlsx');
  const fundamentalData = await readXLSX(fundamentalPath);
  
  let fundamentalCount = 0;
  for (const row of fundamentalData) {
    try {
      const area = row.Nomes.includes('de ') ? row.Nomes.split('de ')[1] : row.Nomes;
      const ensino = 'fundamental';
      
      await prisma.competenciaBNCC.create({
        data: {
          nome: `${row.Nomes} - Competência ${fundamentalCount + 1}`,
          descricao: row.Competencias,
          area: area,
          ensino: ensino
        }
      });
      
      fundamentalCount++;
      console.log(`✅ Competência fundamental criada: ${row.Competencias.substring(0, 50)}...`);
    } catch (error) {
      console.error(`❌ Erro ao criar competência fundamental:`, error);
    }
  }
  
  // Processar competências do Ensino Médio
  console.log('🎓 Processando competências do Ensino Médio...');
  const medioPath = path.join(process.cwd(), 'competencias_medio.xlsx');
  const medioData = await readXLSX(medioPath);
  
  let medioCount = 0;
  for (const row of medioData) {
    try {
      const area = row.Nomes.includes('de ') ? row.Nomes.split('de ')[1] : row.Nomes;
      const ensino = 'medio';
      
      await prisma.competenciaBNCC.create({
        data: {
          nome: `${row.Nomes} - Competência ${medioCount + 1}`,
          descricao: row.Competencias,
          area: area,
          ensino: ensino
        }
      });
      
      medioCount++;
      console.log(`✅ Competência médio criada: ${row.Competencias.substring(0, 50)}...`);
    } catch (error) {
      console.error(`❌ Erro ao criar competência médio:`, error);
    }
  }
  
  console.log(`📊 Total de competências criadas: ${fundamentalCount + medioCount} (${fundamentalCount} fundamental + ${medioCount} médio)`);
}

async function main() {
  try {
    console.log('🚀 Iniciando importação completa da BNCC...');
    
    await limparDados();
    await importarDadosFundamental();
    await importarDadosMedio();
    await importarCompetencias();
    
    console.log('🎉 Importação completa finalizada com sucesso!');
    
    // Estatísticas finais
    const totalDisciplinas = await prisma.disciplinaBNCC.count();
    const totalHabilidades = await prisma.habilidadeBNCC.count();
    const totalCompetencias = await prisma.competenciaBNCC.count();
    
    console.log('\n📊 ESTATÍSTICAS FINAIS:');
    console.log(`📚 Disciplinas: ${totalDisciplinas}`);
    console.log(`🎯 Habilidades: ${totalHabilidades}`);
    console.log(`💡 Competências: ${totalCompetencias}`);
    
  } catch (error) {
    console.error('💥 Erro durante a importação:', error);
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