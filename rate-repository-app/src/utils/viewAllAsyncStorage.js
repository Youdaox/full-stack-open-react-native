import AsyncStorage from '@react-native-async-storage/async-storage';

const viewAllAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    console.log('--- Current AsyncStorage ---');
    console.log(items);
  } catch (error) {
    console.error('Error reading AsyncStorage:', error);
  }
};

export default viewAllAsyncStorage