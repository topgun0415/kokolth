import React, { JSX } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonIcon = 'email';

interface ButtonProps {
  size?: ButtonSize;
  icon?: ButtonIcon;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  icon = '',
  className = '',
  children,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const getSize = (): string => {
    switch (size) {
      case 'sm':
        return 'text-sm py-1 px-3 h-4';
      case 'md':
        return 'text-base py-2 px-4 h-8';
      case 'lg':
        return 'text-lg py-2 px-6 h-12';
      default:
        return 'text-base py-2 px-4 h-6';
    }
  };

  const getIcon = (): JSX.Element | null => {
    if (icon === 'email') {
      return <EnvelopeIcon className='h-5 w-5 mr-2' />;
    }
    return null;
  };

  const baseStyles = `
    rounded-full bg-white border border-gray-400 text-gray-600 transition
    active:scale-110 hover:bg-gray-400 hover:text-white hover:cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    flex items-center justify-center 
    ${getSize()}
    font-[JosefinSans-VariableFont]
  `;

  return (
    <button
      type={type}
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      <span className='flex items-center justify-center'>
        {getIcon()}
        {children}
      </span>
    </button>
  );
};

export default Button;
