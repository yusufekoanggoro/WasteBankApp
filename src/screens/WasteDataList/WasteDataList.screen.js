import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Text, Card } from '@rneui/themed';
import styles from './WasteDataList.style'
import Icon from 'react-native-vector-icons/AntDesign'

import wasteService from '../../apis/wasteService';

import ModalProduct from '../../components/Modal';
import CardProduct from '../../components/CardProduct';
import Header from '../../components/Header';


const WasteDataList = ({ navigation }) => {
  const [wasteData, setWasteData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getWaste = async () => {
      const res = await wasteService.getWasteData();

      setWasteData(res);
    }

    getWaste();
  }, [])

  const dataSampah = [
    {
      name: 'Kardus',
      harga: 2000,
      url: '',
    },
    {
      name: 'Gelas Plastik',
      harga: 1200,
      url: '',
    },
    {
      name: 'Pet',
      harga: 1500,
      url: '',
    },
    {
      name: 'Besi',
      harga: 3500,
      url: '',
    },
  ]

  return (
    <View style={styles.container}>
      <Header navigation={navigation} centerTitle="Data Sampah" />

      <ModalProduct 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressIncomingTransaction={() => {
          setModalVisible(!modalVisible), 
          navigation.push('IncomingTransaction')
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap', 
        }}>
          {wasteData.map(item => (
            <CardProduct 
              key={item.id} 
              item={item} 
              onPress={() => setModalVisible(true)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={{
        position: 'absolute',
        flex: 1,
        bottom: 15,
        right: 15,
        alignSelf: 'flex-end'
      }}>
        <TouchableOpacity
          style={styles.roundButton1}
          onPress={() => navigation.navigate("InputWasteData")}
          >
            <View>
              <Icon name={'plus'} size={30} color={'#000000'} />
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WasteDataList