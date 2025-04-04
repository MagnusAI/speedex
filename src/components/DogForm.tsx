import { useState, useEffect } from 'react'
import {
  Box,
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
import { SelectChangeEvent } from '@mui/material/Select'

interface DogFormProps {
  dog?: Dog
  onSubmit: (data: DogFormData) => Promise<void>
  onCancel: () => void
}

export default function DogForm({ dog, onSubmit, onCancel }: DogFormProps) {
  const [formData, setFormData] = useState<DogFormData>({
    name: '',
    breed: '',
    gender: 'male',
    color: '',
    fur_type: '',
    birth_date: '',
    image_url: '',
    description: '',
    father_id: null,
    mother_id: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (dog) {
      setFormData({
        name: dog.name,
        breed: dog.breed,
        gender: dog.gender,
        color: dog.color,
        fur_type: dog.fur_type,
        birth_date: dog.birth_date,
        image_url: dog.image_url || '',
        description: dog.description || '',
        father_id: dog.father_id,
        mother_id: dog.mother_id
      })
      setImagePreview(dog.image_url)
    }
  }, [dog])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name as keyof DogFormData]: value
    }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<"male" | "female">) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imageUrl = formData.image_url

      if (imageFile) {
        // Upload image to Supabase Storage
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `dog-images/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('dogs')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('dogs')
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
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

        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            label="Fur Type"
            name="fur_type"
            value={formData.fur_type}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)' } }}>
          <TextField
            required
            fullWidth
            type="date"
            label="Birth Date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ flex: '0 0 100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              type="file"
              label="Dog Photo"
              onChange={handleImageChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: 'image/*' }}
            />
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Dog preview"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 1
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ flex: '0 0 100%' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ flex: '0 0 100%', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : dog ? 'Update Dog' : 'Add Dog'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
} 