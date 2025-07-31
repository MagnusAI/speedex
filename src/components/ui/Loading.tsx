import React from 'react';
import { Spin, SpinProps } from 'antd';
import { theme } from '@/styles/theme';
import { Flex } from './Grid';

interface LoadingProps extends SpinProps {
  text?: string;
  fullPage?: boolean;
  minHeight?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  fullPage = false,
  minHeight = '200px',
  size = 'large',
  ...props
}) => {
  const containerStyle: React.CSSProperties = fullPage
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      }
    : {
        minHeight,
        width: '100%',
      };

  return (
    <div style={containerStyle}>
      <Flex 
        justify="center" 
        align="center" 
        style={{ height: '100%', minHeight: fullPage ? '100vh' : minHeight }}
      >
        <Flex direction="column" align="center" gap="sm">
          <Spin size={size} {...props} />
          {text && (
            <span style={{ 
              color: theme.colors.secondary,
              fontSize: theme.fonts.sizes.small,
              fontWeight: theme.fonts.weights.medium,
            }}>
              {text}
            </span>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

// Skeleton loading component for content placeholders
interface SkeletonProps {
  lines?: number;
  width?: string | string[];
  height?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  lines = 3,
  width = '100%',
  height = '16px',
  borderRadius = '4px',
}) => {
  const skeletonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.border,
    borderRadius,
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const getLineWidth = (index: number): string => {
    if (Array.isArray(width)) {
      return width[index] || width[width.length - 1];
    }
    return width;
  };

  return (
    <div>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          style={{
            ...skeletonStyle,
            width: getLineWidth(index),
            height,
            marginBottom: index < lines - 1 ? theme.spacing.sm : 0,
          }}
        />
      ))}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};