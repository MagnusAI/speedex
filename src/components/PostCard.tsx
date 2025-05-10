import React, { useState } from 'react';
import { Card, Typography, Tag, Image, Space } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';

const { Title, Text } = Typography;

interface PostCardProps {
    id: string;
    title: string;
    description: string;
    image: string | null;
    tags: string[];
    createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    description,
    image,
    tags,
    createdAt,
}) => {
    const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);

    // Format the date to a more readable format
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card
            data-testid="post-card"
            style={{
                marginBottom: theme.spacing.lg,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.sm,
            }}
            bodyStyle={{ padding: theme.spacing.lg }}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* Header with date */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Text type="secondary" data-testid="post-date">{formattedDate}</Text>
                </div>

                {/* Title */}
                <Title level={4} style={{ margin: 0 }} data-testid="post-title">
                    {title}
                </Title>

                {/* Image or placeholder */}
                {image ? (
                    <div
                        style={{
                            cursor: 'pointer',
                            borderRadius: theme.borderRadius.md,
                            overflow: 'hidden',
                        }}
                        onClick={() => setIsImagePreviewVisible(true)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setIsImagePreviewVisible(true);
                            }
                        }}
                        aria-label="View full size image"
                    >
                        <Image
                            src={image}
                            alt={title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: theme.borderRadius.md,
                            }}
                            preview={{
                                visible: isImagePreviewVisible,
                                onVisibleChange: (visible) => setIsImagePreviewVisible(visible),
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            backgroundColor: theme.colors.backgroundAlt,
                            borderRadius: theme.borderRadius.md,
                            padding: theme.spacing.xl,
                            textAlign: 'center',
                            border: `1px dashed ${theme.colors.border}`,
                        }}
                    >
                        <PictureOutlined style={{ fontSize: 48, color: theme.colors.secondary }} />
                        <Text type="secondary" style={{ display: 'block', marginTop: theme.spacing.sm }}>
                            No image available
                        </Text>
                    </div>
                )}

                {/* Description */}
                <Text style={{ fontSize: 16, lineHeight: 1.6 }} data-testid="post-description">
                    {description}
                </Text>

                {/* Tags */}
                <Space wrap>
                    {tags.map((tag) => (
                        <Tag
                            key={tag}
                            color={theme.colors.primary}
                            style={{
                                borderRadius: theme.borderRadius.sm,
                                padding: '4px 8px',
                                margin: 0,
                            }}
                        >
                            {tag}
                        </Tag>
                    ))}
                </Space>
            </Space>
        </Card>
    );
};

export default PostCard; 