import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet, 
  Image
} from 'react-native'
import { Text } from '@rneui/themed';
import { apiHost } from '../../envs/env.development'

const CardProduct = (props) => {
  const { 
    jenisSampah, 
    harga,
    gambar
  } = props.item;

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.wrapCard}>
            <View style={styles.image}>
              <Image
                source={{uri: `${apiHost}/uploads/${gambar}`}}
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </View>
            <Text numberOfLines={1} h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>{jenisSampah}</Text>
            <Text h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>RP. {harga}/Kg</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%', 
    backgroundColor: 'white', 
    height: 250, 
    padding: 5, 
    flexDirection: 'column',
    marginBottom: 5
  },
  wrapCard: {
    backgroundColor: '#FFFFFF', 
    paddingBottom: 30, 
    paddingTop: 5, 
    paddingHorizontal: 5, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  image: {
    width: '100%', 
    backgroundColor: 'gray', 
    height: 150, 
    borderRadius: 5
  }
});

export default CardProduct