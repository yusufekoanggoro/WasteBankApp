import React, { FC, ReactElement, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import styles from './Login.style'
import { signIn } from '../../apis/authService'
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation, token }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const setLoadingStatus = (bool) =>{
      setLoading(bool);
    }

    const handleClickButtonLogin = async () => {
      setLoadingStatus(true);
      await signIn({username, password, navigation, token, setLoadingStatus})
    }

    useEffect(() => {
      // action on update of movies
  }, []);

  return (
      <View style={styles.container}>
          {
            (loading ? (        <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />) : null )
          }
          <ImageBackground source={require('../../assets/bg_bs.png')} style={styles.backgroundImage}>


          <View style={{backgroundColor: '#00CC66', margin: 15, borderRadius: 50, padding: 30, display: 'flex'}}>
              <View style={{justifyContent: 'center', marginBottom: 15}}>
                  <Text style={{textAlign: "center", fontSize: 50, color: "#FFFFFF"}}>Login</Text>
              </View>
              <View style={{
                marginBottom: 10
              }}>
                <View style={{marginBottom: 5}}>
                  <Text 
                    style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                    }}
                    
                    >
                      Username
                  </Text>
                </View>
                <View>
                  <TextInput
                      style={styles.input}
                      placeholder="Masukkan Username"
                      placeholderTextColor="#A9A9A9"
                      onChangeText={ text => setUsername(text)}
                      autoCapitalize='none'
                  />
                </View>
            </View>
            <View style={{
                marginBottom: 50
              }}>
                <View style={{marginBottom: 5}}>
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                    }}
                >
                    Password
                  </Text>
                </View>
                <View>
                  <TextInput
                      style={styles.input}
                      placeholder="Masukkan Password"
                      placeholderTextColor="#A9A9A9"
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry={true}
                      autoCapitalize='none'
                  />
                </View>
            </View>
                  
            <View style={{marginBottom: 0}}>
                <View>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => handleClickButtonLogin()} >
                      <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
      
          </ImageBackground>
      </View>
  )
}


  
export default Login;