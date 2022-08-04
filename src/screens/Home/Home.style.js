import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center'
  },
  backgroundImage: {
    // display: 'flex',
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  },
})