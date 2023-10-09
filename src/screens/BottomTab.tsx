import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { IconButton } from 'react-native-paper'
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <IconButton
              icon={require('../assets/home.png')}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        key="Profile"
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <IconButton
              icon={require('../assets/profile.png')}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
