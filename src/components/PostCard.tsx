import React, { useState } from 'react';
import { Card, Typography, Tag, Image, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { supabase } from '../utils/supabase';
import { message } from 'antd';

const { Text, Paragraph } = Typography;

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
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
                    maxWidth: '460px',
                    border: `1px solid ${theme.colors.border}`,
                    height: '620px', // Fixed height for the card
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
                        <div>
                            <Paragraph
                                ellipsis={{
                                    rows: 3,
                                    tooltip: false,
                                }}
                                style={{ 
                                    marginBottom: 0,
                                    cursor: 'pointer',
                                }}
                                onClick={() => setIsDescriptionExpanded(true)}
                            >
                                {description}
                            </Paragraph>
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
                        </div>
                    }
                />
                <Space direction="vertical" size="small" style={{ width: '100%', marginTop: 'auto' }}>
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

            {/* Description Modal */}
            <Modal
                title={title}
                open={isDescriptionExpanded}
                onCancel={() => setIsDescriptionExpanded(false)}
                footer={null}
                width={600}
            >
                <Paragraph style={{ fontSize: theme.fonts.sizes.base }}>
                    {description}
                </Paragraph>
            </Modal>
        </>
    );
};

export default PostCard; 