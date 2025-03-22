import React from 'react';

export type TypographyFont =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'josefin'
  | 'josefinItalic';
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'subtitle'
  | 'body'
  | 'caption';
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'bold';
export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'white'
  | 'black'
  | 'gray';

interface TypographyProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  font?: TypographyFont;
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'black',
  font = 'medium',
  className = '',
  children,
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'h1':
        return 'text-4xl md:text-5xl lg:text-6xl';
      case 'h2':
        return 'text-3xl md:text-4xl lg:text-5xl';
      case 'h3':
        return 'text-2xl md:text-3xl';
      case 'h4':
        return 'text-xl md:text-2xl';
      case 'h5':
        return 'text-lg md:text-xl';
      case 'subtitle':
        return 'text-lg';
      case 'body':
        return 'text-base';
      case 'caption':
        return 'text-sm';
      default:
        return 'text-base';
    }
  };

  const getWeightStyles = (): string => {
    switch (weight) {
      case 'light':
        return 'font-light';
      case 'regular':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };

  const getColorStyles = (): string => {
    switch (color) {
      case 'primary':
        return 'text-gray-600';
      case 'secondary':
        return 'text-amber-800';
      case 'accent':
        return 'text-emerald-600';
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      case 'gray':
        return 'text-gray-600';
      default:
        return 'text-black';
    }
  };

  const getFontStyles = (): string => {
    switch (font) {
      case 'light':
        return 'font-[GenJyuuGothicXMonospaceLight]';
      case 'medium':
        return 'font-[GenJyuuGothicXMonospaceMedium]';
      case 'heavy':
        return 'font-[GenJyuuGothicXMonospaceHeavy]';
      case 'josefin':
        return 'font-[JosefinSans-VariableFont]';
      case 'josefinItalic':
        return 'font-[JosefinSans-Italic-Variable]';
      default:
        return '';
    }
  };

  const classNames = `${getVariantStyles()} ${getWeightStyles()} ${getColorStyles()} ${getFontStyles()} ${className}`;

  const Element = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={classNames}>{children}</h1>;
      case 'h2':
        return <h2 className={classNames}>{children}</h2>;
      case 'h3':
        return <h3 className={classNames}>{children}</h3>;
      case 'h4':
        return <h4 className={classNames}>{children}</h4>;
      case 'h5':
        return <h5 className={classNames}>{children}</h5>;
      case 'subtitle':
        return <p className={classNames}>{children}</p>;
      case 'caption':
        return <span className={classNames}>{children}</span>;
      default:
        return <p className={classNames}>{children}</p>;
    }
  };

  return <Element />;
};
