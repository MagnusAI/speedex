import { Box, Typography, Container } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Speedex
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Your trusted source for quality dog breeding
        </Typography>
        <Typography variant="body1" paragraph>
          We are dedicated to breeding healthy, well-tempered dogs that make perfect companions.
          Explore our collection of dogs and stay updated with our latest news and updates.
        </Typography>
      </Box>
    </Container>
  )
} 