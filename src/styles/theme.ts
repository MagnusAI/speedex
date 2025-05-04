export const theme = {
  colors: {
    primary: '#506C7F', // Slate blue-grey
    secondary: '#E8ECEF', // Light grey with blue tint
    accent: '#738C9C', // Medium blue-grey
    background: '#FFFFFF', // Clean white
    backgroundAlt: '#F5F7F9', // Subtle off-white
    text: '#252A32', // Darker charcoal for better contrast (was #333741)
    lightText: '#FFFFFF', // White
    border: '#BBC4CC', // Medium grey border with better contrast (was #D9E0E6)
    borderFocus: '#506C7F', // Primary color for focus borders
    borderHover: '#8096A7', // Lighter variant for hover states
    borderHigh: '#506C7F', // High contrast border option
    success: '#2E7D32', // Darker green for better contrast (was #4CAF50)
    warning: '#E65100', // Darker amber for better contrast (was #FF9800)
    error: '#C62828', // Darker red for better contrast (was #F44336)
    info: '#0D47A1', // Darker blue for better contrast (was #2196F3)
    // High contrast alternatives
    highContrast: {
      text: '#000000', // Black text for maximum contrast
      border: '#506C7F', // Primary color for high contrast borders
      background: '#FFFFFF', // Pure white background
    }
  },
  fonts: {
    primary: "'Nunito', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Quicksand', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
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
    thin: '1px solid',
    medium: '2px solid',
    thick: '3px solid',
  },
  accessibility: {
    focusRing: '3px solid #506C7F',
    focusRingOffset: '2px',
    touchTarget: '44px', // Minimum touch target size
    textContrast: {
      normal: 4.5, // Minimum for normal text (WCAG AA)
      large: 3,    // Minimum for large text (WCAG AA)
      aaa: 7,      // Enhanced contrast (WCAG AAA) 
    }
  }
}; 