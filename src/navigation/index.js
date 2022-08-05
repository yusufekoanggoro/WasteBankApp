import React, { useState, useEffect } from "react";
import DrawerNavigation from './DrawerNavigation'
import { AuthStackNavigator, DrawerWithStack } from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainNavigation = () => { 
    const [foundToken, setFoundToken] = useState('');
    const [roleUser, setUserRole] = useState('');

    const checkToken = async () => {
        try {
          let findingToken = await AsyncStorage.getItem('accessToken');
          setFoundToken(findingToken);
          let roleUser = await AsyncStorage.getItem('roleUser');
          setUserRole(roleUser)
        } catch (error) {
          console.log(error);
        }
    }
    
    useEffect(() => {
        checkToken();
      }, []);
    
    return (
        <NavigationContainer>
            { (foundToken !== null ? (<DrawerWithStack token={checkToken} role={roleUser} />) : (<AuthStackNavigator token={checkToken} />)) }
        </NavigationContainer>
    )
 }

export default MainNavigation