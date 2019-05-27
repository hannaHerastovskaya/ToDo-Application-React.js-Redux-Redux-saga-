import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getMyList = (page, size, sort, status, stringTagsId, searchQuery) => (
    axios.get(`/api/todolists/?page=${page}&size=${size}&sort=${sort}&status=${status}${stringTagsId}&searchQuery=${searchQuery}`)
);

export const getSharedLists = (page, size, sort) => axios.get(`/api/todolists/shared?page=${page}&size=${size}&sort=${sort}`);

export const deleteList = id => axios.delete(`/api/todolists/${id}`);

export const addDashboard = newDashboard => axios.post('/api/todolists', newDashboard);

export const updateList = (id, newList) => axios.put(`/api/todolists/${id}`, newList);

export const shareTodoListToUser = (id, userName) => (
    axios.post(`/api/todolists/${id}/share?username=${userName}`)
);

export const disableTodoList = id => axios.put(`/api/todolists/disable/${id}`);

export const enableTodoList = id => axios.put(`/api/todolists/enable/${id}`);

export const getOneList = id => axios.get(`/api/todolists/${id}`);
