import React from 'react'
import {
  Text,
  Button,
  View
} from 'react-native'

import Header from '../../components/Header';
import CardReport from '../../components/CardReport';

const Report = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation} centerTitle="Laporan" />
      
      <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
      </View>
    </>
  )
}
  
export default Report