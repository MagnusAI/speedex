import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
  Autocomplete,
  Stack,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextareaAutosize
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { supabase } from '../lib/supabase'
import { BlogPost, BlogPostFormData } from '../types/blog'
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material'

interface BlogPostFormProps {
  post?: BlogPost
  open: boolean
  onClose: () => void
  onSubmit: (data: BlogPostFormData) => Promise<void>
}

export default function BlogPostForm({ post, open, onClose, onSubmit }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    images: [],
    tags: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)
  const [imageCaption, setImageCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        images: post.blog_post_images.map(img => ({
          url: img.image_url,
          caption: img.caption,
          display_order: img.display_order
        })),
        tags: post.tags || []
      })
      setSelectedTags(post.tags || [])
      setImagePreview(post.blog_post_images[0]?.image_url)
    } else {
      // Reset form when creating new post
      setFormData({
        title: '',
        content: '',
        images: [],
        tags: []
      })
      setSelectedTags([])
      setImagePreview(null)
      setImageFile(null)
    }
  }, [post])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagChange = (_: any, newValue: string[]) => {
    setSelectedTags(newValue)
    setFormData(prev => ({
      ...prev,
      tags: newValue
    }))
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      const tag = newTag.trim()
      if (!selectedTags.includes(tag)) {
        setSelectedTags(prev => [...prev, tag])
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }))
      }
      setNewTag('')
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: undefined, caption: '', display_order: prev.images.length }]
    }))
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setImageFile(null)
  }

  const handleAddImage = () => {
    if (imageFile || imageUrl) {
      const newImage = {
        file: imageFile || undefined,
        url: imageUrl || undefined,
        caption: imageCaption,
        display_order: formData.images.length
      }

      if (editingImageIndex !== null) {
        const updatedImages = [...formData.images]
        updatedImages[editingImageIndex] = newImage
        setFormData({ ...formData, images: updatedImages })
      } else {
        setFormData({ ...formData, images: [...formData.images, newImage] })
      }

      setOpenImageDialog(false)
      setImageFile(null)
      setImageUrl('')
      setImageCaption('')
      setEditingImageIndex(null)
    }
  }

  const handleEditImage = (index: number) => {
    const image = formData.images[index]
    setImageUrl(image.url || '')
    setImageCaption(image.caption || '')
    setEditingImageIndex(index)
    setOpenImageDialog(true)
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: updatedImages })
  }

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= formData.images.length) return

    const updatedImages = [...formData.images]
    const [movedImage] = updatedImages.splice(index, 1)
    updatedImages.splice(newIndex, 0, movedImage)

    // Update display order
    const reorderedImages = updatedImages.map((img, i) => ({
      ...img,
      display_order: i
    }))

    setFormData({ ...formData, images: reorderedImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Upload all images that have files
      const uploadedImages = await Promise.all(
        formData.images.map(async (img) => {
          if (img.file) {
            const fileExt = img.file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `blog-images/${fileName}`

            const { error: uploadError } = await supabase.storage
              .from('blog-images')
              .upload(filePath, img.file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(filePath)

            return {
              ...img,
              url: publicUrl
            }
          }
          return img
        })
      )

      await onSubmit({
        ...formData,
        images: uploadedImages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {post ? 'Edit Post' : 'New Post'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={10}
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              {formData.images.map((image, index) => (
                <Card key={index} sx={{ width: 200 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image.url || (image.file ? URL.createObjectURL(image.file) : '')}
                    alt={image.caption || 'Blog post image'}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {image.caption || 'No caption'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton 
                      size="small" 
                      onClick={() => handleMoveImage(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleMoveImage(index, 'down')}
                      disabled={index === formData.images.length - 1}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleEditImage(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteImage(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenImageDialog(true)}
              variant="outlined"
            >
              Add Image
            </Button>
          </Box>

          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={selectedTags}
            onChange={handleTagChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Add tags"
                onKeyDown={handleAddTag}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : (post ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>

      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>
          {editingImageIndex !== null ? 'Edit Image' : 'Add Image'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={handleImageUrlChange}
              fullWidth
              disabled={!!imageFile}
            />
            <Button
              variant="outlined"
              component="label"
              disabled={!!imageUrl}
            >
              Upload File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imageFile && (
              <Typography variant="body2">
                Selected file: {imageFile.name}
              </Typography>
            )}
            <TextField
              label="Caption"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>Cancel</Button>
          <Button onClick={handleAddImage} variant="contained">
            {editingImageIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
} 