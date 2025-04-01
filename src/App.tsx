import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Container, Typography, Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import PetsIcon from '@mui/icons-material/Pets'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import BlogFeed from './components/BlogFeed'
import { useState } from 'react'

// Create a theme instance
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, href: '#' },
    { text: 'Our Dogs', icon: <PetsIcon />, href: '#dogs' },
    { text: 'Competitions', icon: <EmojiEventsIcon />, href: '#competitions' },
    { text: 'Contact', icon: <ContactMailIcon />, href: '#contact' },
  ]

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Speedex Kennel
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component="a" href={item.href}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Speedex Kennel
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            mt: 8
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
              Welcome to Speedex Kennel
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
              Follow our dogs' journey through daily life and competitions
            </Typography>
            <BlogFeed />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
