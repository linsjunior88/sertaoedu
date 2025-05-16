import React from 'react';
import { ProgressBar } from '../gamification/ProgressBar';
import { Star, Award, Trophy } from 'lucide-react';
import { AvatarDisplay } from '../gamification/AvatarDisplay';
import { LevelIndicator } from '../gamification/LevelIndicator';

export function ProgressoCard() {
  // Dados fictícios para o progresso do aluno
  const progressData = {
    overall: 72, // Progresso geral em percentagem
    subjects: [
      { name: 'Matemática', progress: 65, theme: 'default' },
      { name: 'Português', progress: 80, theme: 'stars' },
      { name: 'Ciências', progress: 45, theme: 'default' },
      { name: 'História', progress: 90, theme: 'rocket' }
    ],
    level: 5,
    stars: 27,
    badges: [
      { name: 'Explorador', icon: '🔍', description: 'Completou 10 atividades diferentes' },
      { name: 'Matemático', icon: '🧮', description: 'Acertou 20 problemas de matemática' },
      { name: 'Leitor Ávido', icon: '📚', description: 'Leu 5 livros completos' }
    ]
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-teal-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-teal-700">Meu Progresso</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-amber-400">
            <Star className="w-5 h-5 fill-current" />
            <span className="ml-1 text-sm font-bold">{progressData.stars}</span>
          </div>
          <LevelIndicator level={progressData.level} stars={progressData.stars} size="small" theme="colorful" />
        </div>
      </div>

      {/* Avatar e Progresso Geral */}
      <div className="flex items-center mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
        <div className="mr-4">
          <AvatarDisplay level={progressData.level} size="medium" animated={true} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-teal-700">Progresso Geral</h4>
            <span className="text-sm font-bold text-teal-600">{progressData.overall}%</span>
          </div>
          <ProgressBar 
            progress={progressData.overall} 
            height={10} 
            theme="rocket" 
            showPercentage={false}
          />
        </div>
      </div>

      {/* Progresso por Matéria */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-teal-700">Progresso por Matéria</h4>
        {progressData.subjects.map((subject, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">{subject.name}</span>
              <span className="text-xs font-medium text-gray-500">{subject.progress}%</span>
            </div>
            <ProgressBar 
              progress={subject.progress} 
              theme={subject.theme as 'default' | 'rocket' | 'stars'} 
              showPercentage={false}
            />
          </div>
        ))}
      </div>

      {/* Conquistas/Badges */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-teal-700 mb-3">Minhas Conquistas</h4>
        <div className="flex flex-wrap gap-2">
          {progressData.badges.map((badge, index) => (
            <div 
              key={index} 
              className="flex items-center bg-gradient-to-r from-teal-50 to-cyan-50 p-2 rounded-lg border border-teal-100 hover:scale-105 transition-transform"
              title={badge.description}
            >
              <span className="text-xl mr-2" role="img" aria-label={badge.name}>{badge.icon}</span>
              <span className="text-xs font-medium text-teal-700">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
