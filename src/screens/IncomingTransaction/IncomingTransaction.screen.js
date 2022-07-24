import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView
} from 'react-native'
import { Dialog, Text } from '@rneui/base';
import styles from './IncomingTransaction.style'
import Header from '../../components/Header';
import transaction from '../../apis/transaction';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const IncomingTransaction = ({ route, navigation }) => {
  const { item } = route.params;

  const [berat, setBerat] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalSuccses, setModalSuccses] = useState(false);
  
  const handleChangeBerat = (berat) => {
    const totalHarga = berat * item.harga;

    setBerat(berat)
    setTotalHarga(totalHarga)
  }

  const handleModalSuccses = () => {
    setModalSuccses(!modalSuccses);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        "jenisSampah": item.jenisSampah,
        "berat": berat,
        "harga": item.harga,
        "total": totalHarga,
        "jenis": "in"
      }
  
      const response = await transaction.postTransaction(payload);
      console.log('success', response)
      if(response.code === 201) {
        setLoading(false)
        setTotalHarga(0)
        setBerat(0)
        handleModalSuccses()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      
      {loading && <Spinner visible={loading} />}
      
      <Header navigation={navigation} centerTitle="Transaksi Masuk" buttonBack={true} />

      {/* Modal Succses Input Transaksi */}
      <Dialog
        isVisible={modalSuccses}
        onBackdropPress={handleModalSuccses}
      >
        <Dialog.Title title="Berhasil input data !"/>
        <Text>Apakah anda ingin print transaksi ?</Text>
        <Dialog.Actions>
          <Dialog.Button title="PRINT" onPress={() => console.log('print data')} />
          <Dialog.Button title="CANCEL" onPress={handleModalSuccses} />
        </Dialog.Actions>
      </Dialog>

      <View style={{ flex: 1, flexDirection: 'column' }}>
        {/* Logo */}
        <View style={{ flex: 0.5, backgroundColor: '#FFFFFF' }} />

        {/* Input Transaksi Masuk */}
        <View style={styles.wrapInputIncomingTransaction}>
            <ScrollView>
              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={`TRX-${Math.random().toString().slice(2,11)}`}
                    editable={false}
                    style={styles.input}
                    placeholder="ID Transaksi Masuk"
                    placeholderTextColor="#ADADAD"
                />
              </View>
              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={item.jenisSampah}
                    editable={false}
                    style={styles.input}
                    placeholder="Jenis Sampah"
                    placeholderTextColor="#ADADAD"
                />
              </View>
              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={`RP. ${item.harga}`}
                    editable={false}
                    style={styles.input}
                    placeholder="Harga"
                    placeholderTextColor="#ADADAD"
                />
              </View>
              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={berat.toString()}
                    onChangeText={(text) => handleChangeBerat(text)}
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder="Berat"
                    placeholderTextColor="#ADADAD"
                />
              </View>
              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={`RP. ${totalHarga.toString()}`}
                    editable={false}
                    style={styles.input}
                    placeholder="Total"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 5 }}>
                <Button
                  onPress={() => handleSubmit()}
                  title="Simpan"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </ScrollView>
            
        </View>
      </View>
    </View>
  );
}

export default IncomingTransaction