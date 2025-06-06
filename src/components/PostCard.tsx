import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Tag, Image, Space, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { supabase } from '../utils/supabase';
import { message } from 'antd';
import EditPostForm from './EditPostForm';

const { Text, Paragraph, Title } = Typography;

interface PostCardProps {
    id: string;
    title: string;
    description: string;
    image: string | null;
    image_position?: number;
    tags: string[];
    createdAt: string;
    onDelete?: () => void;
    isAuthenticated?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
    id,
    title,
    description,
    image,
    image_position = 50,
    tags,
    createdAt,
    onDelete,
    isAuthenticated = false
}) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    // Check if text is truncated
    useEffect(() => {
        if (descriptionRef.current) {
            const element = descriptionRef.current;
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, [description]);

    // Format the date to a more readable format
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            // Delete the post
            const { error: deleteError } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // If there's an image, delete it from storage
            if (image) {
                const imagePath = image.split('/').pop();
                if (imagePath) {
                    const { error: storageError } = await supabase.storage
                        .from('post_images')
                        .remove([`post-images/${imagePath}`]);

                    if (storageError) {
                        console.error('Error deleting image:', storageError);
                    }
                }
            }

            message.success('Post deleted successfully');
            onDelete?.();
        } catch (error: any) {
            console.error('Error deleting post:', error);
            message.error('Failed to delete post');
        } finally {
            setIsDeleting(false);
            setIsDeleteModalVisible(false);
        }
    };

    const { Meta } = Card;

    // Calculate the transform value based on position
    const getTransformValue = () => {
        if (!image) return 'translateY(0)';
        const maxOffset = 160; // Increased offset for better range
        const offset = (maxOffset * (image_position - 50)) / 50; // Center at 50
        return `translateY(${offset}px)`;
    };

    return (
        <>
            <Card
                hoverable
                cover={
                    image ? (
                        <div style={{
                            height: '200px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.colors.backgroundAlt,
                            borderRadius: 0,
                            position: 'relative'
                        }}>
                            <Image
                                src={image}
                                alt={title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: getTransformValue(),
                                    transition: 'transform 0.2s ease-in-out'
                                }}
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
                    ) : undefined
                }
                data-testid="post-card"
                style={{
                    borderRadius: theme.borderRadius.sm,
                    overflow: 'hidden',
                    maxWidth: '295px',
                    border: `1px solid ${theme.colors.border}`,
                    height: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                bodyStyle={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: theme.spacing.md,
                }}
            >
                <Meta
                    title={title}
                    description={
                        <div style={{ height: '88px', overflow: 'hidden' }}>
                            <Paragraph
                                ref={descriptionRef}
                                ellipsis={{
                                    rows: 2,
                                    tooltip: false,
                                }}
                                style={{ 
                                    marginBottom: 0,
                                    cursor: isTruncated ? 'pointer' : 'pointer',
                                }}
                                onClick={() => setIsDescriptionExpanded(true)}
                            >
                                {description}
                            </Paragraph>
                            {isTruncated && (
                                <Text 
                                    type="secondary" 
                                    style={{ 
                                        cursor: 'pointer',
                                        fontSize: theme.fonts.sizes.small,
                                    }}
                                    onClick={() => setIsDescriptionExpanded(true)}
                                >
                                    Read more
                                </Text>
                            )}
                        </div>
                    }
                />
                <Space direction="vertical" size="small" style={{ width: '100%', marginTop: '8px', height: '100%', justifyContent: 'space-between', alignContent: 'flex-start' }}>
                    {/* Tags */}
                    <Space wrap style={{ height: '64px', overflow: 'hidden', alignContent: 'flex-start' }}>
                        {tags.slice(0, 4).map((tag) => (
                            <Tag
                                key={tag}
                                color="default"
                            >
                                {tag}
                            </Tag>
                        ))}
                        {tags.length > 4 && (
                            <Tag color="default">. . .</Tag>
                        )}
                    </Space>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {isAuthenticated && (
                            <Space>
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    onClick={() => setIsEditModalVisible(true)}
                                    data-testid="edit-post-button"
                                />
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => setIsDeleteModalVisible(true)}
                                    data-testid="delete-post-button"
                                />
                            </Space>
                        )}
                        <Text style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }} type="secondary" data-testid="post-date">{formattedDate}</Text>
                    </div>
                </Space>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Post"
                open={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
                confirmLoading={isDeleting}
                okText="Delete"
                okButtonProps={{ danger: true }}
                data-testid="delete-confirmation-modal"
            >
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
            </Modal>

            {/* Edit Post Modal */}
            <Modal
                title="Edit Post"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
                width={800}
            >
                <EditPostForm
                    postId={id}
                    onSuccess={() => {
                        setIsEditModalVisible(false);
                        onDelete?.(); // Refresh the posts list
                    }}
                    onCancel={() => setIsEditModalVisible(false)}
                />
            </Modal>

            {/* Description Modal */}
            <Modal
                open={isDescriptionExpanded}
                onCancel={() => setIsDescriptionExpanded(false)}
                footer={null}
                style={{
                    padding: 0,
                    margin: 0
                }}
                width={800}
                centered
                closable
            >
                {/* Image section */}
                {image && (
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '70%',
                            objectFit: 'scale-down',
                            marginTop: '32px'
                        }}
                    />
                )}

                {/* Content section */}
                <div style={{
                    padding: theme.spacing.xl,
                    backgroundColor: theme.colors.background
                }}>
                    <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                        <Title level={2} style={{ marginBottom: theme.spacing.sm }}>{title}</Title>
                        <Paragraph style={{
                            fontSize: theme.fonts.sizes.base,
                            lineHeight: 1.6,
                            marginBottom: theme.spacing.md
                        }}>
                            {description}
                        </Paragraph>

                        <Space wrap>
                            {tags.map((tag) => (
                                <Tag
                                    key={tag}
                                    color="default"
                                    style={{ fontSize: theme.fonts.sizes.base }}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </Space>
                        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Text type="secondary" style={{ fontSize: theme.fonts.sizes.base }}>
                            {formattedDate}
                        </Text>
                        </Space>
                    </Space>
                </div>
            </Modal>
        </>
    );
};

export default PostCard; 