import axios from '../axios';

const getListVoucherByCustomer = (cusId) => {
    return axios.get(`/get-voucher-customer/`, { params: { cusId: cusId } });
}



export {
    getListVoucherByCustomer,
}