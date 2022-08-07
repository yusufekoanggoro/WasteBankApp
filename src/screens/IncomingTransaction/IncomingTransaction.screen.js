import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Image
} from 'react-native'
import { Dialog, Text } from '@rneui/base';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

import styles from './IncomingTransaction.style'

import { apiHost } from '../../envs/env.development';
import Header from '../../components/Header';
import transaction from '../../apis/transaction';
import wasteService from '../../apis/wasteService';


const IncomingTransaction = ({ params, navigation, buttonBack }) => {
  const route = useRoute();
  console.log(route.name)
  
  const [jumlahSampah, setJumlahSampah] = useState([
    {
      id: 1,
      selectId: 0,
      jenisSampah: '',
      harga: 0,
      berat: 0,
      total: 0,
    }
  ]);
  const [wasteData, setWasteData] = useState([
    {id: 1, jenisSampah: 'plastik', harga: 500},
    {id: 2, jenisSampah: 'besi', harga: 1000}
  ]);
  const [berat, setBerat] = useState(0);
  const [tunai, setTunai] = useState(0);
  const [kembali, setKembali] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalSuccses, setModalSuccses] = useState(false);
  const [file, setFIle] = useState('');
  const transactionId = `${route.name === 'IncomingTransaction' ? 'TM' : 'TR'}-${Math.random().toString().slice(2,11)}`;
  const title = route.name === 'IncomingTransaction' ? 'Transaksi Masuk' : 'Transaksi Keluar';

  useEffect(() => {
    const getWaste = async () => {
      try {
        const res = await wasteService.getWasteData(`&type=${route.name === 'IncomingTransaction' ? 'in' : 'out'}`);
        console.log(res.data)

        setWasteData(res.data);
      } catch(error){
        console.log(error)
      }
    }

    getWaste();
  }, [])
  
  const handleAddSampah = () => {
    let idSampah = jumlahSampah.slice(-1).pop().id + 1;

    const sampah = {
      id: idSampah,
      selectId: 0,
      jenisSampah: '',
      harga: 0,
      berat: 0,
      total: 0,
    }

    const tempSampah = [...jumlahSampah];

    tempSampah.push(sampah)
    setJumlahSampah(tempSampah)
    setTunai(0)
    setKembali(0)
  }

  const handleRemoveSampah = (itemId) => {
    if(jumlahSampah.length > 1) {
      setJumlahSampah(current =>
        current.filter(obj => {
          return obj.id !== itemId;
        }),
      );
    }

    setTunai(0)
    setKembali(0)
  }

  const handleChangeSelect = (itemId, id) => {
    const wasteDetail = wasteData.filter(item => item.id === id)[0];

    if (wasteDetail !== undefined) {
      setJumlahSampah(current =>
        current.map(obj => {
          if (obj.id === itemId) {
            return {
              ...obj, 
              selectId: id,
              jenisSampah: wasteDetail.jenisSampah,
              harga: wasteDetail.harga
            }
          }
  
          return obj;
        }),
      );
    }
  }

  const totalHarga = () => {
    let totalHarga = 0;

    jumlahSampah.map(item => {
      totalHarga += parseInt(item.total);
    })

    return totalHarga;
  }

  const handleChangeBerat = (itemId, berat) => {
    setJumlahSampah(current =>
      current.map(obj => {
        if (obj.id === itemId) {
          return {
            ...obj, 
            berat, 
            total: berat !== '' ? parseInt(berat * obj.harga) : 0};
        }

        return obj;
      }),
    );
    
    setBerat(berat)
  }

  const handleChangeTunai = (tunai) => {
    let kembalian = tunai - totalHarga();

    setTunai(tunai)
    setKembali(kembalian)
  }

  const handleModalSuccses = () => {
    setModalSuccses(!modalSuccses);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let data = [];

      jumlahSampah.map(item => {
        data.push({
          "wasteId": item.selectId,
          "berat": item.berat,
        })
      })

      const payload = {
        "transactionId": transactionId,
        "datas": data,
        "tunai": tunai,
        "type": route.name === 'IncomingTransaction' ? 'in' : 'out'
      }

      console.log(payload)
      
      const response = await transaction.postTransaction(payload);
      
      if(response.code === 201) {
        setLoading(false)
        setJumlahSampah([
          {
            id: 1,
            selectId: 1,
            jenisSampah: '',
            harga: 0,
            berat: 0,
            total: 0,
          }
        ])
        setTunai(0)
        setKembali(0)
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
    console.log()
    config(options).fetch('GET', `${apiHost}${file}`, {
      Authorization : `Bearer ${token}`,
    }).then((res) => {
      console.log('The file saved')
    }).catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      
      {loading && <Spinner visible={loading} />}
      
      <Header navigation={navigation} centerTitle={title} buttonBack={buttonBack} />

      {/* <Text>{JSON.stringify(jumlahSampah)}</Text> */}

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
        <View style={{ flex: 0.5, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../assets/logo_bank_sampah.png')}
          />
        </View>

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
                    selectedValue={item.selectId}
                    dropdownIconColor="black"
                    style={{ height: 40, width: '100%', color: 'black', backgroundColor: '#FFF'}}
                    onValueChange={(itemValue, itemIndex) => handleChangeSelect(item.id, itemValue)}
                  >
                    <Picker.Item label='Please select an option...' value='0' />
                    {wasteData.map(item => (
                      <Picker.Item label={item.jenisSampah} value={item.id} />
                    ))}
                  </Picker>
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
                        onChangeText={(text) => handleChangeBerat(item.id, text)}
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder="Berat"
                        placeholderTextColor="#ADADAD"
                        value={item.berat}
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
                <Text style={{ fontSize: 15, padding: 5, color: 'white' }}>Total Harga : </Text>
                <TextInput
                    defaultValue={`RP. ${totalHarga()}`}
                    editable={false}
                    style={styles.input}
                    placeholder="Jumlah Total"
                    placeholderTextColor="#ADADAD"
                />
              </View>

              <View style={styles.wrapTextInput}>
                <Text style={{ fontSize: 15, padding: 5, color: 'white' }}>Tunai : </Text>
                <TextInput
                    editable={true}
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={(text) => handleChangeTunai(text)}
                    placeholder="Tunai"
                    placeholderTextColor="#ADADAD"
                    value={tunai}
                />
              </View>

              <View style={styles.wrapTextInput}>
                <Text style={{ fontSize: 15, padding: 5, color: 'white' }}>Kembalian : </Text>
                <TextInput
                    defaultValue={`RP. ${kembali}`}
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