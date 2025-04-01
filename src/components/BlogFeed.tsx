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
  useMediaQuery
} from '@mui/material'
import { format } from 'date-fns'
import { supabase, BlogPost } from '../lib/supabase'

export default function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
    } finally {
      setLoading(false)
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
                <Typography 
                  variant="h6" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.1rem' : '1.25rem'
                  }}
                >
                  {post.title}
                </Typography>
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
    </Container>
  )
} 