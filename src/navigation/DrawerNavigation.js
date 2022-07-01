import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, ProfileScreen, WasteDataListScreen, InputWasteDataScreen } from '../screens'
import CustomSidebarMenu from './SideMenu/SideMenu';

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Transaksi Masuk"
                drawerContent={(props) => <CustomSidebarMenu {...props} />}
                screenOptions={{swipeEnabled: false}}
            >
                <Drawer.Screen
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        },
                    }} 
                    name="Home" component={HomeScreen} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Data Sampah" component={WasteDataListScreen} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Transaksi Masuk" component={InputWasteDataScreen} />
                <Drawer.Screen 
                    options={{
                        // drawerActiveBackgroundColor: 'red',
                        drawerActiveTintColor:  '#000000',
                        headerStyle: {
                            backgroundColor: '#66CDAA'
                        }
                    }} 
                    name="Transaksi Keluar" component={ProfileScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation