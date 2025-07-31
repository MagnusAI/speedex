import React from 'react';
import { theme } from '@/styles/theme';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: keyof typeof theme.spacing;
  minItemWidth?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns,
  gap = 'md',
  minItemWidth = '300px',
  style,
  className,
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: theme.spacing[gap],
    gridTemplateColumns: columns 
      ? `repeat(${columns}, 1fr)`
      : `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    ...style,
  };

  return (
    <div style={gridStyle} className={className}>
      {children}
    </div>
  );
};

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  gap?: keyof typeof theme.spacing;
  style?: React.CSSProperties;
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start',
  wrap = false,
  gap = 'md',
  style,
  className,
}) => {
  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: theme.spacing[gap],
    ...style,
  };

  return (
    <div style={flexStyle} className={className}>
      {children}
    </div>
  );
};