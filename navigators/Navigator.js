// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen, ChangePasswordScreen, ChangeInfoScreen,
  MenuScreen,SignupScreen,
  LoginScreen, ReportedPostScreen,
  CreatePostScreen
} from '../screens/index';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </>
    </Stack.Navigator>
  );
}

const StackNavigator = () => {


  return (
    <Stack.Navigator
      initialRouteName=  "Home"
      screenOptions={{
        headerShown: false,
        
      }}
    >

      <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ChangeInfo" component={ChangeInfoScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ReportedPost" component={ReportedPostScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          </>
    
       
    </Stack.Navigator>
  );
};

export default StackNavigator;
