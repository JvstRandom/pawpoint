import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Daycare from './src/screens/Daycare';
import Upload from './src/screens/Upload';
import SplashScreen from "./src/screens/SplashScreen";
import Profile from "./src/screens/Profile";
import DropdownChoice from "./src/screens/Nyoba";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upload"
          component={Upload}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;