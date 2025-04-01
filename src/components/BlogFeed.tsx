import { useEffect, useState } from 'react'
import { 
  Container, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  Skeleton,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { format } from 'date-fns'
import { supabase, BlogPost } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import BlogPostForm from './BlogPostForm'

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { user } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (post: Omit<BlogPost, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([post])

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error)
      throw new Error('Failed to create post')
    }
  }

  const handleUpdatePost = async (post: Omit<BlogPost, 'id' | 'created_at'>) => {
    if (!editingPost) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', editingPost.id)

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('Error updating post:', error)
      throw new Error('Failed to update post')
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      setError('Failed to delete post')
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,
          justifyContent: 'center'
        }}>
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
              minWidth: { xs: '100%', md: '300px' }
            }}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" height={24} />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {user && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingPost(undefined)
              setFormOpen(true)
            }}
          >
            New Post
          </Button>
        </Box>
      )}

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        justifyContent: 'center'
      }}>
        {posts.map((post) => (
          <Box key={post.id} sx={{ 
            flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' },
            minWidth: { xs: '100%', md: '300px' }
          }}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image_url}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1.1rem' : '1.25rem'
                    }}
                  >
                    {post.title}
                  </Typography>
                  {user && (
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => {
                          setEditingPost(post)
                          setFormOpen(true)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeletePost(post.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {format(new Date(post.created_at), 'MMMM d, yyyy')} • {post.author}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2
                  }}
                >
                  {post.content}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small"
                      sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <BlogPostForm
        post={editingPost}
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingPost(undefined)
        }}
        onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
      />
    </Container>
  )
} 