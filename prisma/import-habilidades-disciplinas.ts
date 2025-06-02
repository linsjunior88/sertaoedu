import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface Disciplina {
  nome_disciplina: string;
  area?: string;
  ano: Array<{
    nome_ano: string[];
    unidades_tematicas: Array<{
      nome: string;
      objetos_conhecimento: Array<{
        nome: string;
      }>;
      habilidades: Array<{
        codigo: string;
        descricao: string;
      }>;
    }>;
  }>;
}

async function importHabilidadesDisciplinas() {
  try {
    // Importar dados do fundamental
    const dataFundamental = JSON.parse(fs.readFileSync('competencias_bncc_fundamental.json', 'utf-8')) as Record<string, Disciplina>;
    
    // Importar dados do médio
    const dataMedio = JSON.parse(fs.readFileSync('competencias_bncc_medio.json', 'utf-8')) as Record<string, Disciplina>;

    // Processar dados do fundamental
    for (const [codigo, disciplina] of Object.entries(dataFundamental)) {
      const nome = disciplina.nome_disciplina;
      const anos = disciplina.ano;

      for (const ano of anos) {
        const nomeAno = ano.nome_ano[0];
        const unidadesTematicas = ano.unidades_tematicas;

        for (const unidade of unidadesTematicas) {
          const objetosConhecimento = unidade.objetos_conhecimento;
          const habilidades = unidade.habilidades;

          try {
            const disciplinaCriada = await prisma.disciplinaBNCC.create({
              data: {
                codigo,
                nome,
                area: disciplina.area || 'Linguagens',
                ano: `${nomeAno}º Ano EF`,
                unidades_tematicas: unidadesTematicas.map(u => u.nome),
                objetos_conhecimento: objetosConhecimento.map(o => o.nome),
                habilidades: {
                  create: habilidades.map(h => ({
                    codigo: h.codigo,
                    descricao: h.descricao
                  }))
                }
              }
            });
            console.log(`Disciplina fundamental importada: ${disciplinaCriada.nome} - ${disciplinaCriada.ano}`);
          } catch (error) {
            console.error(`Erro ao importar disciplina fundamental ${nome} - ${nomeAno}º:`, error);
          }
        }
      }
    }

    // Processar dados do médio
    for (const [codigo, disciplina] of Object.entries(dataMedio)) {
      const nome = disciplina.nome_disciplina;
      const anos = disciplina.ano;

      for (const ano of anos) {
        const nomeAno = ano.nome_ano[0];
        const unidadesTematicas = ano.unidades_tematicas;

        for (const unidade of unidadesTematicas) {
          const objetosConhecimento = unidade.objetos_conhecimento;
          const habilidades = unidade.habilidades;

          try {
            const disciplinaCriada = await prisma.disciplinaBNCC.create({
              data: {
                codigo,
                nome,
                area: disciplina.area || 'Linguagens',
                ano: `${nomeAno}º Ano EM`,
                unidades_tematicas: unidadesTematicas.map(u => u.nome),
                objetos_conhecimento: objetosConhecimento.map(o => o.nome),
                habilidades: {
                  create: habilidades.map(h => ({
                    codigo: h.codigo,
                    descricao: h.descricao
                  }))
                }
              }
            });
            console.log(`Disciplina médio importada: ${disciplinaCriada.nome} - ${disciplinaCriada.ano}`);
          } catch (error) {
            console.error(`Erro ao importar disciplina médio ${nome} - ${nomeAno}º:`, error);
          }
        }
      }
    }

    console.log('Importação de habilidades e disciplinas concluída!');
  } catch (error) {
    console.error('Erro durante a importação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importHabilidadesDisciplinas()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 