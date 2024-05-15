import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AttendanceDisplay from '../../components/Attendance/AttendanceDisplay';
import Header from '../../components/Header/Header';
import { fetchLabourAttendance, fetchStaffAttendance } from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import from Expo for compatibility

const AttendanceView = () => {
  const [LabourAttendance, setLabourAttendance] = useState([]);
  const [StaffAttendance, setStaffAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const route = useRoute();
  const { activeTab } = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const getLabourAttendance = async () => {
    try {
      const data = await fetchLabourAttendance(selectedDate);
      setLabourAttendance(data);
    } catch (error) {
      console.error('Error fetching Labour attendance:', error);
    }
  };

  const getStaffAttendance = async () => {
    try {
      const data = await fetchStaffAttendance(selectedDate);
      setStaffAttendance(data);
    } catch (error) {
      console.error('Error fetching Staff attendance:', error);
    }
  };

  useEffect(() => {
    getLabourAttendance();
    getStaffAttendance();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.selectDateText}>Select Date</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Selected Date: {selectedDate.toDateString()}</Text>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {activeTab === 'Labour' ? (
        <AttendanceDisplay attendanceData={LabourAttendance} />
      ) : activeTab === 'Staff' ? (
        <AttendanceDisplay attendanceData={StaffAttendance} />
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  selectDateText: {
    fontSize: 18,
    color: '#007bff',
  },
});

export default AttendanceView;
