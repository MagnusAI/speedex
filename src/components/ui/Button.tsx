import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { theme } from '@/styles/theme';

interface ButtonProps extends Omit<AntButtonProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  fullWidth?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  fullWidth = false,
  children,
  style,
  ...props 
}) => {
  const getVariantStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.primary,
      fontWeight: theme.fonts.weights.medium,
      borderRadius: theme.borderRadius.sm,
      minHeight: theme.accessibility.touchTarget,
      transition: 'all 0.2s ease',
    };

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
          color: theme.colors.background,
        };
      case 'accent':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.accent,
          borderColor: theme.colors.accent,
          color: theme.colors.background,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: theme.colors.border,
          color: theme.colors.text,
        };
      case 'link':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          border: 'none',
          color: theme.colors.secondary,
          textDecoration: 'underline',
        };
      default: // primary
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          color: theme.colors.text,
        };
    }
  };

  return (
    <AntButton
      style={{
        ...getVariantStyle(),
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </AntButton>
  );
};