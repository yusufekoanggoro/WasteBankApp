import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: "#FDFDFD",
    borderColor: '#DEE3ED',
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid', 
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 9,
    fontSize: 14,
    height: 37
  },
  buttonContainer: {
    backgroundColor: "#90EE90",
    borderRadius: 10,
    height: 37,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});