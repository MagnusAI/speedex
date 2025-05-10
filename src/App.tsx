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
          lineWidth: 1, // Using lineWidth instead of borderWidth
          
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
          controlHeightLG: 48, // Increased for better touch targets
          controlHeight: 44, // Matches accessibility minimum touch target size
          controlHeightSM: 36, // Increased from default
          paddingXS: 8,
          paddingContentHorizontalLG: 20, // Increased horizontal padding
        },
        components: {
          Typography: {
            fontWeightStrong: theme.fonts.weights.semibold,
            fontFamily: theme.fonts.heading,
            marginXS: 8,
            marginSM: 16, 
            marginMD: 24,
            titleMarginBottom: 16, // Increased space after titles
          },
          Card: {
            boxShadow: theme.shadows.sm,
            colorBorder: theme.colors.border, // Using colorBorder instead of borderColor
            colorBorderSecondary: theme.colors.borderHover,
            borderRadiusLG: parseInt(theme.borderRadius.md),
            paddingLG: 20, // Increased padding for better spacing
          },
          Button: {
            borderRadius: 8,
            controlHeight: 44, // Accessible touch target size
            controlHeightLG: 52, // Larger buttons for important actions
            controlOutline: theme.colors.borderFocus,
            defaultBorderColor: theme.colors.border,
            defaultColor: theme.colors.text,
            fontWeight: theme.fonts.weights.medium,
          },
          Input: {
            activeBorderColor: theme.colors.borderFocus,
            hoverBorderColor: theme.colors.borderHover,
            colorBorder: theme.colors.border, // Using colorBorder instead of borderColor or borderWidth
            controlHeight: 44, // Accessible height
            borderRadius: 8,
            paddingInline: 12, // Increased horizontal padding
          },
          Form: {
            labelHeight: 28, // Larger label height
            labelColor: theme.colors.text,
            labelFontSize: parseInt(theme.fonts.sizes.base),
            itemMarginBottom: 24, // More space between form items
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
