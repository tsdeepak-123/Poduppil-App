import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import StaffAttendance from '../../components/Attendance/StaffAttendance'

const AttendanceStaff = () => {
  return (
    <View>
      <Header/>
      <StaffAttendance/>
    </View>
  )
}

export default AttendanceStaff