import React, { useState } from 'react';
import { Card, Typography, Tag, Image, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { supabase } from '../utils/supabase';
import { message } from 'antd';

const { Text } = Typography;

interface PostCardProps {
    id: string;
    title: string;
    description: string;
    image: string | null;
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
    tags,
    createdAt,
    onDelete,
    isAuthenticated = false
}) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    return (
        <>
            <Card
                hoverable
                cover={image ? <Image src={image} alt={title} /> : undefined}
                data-testid="post-card"
                style={{
                    borderRadius: theme.borderRadius.sm,
                    overflow: 'hidden',
                    maxWidth: '380px',
                    border: `1px solid ${theme.colors.border}`,
                }}
            >
                <Meta title={title} description={description} />
                <Space direction="vertical" size="small" style={{ width: '100%', marginTop: theme.spacing.md }}>
                    {/* Tags */}
                    <Space wrap>
                        {tags.map((tag) => (
                            <Tag
                                key={tag}
                                color="default"
                            >
                                {tag}
                            </Tag>
                        ))}
                    </Space>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {isAuthenticated && (
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => setIsDeleteModalVisible(true)}
                                data-testid="delete-post-button"
                            />
                        )}
                        <Text type="secondary" data-testid="post-date">{formattedDate}</Text>
                    </div>
                </Space>
            </Card>

            {/* Delete Confirmation Modal */}
            {isAuthenticated && (
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
            )}
        </>
    );
};

export default PostCard; 