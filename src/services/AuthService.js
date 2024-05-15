import AsyncStorage from '@react-native-async-storage/async-storage'

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear the token from AsyncStorage
      // Any other cleanup tasks
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };
  
  export { getToken,logout };
  