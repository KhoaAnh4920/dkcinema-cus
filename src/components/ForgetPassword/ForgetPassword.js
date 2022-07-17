import React, { useState, useEffect } from 'react';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import "./ForgetPassword.scss";
import imageRight from "../../assets/quen_mat_khau.png";
import { useHistory } from "react-router-dom";
import { Buffer } from 'buffer';
import { requiredResetPassServices, resetNewPassword } from '../../services/UserService';
import { toast } from 'react-toastify';
import Captcha from '../Share/Captcha';
import { Button } from 'react-bootstrap';
import { validateCaptcha } from 'react-simple-captcha';
import Spinner from 'react-bootstrap/Spinner';



function ForgetPassword() {
    let history = useHistory();
    const [allValues, setAllValues] = useState({
        email: '',
        password: '',
        rePassword: '',
        isShowLoading: false
    });

    // async function checkIsEmailReset(email) {

    //     let res = await checkMailReset(mail)
    //     if (res && res.errCode !== 0) {
    //         toast.errCode("Địa chỉ mail không hợp lệ");
    //         history.push('/');
    //     }else return true;
    // }

    async function handleResetPass(email, token) {
        console.log('email: ', email);
        let res = await requiredResetPassServices({
            email: email,
            token
        });
        if (res && res.errCode === 0) {
            console.log('OK')
            setAllValues((prevState) => ({
                ...prevState,
                email: email,
            }));
        } else {
            toast.errCode(res.errMessage);
            history.push('/');
        }
    }

    useEffect(() => {

        // Check thanh toán //
        let url = window.location.href;
        if (url.includes('?')) {

            const email = new URLSearchParams(window.location.search).get('email');
            const token = new URLSearchParams(window.location.search).get('token');

            if (email && token) {
                handleResetPass(Buffer.from(email, 'base64').toString('utf-8'), token)
            }

        }


    }, []);

    const doSubmit = () => {
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (!validateCaptcha(user_captcha)) {
            alert('Captcha Does Not Match');
            document.getElementById('user_captcha_input').value = "";
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        console.log('allvalues: ', allValues);
        let check = doSubmit();
        if (check) {
            setAllValues((prevState) => ({
                ...prevState,
                isShowLoading: true,
            }));

            if (allValues.password !== allValues.rePassword) {
                toast.error("Mật khẩu không trùng khớp");
                return;
            }
            let res = await resetNewPassword({
                email: allValues.email,
                password: allValues.password
            })
            if (res && res.errCode === 0) {
                toast.success("Đổi mật khẩu thành công");
                history.push('/login');
            }
            else {
                toast.success("Đã lỗi hệ thống. Vui lòng liên hệ bộ phận hỗ trợ");
                return;
            }

            setAllValues((prevState) => ({
                ...prevState,
                isShowLoading: false,
            }));
        }
    }

    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }






    return (
        <div>
            <Header />
            <div className='container-fluid box-forget' >
                <div className='container con-forget'>
                    <div className='row row-forget'>
                        <div className='col-7 col-left'>
                            <div className="form-group col-12" >
                                <label htmlFor="exampleInputEmail" className='col-3'>nhập mật khẩu mới</label>
                                <input type="password" className="form-control col-9"
                                    value={allValues.password}
                                    onChange={changeHandler}
                                    placeholder="" name='password'
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail" className='col-3'>nhập lại mật khẩu</label>
                                <input type="password" className="form-control col-9"
                                    placeholder="" name='rePassword'
                                    value={allValues.rePassword}
                                    onChange={changeHandler}
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12 capcha-form">
                                <div className='col-3'></div>
                                <Captcha />
                            </div>

                            <div className="form-group col-12">
                                <div className='col-3'></div>
                                {/* <button className='col-9 btn-change'></button> */}
                                <Button variant="primary" {...allValues.isShowLoading && 'disabled'} className="col-9 btn-change" onClick={() => handleSubmit()}>
                                    {allValues.isShowLoading &&
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="visually" style={{ marginLeft: '10px' }}>Loading...</span>
                                        </>

                                    }
                                    {!allValues.isShowLoading &&
                                        <>
                                            <span className="visually">Đổi mật khẩu</span>
                                        </>
                                    }
                                </Button>
                            </div>

                        </div>
                        <div className='col-5 col-right' >
                            <img src={imageRight} />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ForgetPassword;