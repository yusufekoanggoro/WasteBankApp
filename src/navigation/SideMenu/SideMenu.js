import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Linking,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import styles from './SideMenu.style';
import Icon from 'react-native-vector-icons/AntDesign'
import { AsyncStorage } from 'react-native';

 
const SideMenu = (props) => {
    const BASE_PATH =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
    const proileImage = 'react_logo.png';
    const width = useWindowDimensions().width * 0.3;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                height: 150, backgroundColor: '#66CDAA',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                paddingLeft: 10, paddingBottom: 10
            }}>
                <View style={{
                    display: 'flex', 
                }}>
                    <View style={{
                         backgroundColor: '#90EE90',
                         width: 52,
                         height: 47,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center'
                    }}>
                        <Icon name={'user'} size={40} />
                    </View>
                    <View style={{marginTop: 9}}>
                    <Text style={{fontSize: 15, color: 'white'}}>Bank Sampah</Text>
                    </View>
                    <View style={{marginTop: 9}}>
                <Text style={{fontSize: 15, color: 'white'}}>PT. Wiwin Mutiara</Text>
                    </View>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                <DrawerItem
                            label="Logout"
                            onPress={async () => {
                                await AsyncStorage.removeItem('tokenUser');
                                props.token()
                            }}
                />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};
 

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     sideMenuProfileIcon: {
//       resizeMode: 'center',
//       width: 100,
//       height: 100,
//       borderRadius: 100 / 2,
//       alignSelf: 'center',
//     },
//     iconStyle: {
//       width: 15,
//       height: 15,
//       marginHorizontal: 5,
//     },
//     customItem: {
//       padding: 16,
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
// });

export default SideMenu;