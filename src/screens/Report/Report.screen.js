import React, { useState, useEffect } from 'react'
import {
  View,
  Text, 
  ScrollView
} from 'react-native'

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Report.style';

import Header from '../../components/Header';
import CardReport from '../../components/CardReport';

import { apiHost } from '../../envs/env.development';
import reportService from '../../apis/reportService';

const Report = ({ navigation, buttonBack }) => {
  const [selectedValue, setSelectedValue] = useState("in");
  const [dateFirst, setDateFirst] = useState(new Date())
  const [openDateFirst, setOpenDateFirst] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [openEndDate, setOpenEndDate] = useState(false)
  const [dataTransactions, setDataTransactions] = useState([]);

  // useEffect(() => {
  //   const getReports = async () => {
  //     try{
  //       const response = await reportService.getReport(`page=1&size=10&sort=createdAt%3Adesc&startDate=01%2F01%2F2022&endDate=26%2F07%2F2022&type=in`);
  //       console.log(response)

  //       setDataTransactions(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getReports()
  // }, [])

  useEffect(() => {
    getReports(selectedValue, dateFirst.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
  }, [selectedValue, dateFirst, endDate])

  const getReports = async (type, startDate, endDate) => {
    try{
      const response = await reportService.getReport(`page=1&size=10&sort=createdAt%3Adesc&startDate=${startDate}&endDate=${endDate}&type=${type}`);

      if(response.code === 200) {
        setDataTransactions([])
        setDataTransactions(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const downLoadFile = async (file) => {
    const { config, fs } = RNFetchBlob
    const token = await AsyncStorage.getItem("accessToken");

    let DownloadDir = fs.dirs.DownloadDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path : DownloadDir + '/download.xlsx',
      }
    }
    config(options).fetch('GET', `${apiHost}${file}`, {
      Authorization : `Bearer ${token}`,
    }).then((res) => {
      console.log('The file saved')
    }).catch(error => console.log(error))
  }

  const getDownloadReport = async () => {
    try {
      const response = await reportService.getDownloadReport(`startDate=2021&endDate=${endDate.toISOString().split('T')[0]}&type=${selectedValue}`);
      const data = response.data;

      if(response.code === 200) {
        await downLoadFile(data.fileName);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header navigation={navigation} centerTitle="Laporan" buttonBack={buttonBack} />

      <DatePicker
        mode={'date'}
        modal
        open={openDateFirst}
        date={dateFirst}
        onConfirm={(date) => {
          console.log(date)
          setOpenDateFirst(false)
          setDateFirst(date)
        }}
        onCancel={() => {
          setOpenDateFirst(false)
        }}
      />

      <DatePicker
        mode={'date'}
        modal
        open={openEndDate}
        date={endDate}
        onConfirm={(date) => {
          setOpenEndDate(false)
          setEndDate(date)
        }}
        onCancel={() => {
          setOpenEndDate(false)
        }}
      />
      
      <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>

        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{ flex: 1, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setOpenDateFirst(true)}>
              <Text style={{ color: 'black', fontSize: 18 }}>
                {dateFirst.toISOString().split('T')[0]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.2, height: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ color: 'black' }}>s/d</Text>
          </View>
          <View style={{ flex: 1, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setOpenEndDate(true)}>
              <Text style={{ color: 'black', fontSize: 18 }}>
                {endDate.toISOString().split('T')[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'gray', width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
          <Picker
            selectedValue={selectedValue}
            dropdownIconColor="black"
            style={{ height: 40, width: 200, color: 'black'}}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Transaksi Masuk" value="in" />
            <Picker.Item label="Transaksi Keluar" value="out" />
          </Picker>
        </View>
        <ScrollView>
          {dataTransactions.map((item, index) => (
            <CardReport key={index} item={item} />
          ))}
        </ScrollView>
        <View style={{
          position: 'absolute',
          flex: 1,
          bottom: 15,
          right: 15,
          alignSelf: 'flex-end',
        }}>
          <TouchableOpacity
            style={styles.roundButton1}
            onPress={() => getDownloadReport()}
            >
              <View>
                <Icon name={'download'} size={30} color={'#FFF'} />
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
  
export default Report