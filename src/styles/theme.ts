export const theme = {
  colors: {
    primary: '#F5EDE8', // Soft beige
    secondary: '#9c6b4a', // Warm brown
    accent: '#9c6b4a', // Warm brown accent
    primaryHover: '#E8DCD3', // Slightly darker beige for hover
    secondaryHover: '#875C40', // Darker warm brown for hover
    accentHover: '#B37B56', // Lighter warm brown for hover
    background: '#FFFFFF', // Clean white
    backgroundAlt: '#1C120D', // color #1C120D
    text: '#1C120D',  // color #1C120D
    lightText: '#9c6b4a', // color #9c6b4a
    border: '#E5E8EB', // color #E5E8EB
    borderFocus: '#506C7F',  // color #506C7F
    borderHover: '#8096A7', // color #8096A7
    borderHigh: '#506C7F', // color #506C7F
    success: '#2E7D32', // color #2E7D32
    warning: '#E65100', // color #E65100
    error: '#C62828', // color #C62828
    info: '#0D47A1', // color #0D47A1
    // High contrast alternatives
    highContrast: {
      text: '#000000', // Black text for maximum contrast
      border: '#506C7F', // Primary color for high contrast borders
      background: '#FFFFFF', // Pure white background
    }
  },
  fonts: {
    primary: "'PlusJakartaSans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'PlusJakartaSans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    // Font sizes
    sizes: {
      base: '18px', // Increased from 16px for better readability
      small: '16px',
      large: '20px',
      xl: '24px',
      xxl: '32px',
    },
    // Font weights
    weights: {
      normal: 400,
      medium: 500, // Medium weight for better visibility
      semibold: 600,
      bold: 700,
    },
    // Line heights
    lineHeights: {
      body: 1.6, // Increased for better readability
      heading: 1.3,
      tight: 1.2,
    }
  },
  spacing: {
    xs: 4,    // 0.25rem
    sm: 8,    // 0.5rem
    md: 16,   // 1rem
    lg: 24,   // 1.5rem
    xl: 32,   // 2rem
    xxl: 48,  // 3rem
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
  borderRadius: {
    xs: '2px',
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.16)',
  },
  borders: {
    thin: '0.5px solid',
    medium: '1px solid',
    thick: '3px solid',
  },
  accessibility: {
    focusRing: '3px solid #1C120D',
    focusRingOffset: '2px',
    touchTarget: '44px', // Minimum touch target size
    textContrast: {
      normal: 4.5, // Minimum for normal text (WCAG AA)
      large: 3,    // Minimum for large text (WCAG AA)
      aaa: 7,      // Enhanced contrast (WCAG AAA) 
    }
  }
}; 