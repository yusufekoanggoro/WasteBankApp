import React, { useState, useEffect } from "react";
import DrawerNavigation from './DrawerNavigation'
import { AuthStackNavigator } from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainNavigation = () => { 
    const [foundToken, setFoundToken] = useState('');

    const checkToken = async () => {
        try {
          let findingToken = await AsyncStorage.getItem('accessToken');
          setFoundToken(findingToken);
        } catch (error) {
          console.log(error);
        }
    }
    
    useEffect(() => {
        checkToken();
      }, []);
    
    return (
        <NavigationContainer>
            { (foundToken !== null ? (<DrawerNavigation token={checkToken} />) : (<AuthStackNavigator token={checkToken} />)) }
        </NavigationContainer>
    )
 }

export default MainNavigation