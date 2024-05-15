import { View, Text } from 'react-native'
import React from 'react'
import LabourAttendance from '../../components/Attendance/LabourAttendance'
import Header from '../../components/Header/Header'

const AttendanceLabour = () => {
  return (
    <View>
      <Header/>
      <LabourAttendance/>
    </View>
  )
}

export default AttendanceLabour