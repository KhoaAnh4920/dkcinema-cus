import axios from '../axios';

const getAllBanner = () => {
    return axios.get(`/get-list-banner`, { params: { status: 1 } })
}
export {
    getAllBanner,
}