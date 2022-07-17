import axios from '../axios';

const handleCreateBookingTicket = (data) => {
    return axios.post(`/booking-ticket`, data)
}

const getMomoPaymentLink = (data) => {
    return axios.post(`/get-momo-payment-link`, data)
}

const getValidateSignature = (data) => {
    return axios.post(`/test-signature`, { 'signature': data })
}



const getSeetWasBooking = (scheduleId) => {
    return axios.get('/booking-seet', { params: { scheduleId: scheduleId } })
}


const getCustomerVoucher = (voucherCode) => {
    return axios.get(`/apply-voucher/${voucherCode}`)
}

export {
    handleCreateBookingTicket,
    getValidateSignature,
    getSeetWasBooking,
    getCustomerVoucher,
    getMomoPaymentLink
}