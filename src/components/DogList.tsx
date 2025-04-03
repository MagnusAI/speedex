import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Dog } from '../types/dog'
import { useAuth } from '../contexts/AuthContext'
import DogForm from './DogForm'

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingDog, setEditingDog] = useState<Dog | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadDogs()
  }, [])

  async function loadDogs() {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDogs(data || [])
    } catch (error) {
      setError('Failed to load dogs')
      console.error('Error loading dogs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateDog(dogData: Omit<Dog, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .insert([dogData])
        .select()
        .single()

      if (error) throw error
      setDogs([data, ...dogs])
      setShowForm(false)
    } catch (error) {
      setError('Failed to create dog')
      console.error('Error creating dog:', error)
    }
  }

  async function handleUpdateDog(dogData: Dog) {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .update(dogData)
        .eq('id', dogData.id)
        .select()
        .single()

      if (error) throw error
      setDogs(dogs.map(dog => dog.id === data.id ? data : dog))
      setShowForm(false)
      setEditingDog(null)
    } catch (error) {
      setError('Failed to update dog')
      console.error('Error updating dog:', error)
    }
  }

  async function handleDeleteDog(id: string) {
    try {
      const { error } = await supabase
        .from('dogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      setDogs(dogs.filter(dog => dog.id !== id))
    } catch (error) {
      setError('Failed to delete dog')
      console.error('Error deleting dog:', error)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {user && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{ mr: 2 }}
          >
            Add New Dog
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`#/dogs/${dog.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={dog.image_url || '/placeholder-dog.jpg'}
                alt={dog.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {dog.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dog.breed} • {dog.gender} • {dog.color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Born: {new Date(dog.birth_date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={showForm}
        onClose={() => {
          setShowForm(false)
          setEditingDog(null)
        }}
        maxWidth="md"
        fullWidth
      >
        <DogForm
          dog={editingDog}
          onSubmit={editingDog ? handleUpdateDog : handleCreateDog}
          onCancel={() => {
            setShowForm(false)
            setEditingDog(null)
          }}
        />
      </Dialog>
    </Box>
  )
} 