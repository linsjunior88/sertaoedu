import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Função para gerar plano de aula usando IA (simulação)
async function gerarPlanoComIA(habilidades: any[], serie: string, disciplina: string, tema?: string) {
  // Aqui você pode integrar com diferentes provedores de IA:
  // 1. OpenAI GPT-4
  // 2. Google Gemini
  // 3. Anthropic Claude
  // 4. Cohere
  // 5. Hugging Face
  
  const prompt = `
Crie um plano de aula completo e detalhado para:

**Série:** ${serie}
**Disciplina:** ${disciplina}
**Tema:** ${tema || 'Baseado nas habilidades BNCC'}

**Habilidades BNCC a serem trabalhadas:**
${habilidades.map(h => `- ${h.codigo}: ${h.descricao}`).join('\n')}

**Estrutura do plano de aula:**

1. **IDENTIFICAÇÃO**
   - Título da aula
   - Duração estimada
   - Público-alvo

2. **OBJETIVOS**
   - Objetivo geral
   - Objetivos específicos (baseados nas habilidades BNCC)

3. **CONTEÚDOS**
   - Conceituais
   - Procedimentais
   - Atitudinais

4. **METODOLOGIA**
   - Estratégias didáticas
   - Recursos necessários
   - Organização da sala

5. **DESENVOLVIMENTO DA AULA**
   - Momento inicial (motivação/problematização)
   - Desenvolvimento (atividades principais)
   - Fechamento (síntese/avaliação)

6. **AVALIAÇÃO**
   - Critérios de avaliação
   - Instrumentos avaliativos
   - Indicadores de aprendizagem

7. **RECURSOS DIDÁTICOS**
   - Materiais necessários
   - Tecnologias digitais
   - Recursos multimídia

8. **REFERÊNCIAS E LINKS ÚTEIS**
   - Bibliografia básica
   - Sites educacionais
   - Vídeos e materiais complementares

9. **ATIVIDADES COMPLEMENTARES**
   - Para casa
   - Projetos interdisciplinares
   - Atividades de reforço

10. **ADAPTAÇÕES**
    - Para estudantes com necessidades especiais
    - Diferentes níveis de aprendizagem

Forneça um plano detalhado, prático e aplicável, com sugestões específicas de atividades, recursos e avaliações.
`;

  // Simulação de resposta da IA (substitua pela integração real)
  const planoGerado = {
    titulo: `Plano de Aula - ${disciplina} - ${serie}`,
    duracao: "50 minutos",
    objetivoGeral: `Desenvolver as competências e habilidades previstas na BNCC para ${disciplina} na ${serie}.`,
    objetivosEspecificos: habilidades.map(h => `Trabalhar a habilidade ${h.codigo}: ${h.descricao.substring(0, 100)}...`),
    conteudos: {
      conceituais: ["Conceitos fundamentais da disciplina", "Teorias e princípios básicos"],
      procedimentais: ["Análise e interpretação", "Resolução de problemas", "Produção textual"],
      atitudinais: ["Colaboração", "Pensamento crítico", "Responsabilidade"]
    },
    metodologia: [
      "Aula expositiva dialogada",
      "Atividades em grupo",
      "Uso de tecnologias digitais",
      "Aprendizagem baseada em problemas"
    ],
    desenvolvimento: {
      inicial: "Problematização inicial com questões motivadoras relacionadas ao tema",
      principal: "Desenvolvimento dos conceitos através de atividades práticas e colaborativas",
      fechamento: "Síntese dos aprendizados e avaliação formativa"
    },
    avaliacao: {
      criterios: ["Participação nas atividades", "Compreensão dos conceitos", "Aplicação prática"],
      instrumentos: ["Observação direta", "Produção de textos", "Apresentações"],
      indicadores: habilidades.map(h => `Demonstra domínio da habilidade ${h.codigo}`)
    },
    recursos: [
      "Quadro/lousa",
      "Projetor multimídia",
      "Computador/tablet",
      "Material impresso",
      "Acesso à internet"
    ],
    referencias: [
      "Base Nacional Comum Curricular (BNCC)",
      "Livro didático adotado",
      "Portal do Professor (MEC)",
      "Nova Escola",
      "Khan Academy Brasil"
    ],
    links: [
      "https://basenacionalcomum.mec.gov.br/",
      "https://portaldoprofessor.mec.gov.br/",
      "https://novaescola.org.br/",
      "https://pt.khanacademy.org/"
    ],
    atividadesComplementares: [
      "Pesquisa dirigida sobre o tema",
      "Elaboração de mapa conceitual",
      "Projeto interdisciplinar"
    ],
    adaptacoes: [
      "Materiais em formatos acessíveis",
      "Atividades diferenciadas por nível",
      "Apoio individualizado quando necessário"
    ]
  };

  return planoGerado;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { habilidadeIds, serie, disciplina, tema, configuracoes } = data;

    if (!habilidadeIds || !Array.isArray(habilidadeIds) || habilidadeIds.length === 0) {
      return NextResponse.json(
        { error: "É necessário fornecer pelo menos uma habilidade" },
        { status: 400 }
      );
    }

    // Primeiro, buscar os tópicos das trilhas para obter os códigos BNCC
    const topicos = await prisma.topico.findMany({
      where: {
        id: {
          in: habilidadeIds
        }
      },
      select: {
        id: true,
        codigoBNCC: true,
        descricaoBNCC: true
      }
    });

    if (topicos.length === 0) {
      return NextResponse.json(
        { error: "Nenhum tópico encontrado" },
        { status: 404 }
      );
    }

    // Extrair os códigos BNCC dos tópicos
    const codigosBNCC = topicos.map(topico => topico.codigoBNCC).filter((codigo): codigo is string => codigo !== null && codigo !== undefined);

    // Buscar as habilidades BNCC pelos códigos
    const habilidades = await prisma.habilidadeBNCC.findMany({
      where: {
        codigo: {
          in: codigosBNCC
        }
      },
      select: {
        id: true,
        codigo: true,
        descricao: true
      }
    });

    // Se não encontrar habilidades BNCC, usar os dados dos tópicos
    const habilidadesParaIA = habilidades.length > 0 ? habilidades : topicos.map(topico => ({
      id: topico.id,
      codigo: topico.codigoBNCC,
      descricao: topico.descricaoBNCC
    }));

    if (habilidadesParaIA.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma habilidade encontrada" },
        { status: 404 }
      );
    }

    // Usar valores padrão se não fornecidos
    const serieParaUso = serie || "Ensino Fundamental";
    const disciplinaParaUso = disciplina || "Geral";

    // Gerar plano de aula com IA
    const planoGerado = await gerarPlanoComIA(habilidadesParaIA, serieParaUso, disciplinaParaUso, tema);

    // Salvar o plano gerado no banco (opcional)
    try {
      const planoSalvo = await prisma.planoAula.create({
        data: {
          titulo: planoGerado.titulo,
          descricao: tema || 'Plano de aula baseado em habilidades BNCC',
          serie: serieParaUso,
          disciplina: disciplinaParaUso,
          bimestre: 1,
          objetivos: [planoGerado.objetivoGeral, ...planoGerado.objetivosEspecificos],
          conteudo: [
            `Conceituais: ${planoGerado.conteudos.conceituais.join(', ')}`,
            `Procedimentais: ${planoGerado.conteudos.procedimentais.join(', ')}`,
            `Atitudinais: ${planoGerado.conteudos.atitudinais.join(', ')}`
          ],
          metodologia: planoGerado.metodologia,
          avaliacao: [
            `Critérios: ${planoGerado.avaliacao.criterios.join(', ')}`,
            `Instrumentos: ${planoGerado.avaliacao.instrumentos.join(', ')}`,
            `Indicadores: ${planoGerado.avaliacao.indicadores.join(', ')}`
          ]
        }
      });

      return NextResponse.json({
        id: planoSalvo.id,
        plano: planoGerado,
        habilidades: habilidadesParaIA,
        metadata: {
          geradoEm: new Date().toISOString(),
          versao: "1.0",
          fonte: "IA Generativa"
        }
      });
    } catch (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      // Retornar o plano mesmo se não conseguir salvar no banco
      return NextResponse.json({
        plano: planoGerado,
        habilidades: habilidadesParaIA,
        metadata: {
          geradoEm: new Date().toISOString(),
          versao: "1.0",
          fonte: "IA Generativa",
          aviso: "Plano gerado mas não salvo no banco de dados"
        }
      });
    }

  } catch (error) {
    console.error('Erro ao gerar plano de aula:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor ao gerar plano de aula',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// GET - Buscar planos de aula salvos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serie = searchParams.get('serie');
    const disciplina = searchParams.get('disciplina');

    const where: any = {};
    
    if (serie) {
      where.serie = serie;
    }
    
    if (disciplina) {
      where.disciplina = disciplina;
    }

    const planos = await prisma.planoAula.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: 20 // Limitar a 20 resultados
    });

    return NextResponse.json(planos);
  } catch (error) {
    console.error('Erro ao buscar planos de aula:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 