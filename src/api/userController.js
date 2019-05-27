import axios from 'axios/index';

export const getCurrentUser = () => axios.get('/api/users/me');

export const getUserStatistics = () => axios.get('/api/users/statistics');

export const deleteProfile = () => axios.delete('/api/users/deleteProfile');

export const searchUserByUsername = userName => axios.get(`/api/users/search?username=${userName}`);

export const getFollowers = () => axios.get('/api/users/followers');

export const followUser = userName => axios.post(`/api/users/followUser?username=${userName}`);

export const editProfile = newData => axios.put('/api/users/editProfile', newData);
