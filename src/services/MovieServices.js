import axios from '../axios';


const getListMovieByStatus = (status, page, perPage) => {

    return axios.get('/status/movie', { params: { status: status, page: page || 1, PerPage: perPage || 6 } })
}



export {
    getListMovieByStatus
};