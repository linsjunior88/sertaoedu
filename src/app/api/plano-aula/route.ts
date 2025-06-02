import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const planoAula = await request.json();

    const planoSalvo = await prisma.planoAula.create({
      data: {
        titulo: planoAula.titulo,
        descricao: planoAula.descricao,
        serie: planoAula.serie,
        disciplina: planoAula.disciplina,
        bimestre: planoAula.bimestre,
        objetivos: planoAula.objetivos,
        conteudo: planoAula.conteudo,
        metodologia: planoAula.metodologia,
        avaliacao: planoAula.avaliacao,
        trilhaId: planoAula.trilhaId,
        atividades: {
          create: planoAula.atividades.map((atividade: any) => ({
            titulo: atividade.titulo,
            descricao: atividade.descricao,
            status: atividade.status,
            codigoBNCC: atividade.codigoBNCC,
            descricaoBNCC: atividade.descricaoBNCC,
          })),
        },
      },
      include: {
        atividades: true,
      },
    });

    return NextResponse.json(planoSalvo);
  } catch (error) {
    console.error("Erro ao salvar plano de aula:", error);
    return NextResponse.json(
      { error: "Erro ao salvar plano de aula" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serie = searchParams.get("serie");
    const disciplina = searchParams.get("disciplina");
    const bimestre = searchParams.get("bimestre");

    const where: any = {};
    if (serie) where.serie = serie;
    if (disciplina) where.disciplina = disciplina;
    if (bimestre) where.bimestre = Number(bimestre);

    const planosAula = await prisma.planoAula.findMany({
      where,
      include: {
        atividades: true,
      },
    });

    return NextResponse.json(planosAula);
  } catch (error) {
    console.error("Erro ao buscar planos de aula:", error);
    return NextResponse.json(
      { error: "Erro ao buscar planos de aula" },
      { status: 500 }
    );
  }
} 