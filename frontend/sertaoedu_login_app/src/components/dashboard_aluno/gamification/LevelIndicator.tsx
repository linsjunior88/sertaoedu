import React from 'react';
import { AvatarDisplay } from '../gamification/AvatarDisplay';

interface LevelIndicatorProps {
  level: number;
  stars?: number;
  maxLevel?: number;
  showStars?: boolean;
  size?: 'small' | 'medium' | 'large';
  theme?: 'default' | 'colorful';
}

export function LevelIndicator({ 
  level, 
  stars = 0, 
  maxLevel = 10, 
  showStars = true, 
  size = 'medium',
  theme = 'default'
}: LevelIndicatorProps) {
  
  // Tamanhos baseados na prop size
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };
  
  // Cores baseadas no nível e tema
  const getLevelColor = () => {
    if (theme === 'colorful') {
      if (level < 3) return 'bg-gradient-to-r from-teal-400 to-cyan-300 text-white';
      if (level < 6) return 'bg-gradient-to-r from-cyan-400 to-blue-300 text-white';
      if (level < 9) return 'bg-gradient-to-r from-purple-400 to-pink-300 text-white';
      return 'bg-gradient-to-r from-amber-400 to-yellow-300 text-white';
    }
    
    return 'bg-teal-100 text-teal-700';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${getLevelColor()} ${sizeClasses[size]} font-bold px-2 py-1 rounded-full shadow-sm`}>
        Nível {level}
      </div>
      
      {maxLevel > 0 && (
        <div className="ml-1 bg-gray-100 rounded-full h-1.5 w-16">
          <div 
            className="bg-gradient-to-r from-teal-400 to-cyan-300 h-1.5 rounded-full"
            style={{ width: `${(level / maxLevel) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
