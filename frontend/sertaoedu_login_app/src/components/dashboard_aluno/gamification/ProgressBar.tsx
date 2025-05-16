import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  theme?: 'default' | 'rocket' | 'stars';
}

export function ProgressBar({
  progress,
  color = 'teal',
  height = 8,
  showPercentage = true,
  animated = true,
  theme = 'default'
}: ProgressBarProps) {
  // Garantir que o progresso está entre 0 e 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  // Cores baseadas no tema
  let progressColor = '';
  let backgroundClass = '';
  
  switch (theme) {
    case 'rocket':
      progressColor = 'bg-gradient-to-r from-orange-300 to-pink-400';
      backgroundClass = 'bg-gray-100';
      break;
    case 'stars':
      progressColor = 'bg-gradient-to-r from-yellow-300 to-amber-400';
      backgroundClass = 'bg-indigo-50';
      break;
    default:
      progressColor = `bg-${color}-400`;
      backgroundClass = 'bg-gray-100';
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {theme === 'rocket' && (
          <div className="text-xs text-gray-600">
            <span role="img" aria-label="foguete">🚀</span>
          </div>
        )}
        {theme === 'stars' && (
          <div className="text-xs text-gray-600">
            <span role="img" aria-label="estrela">⭐</span>
          </div>
        )}
        {showPercentage && (
          <div className="text-xs font-medium text-gray-600">{safeProgress}%</div>
        )}
      </div>
      <div 
        className={`w-full ${backgroundClass} rounded-full overflow-hidden`}
        style={{ height: `${height}px` }}
      >
        <div 
          className={`${progressColor} ${animated ? 'transition-all duration-500 ease-out' : ''} rounded-full`}
          style={{ 
            width: `${safeProgress}%`,
            height: '100%'
          }}
        />
      </div>
      {theme === 'rocket' && safeProgress >= 100 && (
        <div className="text-xs text-right mt-1 text-gray-600">
          <span role="img" aria-label="foguete chegou">🎯</span> Objetivo alcançado!
        </div>
      )}
      {theme === 'stars' && safeProgress >= 100 && (
        <div className="text-xs text-right mt-1 text-gray-600">
          <span role="img" aria-label="troféu">🏆</span> Conquista completa!
        </div>
      )}
    </div>
  );
}
