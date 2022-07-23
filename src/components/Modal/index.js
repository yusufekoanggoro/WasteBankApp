import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native'
import { Text } from '@rneui/themed';

const ModalProduct = (props) => {
  const {
    visible
  } = props;

  const {
    jenisSampah,
    harga
  } = props.item;
 
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={props.onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ textAlign: 'center' }} h4>
              Detail Produk
            </Text>

            <View style={styles.image} />

            <Text h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>{jenisSampah}</Text>
            <Text h4 h4Style={{
                fontFamily: 'Nunito-Regular',
                fontWeight: '100',
            }}>RP. {harga}/Kg</Text>

            <View style={styles.wrapButtonCol}>
              <View style={styles.wrapButtonRow}>
                <TouchableOpacity onPress={props.onPressIncomingTransaction} style={styles.wrapButton}>
                  <Text style={{ ...styles.button, backgroundColor: 'blue' }}>
                    Transaksi Masuk
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapButton}>
                  <Text style={{ ...styles.button, backgroundColor: 'red' }}>
                    Transaksi Keluar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingHorizontal: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    flex: 0.8
 },
 image: {
  width: '100%',
  height: 200,
  backgroundColor: 'gray',
  borderRadius: 10,
  marginVertical: 10
 },
 wrapButtonCol: { 
  flex: 1, 
  flexDirection: 'column', 
  justifyContent: 'flex-end'
 },
 wrapButtonRow: {
  flex: 0.5,
  flexDirection: 'row'
 },
 wrapButton: { 
  width: '50%',
  padding: 2
 },
 button: {
  textAlign: 'center',
  padding: 10,
  color: 'white',
  borderRadius: 10
 }

});

export default ModalProduct