import { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
  SelectChangeEvent
} from '@mui/material'
import { supabase } from '../lib/supabase'
import { Dog, DogFormData } from '../types/dog'

interface DogFormProps {
  dog?: Dog
  onSubmit: (data: DogFormData) => Promise<void>
  onCancel: () => void
}

const defaultFamilyTree = {
  father: null,
  mother: null
}

export default function DogForm({ dog, onSubmit, onCancel }: DogFormProps) {
  const [formData, setFormData] = useState<DogFormData>({
    name: '',
    breed: '',
    gender: '',
    color: '',
    birth_date: '',
    image_url: '',
    description: '',
    family_tree: defaultFamilyTree
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dog) {
      setFormData({
        name: dog.name,
        breed: dog.breed,
        gender: dog.gender,
        color: dog.color,
        birth_date: dog.birth_date,
        image_url: dog.image_url || '',
        description: dog.description || '',
        family_tree: dog.family_tree || defaultFamilyTree
      })
    }
  }, [dog])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      setError('Failed to save dog')
      console.error('Error saving dog:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  function handleSelectChange(e: SelectChangeEvent) {
    const { name, value } = e.target
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {dog ? 'Edit Dog' : 'Add New Dog'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleTextChange}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Breed"
            name="breed"
            value={formData.breed}
            onChange={handleTextChange}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleTextChange}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            type="date"
            label="Birth Date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleTextChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
          <TextField
            fullWidth
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleTextChange}
          />
        </Box>
        <Box sx={{ flex: '1 1 100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleTextChange}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Saving...' : (dog ? 'Update' : 'Create')}
        </Button>
      </Box>
    </Box>
  )
} 