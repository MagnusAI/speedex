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
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black'
        }}>
          <img
            src={post.image_url}
            alt={post.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              width: 'auto',
              height: 'auto'
            }}
          />
        </Box>

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