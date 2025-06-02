import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { titulo, descricao, serie, disciplina, habilidades } = data;

    // Criar a trilha
    const trilha = await prisma.trilha.create({
      data: {
        id: `trilha_${Date.now()}`,
        titulo,
        descricao,
        serie,
        disciplina,
        bimestre: 1,
        topicos: {
          create: habilidades.map((habilidade: any) => ({
            id: `topico_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            titulo: habilidade.codigo,
            descricao: habilidade.descricao,
            codigoBNCC: habilidade.codigo,
            descricaoBNCC: habilidade.descricao,
            status: 'PENDENTE'
          }))
        }
      },
      include: {
        topicos: true
      }
    });

    return NextResponse.json(trilha);
  } catch (error) {
    console.error('Erro ao criar trilha:', error);
    return NextResponse.json(
      { error: 'Erro ao criar trilha' },
      { status: 500 }
    );
  }
}

// GET - Buscar trilhas existentes
export async function GET(request: NextRequest) {
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

    const trilhas = await prisma.trilha.findMany({
      where,
      include: {
        topicos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(trilhas);
  } catch (error) {
    console.error('Erro ao buscar trilhas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 