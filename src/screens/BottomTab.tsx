import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper'
import Home from './Home';
import Profile from './Profile';
import Chat from './Chat';
import Explore from './Explore';
import Upload from './Upload';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 50,
          backgroundColor: '#1e1e1e',
          borderBlockColor: "#000",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconButton
              icon={require('../assets/home.png')}
              size={20}
              style={{ marginTop: 10 }}
              iconColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key="Explore"
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconButton
              icon={require('../assets/explore.png')}
              size={20}
              style={{ marginTop: 10 }}
              iconColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        key="Upload"
        name="Upload"
        component={Upload}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/add.png')}
              style={{
                width: 35,
                height: 35,
                marginTop: 20,
                borderRadius: 20,
                backgroundColor: '#fff',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        key="Chat"
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          title: 'Inbox',
          tabBarIcon: ({ color }) => (
            <IconButton
              icon={require('../assets/chat.png')}
              size={20}
              style={{ marginTop: 10 }}
              iconColor={color}
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
          tabBarIcon: ({ color }) => (
            <IconButton
              icon={require('../assets/profile.png')}
              size={20}
              style={{ marginTop: 10 }}
              iconColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
