import React, { useState } from 'react'
import {
  View,
  Text, 
  ScrollView
} from 'react-native'

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

import Header from '../../components/Header';
import CardReport from '../../components/CardReport';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Report = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("java");
  const [dateFirst, setDateFirst] = useState(new Date())
  const [openDateFirst, setOpenDateFirst] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [openEndDate, setOpenEndDate] = useState(false)

  return (
    <>
      <Header navigation={navigation} centerTitle="Laporan" />

      <DatePicker
        mode={'date'}
        modal
        open={openDateFirst}
        date={dateFirst}
        onConfirm={(date) => {
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
            <Picker.Item label="Transakasi Masuk" value="java" />
            <Picker.Item label="Transakasi Keluar" value="js" />
          </Picker>
        </View>
        <ScrollView>
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        <CardReport />
        </ScrollView>
        {/* <CardReport />
        <CardReport />
        <CardReport />
        <CardReport /> */}
      </View>
    </>
  )
}
  
export default Report