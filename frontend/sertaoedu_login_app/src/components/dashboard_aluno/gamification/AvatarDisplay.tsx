import React from 'react';

interface AvatarDisplayProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export function AvatarDisplay({ level, size = 'medium', animated = true }: AvatarDisplayProps) {
  // Lógica para determinar qual avatar mostrar com base no nível
  // Em uma implementação real, teríamos diferentes avatares para diferentes níveis
  
  // Tamanhos baseados na prop size
  const avatarSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };
  
  // Cores baseadas no nível (apenas para demonstração)
  const getAvatarColor = () => {
    if (level < 3) return 'bg-teal-400';
    if (level < 6) return 'bg-cyan-400';
    if (level < 9) return 'bg-purple-400';
    return 'bg-amber-400';
  };
  
  // Elementos decorativos baseados no nível
  const getAvatarDecorations = () => {
    if (level < 3) return '👶';
    if (level < 6) return '🧒';
    if (level < 9) return '👦';
    return '🦸';
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${avatarSizes[size]} rounded-full flex items-center justify-center ${getAvatarColor()} text-white font-bold ${animated ? 'hover:scale-110 transition-transform duration-300' : ''} shadow-md`}
      >
        <span className="text-xl" role="img" aria-label="avatar">
          {getAvatarDecorations()}
        </span>
      </div>
      {level > 0 && (
        <div className="mt-1 text-xs font-medium text-teal-700">
          Nível {level}
        </div>
      )}
    </div>
  );
}
