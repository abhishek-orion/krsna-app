export const Theme = {
  colors: {
    // Primary Brand Colors (inspired by meditation apps)
    primary: '#5B4FC9', // Soft Royal Purple
    secondary: '#3D2C8D', // Deep Indigo
    accent: '#FFB800', // Warm Gold
    background: '#2D1B4E', // Rich Dark Purple
    card: '#3D2D6B', // Card Purple
    text: '#FFFFFF', // White
    textSecondary: '#C7B8EA', // Soft Purple Gray
    border: '#4A3A8C', // Subtle Purple border
    notification: '#FF6B6B', // Soft Red
    success: '#4ECB71', // Fresh Green
    error: '#FF5757', // Soft Error Red
    warning: '#FFB800', // Gold Warning
    
    // Enhanced Saffron Palette (warmer, more inviting)
    saffron: {
      50: '#FFF9E6',
      100: '#FFF3CC',
      200: '#FFE699',
      300: '#FFD966',
      400: '#FFCC33',
      500: '#FFB800', // Primary Warm Gold
      600: '#E6A600',
      700: '#CC9400',
      800: '#B38200',
      900: '#997000',
    },
    // Refined Gold Palette (more luxurious)
    gold: {
      50: '#FFFCF0',
      100: '#FFF8DC',
      200: '#FFEDB3',
      300: '#FFE28A',
      400: '#FFD861',
      500: '#FFCE3C', // Luminous Gold
      600: '#F5C518', // Bright Gold
      700: '#D4A817',
      800: '#B38F14',
      900: '#927611',
    },
    // Deep Purple Palette (meditation-inspired)
    purple: {
      50: '#F3EFFC',
      100: '#E3D9F8',
      200: '#C8B6EF',
      300: '#A990E4',
      400: '#8B6DD9',
      500: '#6C4FCC', // Vibrant Purple
      600: '#5B4FC9', // Primary Brand Purple
      700: '#4A3FB8',
      800: '#3D2C8D', // Rich Deep Purple
      900: '#2D1B6E', // Darkest Purple
    },
    // Soft Indigo (for depth and contrast)
    indigo: {
      50: '#EAECF9',
      100: '#D4D9F3',
      200: '#A9B3E7',
      300: '#7F8DDB',
      400: '#5467CF',
      500: '#3D51C3',
      600: '#32419B',
      700: '#283174',
      800: '#1D204C',
      900: '#121025',
    },
    // Grayscale (softer, more elegant)
    gray: {
      50: '#FAFBFC',
      100: '#F4F5F7',
      200: '#EBECF0',
      300: '#DFE1E6',
      400: '#C1C7D0',
      500: '#A5ADBA',
      600: '#7A869A',
      700: '#6B778C',
      800: '#505F79',
      900: '#344563',
    },
    white: '#FFFFFF',
    black: '#000000',
    
    // Additional UI Colors
    overlay: 'rgba(45, 27, 78, 0.95)',
    glassOverlay: 'rgba(255, 255, 255, 0.1)',
    darkGlassOverlay: 'rgba(0, 0, 0, 0.3)',
  },
  gradients: {
    // Primary App Gradient
    primary: ['#2D1B6E', '#3D2C8D', '#5B4FC9'], // Deep to vibrant purple
    // Warm Spiritual Gradient
    spiritual: ['#5B4FC9', '#8B6DD9', '#A990E4'], // Purple fade
    // Sunrise Gradient
    sunrise: ['#FF6B6B', '#FFB800', '#FFCE3C'], // Warm glow
    // Peaceful Night
    night: ['#1D204C', '#2D1B6E', '#3D2C8D'], // Deep peaceful
    // Sacred Gold
    sacredGold: ['#FFB800', '#FFCE3C', '#FFE28A'], // Gold shimmer
    // Card Gradient
    card: ['rgba(61, 45, 107, 0.6)', 'rgba(91, 79, 201, 0.3)'], // Glass effect
    // Overlay Gradient
    overlay: ['rgba(45, 27, 78, 0)', 'rgba(45, 27, 78, 0.9)'], // Fade to dark
  },
  typography: {
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
    lineHeights: {
      xs: 14,
      sm: 16,
      base: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
      xxxl: 40,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 24,
    full: 999,
  },
  shadows: {
    sm: {
      shadowColor: '#2D1B6E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#2D1B6E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: '#2D1B6E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
    },
    glow: {
      shadowColor: '#FFB800',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  // Animations
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  layout: {
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
};

