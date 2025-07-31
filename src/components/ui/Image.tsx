import React, { useState, ImgHTMLAttributes } from 'react';
import { IMAGES } from '@/constants';
import { theme } from '@/styles/theme';
import { Loading } from './Loading';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  showLoading?: boolean;
  borderRadius?: keyof typeof theme.borderRadius;
  onLoad?: () => void;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = IMAGES.PLACEHOLDER,
  aspectRatio = 'auto',
  objectFit = 'cover',
  showLoading = true,
  borderRadius = 'md',
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getAspectRatioStyle = (): React.CSSProperties => {
    switch (aspectRatio) {
      case 'square':
        return { aspectRatio: '1/1' };
      case '16:9':
        return { aspectRatio: '16/9' };
      case '4:3':
        return { aspectRatio: '4/3' };
      default:
        return {};
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    onError?.();
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.borderRadius[borderRadius],
    backgroundColor: theme.colors.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getAspectRatioStyle(),
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    display: isLoading ? 'none' : 'block',
  };

  if (hasError) {
    return (
      <div style={containerStyle}>
        <div style={{
          textAlign: 'center',
          color: theme.colors.secondary,
          fontSize: theme.fonts.sizes.small,
          padding: theme.spacing.md,
        }}>
          <p>Image unavailable</p>
          <p style={{ fontSize: theme.fonts.sizes.xs, opacity: 0.7 }}>
            {alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {isLoading && showLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Loading text="" size="default" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};