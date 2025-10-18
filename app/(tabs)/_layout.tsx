import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.gold[400],
        tabBarInactiveTintColor: Theme.colors.purple[300],
        tabBarStyle: {
          backgroundColor: Theme.colors.purple[900],
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          ...Theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: Theme.typography.sizes.xs,
          fontWeight: Theme.typography.weights.semibold,
        },
        headerStyle: {
          backgroundColor: Theme.colors.purple[800],
        },
        headerTintColor: Theme.colors.white,
        headerTitleStyle: {
          fontWeight: Theme.typography.weights.bold,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: 'Verses',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Guide',
          tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
