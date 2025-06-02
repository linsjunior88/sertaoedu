import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Inserir disciplinas da BNCC
  const disciplinas = [
    {
      codigo: 'LP',
      nome: 'Língua Portuguesa',
      area: 'Linguagens',
      ano: '3º Ano EF',
      unidades_tematicas: ['Leitura', 'Escrita', 'Oralidade'],
      objetos_conhecimento: ['Gêneros textuais', 'Compreensão leitora', 'Produção textual'],
      habilidades: [
        {
          codigo: 'EF03LP01',
          descricao: 'Identificar e (re)contar sequências de imagens em narrativas visuais (tirinhas, histórias em quadrinhos etc.) e verbais (contos, fábulas etc.), observando início, meio e fim.'
        },
        {
          codigo: 'EF03LP02',
          descricao: 'Identificar e (re)contar sequências de imagens em narrativas visuais (tirinhas, histórias em quadrinhos etc.) e verbais (contos, fábulas etc.), observando início, meio e fim.'
        }
      ]
    },
    {
      codigo: 'LP',
      nome: 'Língua Portuguesa',
      area: 'Linguagens',
      ano: '4º Ano EF',
      unidades_tematicas: ['Leitura', 'Escrita', 'Oralidade'],
      objetos_conhecimento: ['Gêneros textuais', 'Compreensão leitora', 'Produção textual'],
      habilidades: [
        {
          codigo: 'EF04LP01',
          descricao: 'Ler e compreender textos literários de diferentes gêneros.'
        },
        {
          codigo: 'EF04LP02',
          descricao: 'Ler e compreender textos informativos de diferentes gêneros.'
        }
      ]
    },
    {
      codigo: 'MAT',
      nome: 'Matemática',
      area: 'Matemática',
      ano: '3º Ano EF',
      unidades_tematicas: ['Números', 'Álgebra', 'Geometria'],
      objetos_conhecimento: ['Sistema de numeração decimal', 'Operações com números naturais', 'Figuras geométricas'],
      habilidades: [
        {
          codigo: 'EF03MA01',
          descricao: 'Ler, escrever e comparar números naturais de até a ordem de unidade de milhar, estabelecendo relações entre os registros numéricos e em língua materna.'
        },
        {
          codigo: 'EF03MA02',
          descricao: 'Identificar características do sistema de numeração decimal, utilizando a composição e a decomposição de número natural de até quatro ordens.'
        }
      ]
    },
    {
      codigo: 'MAT',
      nome: 'Matemática',
      area: 'Matemática',
      ano: '4º Ano EF',
      unidades_tematicas: ['Números', 'Álgebra', 'Geometria'],
      objetos_conhecimento: ['Sistema de numeração decimal', 'Operações com números naturais', 'Figuras geométricas'],
      habilidades: [
        {
          codigo: 'EF04MA01',
          descricao: 'Ler, escrever e ordenar números naturais até a ordem de dezenas de milhar.'
        },
        {
          codigo: 'EF04MA02',
          descricao: 'Identificar características do sistema de numeração decimal, utilizando a composição e a decomposição de número natural de até cinco ordens.'
        }
      ]
    },
    {
      codigo: 'HIS',
      nome: 'História',
      area: 'Ciências Humanas',
      ano: '3º Ano EF',
      unidades_tematicas: ['História Local', 'História Regional'],
      objetos_conhecimento: ['Comunidade local', 'Tradições culturais'],
      habilidades: [
        {
          codigo: 'EF03HI01',
          descricao: 'Identificar e descrever as relações sociais de parentesco, de amizade, de aliança, de trabalho, entre outros, que vinculam as pessoas aos grupos de convívio, à comunidade local e ao município.'
        },
        {
          codigo: 'EF03HI02',
          descricao: 'Identificar e descrever as relações sociais de parentesco, de amizade, de aliança, de trabalho, entre outros, que vinculam as pessoas aos grupos de convívio, à comunidade local e ao município.'
        }
      ]
    },
    {
      codigo: 'HIS',
      nome: 'História',
      area: 'Ciências Humanas',
      ano: '4º Ano EF',
      unidades_tematicas: ['História Local', 'História Regional'],
      objetos_conhecimento: ['Comunidade local', 'Tradições culturais'],
      habilidades: [
        {
          codigo: 'EF04HI01',
          descricao: 'Identificar e descrever as relações sociais de parentesco, de amizade, de aliança, de trabalho, entre outros, que vinculam as pessoas aos grupos de convívio, à comunidade local e ao município.'
        },
        {
          codigo: 'EF04HI02',
          descricao: 'Identificar e descrever as relações sociais de parentesco, de amizade, de aliança, de trabalho, entre outros, que vinculam as pessoas aos grupos de convívio, à comunidade local e ao município.'
        }
      ]
    },
    {
      codigo: 'GEO',
      nome: 'Geografia',
      area: 'Ciências Humanas',
      ano: '3º Ano EF',
      unidades_tematicas: ['O lugar e suas paisagens', 'Natureza, ambientes e qualidade de vida'],
      objetos_conhecimento: ['Paisagens urbanas e rurais', 'Elementos naturais e culturais'],
      habilidades: [
        {
          codigo: 'EF03GE01',
          descricao: 'Identificar e descrever as características do lugar onde vive (moradia, escola, bairro, município), bem como as paisagens urbanas e rurais de seu entorno.'
        },
        {
          codigo: 'EF03GE02',
          descricao: 'Identificar e descrever as características do lugar onde vive (moradia, escola, bairro, município), bem como as paisagens urbanas e rurais de seu entorno.'
        }
      ]
    },
    {
      codigo: 'GEO',
      nome: 'Geografia',
      area: 'Ciências Humanas',
      ano: '4º Ano EF',
      unidades_tematicas: ['O lugar e suas paisagens', 'Natureza, ambientes e qualidade de vida'],
      objetos_conhecimento: ['Paisagens urbanas e rurais', 'Elementos naturais e culturais'],
      habilidades: [
        {
          codigo: 'EF04GE01',
          descricao: 'Identificar e descrever as características do lugar onde vive (moradia, escola, bairro, município), bem como as paisagens urbanas e rurais de seu entorno.'
        },
        {
          codigo: 'EF04GE02',
          descricao: 'Identificar e descrever as características do lugar onde vive (moradia, escola, bairro, município), bem como as paisagens urbanas e rurais de seu entorno.'
        }
      ]
    }
  ];

  // Primeiro, vamos limpar as tabelas existentes
  await prisma.habilidadeBNCC.deleteMany();
  await prisma.disciplinaBNCC.deleteMany();
  await prisma.competenciaBNCC.deleteMany();

  // Agora vamos inserir as competências gerais da BNCC
  const competencias = [
    {
      id: '1',
      nome: 'Conhecimento',
      descricao: 'Conhecimento',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '2',
      nome: 'Pensamento científico, crítico e criativo',
      descricao: 'Pensamento científico, crítico e criativo',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '3',
      nome: 'Repertório cultural',
      descricao: 'Repertório cultural',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '4',
      nome: 'Comunicação',
      descricao: 'Comunicação',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '5',
      nome: 'Cultura digital',
      descricao: 'Cultura digital',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '6',
      nome: 'Trabalho e projeto de vida',
      descricao: 'Trabalho e projeto de vida',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '7',
      nome: 'Argumentação',
      descricao: 'Argumentação',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '8',
      nome: 'Autoconhecimento e autocuidado',
      descricao: 'Autoconhecimento e autocuidado',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '9',
      nome: 'Empatia e cooperação',
      descricao: 'Empatia e cooperação',
      ensino: 'fundamental',
      area: 'Geral'
    },
    {
      id: '10',
      nome: 'Responsabilidade e cidadania',
      descricao: 'Responsabilidade e cidadania',
      ensino: 'fundamental',
      area: 'Geral'
    }
  ];

  for (const competencia of competencias) {
    await prisma.competenciaBNCC.create({
      data: competencia
    });
  }

  // Agora vamos inserir as disciplinas e suas habilidades
  for (const disciplina of disciplinas) {
    const { habilidades, ...disciplinaData } = disciplina;
    
    const disciplinaCriada = await prisma.disciplinaBNCC.create({
      data: {
        ...disciplinaData,
        habilidades: {
          create: habilidades
        }
      }
    });

    console.log(`Disciplina criada: ${disciplinaCriada.nome} - ${disciplinaCriada.ano}`);
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