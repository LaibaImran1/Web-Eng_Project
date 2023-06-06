import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:8080';

export const getAttendance = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addAttendance = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteAttendance = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editAttendance = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}