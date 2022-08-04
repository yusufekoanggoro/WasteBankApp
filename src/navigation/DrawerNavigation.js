import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, ProfileScreen, WasteDataListScreen, InputWasteDataScreen, ReportScreen, IncomingTransactionScreen } from '../screens'
import CustomSidebarMenu from './SideMenu/SideMenu';
import { HomeStackNavigator, WasteStackNavigator, InTransactionNavigator, OutTransactionNavigator, ReportNavigator } from './StackNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigation =  ({token, role}) => {
    return(
            <Drawer.Navigator 
                initialRouteName="Home"
                drawerContent={(props) => <CustomSidebarMenu {...props} token={token} />}
                screenOptions={{swipeEnabled: false, headerShown: false}}
            >
                <Drawer.Screen
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome5 name={'home'} size={size} color={color} />
                        ),
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    
                    name="Home" component={HomeStackNavigator} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome5 name={'trash-alt'} size={size} color={color} />
                        ),
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Data Sampah" component={WasteStackNavigator} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome5 name={'receipt'} size={size} color={color} />
                        ),
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Transaksi Masuk" component={InTransactionNavigator} />

                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerIcon: ({color, size}) => (
                            <FontAwesome5 name={'database'} size={size} color={color} />
                        ),
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Transaksi Keluar" component={OutTransactionNavigator} />
                {
                    role === "admin" ? (
                        <Drawer.Screen 
                        options={{
                            // drawerActiveBackgroundColor: 'red',
                            drawerIcon: ({color, size}) => (
                                <FontAwesome5 name={'database'} size={size} color={color} />
                            ),
                            drawerActiveTintColor:  '#000000',
                            headerStyle: {
                                backgroundColor: '#66CDAA'
                            }
                        }} 
                    name="Laporan" component={ReportNavigator} />
                    ) : false 
                }
                
            </Drawer.Navigator>
    )
}

export default DrawerNavigation;