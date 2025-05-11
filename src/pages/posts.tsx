import React, { useEffect, useState } from 'react';
import { Typography, Spin, Alert, Space, Input, Button, Modal } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import PostCard from '../components/PostCard';
import PostCreationForm from '../components/PostCreationForm';
import { theme } from '../styles/theme';

const { Title } = Typography;
const { Search } = Input;

interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
  }, []);

  const fetchPosts = async (tag?: string) => {
    try {
      setLoading(true);
      setError(null);

      let { data, error } = tag
        ? await supabase.rpc('get_posts_by_tag', { p_tag: tag, p_limit: 10, p_offset: 0 })
        : await supabase.rpc('get_latest_posts', { p_limit: 10, p_offset: 0 });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTag(value.trim());
    if (value.trim()) {
      fetchPosts(value.trim());
    } else {
      fetchPosts();
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    fetchPosts();
  };

  return (
    <PageLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: theme.spacing.lg }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: theme.spacing.xl 
          }}>
            <div>
              <Title level={2}>Posts</Title>
              <Search
                placeholder="Search by tag..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                style={{ maxWidth: '400px' }}
              />
            </div>
            {isAuthenticated && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowCreateForm(true)}
                size="large"
              >
                Create Post
              </Button>
            )}
          </div>

          {/* Error message */}
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: theme.spacing.lg }}
            />
          )}

          {/* Loading state */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: theme.spacing.xl }} role="status" aria-label="Loading posts">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* Posts list */}
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    tags={post.tags}
                    createdAt={post.created_at}
                  />
                ))
              ) : (
                <Alert
                  message="No posts found"
                  description={
                    searchTag
                      ? `No posts found with tag "${searchTag}"`
                      : 'No posts have been created yet.'
                  }
                  type="info"
                  showIcon
                />
              )}
            </>
          )}
        </Space>

        {/* Create Post Modal */}
        <Modal
          title="Create New Post"
          open={showCreateForm}
          onCancel={() => setShowCreateForm(false)}
          footer={null}
          width={800}
        >
          <PostCreationForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
          />
        </Modal>
      </div>
    </PageLayout>
  );
};

export default PostsPage; 