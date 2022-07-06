import axios from '../axios';

const getNewsByType = (type) => {
    return axios.get(`/get-list-news`, { params: { type: type } });
}
const getNewsById = (id) => {
    return axios.get(`/news/${id}`);
}
export {
    getNewsByType,
    getNewsById,
}