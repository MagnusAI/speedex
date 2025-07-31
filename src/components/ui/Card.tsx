import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { theme } from '@/styles/theme';

interface CardProps extends Omit<AntCardProps, 'style'> {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  children,
  style,
  ...props 
}) => {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'elevated':
        return {
          boxShadow: theme.shadows.md,
          border: 'none',
        };
      case 'outlined':
        return {
          border: `${theme.borders.medium} ${theme.colors.border}`,
          boxShadow: 'none',
        };
      default:
        return {
          boxShadow: theme.shadows.sm,
          border: `${theme.borders.thin} ${theme.colors.border}`,
        };
    }
  };

  return (
    <AntCard
      style={{
        borderRadius: theme.borderRadius.md,
        ...getVariantStyle(),
        ...style,
      }}
      {...props}
    >
      {children}
    </AntCard>
  );
};