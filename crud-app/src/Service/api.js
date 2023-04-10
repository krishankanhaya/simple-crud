import axios from 'axios';
const usersUrl = 'http://localhost:8080';
export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}
// test
export const getUsersD = async (email) => {
    return await axios.get(`${usersUrl}/?email=${email}`,email);
}
export const userPage = async (email) => {
    return await axios.get(`${usersUrl}/?email=${email}`,email);
}
export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}
export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}
export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}