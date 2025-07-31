import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Tag, Image, Space, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { theme } from '@/styles/theme';
import { supabase } from '@/utils/supabase';
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
                className="post-card-horizontal"
                style={{
                    border: 'none',
                    borderRadius: 0,
                    width: '100%',
                    overflow: 'hidden',
                    margin: '0 auto',
                    padding: 0,
                }}
                bodyStyle={{
                    padding: 0,
                }}
                onClick={() => setIsDescriptionExpanded(true)}
            >
                <div className="post-card-flex">
                    {/* Left: Text */}
                    <div className="post-card-content">
                        <div style={{ maxWidth: '540px' }}>
                            <Title level={4} style={{ marginBottom: 0, fontSize: '1.05rem' }}>{title}</Title>
                            <Paragraph
                                ref={descriptionRef}
                                ellipsis={{ rows: 2, tooltip: false }}
                                style={{
                                    marginBottom: 4,
                                    color: theme.colors.lightText,
                                    fontSize: theme.fonts.sizes.base,
                                    cursor: 'pointer',
                                }}
                                onClick={e => { e.stopPropagation(); setIsDescriptionExpanded(true); }}
                            >
                                {description}
                            </Paragraph>
                        </div>
                        {isTruncated && (
                            <Text
                                type="secondary"
                                style={{ cursor: 'pointer', fontSize: theme.fonts.sizes.xs, color: theme.colors.borderFocus }}
                                onClick={e => { e.stopPropagation(); setIsDescriptionExpanded(true); }}
                            >
                                Read more
                            </Text>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, maxWidth: '540px' }}>

                            {isAuthenticated && (
                                <Space style={{ marginRight: 'auto' }}>
                                    <Button
                                        type="text"
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={e => { e.stopPropagation(); setIsEditModalVisible(true); }}
                                        data-testid="edit-post-button"
                                    />
                                    <Button
                                        type="text"
                                        size="large"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={e => { e.stopPropagation(); setIsDeleteModalVisible(true); }}
                                        data-testid="delete-post-button"
                                    />
                                </Space>
                            )}
                            <Text type="secondary" style={{ fontSize: theme.fonts.sizes.base, marginLeft: 'auto' }}>
                                {formattedDate}
                            </Text>
                        </div>
                    </div>
                    {/* Right: Image */}
                    {image && (
                        <div className='post-card-image' style={{
                            width: '100%',
                            height: '100%',
                            maxWidth: '340px',
                            maxHeight: '180px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.colors.backgroundAlt,
                            position: 'relative',
                        }}
                        >
                            <Image
                                preview={false}
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
                    )}
                </div>
                <style>{`
                    .post-card-flex {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        height: 180px;
                    }
                    .post-card-content {
                        flex: 1;
                        padding: 12px;
                        min-width: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .post-card-image {
                        border-radius: 12px 12px 12px 12px;
                    }
                    @media (max-width: 600px) {
                        .post-card-flex {
                            flex-direction: column-reverse;
                            height: auto;
                            border: 1px solid ${theme.colors.border};
                            border-radius: 12px;
                        }
                        .post-card-image {
                            border-radius: 12px 12px 0 0;
                        }
                        .post-card-horizontal {
                            max-width: 300px;
                        }
                    }
                `}</style>
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
                        onDelete?.();
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
                    margin: 0,
                }}
                width={800}
                centered
                closable
            >
                {/* Image section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    maxHeight: '902px',
                    overflow: 'hidden',
                }}>
                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'scale-down',
                                marginTop: '32px'
                            }}
                        />
                    )}
                </div>

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
                                    style={{ backgroundColor: theme.colors.primary, border: `1px solid ${theme.colors.border}`, fontSize: theme.fonts.sizes.xs, fontWeight: theme.fonts.weights.bold, padding: '0 12px' }}
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