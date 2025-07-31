import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { Slider, Space, Typography } from 'antd';
import { theme } from '@/styles/theme';

const { Text } = Typography;

interface ImagePreviewProps {
    imageUrl: string;
    onPositionChange?: (position: number) => void;
    initialPosition?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
    imageUrl, 
    onPositionChange,
    initialPosition = 50 // Default to center if not provided
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);

    const containerWidth = 360; // Match PostCard width
    const containerHeight = 180; // Match PostCard height

    // Update position when initialPosition changes
    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    // Calculate the actual image dimensions when it loads
    useEffect(() => {
        if (imageRef.current) {
            const img = imageRef.current;
            img.onload = () => {
                setImageHeight(img.naturalHeight);
                setImageWidth(img.naturalWidth);
            };
        }
    }, [imageUrl]);

    const handlePositionChange = (value: number) => {
        setPosition(value);
        onPositionChange?.(value);
    };

    // Calculate the transform value based on position
    const getTransformValue = () => {
        if (!imageHeight) return 'translateY(0)';
        const maxOffset = 160; // Match PostCard's maxOffset
        const offset = (maxOffset * (position - 50)) / 50; // Center at 50
        return `translateY(${offset}px)`;
    };

    // Calculate the image style based on dimensions
    const getImageStyle = (): CSSProperties => {
        if (!imageHeight || !imageWidth) return {};

        const aspectRatio = imageWidth / imageHeight;

        // Calculate dimensions to maintain aspect ratio while filling width
        const width = containerWidth;
        const height = width / aspectRatio;

        return {
            width: `${width}px`,
            height: `${height}px`,
            objectFit: 'cover' as const,
            transform: getTransformValue(),
            transition: 'transform 0.2s ease-in-out'
        };
    };

    return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ 
                height: `${containerHeight}px`,
                width: `${containerWidth}px`,
                overflow: 'hidden',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '12px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.backgroundAlt
            }}>
                <img 
                    ref={imageRef}
                    src={imageUrl}
                    style={getImageStyle()}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
                    pointerEvents: 'none'
                }} />
            </div>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">Adjust Image Position</Text>
                <Slider
                    min={0}
                    max={100}
                    value={position}
                    marks={{
                        0: 'Bottom',
                        25: ' ',
                        50: 'Center',
                        75: ' ',
                        100: 'Top'
                    }}
                    
                    onChange={handlePositionChange}
                    tooltip={{ formatter: (value) => `${value}%` }}
                    style={{ backgroundColor: theme.colors.backgroundAlt }}
                />
            </Space>
        </Space>
    );
};

export default ImagePreview; 