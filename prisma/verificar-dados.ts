import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verificarDados() {
  try {
    console.log('🔍 Verificando dados importados...\n');

    // Contar registros
    const totalDisciplinas = await prisma.disciplinaBNCC.count();
    const totalHabilidades = await prisma.habilidadeBNCC.count();
    const totalCompetencias = await prisma.competenciaBNCC.count();

    console.log('📊 RESUMO GERAL:');
    console.log(`📚 Total de Disciplinas: ${totalDisciplinas}`);
    console.log(`🎯 Total de Habilidades: ${totalHabilidades}`);
    console.log(`💡 Total de Competências: ${totalCompetencias}\n`);

    // Verificar disciplinas por área
    console.log('📚 DISCIPLINAS POR ÁREA:');
    const disciplinasPorArea = await prisma.disciplinaBNCC.groupBy({
      by: ['area'],
      _count: {
        id: true
      }
    });

    disciplinasPorArea.forEach(area => {
      console.log(`   ${area.area}: ${area._count.id} disciplinas`);
    });

    // Verificar disciplinas por ensino
    console.log('\n📚 DISCIPLINAS POR ENSINO:');
    const disciplinasFundamental = await prisma.disciplinaBNCC.count({
      where: {
        ano: {
          contains: 'EF'
        }
      }
    });

    const disciplinasMedio = await prisma.disciplinaBNCC.count({
      where: {
        ano: {
          not: {
            contains: 'EF'
          }
        }
      }
    });

    console.log(`   Ensino Fundamental: ${disciplinasFundamental} disciplinas`);
    console.log(`   Ensino Médio: ${disciplinasMedio} disciplinas`);

    // Verificar competências por ensino
    console.log('\n💡 COMPETÊNCIAS POR ENSINO:');
    const competenciasPorEnsino = await prisma.competenciaBNCC.groupBy({
      by: ['ensino'],
      _count: {
        id: true
      }
    });

    competenciasPorEnsino.forEach(ensino => {
      console.log(`   ${ensino.ensino}: ${ensino._count.id} competências`);
    });

    // Mostrar algumas disciplinas de exemplo
    console.log('\n📚 EXEMPLOS DE DISCIPLINAS:');
    const exemplosDisciplinas = await prisma.disciplinaBNCC.findMany({
      take: 5,
      include: {
        _count: {
          select: {
            habilidades: true
          }
        }
      }
    });

    exemplosDisciplinas.forEach(disciplina => {
      console.log(`   ${disciplina.nome} (${disciplina.ano}) - ${disciplina._count.habilidades} habilidades`);
    });

    // Mostrar algumas habilidades de exemplo
    console.log('\n🎯 EXEMPLOS DE HABILIDADES:');
    const exemplosHabilidades = await prisma.habilidadeBNCC.findMany({
      take: 3,
      include: {
        disciplina: {
          select: {
            nome: true,
            ano: true
          }
        }
      }
    });

    exemplosHabilidades.forEach(habilidade => {
      console.log(`   ${habilidade.codigo}: ${habilidade.descricao.substring(0, 80)}...`);
      console.log(`     Disciplina: ${habilidade.disciplina.nome} (${habilidade.disciplina.ano})\n`);
    });

    console.log('✅ Verificação concluída!');

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verificarDados(); 