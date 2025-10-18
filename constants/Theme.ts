// Light theme colors (Saffron & Peacock Feather theme)
export const lightTheme = {
  colors: {
    // Primary Brand Colors (Saffron & Peacock inspired)
    primary: '#FF9933', // Sacred Saffron
    secondary: '#FF7518', // Deep Saffron
    accent: '#0047AB', // Royal Blue (Peacock)
    background: '#FFF8E7', // Cream/Light Saffron Background
    card: '#FFFFFF', // Pure White Card
    text: '#1A1410', // Very Dark Brown Text (better contrast)
    textSecondary: '#5C4A3A', // Medium Brown (better contrast)
    border: '#E8D5B5', // Soft Gold border
    notification: '#FF6B81', // Soft Red
    success: '#00A86B', // Emerald Green (Peacock)
    error: '#D32F2F', // Error Red
    warning: '#FF9933', // Saffron Warning
    
    // Enhanced Saffron Palette
    saffron: {
      50: '#FFF9F0',
      100: '#FFF3E0',
      200: '#FFE0B2',
      300: '#FFCC80',
      400: '#FFB74D',
      500: '#FF9933', // Primary Sacred Saffron
      600: '#FF7518', // Deep Saffron
      700: '#F57C00',
      800: '#E65100',
      900: '#BF360C',
    },
    // Peacock Feather Palette
    peacock: {
      blue: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#0047AB', // Royal Blue
        600: '#1976D2',
        700: '#1565C0',
        800: '#0D47A1',
        900: '#003D82',
      },
      green: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#00A86B', // Emerald Green
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
      },
      turquoise: {
        50: '#E0F7FA',
        100: '#B2EBF2',
        200: '#80DEEA',
        300: '#4DD0E1',
        400: '#26C6DA',
        500: '#40E0D0', // Turquoise
        600: '#00ACC1',
        700: '#0097A7',
        800: '#00838F',
        900: '#006064',
      },
    },
    // Gold Palette
    gold: {
      50: '#FFF9E6',
      100: '#FFF3CC',
      200: '#FFE699',
      300: '#FFD966',
      400: '#FFD700', // Bright Gold
      500: '#FFA500', // Deep Gold
      600: '#FF8C00',
      700: '#FF7F00',
      800: '#CC6600',
      900: '#995200',
    },
    // Purple Palette (lighter versions for light theme)
    purple: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6', // Base purple for light theme
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    // Grayscale
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    white: '#FFFFFF',
    black: '#000000',
    
    // Additional UI Colors
    overlay: 'rgba(255, 153, 51, 0.1)',
    glassOverlay: 'rgba(0, 71, 171, 0.1)',
    darkGlassOverlay: 'rgba(0, 0, 0, 0.1)',
  },
  gradients: {
    // Saffron Gradients
    primary: ['#FFF8E7', '#FFE0B2', '#FFCC80'], // Cream to saffron
    spiritual: ['#FF9933', '#FFB74D', '#FFCC80'], // Saffron fade
    sunrise: ['#FF9933', '#FFD700', '#FFF8E7'], // Saffron sunrise
    night: ['#FFF8E7', '#FFE0B2', '#FFCC80'], // Same as primary (light doesn't have night)
    peacock: ['#0047AB', '#40E0D0', '#00A86B'], // Peacock feathers
    sacredGold: ['#FFD700', '#FFA500', '#FF9933'], // Gold to saffron
    card: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 248, 231, 0.95)'], // Light glass
    cardSolid: ['#FFFFFF', '#FFF8E7'], // White to cream
    overlay: ['rgba(255, 248, 231, 0)', 'rgba(255, 248, 231, 0.95)'], // Light fade
    featured: ['#FF9933', '#FFB74D'], // Saffron featured
  },
};

// Dark theme colors (Original Purple theme)
export const darkTheme = {
  colors: {
    // Primary Brand Colors (inspired by meditation apps)
    primary: '#6C5CE7', // Vibrant Purple
    secondary: '#5F3DC4', // Rich Purple
    accent: '#FFC517', // Bright Gold
    background: '#1A0B2E', // Very Deep Purple Background (darker for better contrast)
    card: '#2C1654', // Card Purple (darker than before)
    text: '#FFFFFF', // White
    textSecondary: '#C7B8EA', // Light Purple Gray (lighter for better contrast)
    border: '#4D3A8C', // Subtle Purple border
    notification: '#FF6B81', // Soft Red
    success: '#4ECB71', // Fresh Green
    error: '#FF5757', // Soft Error Red
    warning: '#FFC517', // Gold Warning
    
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
    primary: ['#0D0520', '#1A0B2E', '#2C1654'], // Very deep to deep purple
    // Warm Spiritual Gradient
    spiritual: ['#6C5CE7', '#8B73D9', '#A990E4'], // Purple fade
    // Sunrise Gradient
    sunrise: ['#FF6B81', '#FFC517', '#FFD966'], // Warm glow
    // Peaceful Night
    night: ['#0D0520', '#1A0B2E', '#2C1654'], // Very deep peaceful
    // Sacred Gold
    sacredGold: ['#FFC517', '#FFD966', '#FFE699'], // Gold shimmer
    // Card Gradient
    card: ['rgba(44, 22, 84, 0.8)', 'rgba(74, 46, 127, 0.6)'], // Darker glass effect
    cardSolid: ['#2C1654', '#3E2C6B'], // Darker solid card gradient
    // Overlay Gradient
    overlay: ['rgba(13, 5, 32, 0)', 'rgba(13, 5, 32, 0.95)'], // Fade to very dark
    // Featured Gradient
    featured: ['#6C5CE7', '#A990E4'], // Soft purple
  },
};

// Common design tokens (shared between themes)
const commonTokens = {
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
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    full: 999,
  },
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

// Light theme shadows
const lightShadows = {
  sm: {
    shadowColor: '#FF9933',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#FF7518',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#0047AB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Dark theme shadows
const darkShadows = {
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
};

// Function to get theme based on mode
export const getTheme = (mode: 'light' | 'dark' = 'dark') => {
  const themeColors = mode === 'light' ? lightTheme : darkTheme;
  const themeShadows = mode === 'light' ? lightShadows : darkShadows;
  
  return {
    ...themeColors,
    ...commonTokens,
    shadows: themeShadows,
  };
};

// Default export (dark theme by default)
export const Theme = getTheme('dark');

