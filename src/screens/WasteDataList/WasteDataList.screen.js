import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native'
import { Skeleton, Text } from '@rneui/themed';
import styles from './WasteDataList.style'
import Icon from 'react-native-vector-icons/AntDesign'

import wasteService from '../../apis/wasteService';

import ModalProduct from '../../components/Modal';
import CardProduct from '../../components/CardProduct';
import Header from '../../components/Header';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const WasteDataList = ({ navigation, buttonBack }) => {
  const [wasteData, setWasteData] = useState([]);
  const [wasteDataDetail, setWasteDataDetail] = useState({});
  const [isLoadingWaste, setIsLoadingWaste] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getWaste = async () => {
      try {
        setIsLoadingWaste(true)
        const res = await wasteService.getWasteData();

        setWasteData(res.data);
        setIsLoadingWaste(false)
      } catch(error){
        console.log(error)
        setIsLoadingWaste(false)
      }
    }

    getWaste();
  }, [])

  const onRefresh = React.useCallback( async() => {
    setRefreshing(true);
    const res = await wasteService.getWasteData();

    setWasteData(res.data);
    setRefreshing(false)
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  const LoadingWaste = () => {
    return (
      <View style={styles.loading}>
        <Skeleton width={'100%'} height={250} />
      </View>
    )
  }

  const handleClickModal = (wasteDetail) => {
    setModalVisible(!modalVisible)
    setWasteDataDetail(wasteDetail)
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} centerTitle="Data Sampah" buttonBack={buttonBack} />

      <ModalProduct 
        visible={modalVisible} 
        item={wasteDataDetail}
        onRequestClose={() => handleClickModal({})}
        onPressIncomingTransaction={() => {
          setModalVisible(!modalVisible), 
          navigation.navigate('IncomingTransaction', {
            item: wasteDataDetail,
          });
        }}
      />

      {isLoadingWaste && (
        <View style={styles.wrapLoading}>
          <LoadingWaste />
          <LoadingWaste />
          <LoadingWaste />
          <LoadingWaste />
        </View>
      )}
      
      {!isLoadingWaste && (
        <ScrollView style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap', 
          }}>
            {wasteData.map(item => (
              <CardProduct 
                key={item.id} 
                item={item} 
                onPress={() => handleClickModal(item)}
              />
            ))}
          </View>
        </ScrollView>
      )}

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