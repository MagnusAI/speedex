import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from './styles/theme'
import Home from './pages/Home'
import DogsAdd from './pages/dogs-add'

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
          <Route path="/dogs/add" element={<DogsAdd />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
