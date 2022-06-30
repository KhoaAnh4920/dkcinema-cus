import axios from '../axios';

const getAllCombo = () => {
    return axios.get(`/get-list-combo`)
}
export {
    getAllCombo,
}