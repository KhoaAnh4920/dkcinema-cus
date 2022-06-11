import axios from '../axios';


const hanedleLoginUser = (userEmail, userPassword) => {

    return axios.post('/admin-login', { email: userEmail, password: userPassword }) // req.body.email, req.body.password //
}

const signUpNewUser = (data) => {
    return axios.post('/signUp-customer', data)
}


export {
    hanedleLoginUser,
    signUpNewUser
};