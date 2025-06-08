import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from '@/styles/theme'
import Home from '@/pages/home'
import DogsAdd from '@/pages/dogs-add'
import Login from '@/pages/login'
import ProtectedRoute from '@/components/protected-route'
import Dogs from '@/pages/dogs'
import DogDetails from '@/pages/dog-details'
import DogsEdit from '@/pages/dogs-edit'
import DogsEditAncestry from '@/pages/dogs-edit-ancestry'
import Posts from './pages/posts'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.primary, 
          colorBgContainer: theme.colors.background,
          colorPrimaryHover: theme.colors.primaryHover,
          colorFillContent: theme.colors.backgroundAlt,
        },
        components: {
          Button: {
            primaryColor: theme.colors.text,
            fontWeight: theme.fonts.weights.bold,
            colorBgContainer: theme.colors.primary,
            defaultHoverBg: theme.colors.primaryHover,
            colorPrimaryHover: theme.colors.text,
          },
        }
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/dogs/:id" element={<DogDetails />} />
          <Route path="/dogs/add" element={<ProtectedRoute><DogsAdd /></ProtectedRoute>} />
          <Route path="/dogs/:id/edit" element={<ProtectedRoute><DogsEdit /></ProtectedRoute>} />
          <Route path="/dogs/:id/edit-ancestry" element={<ProtectedRoute><DogsEditAncestry /></ProtectedRoute>} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
