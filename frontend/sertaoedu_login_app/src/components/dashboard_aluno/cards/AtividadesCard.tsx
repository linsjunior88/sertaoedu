import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { ActivityStatusTag } from '../ui_elements/ActivityStatusTag';

// Interface para os dados de atividade
interface Activity {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pendente' | 'atrasado' | 'concluido';
  icon?: string;
}

export function AtividadesCard() {
  // Dados fictícios para atividades
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(currentDate.getDate() + 7);
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const activities: Activity[] = [
    { 
      id: 1, 
      title: 'Exercícios de Frações', 
      subject: 'Matemática',
      dueDate: formatDate(yesterday), 
      status: 'atrasado',
      icon: '📊'
    },
    { 
      id: 2, 
      title: 'Leitura do Capítulo 3', 
      subject: 'Português',
      dueDate: formatDate(tomorrow), 
      status: 'pendente',
      icon: '📚'
    },
    { 
      id: 3, 
      title: 'Questionário sobre Células', 
      subject: 'Ciências',
      dueDate: formatDate(nextWeek), 
      status: 'pendente',
      icon: '🔬'
    },
    { 
      id: 4, 
      title: 'Redação sobre Meio Ambiente', 
      subject: 'Português',
      dueDate: formatDate(currentDate), 
      status: 'pendente',
      icon: '✏️'
    },
    { 
      id: 5, 
      title: 'Quiz de História do Brasil', 
      subject: 'História',
      dueDate: '15/05', 
      status: 'concluido',
      icon: '🏛️'
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-teal-50">
      <h3 className="text-xl font-semibold text-teal-700 mb-6">Minhas Atividades</h3>
      
      <div className="space-y-3 max-h-[20rem] overflow-y-auto pr-2">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`p-3 rounded-lg border border-teal-50 ${
              activity.status === 'concluido' ? 'opacity-70 bg-gray-50' : 'bg-gradient-to-r from-white to-teal-50'
            } hover:shadow-md transition-all duration-200 hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xl mr-3" role="img" aria-label={activity.subject}>
                  {activity.icon}
                </span>
                <div>
                  <h4 className={`font-medium ${activity.status === 'concluido' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-500">{activity.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ActivityStatusTag status={activity.status} />
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {activity.dueDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-teal-600 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors">
          Ver todas as atividades
        </button>
      </div>
    </div>
  );
}
