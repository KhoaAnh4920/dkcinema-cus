import axios from '../axios';

const getListTheater = () => {
    return axios.get(`/get-list-movieTheater`)
}
export {
    getListTheater,
}