import React from "react";
import { createNativeStackNavigator } from  '@react-navigation/native-stack';
import { HomeScreen, ProfileScreen, WasteDataListScreen, InputWasteDataScreen, IncomingTransactionScreen, LoginScreen, ReportScreen } from '../screens'

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
        <Stack.Screen name="IncomingTransaction" component={IncomingTransactionScreen} />
      </Stack.Navigator>
    );
}

const InTransactionNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="IncomingTransaction" component={IncomingTransactionScreen} />
      </Stack.Navigator>
    );
}

const OutTransactionNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OutcomingTransaction" component={IncomingTransactionScreen} />
    </Stack.Navigator>
  );
}

const ReportNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = ({token}) => {
  return (
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SignIn"><LoginScreen /></Stack.Screen> */}
        <Stack.Screen name="SignIn">
          {props => <LoginScreen {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="InputWasteData" component={InputWasteDataScreen} />
      </Stack.Navigator>
  );
}

export { 
  HomeStackNavigator, 
  WasteStackNavigator, 
  InTransactionNavigator, 
  OutTransactionNavigator, 
  AuthStackNavigator, 
  ReportNavigator 
};