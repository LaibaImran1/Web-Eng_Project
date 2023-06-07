import axios from 'axios';

const usersUrl = 'http://localhost:8080';

export const getAttendance = async (id = '') => {
  return await axios.get(`${usersUrl}/${id}`);
}

export const addAttendance = async (attendance) => {
  return await axios.post(`${usersUrl}/add`, attendance);
}

export const deleteAttendance = async (id) => {
    try {
      const response = await axios.delete(`${usersUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete attendance');
    }
  };
  

export const editAttendance = async (id, attendance) => {
  return await axios.put(`${usersUrl}/${id}`, attendance);
}

export const getAttendanceById = async (id) => {
  return await axios.get(`${usersUrl}/${id}`);
}
