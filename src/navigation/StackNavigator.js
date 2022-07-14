import React from "react";
import { createNativeStackNavigator } from  '@react-navigation/native-stack';

import { HomeScreen, ProfileScreen, WasteDataListScreen, InputWasteDataScreen } from '../screens'

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="InputWasteData" component={InputWasteDataScreen} />
    </Stack.Navigator>
  );
}

const WasteStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WasteDataList" component={WasteDataListScreen} />
        <Stack.Screen name="InputWasteData" component={InputWasteDataScreen} />
      </Stack.Navigator>
    );
  }

export { HomeStackNavigator, WasteStackNavigator };