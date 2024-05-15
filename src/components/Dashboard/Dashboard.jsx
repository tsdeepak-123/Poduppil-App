import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {

  const navigation = useNavigation();
  const handleAttendance = () => {
    navigation.navigate('attendance');
  };

  const handleProjects = () => {
    navigation.navigate('projects');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleProjects}>
        <View>
          <Icon name="tasks" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Projects</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleAttendance}>
        <View>
          <Icon name="calendar" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Attendance</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <View>
          <Icon name="file-text-o" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Material</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <View>
          <Icon name="users" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Labours</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <View>
          <Icon name="users" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Staffs</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <View>
          <Icon name="building" size={30} color="#008DDA" />
          <Text style={styles.cardText}>Office</Text>
        </View>
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
  },
});

export default Dashboard;
