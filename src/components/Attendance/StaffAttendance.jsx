import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchStaffAttendanceList, updateStaffAttendance } from '../../services/api';

const StaffAttendance = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStaffAttendance();
  }, [selectedDate]);

  useEffect(() => {
    const results = staffData.filter((staff) =>
      staff.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, staffData]);

  const getStaffAttendance = async () => {
    try {
      setLoading(true);
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const data = await fetchStaffAttendanceList(formattedDate);
      setStaffData(data);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching Staff attendance:', error);
    }
  };

  const updateAttendance = async () => {
    try {
      if (Object.keys(selectedValues).length === 0) {
        setError('Please select attendance for at least one staff member.');
        return;
      }

      setError(null);

      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const response = await updateStaffAttendance(selectedValues, formattedDate);

      if (response.success) {
        const remainingStaff = staffData.filter((staff) => !selectedValues.hasOwnProperty(staff._id));
        setStaffData(remainingStaff);
        setSearchResults(remainingStaff);
        console.log('Attendance updated successfully:', response.message);
      } else {
        console.error('Failed to update attendance:', response.message);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };


  return (
    <ScrollView>
      <View style={{ alignItems: 'center', marginBottom: 150 }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ backgroundColor: 'lightgray', padding: 10, borderRadius: 5, margin: 10 }}>
          <Text>Select Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text style={{ textAlign: 'center', marginTop: 5 }}>Selected Date : {moment(selectedDate).format("DD-MM-YYYY")}</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
          placeholder="Search by name"
          onChangeText={handleSearch}
          value={searchTerm}
        />
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          staffData.length === 0 ? (
            <Text>No attendance to mark for this date.</Text>
          ) : (
            searchResults.map((item) => (
              <View key={item._id} style={{ marginVertical: 10, alignItems: 'center', marginBottom: 20 }}>
                <Image source={{ uri: item.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                  <RadioButton.Item
                    label="Present"
                    value="present"
                    status={selectedValues[item._id] === 'present' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValues(prevState => ({ ...prevState, [item._id]: 'present' }))}
                  />
                  <RadioButton.Item
                    label="Half Day"
                    value="halfday"
                    status={selectedValues[item._id] === 'halfday' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValues(prevState => ({ ...prevState, [item._id]: 'halfday' }))}
                  />
                  <RadioButton.Item
                    label="Absent"
                    value="absent"
                    status={selectedValues[item._id] === 'absent' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedValues(prevState => ({ ...prevState, [item._id]: 'absent' }))}
                  />
                </View>
              </View>
            ))
          )
        )}
        {error && (
          <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
        )}
        {staffData.length !== 0 && <Button title="Submit" onPress={updateAttendance} color="blue" />}
      </View>
    </ScrollView>
  );
};

export default StaffAttendance;
