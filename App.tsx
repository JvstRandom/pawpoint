import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './src/screens/Home';
import Daycare from './src/screens/Daycare';
import SplashScreen from "./src/screens/SplashScreen";
import DropdownChoice from "./src/screens/Nyoba";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Daycare"
          component={Daycare}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nyoba"
          component={DropdownChoice}
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