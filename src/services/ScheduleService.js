import axios from '../axios';

const getListScheduleByFilm = (movieId, movieTheaterId) => {
    return axios.get(`/get-list-schedule/`, { params: { movieId: movieId, movieTheaterId: movieTheaterId } });
}
export {
    getListScheduleByFilm,
}