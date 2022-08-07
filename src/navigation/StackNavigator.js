import React from "react";
import { createNativeStackNavigator } from  '@react-navigation/native-stack';
import { HomeScreen, ProfileScreen, WasteDataListScreen, InputWasteDataScreen, IncomingTransactionScreen, LoginScreen, ReportScreen } from '../screens'
import  DrawerNavigation from './DrawerNavigation'

const Stack = createNativeStackNavigator();


const DrawerWithStack = ({token, role}) => {
  const Drawer = () => ( <DrawerNavigation token={token} role={role} /> );
  return(
    <Stack.Navigator initialRouteName="Root" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={Drawer} />
    </Stack.Navigator>
  )
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="InputWasteData">
        {props => <InputWasteDataScreen {...props} buttonBack={true} />}
      </Stack.Screen>
      <Stack.Screen name="WasteDataList">
        {props => <WasteDataListScreen {...props} buttonBack={true} />}
      </Stack.Screen>
      <Stack.Screen name="IncomingTransaction">
        {props => <IncomingTransactionScreen {...props} buttonBack={true} />}
      </Stack.Screen>
      <Stack.Screen name="OutcomingTransaction">
        {props => <IncomingTransactionScreen {...props} buttonBack={true} />}
      </Stack.Screen>
      <Stack.Screen name="Report">
        {props => <ReportScreen {...props} buttonBack={true} />}
      </Stack.Screen>
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
  ReportNavigator,
  DrawerWithStack
};