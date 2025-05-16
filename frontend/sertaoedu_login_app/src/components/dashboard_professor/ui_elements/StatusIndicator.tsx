import React from 'react';

interface StatusIndicatorProps {
  status: 'green' | 'yellow' | 'red' | string; // Allow string for flexibility if more statuses are added
  size?: 'small' | 'medium'; // Optional size prop
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'medium' }) => {
  let bgColor = 'bg-gray-400'; // Default for unknown statuses
  let dimensions = 'w-3 h-3';

  if (status === 'green') bgColor = 'bg-green-500';
  if (status === 'yellow') bgColor = 'bg-yellow-500';
  if (status === 'red') bgColor = 'bg-red-500';

  if (size === 'small') dimensions = 'w-2 h-2';

  return <span className={`rounded-full inline-block ${bgColor} ${dimensions}`}></span>;
};

