import React from 'react'
import {
  Text,
  Button,
  View
} from 'react-native'
import Header from '../../components/Header';


const Home = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation} centerTitle="Home" />
      <Text>Home Screen</Text>
      <Button
        title="Go to Input Waste Data Screen"
        onPress={() => navigation.navigate("InputWasteData")} // We added an onPress event which would navigate to the About screen
      />
    </>
  )
}
  
export default Home