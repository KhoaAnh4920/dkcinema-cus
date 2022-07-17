import axios from '../axios';


const hanedleLoginUser = (userEmail, userPassword) => {

    return axios.post('/admin-login', { email: userEmail, password: userPassword }) // req.body.email, req.body.password //
}

const signUpNewUser = (data) => {
    return axios.post('/signUp-customer', data)
}

const getUserByExternalId = (externalId) => {
    return axios.get(`/customer/${externalId}`)
}

const verifyEmail = (data) => {
    return axios.post('/verify/users', data)
}

const sendMailResetPassServices = (data) => {
    return axios.post('/send-mail-reset-pass', data)
}

const requiredResetPassServices = (data) => {
    return axios.post('/required-reset-pass', data)
}

const resetNewPassword = (data) => {
    return axios.post('/reset-new-password', data)
}

const updateUserService = (data) => {
    return axios.put('/users', data)
}

const customerSendFeedback = (data) => {
    return axios.post('/feedback-customer', data)
}

const getTicketCustomer = (data) => {
    return axios.get(`/get-booking-customer`, { params: { cusId: data.cusId, startTime: data.startTime, endTime: data.endTime } });
}

const customerChangePassword = (data) => {
    return axios.post('/customer-new-password', data)
}


export {
    hanedleLoginUser,
    signUpNewUser,
    getUserByExternalId,
    verifyEmail,
    updateUserService,
    sendMailResetPassServices,
    requiredResetPassServices,
    resetNewPassword,
    customerSendFeedback,
    getTicketCustomer,
    customerChangePassword
};