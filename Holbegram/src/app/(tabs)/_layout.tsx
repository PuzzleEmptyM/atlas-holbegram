import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { auth } from '../../../firebase';

export default function TabsLayout() {
  const router = useRouter();
  const handleLogout = async () => {
    console.log('Logout button pressed');
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      router.replace('/');
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 20, padding: 10 }}>
            <FontAwesome name="sign-out" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Home Feed',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={26} color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="new"
        options={{
          headerTitle: "Add Post",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-square-o" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
