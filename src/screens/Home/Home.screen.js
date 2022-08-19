import React from 'react'
import {
  Text,
  Button,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import Header from '../../components/Header';
import styles from './Home.style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Home = ({ navigation, role }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} centerTitle="Home" />
      <ImageBackground source={require('../../assets/bg_bs.png')} style={styles.backgroundImage}>
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 50, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate('WasteDataList')
            }}
          style={{backgroundColor: '#00CC66',  width:'40%', height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome5 name={'trash-alt'} size={70} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('IncomingTransaction')
            }}
            style={{backgroundColor: '#00CC66', width:'40%', height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome5 name={'receipt'} size={70} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate('OutcomingTransaction')
            }}
          style={{backgroundColor: '#00CC66', width:'40%', height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome5 name={'database'} size={70} />
          </TouchableOpacity>
          {
            role === "admin" ? (
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Report')
              }}
              style={{backgroundColor: '#00CC66', width:'40%', height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name={'clipboard-list'} size={70} />
            </TouchableOpacity>) : false
          } 
        </View>
      </ImageBackground>
    </View>
  )
}
  
export default Home