import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  wrapInputIncomingTransaction: {
    flex: 1.5, 
    backgroundColor: '#66CDAA',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20

  },
  wrapTextInput: {
    marginBottom: 30,
  },  
  input: {
    backgroundColor: "#FDFDFD",
    borderColor: '#DEE3ED',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid', 
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    height: 44,
    borderRadius: 10,
    color: '#A9A9A9'
  },
});