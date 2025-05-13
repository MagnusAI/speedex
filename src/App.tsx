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
          // Colors
          colorPrimary: theme.colors.primary,
          colorSuccess: theme.colors.success,
          colorWarning: theme.colors.warning,
          colorError: theme.colors.error,
          colorInfo: theme.colors.info,
          colorBgBase: theme.colors.background,
          colorTextBase: theme.colors.text,
          
          // Fonts and typography
          fontFamily: theme.fonts.primary,
          fontSize: parseInt(theme.fonts.sizes.base),
          lineHeight: theme.fonts.lineHeights.body,
          fontWeightStrong: theme.fonts.weights.semibold,
          
          // Borders and shapes
          borderRadius: 10,
          colorBorder: theme.colors.border,
          colorBorderSecondary: theme.colors.borderHover,
          lineWidth: 1,
          
          // Backgrounds
          colorBgContainer: theme.colors.background,
          colorBgElevated: theme.colors.background,
          colorBgLayout: theme.colors.backgroundAlt,
          
          // Shadows
          boxShadow: theme.shadows.sm,
          boxShadowSecondary: theme.shadows.md,
          
          // Focus states
          controlOutline: theme.colors.borderFocus,
          controlOutlineWidth: 2,
          
          // Spacing
          controlHeightLG: 48,
          controlHeight: 44,
          controlHeightSM: 36,
          paddingXS: 8,
          paddingContentHorizontalLG: 20,
        },
        components: {
          Typography: {
            fontWeightStrong: theme.fonts.weights.semibold,
            titleMarginBottom: 16,
          },
          Card: {
            boxShadow: theme.shadows.sm,
            colorBorder: theme.colors.border,
            colorBorderSecondary: theme.colors.borderHover,
            borderRadiusLG: parseInt(theme.borderRadius.md),
            paddingLG: 20,
          },
          Button: {
            borderRadius: 8,
            controlHeight: 44,
            controlHeightLG: 52,
            controlOutline: theme.colors.borderFocus,
            defaultBorderColor: theme.colors.border,
            defaultColor: theme.colors.text,
            fontWeight: theme.fonts.weights.medium,
          },
          Input: {
            activeBorderColor: theme.colors.borderFocus,
            hoverBorderColor: theme.colors.borderHover,
            colorBorder: theme.colors.border,
            controlHeight: 44,
            borderRadius: 8,
            paddingInline: 12,
          },
          Form: {
            labelHeight: 28,
            labelColor: theme.colors.text,
            labelFontSize: parseInt(theme.fonts.sizes.base),
            itemMarginBottom: 24,
          },
          Table: {
            borderColor: theme.colors.border,
            headerBg: theme.colors.backgroundAlt,
            headerColor: theme.colors.text,
            headerSplitColor: theme.colors.border,
            rowHoverBg: theme.colors.secondary,
            lineWidth: 1,
          },
          Divider: {
            colorSplit: theme.colors.border,
            lineWidth: 1,
            marginLG: 32,
          }
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
