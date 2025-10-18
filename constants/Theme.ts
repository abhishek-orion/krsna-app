export const Theme = {
  colors: {
    primary: '#FF6B35', // Saffron/Orange
    secondary: '#004AAD', // Deep Blue
    accent: '#FFD700', // Gold
    background: '#1A1A2E', // Dark Blue/Purple
    card: '#2D1B4E', // Slightly lighter dark purple
    text: '#FFFFFF', // White
    textSecondary: '#E0E0E0', // Light Gray
    border: '#4A148C', // Dark Purple border
    notification: '#FF4500', // Orange Red
    success: '#4CAF50', // Green
    error: '#F44336', // Red
    warning: '#FFC107', // Amber

    // Saffron Palette (Hindu sentiment)
    saffron: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107', // Primary Saffron
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
    },
    // Gold Palette
    gold: {
      50: '#FFFDE7',
      100: '#FFF9C4',
      200: '#FFF59D',
      300: '#FFF176',
      400: '#FFEE58',
      500: '#FFEB3B',
      600: '#FDD835',
      700: '#FBC02D',
      800: '#F9A825',
      900: '#F57F17',
    },
    // Deep Purple Palette (for background/contrast)
    purple: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A', // Darker purple for headers/cards
      900: '#4A148C', // Deepest purple for backgrounds
    },
    // Grayscale for text and subtle elements
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  gradients: {
    primary: ['#1A1A2E', '#2D1B4E', '#4A148C'], // Deep blue to dark purple
    saffronGold: ['#FFC107', '#FFD700'],
    purpleBlue: ['#4A148C', '#004AAD'],
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  layout: {
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
};

