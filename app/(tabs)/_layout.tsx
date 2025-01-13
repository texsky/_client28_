import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header
        tabBarActiveTintColor: '#000000', // Active tab color
        tabBarInactiveTintColor: '#8e8e93', // Inactive tab color
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="cart-outline" size={size} color={color} />
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Orders Tab */}
      <Tabs.Screen
        name="promotions"
        options={{
          title: 'Promotions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Notifications Tab */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
        /**
         * The icon to display in the tab bar for the Notifications screen.
         * This function is called with an object containing `color` and `size`
         * properties, which specify the color and size of the icon to
         * display. The function should return a JSX element representing the
         * icon.
         */
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
