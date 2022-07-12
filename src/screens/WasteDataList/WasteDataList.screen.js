import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native'
import { Text, Card } from '@rneui/themed';
import styles from './WasteDataList.style'
import Icon from 'react-native-vector-icons/AntDesign'
import CardProduct from '../../components/CardProduct';


const WasteDataList = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', 
      }}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </View>

      <View style={{
        position: 'absolute',
        flex: 1,
        bottom: 15,
        right: 15,
        alignSelf: 'flex-end'
      }}>
        <TouchableOpacity
          style={styles.roundButton1}>
            <View>
              <Icon name={'plus'} size={30} color={'#000000'} />
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WasteDataList