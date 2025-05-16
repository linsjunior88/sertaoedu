import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

// Interface para os dados de sugestão de conteúdo
interface ContentSuggestion {
  id: number;
  title: string;
  type: string;
  subject: string;
  description: string;
  imageUrl?: string;
  icon: string;
}

export function SugestoesCard() {
  // Dados fictícios para sugestões de conteúdo
  const suggestions: ContentSuggestion[] = [
    { 
      id: 1, 
      title: 'Frações na Prática', 
      type: 'Vídeo',
      subject: 'Matemática',
      description: 'Aprenda como aplicar frações em situações do dia a dia.',
      icon: '🎬'
    },
    { 
      id: 2, 
      title: 'O Pequeno Príncipe', 
      type: 'Livro',
      subject: 'Português',
      description: 'Uma história encantadora sobre amizade e descobertas.',
      icon: '📚'
    },
    { 
      id: 3, 
      title: 'Experimentos Simples', 
      type: 'Atividade',
      subject: 'Ciências',
      description: 'Experimentos científicos que você pode fazer em casa.',
      icon: '🧪'
    },
    { 
      id: 4, 
      title: 'Quiz Interativo', 
      type: 'Jogo',
      subject: 'História',
      description: 'Teste seus conhecimentos sobre história do Brasil.',
      icon: '🎮'
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-teal-50">
      <h3 className="text-xl font-semibold text-teal-700 mb-6">Sugestões para Você</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className="p-3 rounded-lg border border-teal-100 bg-gradient-to-r from-white to-purple-50 hover:shadow-md transition-all duration-200 hover:scale-[1.01] flex flex-col h-full"
          >
            <div className="flex items-start">
              <span className="text-2xl mr-3" role="img" aria-label={suggestion.type}>
                {suggestion.icon}
              </span>
              <div>
                <h4 className="font-medium text-teal-800">{suggestion.title}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                    {suggestion.type}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    {suggestion.subject}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{suggestion.description}</p>
              </div>
            </div>
            
            <div className="mt-auto pt-2 text-right">
              <button className="text-xs text-teal-600 hover:text-teal-800 font-medium inline-flex items-center bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-full transition-colors">
                Explorar
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-sm text-teal-600 hover:text-teal-800 font-medium inline-flex items-center justify-center bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors">
          <BookOpen className="w-4 h-4 mr-1" />
          Explorar biblioteca completa
        </button>
      </div>
    </div>
  );
}
