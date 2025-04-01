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
  Button,
  Alert
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { format } from 'date-fns'
import { BlogPost } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import BlogPostForm from './BlogPostForm'

interface BlogPostDetailProps {
  post: BlogPost
  open: boolean
  onClose: () => void
  onUpdate: (post: Omit<BlogPost, 'id' | 'created_at'>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function BlogPostDetail({ post, open, onClose, onUpdate, onDelete }: BlogPostDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { user } = useAuth()

  // For now, we'll use a single image. Later we can modify the database to support multiple images
  const images = [post.image_url]

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

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
            await onUpdate(updatedPost)
            setEditMode(false)
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

        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePreviousImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                zIndex: 1
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                zIndex: 1
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </>
        )}

        <Box
          component="img"
          src={images[currentImageIndex]}
          alt={post.title}
          sx={{
            width: '100%',
            height: { xs: '50vh', md: '70vh' },
            objectFit: 'cover'
          }}
        />

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {post.title}
            </Typography>
            {user && (
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {format(new Date(post.created_at), 'MMMM d, yyyy')} • {post.author}
          </Typography>

          <Box sx={{ my: 2 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText
                }}
              />
            ))}
          </Box>

          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8
            }}
          >
            {post.content}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
} 