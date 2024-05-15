import React, { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, RefreshControl, BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Dashboard from '../../components/Dashboard/Dashboard';
import Header from '../../components/Header/Header';
import RecentPurchase from '../../components/RecentPurchase/RecentPurchase';

const Dash = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTrigger(!refreshTrigger);
    setTimeout(() => setRefreshing(false), 1000);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        ToastAndroid.show('Exiting the app', ToastAndroid.SHORT);
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Dashboard />
        <Text style={styles.text}>Recent Purchase</Text>
        <RecentPurchase refreshTrigger={refreshTrigger} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dash;

const styles = StyleSheet.create({
  text: {
    marginLeft: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23,
  },
});
