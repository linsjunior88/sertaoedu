import React from 'react';
import { Sidebar } from '../components/dashboard_professor/layout/Sidebar';
import { Header } from '../components/dashboard_professor/layout/Header';
import { PerformanceChartCard } from '../components/dashboard_professor/cards/PerformanceChartCard';
import { StudentListCard } from '../components/dashboard_professor/cards/StudentListCard';
import { NotificationsCard } from '../components/dashboard_professor/cards/NotificationsCard';
import { ShortcutsCard } from '../components/dashboard_professor/cards/ShortcutsCard';

export function ProfessorDashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Conteúdo Principal com scroll, se necessário */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 overflow-y-auto"> {/* ml-64 para sidebar em desktop, ml-0 para mobile se sidebar for overlay */}
        <Header />
        {/* Padding top para compensar o header fixo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 bg-gray-100">
          {/* Título da Página (Opcional, pode estar no Header ou aqui) */}
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visão Geral</h2> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Coluna 1: Gráficos de Desempenho */}
            <div className="xl:col-span-2">
              <PerformanceChartCard />
            </div>

            {/* Coluna 2: Notificações */}
            <div className="md:col-span-1 xl:col-span-1">
              <NotificationsCard />
            </div>

            {/* Coluna 3: Lista de Alunos (ocupa mais espaço) */}
            <div className="md:col-span-2 xl:col-span-2">
              <StudentListCard />
            </div>

            {/* Coluna 4: Atalhos */}
            <div className="md:col-span-1 xl:col-span-1">
              <ShortcutsCard />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

