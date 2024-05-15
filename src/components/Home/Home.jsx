import React from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Navigate to the Dashboard screen
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../assets/podu.png')} />
      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={handleLogin} color="green" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'relative',
    top: 100,
    width: screenWidth * 0.8,
    height: 80, 
    borderRadius: 10,
  },
});
