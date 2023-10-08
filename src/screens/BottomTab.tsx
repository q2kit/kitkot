import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen key="Profile" name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTab;
