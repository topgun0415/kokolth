import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white focus:ring-green-500 rounded-md';
      case 'secondary':
        return 'bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white focus:ring-amber-500';
      case 'outline':
        return 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white focus:ring-green-500';
      case 'text':
        return 'bg-transparent text-gray-500 hover:text-gray-600 hover:underline focus:ring-green-500';
      default:
        return 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white focus:ring-green-500';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'text-sm py-1 px-3';
      case 'md':
        return 'text-base py-2 px-4';
      case 'lg':
        return 'text-lg py-3 px-6';
      default:
        return 'text-base py-2 px-4';
    }
  };

  return (
    <button
      type={type}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};
