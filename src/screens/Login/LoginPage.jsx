import { View, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Login from '../../components/Login/Login';

const LoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
