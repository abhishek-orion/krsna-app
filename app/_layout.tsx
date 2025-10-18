import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../src/state/authStore';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { Theme } from '../constants/Theme';

const queryClient = new QueryClient();

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="chapter/[id]" 
            options={{ 
              headerShown: true,
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: Theme.colors.background,
              },
              headerTintColor: Theme.colors.text,
              headerTitleStyle: {
                fontWeight: '600',
              },
              presentation: 'card',
            }} 
          />
          <Stack.Screen 
            name="verse/[chapter]/[verse]" 
            options={{ 
              headerShown: true,
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: Theme.colors.background,
              },
              headerTintColor: Theme.colors.text,
              headerTitleStyle: {
                fontWeight: '600',
              },
              presentation: 'card',
            }} 
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
