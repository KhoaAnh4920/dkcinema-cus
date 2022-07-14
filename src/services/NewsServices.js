import axios from '../axios';

const getNewsByType = (type) => {
    return axios.get(`/get-list-news`, { params: { type: type } });
}
const getNewsById = (id) => {
    return axios.get(`/news/${id}`);
}

const votePostRatingService = (data) => {
    return axios.post(`/news/vote`, data)
}

const handleCommentService = (data) => {
    return axios.post(`/news/comment`, data)
}


export {
    getNewsByType,
    getNewsById,
    votePostRatingService,
    handleCommentService
}