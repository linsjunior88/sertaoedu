import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { ProgressBar } from '../gamification/ProgressBar';

// Interface para os dados de projeto
interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  subject: string;
  icon: string;
}

export function ProjetosCard() {
  // Dados fictícios para projetos
  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Maquete Sistema Solar', 
      description: 'Criar uma maquete representando o sistema solar com todos os planetas.',
      dueDate: '28/05', 
      progress: 65,
      subject: 'Ciências',
      icon: '🪐'
    },
    { 
      id: 2, 
      title: 'Jornal da Escola', 
      description: 'Escrever um artigo para o jornal da escola sobre um tema atual.',
      dueDate: '15/06', 
      progress: 30,
      subject: 'Português',
      icon: '📰'
    },
    { 
      id: 3, 
      title: 'Feira de Matemática', 
      description: 'Preparar uma apresentação sobre como a matemática é usada no dia a dia.',
      dueDate: '10/06', 
      progress: 10,
      subject: 'Matemática',
      icon: '🧮'
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-teal-50">
      <h3 className="text-xl font-semibold text-teal-700 mb-6">Meus Projetos</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="p-4 rounded-lg border border-teal-100 bg-gradient-to-r from-white to-cyan-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="flex items-start">
              <span className="text-2xl mr-3 mt-1" role="img" aria-label={project.subject}>
                {project.icon}
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-teal-800">{project.title}</h4>
                  <span className="text-xs font-medium bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.dueDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                
                {/* Barra de Progresso */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">{project.subject}</span>
                    <span className="text-xs font-medium text-teal-700">{project.progress}%</span>
                  </div>
                  <ProgressBar 
                    progress={project.progress} 
                    color="teal"
                    showPercentage={false}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-right">
              <button className="text-xs text-teal-600 hover:text-teal-800 font-medium inline-flex items-center bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-full transition-colors">
                Continuar projeto
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-teal-600 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors">
          Ver todos os projetos
        </button>
      </div>
    </div>
  );
}
