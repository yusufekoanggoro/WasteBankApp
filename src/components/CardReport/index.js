import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Text } from '@rneui/themed';

const CardReport = (props) => {
  const {
    transactionId,
    createdAt,
    jumlahSampah,
    rincian
  } = props.item;
 
  return (
    <View style={styles.container}>
        <View style={styles.wrapCardLeft}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{transactionId}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center'  }}>{createdAt}</Text>
        </View>
        <View style={styles.wrapCardRight}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Jumlah Sampah : {jumlahSampah}</Text>
            <Text style={{ color: 'white', fontWeight: '700' }}>Rincian : {rincian}</Text>
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
    borderRadius: 5,
  },
  wrapCardLeft: { 
    flex:0.8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#66CDAA',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 5,
  },
  wrapCardRight: { 
    flex: 1, 
    justifyContent: 'center', 
    marginLeft: 10 ,
    alignItems: 'flex-start', 
    paddingHorizontal: 5
  }
});

export default CardReport