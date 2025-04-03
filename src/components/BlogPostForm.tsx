import { useState, useEffect } from 'react'
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
  Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { supabase } from '../lib/supabase'
import { BlogPost, BlogPostFormData } from '../types/blog'
import { Dog } from '../types/dog'

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
    image_url: null,
    dog_ids: [],
    tags: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dogs, setDogs] = useState<Dog[]>([])
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        dog_ids: post.dogs?.map((dog: Dog) => dog.id) || [],
        tags: post.tags || []
      })
      setSelectedDogs(post.dogs || [])
      setSelectedTags(post.tags || [])
      setImagePreview(post.image_url)
    } else {
      // Reset form when creating new post
      setFormData({
        title: '',
        content: '',
        image_url: null,
        dog_ids: [],
        tags: []
      })
      setSelectedDogs([])
      setSelectedTags([])
      setImagePreview(null)
      setImageFile(null)
    }
  }, [post])

  useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('name')

      if (error) throw error
      setDogs(data || [])
    } catch (err) {
      console.error('Error fetching dogs:', err)
      setError('Failed to fetch dogs')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDogChange = (_: any, newValue: Dog[]) => {
    setSelectedDogs(newValue)
    setFormData(prev => ({
      ...prev,
      dog_ids: newValue.map(dog => dog.id)
    }))
    
    // Add dog names as tags
    const dogTags = newValue.map(dog => dog.name)
    const existingTags = selectedTags.filter(tag => !dogTags.includes(tag))
    setSelectedTags([...existingTags, ...dogTags])
    setFormData(prev => ({
      ...prev,
      tags: [...existingTags, ...dogTags]
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
      image_url: null // Reset image_url as we'll upload the file
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imageUrl = formData.image_url

      // Upload image if a new file was selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `blog-images/${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('blog-images')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath)

        imageUrl = publicUrl
      }

      await onSubmit({
        ...formData,
        image_url: imageUrl
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

          <Stack spacing={2} sx={{ my: 2 }}>
            <Autocomplete
              multiple
              options={dogs}
              getOptionLabel={(option) => option.name}
              value={selectedDogs}
              onChange={handleDogChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Related Dogs"
                  placeholder="Select dogs"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
            />

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
          </Stack>

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
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                sx={{ mb: 1 }}
              >
                Upload Image
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </Box>
            )}
          </Box>
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
    </Dialog>
  )
} 