import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ActivityStatusTagProps {
  status: 'pendente' | 'atrasado' | 'concluido';
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function ActivityStatusTag({ 
  status, 
  showIcon = true,
  size = 'medium'
}: ActivityStatusTagProps) {
  
  // Tamanhos baseados na prop size
  const sizeClasses = {
    small: 'text-xs px-1.5 py-0.5',
    medium: 'text-xs px-2 py-1',
    large: 'text-sm px-2.5 py-1.5'
  };
  
  // Cores baseadas no status
  const getStatusColor = () => {
    switch (status) {
      case 'pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'atrasado':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'concluido':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Ícone baseado no status
  const getStatusIcon = () => {
    switch (status) {
      case 'pendente':
        return <Clock className={size === 'small' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'atrasado':
        return <AlertCircle className={size === 'small' ? 'w-3 h-3' : 'w-4 h-4'} />;
      case 'concluido':
        return <CheckCircle className={size === 'small' ? 'w-3 h-3' : 'w-4 h-4'} />;
      default:
        return null;
    }
  };

  return (
    <span className={`${sizeClasses[size]} rounded-full ${getStatusColor()} flex items-center border shadow-sm`}>
      {showIcon && (
        <span className="mr-1">
          {getStatusIcon()}
        </span>
      )}
      <span className="capitalize">{status}</span>
    </span>
  );
}
