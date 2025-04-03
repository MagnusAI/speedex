import { useState, useEffect } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItemButton,
  ListItemIcon, 
  ListItemText,
  ListItem,
  Box,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  Article as ArticleIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Email as EmailIcon
} from '@mui/icons-material'
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import BlogFeed from './components/BlogFeed'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './components/Home'
import DogList from './components/DogList'
import Login from './components/Login'

// Create theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

const drawerWidth = 240

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()
  const { user, handleSignOut } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Our Dogs', icon: <PetsIcon />, path: '/dogs' },
    { text: 'Blog', icon: <ArticleIcon />, path: '/blog' },
  ]

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Speedex
        </Typography>
      </Toolbar>
      <List>
        <ListItemButton
          component="button"
          onClick={() => navigate('/')}
          selected={location.hash === '#/'}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          component="button"
          onClick={() => navigate('/dogs')}
          selected={location.hash === '#/dogs'}
        >
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Our Dogs" />
        </ListItemButton>
        <ListItemButton
          component="button"
          onClick={() => navigate('/blog')}
          selected={location.hash === '#/blog'}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton>
        <Divider />
        {user ? (
          <ListItemButton
            component="button"
            onClick={handleSignOut}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        ) : (
          <ListItemButton
            component="button"
            onClick={() => navigate('/login')}
            selected={location.hash === '#/login'}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        )}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            {menuItems.find(item => item.path === location.pathname)?.text || 'Speedex'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <Routes>
          <Route path="/" element={
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Velkommen til Kennel Speedex
              </Typography>
              <Typography variant="body1" paragraph>
                Kennel Speedex er et lille seriøst opdræt af Jack Russell Terrier i Gilleleje.
              </Typography>
              <Typography variant="body1" paragraph>
                Her på siden kan du følge med i vores liv med hundene.
                Rigtig god fornøjelse.
              </Typography>
              <Typography variant="body1" paragraph>
                Kennel Speedex er bygget op omkring jack russell terrier, men er nu gået over til fremover at have mere fokus på northfolk terrier.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Kontakt
                </Typography>
                <Typography variant="body1" paragraph>
                  Tine Arnild
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon />
                  <Typography 
                    component="a" 
                    href="mailto:tinearnild@hotmail.com"
                    sx={{ 
                      textDecoration: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    tinearnild@hotmail.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          } />
          <Route path="/dogs" element={
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Vores Hunde
              </Typography>
              <Typography variant="body1" paragraph>
                Her kan du møde vores hunde. Vi fokuserer på at avle sunde og velbalancerede hunde med godt temperament.
              </Typography>
              <Typography variant="body1" paragraph>
                Vores avlsprogram er baseret på:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Sunde og raske hunde" 
                    secondary="Alle vores hunde gennemgår grundig sundhedstestning"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Godt temperament" 
                    secondary="Vi vælger avlsdyr med fokus på godt og stabilt temperament"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Standard" 
                    secondary="Vores hunde følger racekæmpernes standard"
                  />
                </ListItem>
              </List>
              <DogList />
            </Box>
          } />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
