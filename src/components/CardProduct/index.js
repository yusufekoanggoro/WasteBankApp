import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Text } from '@rneui/themed';

const CardProduct = () => {
  return (
    <View style={styles.container}>
        <View style={styles.wrapCard}>
            <View style={styles.image} />
            <Text h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>Kardus</Text>
            <Text h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>RP. 2000/Kg</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%', 
    backgroundColor: 'white', 
    height: 250, 
    padding: 5, 
    flexDirection: 'column'
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