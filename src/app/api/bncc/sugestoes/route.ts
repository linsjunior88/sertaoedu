import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serie = searchParams.get("serie");
    const disciplina = searchParams.get("disciplina");

    if (!serie || !disciplina) {
      return NextResponse.json(
        { error: "Série e disciplina são obrigatórios" },
        { status: 400 }
      );
    }

    console.log('Buscando sugestões para:', { serie, disciplina });

    // Mapear disciplinas para nomes no banco
    const disciplinaMap: Record<string, string[]> = {
      'portugues': ['Língua Portuguesa', 'Linguagens e suas Tecnologias'],
      'ingles': ['Língua Inglesa', 'Linguagens e suas Tecnologias'],
      'matematica': ['Matemática', 'Matemática e suas Tecnologias'],
      'ciencias': ['Ciências', 'Ciências da Natureza e suas Tecnologias'],
      'arte': ['Arte', 'Linguagens e suas Tecnologias'],
      'geografia': ['Geografia', 'Ciências Humanas e Sociais Aplicadas'],
      'historia': ['História', 'Ciências Humanas e Sociais Aplicadas'],
      'ensino_religioso': ['Ensino Religioso'],
      'computacao': ['Computação', 'Computação Ensino Médio'],
      'educacao_fisica': ['Educação Física', 'Linguagens e suas Tecnologias']
    };

    const nomesDisciplina = disciplinaMap[disciplina] || [disciplina];

    // Determinar padrões de busca para a série
    let padroesSerie: string[] = [];
    
    if (serie.includes('EF')) {
      // Ensino Fundamental
      const anoNum = parseInt(serie.replace('º Ano EF', ''));
      padroesSerie = [
        `${anoNum}º Ano EF`,
        `${anoNum}º, ${anoNum + 1}º`,
        `${anoNum - 1}º, ${anoNum}º`,
        `${anoNum}º`,
        `${anoNum}º, ${anoNum + 1}º, ${anoNum + 2}º`,
        `${anoNum - 1}º, ${anoNum}º, ${anoNum + 1}º`,
        `1º, 2º, 3º, 4º, 5º`,
        `6º, 7º, 8º, 9º`
      ];
    } else {
      // Ensino Médio
      padroesSerie = [
        serie,
        '1º, 2º, 3º',
        '1º Ano EM',
        '2º Ano EM', 
        '3º Ano EM'
      ];
    }

    // Buscar disciplinas que correspondem aos critérios (sem incluir habilidades)
    const disciplinasEncontradas = await prisma.disciplinaBNCC.findMany({
      where: {
        AND: [
          {
            OR: nomesDisciplina.map(nome => ({
              nome: {
                contains: nome,
                mode: 'insensitive'
              }
            }))
          },
          {
            OR: padroesSerie.map(padrao => ({
              ano: {
                contains: padrao,
                mode: 'insensitive'
              }
            }))
          }
        ]
      },
      select: {
        id: true,
        codigo: true,
        nome: true,
        area: true,
        ano: true,
        unidades_tematicas: true,
        objetos_conhecimento: true,
        _count: {
          select: {
            habilidades: true
          }
        }
      },
      orderBy: {
        ano: 'asc'
      }
    });

    console.log(`Encontradas ${disciplinasEncontradas.length} disciplinas`);

    // Organizar dados por unidades temáticas e objetos de conhecimento (sem habilidades)
    const estruturaOrganizada = organizarEstrutura(disciplinasEncontradas, serie, disciplina);

    return NextResponse.json(estruturaOrganizada);
  } catch (error) {
    console.error("Erro ao buscar sugestões da BNCC:", error);
    return NextResponse.json(
      { error: "Erro ao buscar sugestões da BNCC" },
      { status: 500 }
    );
  }
}

function organizarEstrutura(disciplinas: any[], serie: string, disciplina: string) {
  // Agrupar por unidades temáticas
  const unidadesMap = new Map();
  
  disciplinas.forEach(disc => {
    disc.unidades_tematicas.forEach((unidade: string) => {
      if (!unidadesMap.has(unidade)) {
        unidadesMap.set(unidade, {
          nome: unidade,
          objetos: new Map()
        });
      }
      
      const unidadeData = unidadesMap.get(unidade);
      
      disc.objetos_conhecimento.forEach((objeto: string) => {
        if (!unidadeData.objetos.has(objeto)) {
          unidadeData.objetos.set(objeto, {
            nome: objeto,
            disciplinaId: disc.id,
            totalHabilidades: disc._count.habilidades
          });
        }
      });
    });
  });

  // Converter Maps para arrays
  const unidadesArray = Array.from(unidadesMap.values()).map(unidade => ({
    ...unidade,
    objetos: Array.from(unidade.objetos.values())
  }));

  return {
    serie,
    disciplina,
    unidades: unidadesArray,
    totalUnidades: unidadesArray.length,
    totalObjetos: unidadesArray.reduce((acc, u) => acc + u.objetos.length, 0)
  };
} 