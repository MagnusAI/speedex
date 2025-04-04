import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Dog } from '../types/dog'
import DogForm from './DogForm'

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDog, setEditingDog] = useState<Dog | undefined>(undefined)
  const { user } = useAuth()

  useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDogs(data || [])
    } catch (err) {
      setError('Failed to fetch dogs')
      console.error('Error fetching dogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDog = () => {
    setEditingDog(undefined)
  }

  const handleEditDog = (dog: Dog) => {
    setEditingDog(dog)
  }

  const handleDeleteDog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dog?')) return

    try {
      const { error } = await supabase
        .from('dogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      setDogs(dogs.filter(dog => dog.id !== id))
    } catch (err) {
      setError('Failed to delete dog')
      console.error('Error deleting dog:', err)
    }
  }

  const handleCloseDialog = () => {
    setEditingDog(undefined)
  }

  const handleSaveDog = async (dogData: Omit<Dog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingDog) {
        const { error } = await supabase
          .from('dogs')
          .update(dogData)
          .eq('id', editingDog.id)

        if (error) throw error
        setDogs(dogs.map(dog => 
          dog.id === editingDog.id ? { ...dog, ...dogData } : dog
        ))
      } else {
        const { data, error } = await supabase
          .from('dogs')
          .insert([dogData])
          .select()

        if (error) throw error
        setDogs([data[0], ...dogs])
      }
      handleCloseDialog()
    } catch (err) {
      setError('Failed to save dog')
      console.error('Error saving dog:', err)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Our Dogs
          </Typography>
          {user && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDog}
            >
              Add New Dog
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {dogs.map((dog) => (
            <Box
              key={dog.id}
              sx={{
                flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 8px)', md: '0 0 calc(33.333% - 8px)' }
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={dog.image_url || '/placeholder-dog.jpg'}
                  alt={dog.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {dog.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {dog.breed} • {dog.gender} • {dog.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Born: {new Date(dog.birth_date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                {user && (
                  <Box display="flex" justifyContent="flex-end" p={1}>
                    <IconButton onClick={() => handleEditDog(dog)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDog(dog.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Card>
            </Box>
          ))}
        </Box>

        <Dialog
          open={!!editingDog}
          onClose={() => setEditingDog(undefined)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingDog ? 'Edit Dog' : 'Add Dog'}
          </DialogTitle>
          <DialogContent>
            <DogForm
              dog={editingDog}
              onSubmit={handleSaveDog}
              onCancel={() => setEditingDog(undefined)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  )
} 