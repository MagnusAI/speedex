import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography
} from '@mui/material'
import { BlogPost } from '../lib/supabase'

interface BlogPostFormProps {
  post?: BlogPost
  open: boolean
  onClose: () => void
  onSubmit: (post: Omit<BlogPost, 'id' | 'created_at'>) => Promise<void>
}

export default function BlogPostForm({ post, open, onClose, onSubmit }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [imageUrl, setImageUrl] = useState(post?.image_url || '')
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit({
        title,
        content,
        image_url: imageUrl,
        tags,
        author: 'Admin' // We'll get this from the auth context later
      })
      onClose()
    } catch (error) {
      console.error('Error submitting post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag('')
    }
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {post ? 'Edit Post' : 'Create New Post'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  disabled={loading}
                />
              ))}
            </Box>
            <TextField
              size="small"
              label="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleAddTag}
              disabled={loading}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 