import { useState } from 'react'
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  Article as ArticleIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import BlogFeed from './components/BlogFeed'
import DogList from './components/DogList'
import Login from './components/Login'
import Home from './components/Home'

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
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<DogList />} />
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
