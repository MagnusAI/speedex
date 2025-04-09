import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dogs from './pages/Dogs'
import DogProfile from './pages/DogProfile'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'

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
          <Route path="/dogs/:id" element={<DogProfile />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
