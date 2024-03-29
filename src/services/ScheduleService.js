import axios from '../axios';

const getListScheduleByFilm = (movieId, movieTheaterId) => {
    return axios.get(`/get-list-schedule/`, { params: { movieId: movieId, movieTheaterId: movieTheaterId, type: 1 } });
}


const getListScheduleByTheater = (movieId, date, movieTheaterId) => {
    return axios.get(`/get-list-schedule/`, { params: { movieId: movieId, date: date, movieTheaterId: movieTheaterId || null, type: 1 } });
}



const getScheduleById = (scheduleId) => {
    return axios.get(`/schedule/${scheduleId}`)
}

export {
    getListScheduleByFilm,
    getScheduleById,
    getListScheduleByTheater
}