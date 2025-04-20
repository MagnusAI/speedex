import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import Home from './pages/home.tsx'
import DogsAdd from './pages/dogs-add.tsx'
import Login from './pages/login.tsx'
import ProtectedRoute from './components/protected-route'
import Dogs from './pages/dogs.tsx'
import DogDetails from './pages/dog-details.tsx'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.primary,
          colorBgBase: theme.colors.background,
          colorTextBase: theme.colors.text,
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/dogs/:id" element={<DogDetails />} />
          <Route path="/dogs/add" element={<ProtectedRoute><DogsAdd /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
