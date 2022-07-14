import axios from '../axios';

const getListTheater = () => {
    return axios.get(`/get-list-movieTheater`)
}


const getLatLngFromAddress = () => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=150 Dương Bá Trạc, Phường 01, Quận 8, Hồ Chí Minh&key={GG_API_KEY}`)
}

export {
    getListTheater,
}