import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const disciplinaId = searchParams.get("disciplinaId");
    const objetoConhecimento = searchParams.get("objetoConhecimento");

    if (!disciplinaId || !objetoConhecimento) {
      return NextResponse.json(
        { error: "disciplinaId e objetoConhecimento são obrigatórios" },
        { status: 400 }
      );
    }

    console.log('Buscando habilidades para:', { disciplinaId, objetoConhecimento });

    // Buscar habilidades da disciplina específica
    const habilidades = await prisma.habilidadeBNCC.findMany({
      where: {
        disciplinaId: disciplinaId,
        OR: [
          {
            descricao: {
              contains: objetoConhecimento,
              mode: 'insensitive'
            }
          },
          {
            codigo: {
              contains: objetoConhecimento.substring(0, 10), // Buscar por parte do código
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        codigo: true,
        descricao: true
      },
      orderBy: {
        codigo: 'asc'
      }
    });

    // Se não encontrar habilidades específicas, buscar todas da disciplina
    if (habilidades.length === 0) {
      const todasHabilidades = await prisma.habilidadeBNCC.findMany({
        where: {
          disciplinaId: disciplinaId
        },
        select: {
          id: true,
          codigo: true,
          descricao: true
        },
        orderBy: {
          codigo: 'asc'
        },
        take: 20 // Limitar para não sobrecarregar
      });

      return NextResponse.json(todasHabilidades);
    }

    console.log(`Encontradas ${habilidades.length} habilidades`);

    return NextResponse.json(habilidades);
  } catch (error) {
    console.error("Erro ao buscar habilidades:", error);
    return NextResponse.json(
      { error: "Erro ao buscar habilidades" },
      { status: 500 }
    );
  }
} 