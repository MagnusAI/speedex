import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import Home from './pages/home'
import DogsAdd from './pages/dogs-add'
import Login from './pages/login'
import ProtectedRoute from './components/protected-route'

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
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dogs/add" 
            element={
              <ProtectedRoute>
                <DogsAdd />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
