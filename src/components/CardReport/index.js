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
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>TRX-123456789s</Text>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center'  }}>2020-07-17</Text>
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
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'gray',
    marginTop: 5,
    borderRadius: 5
  },
  wrapCardLeft: { 
    flex:0.5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#66CDAA',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 5
  },
  wrapCardRight: { 
    flex: 1, 
    justifyContent: 'center', 
    marginLeft: 10 ,
    alignItems: 'center', 
    paddingHorizontal: 5
  }
});

export default CardReport