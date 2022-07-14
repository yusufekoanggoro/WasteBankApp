import React from 'react'
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'

const Header = ({navigation, centerTitle, buttonBack = false}) => {
    let leftComponent;
    if(buttonBack){
        leftComponent = {
            icon: 'menu',
            color: '#fff',
            onPress: () => navigation.goBack()
        }
    }else{
        leftComponent = {
            icon: 'menu',
            color: '#fff',
            onPress: () => navigation.openDrawer()
        }
    }
    return (
        <HeaderRNE
            backgroundColor="#66CDAA"
                leftComponent={leftComponent}
            centerComponent={{ text: centerTitle, style: styles.heading }}
        />
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#397af8',
      marginBottom: 20,
      width: '100%',
      paddingVertical: 15,
    },
    heading: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerRight: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
    },
    subheaderText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default Header