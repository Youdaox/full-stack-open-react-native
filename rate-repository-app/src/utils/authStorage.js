import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:authToken`)
    return accessToken
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:authToken`, accessToken)
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:authToken`)
  }
}

export default AuthStorage;