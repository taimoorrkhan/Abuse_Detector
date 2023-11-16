// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuScreen, ProfileScreen,TextInputScreen } from '../screens/index';
import StackNavigator from './Navigator';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: () => null,

      
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeNavigator') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4267B2', // Facebook Blue
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeNavigator" component={StackNavigator} />
      <Tab.Screen name="More" component={TextInputScreen} />
  {/*     <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
