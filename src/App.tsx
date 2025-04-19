import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
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
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
