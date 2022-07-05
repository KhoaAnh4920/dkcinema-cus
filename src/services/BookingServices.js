import axios from '../axios';

const handleCreateBookingTicket = (data) => {
    console.log("Check data: ", data);
    return axios.post(`/booking-ticket`, data)
}

const getValidateSignature = (data) => {
    return axios.post(`/test-signature`, { 'signature': data })
}

const getSeetWasBooking = (scheduleId) => {
    return axios.get('/booking-seet', { params: { scheduleId: scheduleId } })
}

export {
    handleCreateBookingTicket,
    getValidateSignature,
    getSeetWasBooking
}