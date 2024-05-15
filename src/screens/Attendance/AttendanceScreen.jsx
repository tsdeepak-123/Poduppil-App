import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Attendance from '../../components/Attendance/Attendance';
import Header from '../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';

const AttendanceScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('Labour');

  // Function to handle button press and set the active tab
  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate('attendancedisplay', { activeTab: tab })
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.centered}>
        <Attendance
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AttendanceScreen;
