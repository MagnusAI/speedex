import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material'
import { Dog, DogFormData } from '../types/dog'
import { supabase } from '../lib/supabase'

interface DogFormProps {
  dog?: Dog | null
  onSubmit: (data: DogFormData) => Promise<void>
}

export default function DogForm({ dog, onSubmit }: DogFormProps) {
  const [formData, setFormData] = useState<DogFormData>({
    name: '',
    breed: '',
    gender: '',
    color: '',
    birth_date: '',
    image_url: '',
    description: '',
    family_tree: {
      father: null,
      mother: null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dog) {
      setFormData({
        name: dog.name,
        breed: dog.breed,
        gender: dog.gender,
        color: dog.color,
        birth_date: dog.birth_date,
        image_url: dog.image_url,
        description: dog.description,
        family_tree: dog.family_tree
      })
    }
  }, [dog])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFamilyTreeChange = (parent: 'father' | 'mother', value: string | null) => {
    setFormData(prev => ({
      ...prev,
      family_tree: {
        ...prev.family_tree,
        [parent]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSubmit(formData)
    } catch (err) {
      setError('Failed to save dog')
      console.error('Error saving dog:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required disabled={loading}>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Birth Date"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            required
            disabled={loading}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Father's Name"
            value={formData.family_tree.father || ''}
            onChange={(e) => handleFamilyTreeChange('father', e.target.value || null)}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mother's Name"
            value={formData.family_tree.mother || ''}
            onChange={(e) => handleFamilyTreeChange('mother', e.target.value || null)}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Dog'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
} 