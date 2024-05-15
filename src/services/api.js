

import moment from 'moment';
import { axiosInstance } from './axiosInstance';

//----------------------------------------------------

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to login');
    }
};

//-------------------------------------------------------

export const getRecentPurchase = async () => {
    try {
        const response = await axiosInstance.get('/recentpurchase');
        return response.data;
    } catch (error) {
        throw new Error('Failed to get recent purchases');
    }
};
//------------------------------------------------------------------------------------
export const getProjects = async (queryParams) => {
    try {
        const { page, limit, searchTerm } = queryParams;
        const response = await axiosInstance.get(`/projectList?status=false&page=${page}&limit=${limit}&searchTerm=${searchTerm}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get projects');
    }
};
//--------------------------------------------------------------
export const fetchLabourAttendance = async (date) => {
    try {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const response = await axiosInstance.get(`/labourattendancelist?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch labour attendance');
    }
};
//-----------------------------------------------------
export const fetchStaffAttendance = async (date) => {
    try {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const response = await axiosInstance.get(`/staffattendanceList?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch staff attendance');
    }
};
//-------------------------------------------------------------
export const fetchLabourAttendanceList = async (date) => {
    try {
        const response = await axiosInstance.get(`/attendancesheet?date=${date}`);
        return response.data.attendanceData;
    } catch (error) {
        throw new Error('Failed to fetch attendance sheet');
    }
};
//-----------------------------------------------------------------
export const fetchStaffAttendanceList = async (date) => {
    try {
        const response = await axiosInstance.get(`/staffattendancesheet?date=${date}`);
        return response.data.attendanceData;
    } catch (error) {
        throw new Error('Failed to fetch attendance sheet');
    }
};
//-----------------------------------------------------------------
export const updateLabourAttendance = async (selectedValues, date) => {
    try {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const response = await axiosInstance.post('/labourattendance', { selectedValues, date: formattedDate });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update labour attendance');
    }
};
//-----------------------------------------------------------------
export const updateStaffAttendance = async (selectedValues, date) => {
    try {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const response = await axiosInstance.post('/staffattendance', { selectedValues, date: formattedDate });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update staff attendance');
    }
};
//-----------------------------------------------------------------