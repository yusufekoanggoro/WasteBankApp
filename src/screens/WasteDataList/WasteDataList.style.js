import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#3CB371'
  },
  loading: {
    width: '50%',
    height: 250, 
    padding: 5,
    flexDirection: 'column',
    marginBottom: 10
  },
  wrapLoading: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
  }
});