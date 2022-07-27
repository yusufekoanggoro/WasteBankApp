import * as React from 'react';
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
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    
                    name="Home" component={HomeStackNavigator} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Data Sampah" component={WasteStackNavigator} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Transaksi Masuk" component={InTransactionNavigator} />

                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
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