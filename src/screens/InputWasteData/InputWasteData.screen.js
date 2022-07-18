import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Button
} from 'react-native'
import * as DocumentPicker from 'react-native-document-picker';

import styles from './InputWasteData.style'
import Icon from 'react-native-vector-icons/AntDesign'
import Header from '../../components/Header';
import wasteService from '../../apis/wasteService';
import Spinner from 'react-native-loading-spinner-overlay';

const initialState = {
  jenisSampah: "",
  satuan: "",
  harga: 0,
  deskripsi: ""
};

const InputWasteData = ({ navigation }) => {
  const [fileResponse, setFileResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [
    { jenisSampah, satuan, harga, deskripsi },
    setState
  ] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChangeText = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const setLoading = (bool) =>{
    setIsLoading(bool);
  }

  const handleDocumentSelection = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
      });
      setFileResponse(res);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleSubmit = async() => {
    if(fileResponse.length > 0){
      setLoading(true)
      const formData = {
        jenisSampah,
        satuan,
        harga,
        deskripsi,
        gambar: {
          uri: fileResponse[0].uri,
          type: fileResponse[0].type, 
          name: fileResponse[0].name,
        }
      };
      const res = await wasteService.postWasteData(formData);
      console.log(res)
      if(res.code === 201){
        setLoading(false)
        setFileResponse([])
        clearState()
        alert('Berhasil Input Data')
      }
    }else{
      alert("Harus Upload data")
    }
  }

  return (
    <>
              {
            (isLoading ? (        <Spinner
              //visibility of Overlay Loading Spinner
              visible={isLoading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />) : null )
          }
    <Header navigation={navigation} centerTitle="Input Data Sampah" buttonBack={true} />
    <ScrollView> 
        <View style={styles.container}>
            <View style={{
                display: 'flex', 
                flexDirection: 'column',
                marginBottom: 20
              }}>
                <View style={{
                  marginBottom: 5
                }}>
                  <Text style={{
                    color: '#2E434D',
                    fontSize: 16
                  }}>Jenis Sampah</Text>
                </View>
                <View>
                  <TextInput
                      value={jenisSampah}
                      style={styles.input}
                      placeholder="Jenis Sampah"
                      placeholderTextColor="#ADADAD"
                      onChangeText={(text) => onChangeText('jenisSampah', text)}
                  />
                </View>
            </View>

            <View style={{
                display: 'flex', 
                flexDirection: 'column',
                marginBottom: 20
              }}>
                <View style={{
                  marginBottom: 5
                }}>
                  <Text style={{
                    color: '#2E434D',
                    fontSize: 16
                  }}>Satuan</Text>
                </View>
                <View>
                  <TextInput
                      value={satuan}
                      style={styles.input}
                      placeholder="kg"
                      placeholderTextColor="#ADADAD"
                      onChangeText={(text) => onChangeText('satuan', text)}
                  />
                </View>
            </View>

            <View style={{
                display: 'flex', 
                flexDirection: 'column',
                marginBottom: 20
              }}>
                <View style={{
                  marginBottom: 5
                }}>
                  <Text style={{
                    color: '#2E434D',
                    fontSize: 16
                  }}>Harga</Text>
                </View>
                <View>
                  <TextInput
                      value={harga}
                      style={styles.input}
                      placeholder="Rupiah"
                      placeholderTextColor="#ADADAD"
                      onChangeText={(text) => onChangeText('harga', text)}
                  />
                </View>
            </View>

  
            <View style={{marginBottom: 20}}>
                <View style={{marginBottom: 12}}>
                  <Text style={{color: '#2E434D',fontSize: 16,}}>Upload Gambar</Text>
                </View>
                <View>
                {fileResponse.map((file, index) => (
                  <Text
                    key={index.toString()}
                    style={styles.uri}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}>
                    {file?.uri}
                  </Text>
                ))}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={handleDocumentSelection}
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    >
                    <Text style={styles.buttonTextStyle}>Select File</Text>
                  </TouchableOpacity>
                </View>
            </View>

            <View style={{
                display: 'flex', 
                flexDirection: 'column',
                marginBottom: 20
              }}>
                <View style={{
                  marginBottom: 5
                }}>
                  <Text style={{
                    color: '#2E434D',
                    fontSize: 16
                  }}>Deskripsi</Text>
                </View>
                <View>
                  <TextInput
                      value={deskripsi}
                      multiline={true}
                      numberOfLines={4}
                      style={{...styles.input, height: 64}}
                      placeholder="Deskripsi"
                      placeholderTextColor="#ADADAD"
                      onChangeText={(text) => onChangeText('deskripsi', text)}
                  />
                </View>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View style={{width: '50%'}}>
                  <TouchableOpacity style={{...styles.buttonContainer}} onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
              </View>
              
            </View>
        </View>
    </ScrollView> 
              </>
  );
}

export default InputWasteData