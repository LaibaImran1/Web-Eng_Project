import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 

// Fetches attendance details by ID
export const fetchAttendanceDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/attendance/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch attendance details');
  }
};

// Fetches the list of attendance records
export const fetchAttendanceList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/attendance`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch attendance list');
  }
};

// Creates a new attendance record
export const addAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/attendance/add`, attendanceData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create attendance');
  }
};

// Updates an existing attendance record
export const editAttendance = async (id, attendanceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/attendance/${id}`, attendanceData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update attendance');
  }
};
//delete existing attendance record
export const deleteAttendance = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/attendance/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete attendance');
    }
    }

    //get attendace
    export const getAttendance = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/attendance/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to get attendance');
        }
        }