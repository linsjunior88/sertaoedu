import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, name, size = 40, className, ...props }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';
  return src ? (
    <img
      src={src}
      alt={alt || name || 'Avatar'}
      width={size}
      height={size}
      className={cn('rounded-full object-cover', className)}
      {...props}
    />
  ) : (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold',
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      {...props}
    >
      {initials}
    </div>
  );
}; 