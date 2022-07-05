import axios from '../axios';




const getEditRoom = (id) => {
    return axios.get(`/room/${id}`)
}




export {
    getEditRoom,
};