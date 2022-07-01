import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import styles from './WasteDataList.style'
import Icon from 'react-native-vector-icons/AntDesign'

const WasteDataList = ({ navigation }) => {

  return (
    <View style={styles.container}>
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