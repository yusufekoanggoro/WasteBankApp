import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Text } from '@rneui/themed';

const CardReport = (props) => {
 
  return (
    <View style={styles.container}>
        <View style={styles.wrapCardLeft}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>TRX-123456789</Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>2020-07-17</Text>
        </View>
        <View style={styles.wrapCardRight}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Gelas Plastik</Text>
            <Text style={{ color: 'white', fontWeight: '700' }}>20KG - Rp 40.000</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'gray',
    marginTop: 5,
    borderRadius: 5
  },
  wrapCardLeft: { 
    width: '30%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#66CDAA',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  wrapCardRight: { 
    width: '70%', 
    justifyContent: 'center', 
    marginLeft: 10 
  }
});

export default CardReport