import { apiHost } from '../envs/env.development'
import { AsyncStorage } from 'react-native';

const signIn = async (params) => {
    let { username, password, navigation, token, setLoadingStatus } = params;
    username = username.toLowerCase().trim();

    const URL = `${apiHost}/api/auth`;
    return await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then((response) => response.json())
    .then(async (responseJson) => {
        let responseCodeSucces = [200]
        if(responseCodeSucces.indexOf(responseJson.code) >= 0 ){
            await AsyncStorage.setItem('tokenUser', responseJson.data.accessToken);
            setLoadingStatus(false)
            token()
        }else{
            setLoadingStatus(false)
            alert(responseJson.message)
        }
        return responseJson;
    })
    .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
}

export { signIn };