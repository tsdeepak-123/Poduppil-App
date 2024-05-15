import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
import Store from '../store/Store'; // Import your Redux store
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import Dash from '../screens/Dashboard/Dash';
import LoginPage from '../screens/Login/LoginPage';
import Myprojects from '../screens/Projects/Myprojects';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import AttendanceView from '../screens/Attendance/AttendanceView';
import AttendanceLabour from '../screens/Attendance/AttendanceLabour';
import AttendanceStaff from '../screens/Attendance/AttendanceStaff';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Provider store={Store}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="dashboard"
                    component={Dash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    component={LoginPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="projects"
                    component={Myprojects}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="attendance"
                    component={AttendanceScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="attendancedisplay"
                    component={AttendanceView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="labourattendance"
                    component={AttendanceLabour}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="staffattendance"
                    component={AttendanceStaff}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </Provider>
    );
};

export default AppNavigator;
