import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Primeiro, excluir todos os tópicos da trilha
    await prisma.topico.deleteMany({
      where: {
        trilhaId: id,
      },
    });

    // Depois, excluir a trilha
    await prisma.trilha.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Trilha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir trilha:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir trilha' },
      { status: 500 }
    );
  }
} 