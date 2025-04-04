import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Alert,
  Card,
  CardMedia,
  CardContent
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { format } from 'date-fns'
import { BlogPost } from '../types/blog'
import { useAuth } from '../contexts/AuthContext'
import BlogPostForm from './BlogPostForm'
import ImageGallery from './ImageGallery'
import { BlogPostFormData } from '../types/blog'

interface BlogPostDetailProps {
  post: BlogPost
  open: boolean
  onClose: () => void
  onUpdate: (data: BlogPostFormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function BlogPostDetail({ post, open, onClose, onUpdate, onDelete }: BlogPostDetailProps) {
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { user } = useAuth()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await onDelete(post.id)
      onClose()
    } catch (error) {
      console.error('Error deleting post:', error)
      setError('Failed to delete post')
    }
  }

  if (editMode) {
    return (
      <Dialog
        open={open}
        onClose={() => setEditMode(false)}
        maxWidth="md"
        fullWidth
      >
        <BlogPostForm
          post={post}
          open={true}
          onClose={() => setEditMode(false)}
          onSubmit={async (updatedPost) => {
            try {
              await onUpdate(updatedPost)
              setEditMode(false)
            } catch (error) {
              console.error('Error updating post:', error)
              setError('Failed to update post')
            }
          }}
        />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {error && (
          <Alert severity="error" sx={{ position: 'absolute', top: 16, left: 16, right: 16, zIndex: 1 }}>
            {error}
          </Alert>
        )}

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>

        {user?.role === 'admin' && (
          <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setEditMode(true)}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author}
            </Typography>
          </Box>

          {post.blog_post_images.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {post.blog_post_images.map((image, index) => (
                <Box
                  key={image.id}
                  sx={{
                    flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)', md: '0 0 calc(33.333% - 8px)' }
                  }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.2s'
                      }
                    }}
                    onClick={() => {
                      setSelectedImageIndex(index)
                      setGalleryOpen(true)
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.image_url}
                      alt={image.caption || 'Blog post image'}
                      sx={{ objectFit: 'cover' }}
                    />
                    {image.caption && (
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {image.caption}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </Box>
              ))}
            </Box>
          )}

          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>

          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              {post.tags.map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag}
                  sx={{ 
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>

      <ImageGallery
        images={post.blog_post_images}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </Dialog>
  )
} 