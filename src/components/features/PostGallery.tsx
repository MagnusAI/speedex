import React, { useEffect, useState } from 'react';
import { Typography, Spin, Image } from 'antd';
import { theme } from '@/styles/theme';
import { supabase } from '@/utils/supabase';

const { Title, Text } = Typography;

interface PuppyPost {
    id: string;
    title: string;
    description: string;
    image: string;
    image_position?: number;
    tags: string[];
    created_at: string;
    updated_at: string;
}

interface PostGalleryProps {
    title: string;
    tags: string | string[];
    emptyMessage?: string;
    showTitle?: boolean;
    titleLevel?: 1 | 2 | 3 | 4 | 5;
    titleAlign?: 'left' | 'center' | 'right';
}

const PostGallery: React.FC<PostGalleryProps> = ({
    title,
    tags,
    emptyMessage = "Ingen billeder tilgængelige endnu",
    showTitle = true,
    titleLevel = 2,
    titleAlign = 'center'
}) => {
    const [posts, setPosts] = useState<PuppyPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [tags]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            // Handle both single tag and multiple tags
            const tagArray = Array.isArray(tags) ? tags : [tags];
            
            // Convert tags to lowercase for consistent matching
            const lowercaseTagArray = tagArray.map(tag => tag.toLowerCase());
            
            // Filter posts that contain any of the specified tags
            query = query.overlaps('tags', lowercaseTagArray);

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            } else {
                setPosts(data || []);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginBottom: '48px' }}>
            {showTitle && (
                <Title level={titleLevel} style={{
                    textAlign: titleAlign,
                    marginBottom: titleAlign === 'left' ? theme.spacing.lg : '32px',
                    color: theme.colors.text,
                    fontSize: titleLevel === 3 ? undefined : 'clamp(1.5rem, 3vw, 2rem)'
                }}>
                    {title}
                </Title>
            )}

            {loading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '40px'
                }}>
                    <Spin size="large" />
                </div>
            ) : posts.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: theme.colors.secondary
                }}>
                    <Text>{emptyMessage}</Text>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 340px))',
                    gap: '20px',
                    justifyContent: 'flex-start',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                width: '100%',
                                height: '160px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: theme.shadows.sm,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer',
                                backgroundColor: theme.colors.backgroundAlt,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = theme.shadows.md;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = theme.shadows.sm;
                            }}
                        >
                            <Image
                                src={post.image}
                                alt={post.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                preview={{
                                    mask: <div style={{
                                        background: 'rgba(0, 0, 0, 0.6)',
                                        color: 'white',
                                        padding: '8px 12px',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        fontWeight: '500'
                                    }}>
                                        {post.title}
                                    </div>
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostGallery;