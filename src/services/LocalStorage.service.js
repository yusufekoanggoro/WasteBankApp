import { AsyncStorage } from 'react-native';

const LocalStorage = {
    get: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
              // We have data!!
              return value;
            }
            return false;
        } catch (error) {
            // Error retrieving data
         }
    },
    set: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    },
    remove: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    },
    clear() {},
}

export default LocalStorage