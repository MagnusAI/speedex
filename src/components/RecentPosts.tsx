import React, { useEffect, useState } from 'react';
import { Typography, Space, Button, Spin } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import PostCard from './PostCard';
import { theme } from '../styles/theme';

const { Title } = Typography;

interface Post {
    id: string;
    title: string;
    description: string;
    image: string;
    image_position?: number;
    tags: string[];
    created_at: string;
}

interface RecentPostsProps {
    title?: string;
    limit?: number;
}

const RecentPosts: React.FC<RecentPostsProps> = ({
    title = "Latest News",
    limit = 3
}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecentPosts();
    }, []);

    const fetchRecentPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching recent posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg, alignItems: 'center', width: '100%' }}>
            <div style={{ width: '100%' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.lg
                }}>
                    <Title level={3}>{title}</Title>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                description={post.description}
                                image={post.image}
                                image_position={post.image_position}
                                tags={post.tags}
                                createdAt={post.created_at}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Button
                onClick={() => navigate('/posts')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'fit-content',
                    gap: theme.spacing.xs,
                    padding: '14px'
                }}
            >
                View all posts
            </Button>
        </div>
    );
};

export default RecentPosts; 