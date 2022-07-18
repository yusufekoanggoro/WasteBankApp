import React from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native'
import styles from './IncomingTransaction.style'
import Header from '../../components/Header';

const IncomingTransaction = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} centerTitle="Transaksi Masuk" buttonBack={true} />

      <View style={{ flex: 1, flexDirection: 'column' }}>
        {/* Logo */}
        <View style={{ flex: 0.5, backgroundColor: '#FFFFFF' }} />

        {/* Input Transaksi Masuk */}
        <View style={styles.wrapInputIncomingTransaction}>
            <View style={styles.wrapTextInput}>
              <TextInput
                  style={styles.input}
                  placeholder="ID Transaksi Masuk"
                  placeholderTextColor="#ADADAD"
              />
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                  style={styles.input}
                  placeholder="Jenis Sampah"
                  placeholderTextColor="#ADADAD"
              />
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                  style={styles.input}
                  placeholder="Berat"
                  placeholderTextColor="#ADADAD"
              />
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                  style={styles.input}
                  placeholder="Harga"
                  placeholderTextColor="#ADADAD"
              />
            </View>
            <View style={styles.wrapTextInput}>
              <TextInput
                  style={styles.input}
                  placeholder="Total"
                  placeholderTextColor="#ADADAD"
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 5 }}>
              <Button
                title="Print"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
        </View>
      </View>
    </View>
  );
}

export default IncomingTransaction