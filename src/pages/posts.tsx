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
  image_position?: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchPosts = async (tag?: string) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (tag) {
        // Split the search string by commas and trim whitespace
        const tags = tag.split(',').map(t => t.trim()).filter(t => t);
        // Use or() to match any of the tags
        query = query.or(tags.map(t => `tags.cs.{${t}}`).join(','));
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
    fetchPosts(searchTag);
  };

  const handleDeleteSuccess = () => {
    fetchPosts(searchTag);
  };

  const predefinedTags = ['2025', '2018', 'hvalpe'];

  return (
    <PageLayout>
      {isAuthenticated && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateForm(true)}
            size="middle"
          >
            Create Post
          </Button>
        </div>
      )}
      <div style={{ margin: '0 auto' }}>
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
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                onSearch={handleSearch}
                style={{ maxWidth: '400px' }}
              />
              <Space wrap style={{ marginTop: theme.spacing.md }}>
                {predefinedTags.map(tag => (
                  <Button
                    key={tag}
                    onClick={() => {
                      const currentTags = searchTag.split(',').map(t => t.trim());
                      if (!currentTags.includes(tag)) {
                        handleSearch(searchTag ? `${searchTag},${tag}` : tag);
                      }
                    }}
                    style={{ backgroundColor: theme.colors.primary, border: `1px solid ${theme.colors.border}`, fontSize: theme.fonts.sizes.xs, fontWeight: theme.fonts.weights.bold, padding: '0 12px' }}
                    size="small"
                  >
                    {tag}
                  </Button>
                ))}
              </Space>
            </div>

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
            <Space wrap align="start" size="large" style={{ width: '100%' }}>
              {/* Posts list */}
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    image_position={post.image_position}
                    tags={post.tags}
                    createdAt={post.created_at}
                    onDelete={handleDeleteSuccess}
                    isAuthenticated={isAuthenticated}
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
            </Space>
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