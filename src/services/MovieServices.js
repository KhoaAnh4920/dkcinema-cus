import axios from '../axios';


const getListMovieByStatus = (status, page, perPage) => {

    return axios.get('/status/movie', { params: { status: status, page: page || 1, PerPage: perPage || 6 } })
}

const getMovieById = (movieId) => {
    return axios.get(`/movie/${movieId}`)
}

const getAllMovie = () => {
    return axios.get(`/movie`)
}

const getSearchMovie = (kw) => {
    return axios.get('/search-movie', { params: { kw: kw } })
}


export {
    getListMovieByStatus,
    getMovieById,
    getAllMovie,
    getSearchMovie
};