// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen, ChangePasswordScreen, ChangeInfoScreen,
  MenuScreen,SignupScreen,
  LoginScreen, ReportedPostScreen
} from '../screens/index';
import useFirebase from '../hook/useFirebase';


const Stack = createStackNavigator();
const {user} = useFirebase();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName= {user ? "Home" : "Login"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4267B2', // Facebook Blue
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {
        user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ChangeInfo" component={ChangeInfoScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="ReportedPost" component={ReportedPostScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )
      }
    </Stack.Navigator>
  );
};

export default StackNavigator;
