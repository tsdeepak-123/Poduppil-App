

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Attendance = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation();

  const handleLabourAttendance = () => {
    navigation.navigate('labourattendance');
  };

  const handleStaffAttendance = () => {
    navigation.navigate('staffattendance');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => onTabPress('Labour')}  >
        <View style={styles.iconContainer}>
          <Icon name="group" size={40} color="#008DDA" />
        </View>
        <Text style={styles.cardText}>Labour Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => onTabPress('Staff')}>
        <View style={styles.iconContainer}>
          <Icon name="suitcase" size={40} color="#008DDA" />
        </View>
        <Text style={styles.cardText}>Staff Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleLabourAttendance}>
        <View style={styles.iconContainer}>
          <Icon name="calendar-check-o" size={40} color="#008DDA" />
        </View>
        <Text style={styles.cardText}>Mark Labour Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleStaffAttendance}>
        <View style={styles.iconContainer}>
          <Icon name="check-square" size={40} color="#008DDA" />
        </View>
        <Text style={styles.cardText}>Mark Staff Attendance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#B3C8CF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Attendance;
