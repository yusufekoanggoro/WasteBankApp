import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Button
} from 'react-native'
import styles from './InputWasteData.style'
import Icon from 'react-native-vector-icons/AntDesign'

const InputWasteData = ({ navigation }) => {

  return (
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
                  <Button title="Upload">
                  </Button>
                </View>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                  <TouchableOpacity style={{backgroundColor: "red"}} >
                      <Text style={{color: 'red'}}>Batal</Text>
                  </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                  <Button color='#C72037' title='Submit'></Button>
              </View>
            </View>
        </View>
    </ScrollView> 
  );
}

export default InputWasteData