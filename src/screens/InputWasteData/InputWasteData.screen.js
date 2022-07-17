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

const InputWasteData = ({ navigation }) => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      console.log(res)
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
    <Header navigation={navigation} centerTitle="Home" buttonBack={true} />
    <ScrollView> 
        <View style={styles.container}>
            <View style={{
                marginBottom: 20
              }}>
                <View style={{marginBottom: 5}}>
                  <Text style={{
                    color: '#2E434D',
                    fontSize: 16,
                  }}>Write name.</Text>
                </View>
                <View>
                  <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor="#ADADAD"
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
                  }}>Write name.</Text>
                </View>
                <View>
                  <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor="#ADADAD"
                  />
                </View>
            </View>

  
            <View style={{marginBottom: 20}}>
                <View style={{marginBottom: 12}}>
                  <Text style={{color: '#2E434D',fontSize: 16,}}>Upload Gambar</Text>
                </View>
                <View>
                  <View>
                    <Text>View 1</Text>
                  </View>
                  <View>
                    <Text>View 2</Text>
                  </View>
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
                      multiline={true}
                      numberOfLines={4}
                      style={{...styles.input, height: 64}}
                      placeholder="Deskripsi"
                      placeholderTextColor="#ADADAD"
                  />
                </View>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View style={{width: '50%'}}>
                  <TouchableOpacity style={{...styles.buttonContainer}} >
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