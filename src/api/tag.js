import axios from 'axios';

export const getTags = () => axios.get('/api/tags');

export const addTag = tagData => axios.post('/api/tags', tagData);

export const deleteTag = idTag => axios.delete(`/api/tags/${idTag}`);

export const addTagToTask = (idTag, idTask) => axios.post(`/api/tags/${idTag}?taskId=${idTask}`);

export const getTagTaskKeys = (page, size, sort) => (
    axios.get(`api/tags/myTagTaskKeys?page=&size=&sort=${sort}&tagId=&searchQuery=`)
);

export const removeTagFromTask = (idTag, idTask) => (
    axios.delete(`/api/tags/removeTagFromTask/${idTag}?taskId=${idTask}`)
);
