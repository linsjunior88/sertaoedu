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

    console.log('Buscando dados para:', { serie, disciplina });

    // Buscar unidades temáticas
    const unidadesTematicas = await prisma.unidadeTematica.findMany({
      where: {
        serie: serie,
        disciplina: disciplina,
      },
      include: {
        objetos: {
          include: {
            habilidades: true,
          },
        },
      },
    });

    console.log('Unidades temáticas encontradas:', unidadesTematicas.length);

    return NextResponse.json({ unidadesTematicas });
  } catch (error) {
    console.error("Erro ao buscar dados da BNCC:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da BNCC" },
      { status: 500 }
    );
  }
} 