import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView
} from 'react-native'
import { Dialog, Text } from '@rneui/base';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

import styles from './IncomingTransaction.style'

import { apiHost } from '../../envs/env.development';
import Header from '../../components/Header';
import transaction from '../../apis/transaction';
import wasteService from '../../apis/wasteService';


const IncomingTransaction = ({ route, navigation }) => {
  // const { item } = route.params;

  const [jumlahSampah, setJumlahSampah] = useState([
    {
      id: 1,
      jenisSampah: '',
      harga: 0,
      berat: 0,
      total: 0,
    }
  ]);
  const [wasteData, setWasteData] = useState([]);
  const [berat, setBerat] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalSuccses, setModalSuccses] = useState(false);
  const [file, setFIle] = useState('');

  const transactionId = `TM-${Math.random().toString().slice(2,11)}`;

  useEffect(() => {
    const getWaste = async () => {
      try {
        const res = await wasteService.getWasteData();
        console.log(res.data)

        setWasteData(res.data);
      } catch(error){
        console.log(error)
      }
    }

    getWaste();
  }, [])

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen)
  }
  
  const handleAddSampah = () => {
    let idSampah = jumlahSampah.slice(-1).pop().id + 1;

    const sampah = {
      id: idSampah,
      jenisSampah: '',
      harga: 0,
      berat: 0,
      total: 0,
    }

    const tempSampah = [...jumlahSampah];

    tempSampah.push(sampah)
    setJumlahSampah(tempSampah)
  }

  const handleRemoveSampah = (itemId) => {
    if(jumlahSampah.length > 1) {
      setJumlahSampah(current =>
        current.filter(obj => {
          return obj.id !== itemId;
        }),
      );
    }
  }

  // handleChangeSelect = (itemId, item) => {
    
  // }

  const handleChangeBerat = (itemId, berat) => {
    console.log(berat)

    setJumlahSampah(current =>
      current.map(obj => {
        if (obj.id === itemId) {
          return {
            ...obj, 
            berat, 
            total: berat !== '' ? parseInt(berat) : 0};
        }

        return obj;
      }),
    );
    
    setBerat(berat)
  }

  const totalHarga = () => {
    let totalHarga = 0;

    jumlahSampah.map(item => {
      totalHarga += parseInt(item.total);
    })

    return totalHarga;
  }

  const handleModalSuccses = () => {
    setModalSuccses(!modalSuccses);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        "transactionId": "TM-388347",
        "datas": [
          {
            "wasteId": 1,
            "jenisSampah": "Organik",
            "satuan": "KG",
            "berat": 2,
            "harga": 1000,
            "deskripsi": "",
            "total": 12000
          }
        ],
        "tunai": 100000,
        "type": "in"
      }      
  
      const response = await transaction.postTransaction(payload);
      
      if(response.code === 201) {
        setLoading(false)
        setBerat(0)
        setFIle(response.data.fileName)
        handleModalSuccses()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const downLoadFile = async () => {
    const { config, fs } = RNFetchBlob
    const token = await AsyncStorage.getItem("accessToken");

    let DownloadDir = fs.dirs.DownloadDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path : DownloadDir + '/download.pdf',
      }
    }
    config(options).fetch('GET', `${apiHost}${file}`, {
      Authorization : `Bearer ${token}`,
    }).then((res) => {
      console.log('The file saved')
    }).catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      
      {loading && <Spinner visible={loading} />}
      
      <Header navigation={navigation} centerTitle="Transaksi Masuk" buttonBack={true} />

      <Text>{JSON.stringify(wasteData)}</Text>

      {/* Modal Succses Input Transaksi */}
      <Dialog
        isVisible={modalSuccses}
        onBackdropPress={handleModalSuccses}
      >
        <Dialog.Title title="Berhasil input data !"/>
        <Text>Apakah anda ingin print transaksi ?</Text>
        <Dialog.Actions>
          <Dialog.Button title="PRINT" onPress={() => downLoadFile()} />
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
                    defaultValue={transactionId}
                    editable={false}
                    style={styles.input}
                    placeholder="ID Transaksi Masuk"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              {jumlahSampah.map((item, index) => (
                <View>
                  <View style={styles.wrapTextInput}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#FFFFFF' }} h4>- Sampah ke {index + 1} -</Text>
                      <Text onPress={() => handleRemoveSampah(item.id)}>Hapus</Text>
                    </View>
                  </View>
                  <View style={styles.wrapTextInput}>
                    <Picker
                      dropdownIconColor="black"
                      style={{ height: 40, width: '100%', color: 'black', backgroundColor: '#FFF'}}
                      // onValueChange={(itemValue, itemIndex) => handleChangeSelect()}
                    >
                      {wasteData.map(item => (
                        <Picker.Item label={item.jenisSampah} value={item.id} />  
                      ))}

                        {/* <Picker.Item label="Java" value="java" />   */}
                    </Picker>
                  </View>
                  <View style={styles.wrapTextInput}>
                    <TextInput
                        // defaultValue={`RP. ${item.harga}`}
                        editable={false}
                        style={styles.input}
                        placeholder="Harga"
                        placeholderTextColor="#ADADAD"
                    />
                  </View>
                  <View style={styles.wrapTextInput}>
                    <TextInput
                        onChangeText={(text) => handleChangeBerat(item.id, text)}
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder="Berat"
                        placeholderTextColor="#ADADAD"
                    />
                  </View>
                  <View style={styles.wrapTextInput}>
                    <TextInput
                        defaultValue={`RP. ${item.total.toString()}`}
                        editable={false}
                        style={styles.input}
                        placeholder="Total"
                        placeholderTextColor="#ADADAD"
                    />
                  </View>
                </View>
                
              ))}

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
                <Button
                  // onPress={() => handleSubmit()}
                  onPress={() => handleAddSampah()}
                  title="Tambah Sampah"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>

              <View style={styles.wrapTextInput}>
                <TextInput
                    defaultValue={`RP. ${totalHarga()}`}
                    editable={false}
                    style={styles.input}
                    placeholder="Jumlah Total"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              <View style={styles.wrapTextInput}>
                <TextInput
                    editable={true}
                    style={styles.input}
                    placeholder="Tunai"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              <View style={styles.wrapTextInput}>
                <TextInput
                    editable={false}
                    style={styles.input}
                    placeholder="Kembalian"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
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