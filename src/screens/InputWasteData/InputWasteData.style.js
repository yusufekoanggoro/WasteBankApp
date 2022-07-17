import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 24, 
    paddingLeft: 16,
    paddingRight: 16,
    // backgroundColor: 'red'
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
    height: 44
  },
  buttonContainer: {
    backgroundColor: "#66CDAA",
    borderRadius: 100,
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
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});