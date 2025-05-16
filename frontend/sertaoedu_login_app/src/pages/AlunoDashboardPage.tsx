import React from 'react';
import { AlunoSidebar } from '../components/dashboard_aluno/layout/AlunoSidebar';
import { AlunoHeader } from '../components/dashboard_aluno/layout/AlunoHeader';
import { ProgressoCard } from '../components/dashboard_aluno/cards/ProgressoCard';
import { AtividadesCard } from '../components/dashboard_aluno/cards/AtividadesCard';
import { ProjetosCard } from '../components/dashboard_aluno/cards/ProjetosCard';
import { SugestoesCard } from '../components/dashboard_aluno/cards/SugestoesCard';

export function AlunoDashboardPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <AlunoSidebar />
      {/* Conteúdo Principal com scroll, se necessário */}
      <div className="flex-1 flex flex-col w-full overflow-y-auto"> {/* Removido ml-60 para mobile first */}
        <AlunoHeader />
        {/* Padding top para compensar o header fixo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-14">
          {/* Layout em Grid para os Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            
            {/* Coluna 1: Progresso do Aluno */}
            <div className="xl:col-span-1">
              <ProgressoCard />
            </div>

            {/* Coluna 2: Atividades Pendentes */}
            <div className="xl:col-span-1">
              <AtividadesCard />
            </div>

            {/* Coluna 3: Projetos em Andamento */}
            <div className="md:col-span-2 xl:col-span-1">
              <ProjetosCard />
            </div>

            {/* Coluna 4: Sugestões de Conteúdo (ocupa toda a largura em desktop) */}
            <div className="md:col-span-2 xl:col-span-3">
              <SugestoesCard />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
