import axios from '../axios';

const getAllBanner = () => {
    return axios.get(`/get-list-banner`)
}
export {
    getAllBanner,
}