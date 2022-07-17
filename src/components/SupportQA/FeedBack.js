import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import pdc1 from '../../assets/PDC/pdc1.jpg';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import "./FeedBack.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPhone } from '@fortawesome/free-solid-svg-icons';
import CaptchaFeed from './CaptchaFeed';
import { validateCaptcha } from 'react-simple-captcha';
import { customerSendFeedback } from '../../services/UserService';
import { selectLanguage, updateLanguage, userState } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { getListMovieByStatus } from '../../services/MovieServices';
import InCommingFilms from '../Share/InCommingFilms';




function FeedBack() {

    let history = useHistory();

    const [allValues, setAllValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        content: '',
        cusId: null,
        isShowLoadingButton: false,
        dataMovieUpcoming: [],
    })
    let selectUser = useSelector(userState);

    const redirectFeedBack = () => {
        history.push("/phan-hoi");
    }
    const redirectQA = () => {
        history.push("/ho-tro")
    }


    const doSubmit = () => {
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (!validateCaptcha(user_captcha)) {
            alert('Captcha Does Not Match');
            document.getElementById('user_captcha_input').value = "";
            return false;
        }
        return true;
    }


    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    const handleClickSubmit = async () => {
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingButton: true
        }));
        let check = doSubmit();

        if (check) {
            let res = await customerSendFeedback({
                email: allValues.email,
                fullName: allValues.fullName,
                phone: allValues.phoneNumber,
                content: allValues.content,
                cusId: allValues.cusId
            })

            if (res && res.errCode === 0) {
                toast.success("Cám ơn bạn đã gửi phản hồi")
            } else {
                toast.error(res.errMessage)
            }
        }

        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingButton: false,
            fullName: '',
            email: '',
            phoneNumber: '',
            content: '',
        }));

    }

    async function fetchUpcomingMovie() {
        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []
        setAllValues((prevState) => ({
            ...prevState,
            dataMovieUpcoming: dataMovieUpcoming,
        }));
    }

    useEffect(() => {

        fetchUpcomingMovie()

    }, []);

    useEffect(() => {



        setAllValues((prevState) => ({
            ...prevState,
            cusId: (selectUser.userInfo) ? selectUser.userInfo.id : '',
        }));

    }, [selectUser]);


    return (
        <>

            <Header />
            <div className='support-content container-fluid' style={{ maxWidth: '1400px' }}>
                <div className='row row-support'>
                    <div className='col-8 col-left'>
                        <div className='title-tab'>
                            <ul>
                                <li><a>tuyển dụng</a></li>
                                <li><a onClick={redirectFeedBack}>góp ý</a></li>
                                <li><a onClick={redirectQA}>giải đáp</a></li>
                            </ul>
                        </div>
                        <div className='info'>
                            <p><FontAwesomeIcon icon={faMessage} /> &nbsp;supports@dkcinema.com.vn</p>
                            <p><FontAwesomeIcon icon={faPhone} /> &nbsp;19002224</p>
                        </div>
                        <div className='form-feedback' style={{ marginLeft: '60px' }}>
                            <h5 className='title'>
                                Bạn có gì muốn nhắn nhủ DK Cinema?
                            </h5>
                            <div className='row row-feed'>
                                <div className='col-6 col-feed-left'>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail1" className='col-12'>họ và tên</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập họ và tên" name='fullName'
                                            onChange={changeHandler}
                                            value={allValues.fullName}
                                            id='exampleInputEmail1'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail2" className='col-12'>địa chỉ email</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập địa chỉ email" name='email'
                                            onChange={changeHandler}
                                            value={allValues.email}
                                            id='exampleInputEmail2'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail3" className='col-12'>Số điện thoại</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập số điện thoại"
                                            name='phoneNumber'
                                            onChange={changeHandler}
                                            value={allValues.phoneNumber}
                                            id='exampleInputEmail3'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <CaptchaFeed />

                                    </div>

                                </div>
                                <div className='col-6 col-feed-right'>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail4" className='col-12'>nội dung phản hồi</label>
                                        <textarea className="form-control col-12" placeholder="Nội dung" name='content'
                                            onChange={changeHandler}
                                            value={allValues.content}
                                            id='exampleInputEmail4' />
                                    </div>
                                    <div className="col-12 submit-btn">
                                        <Button variant="primary " {...allValues.isShowLoadingButton && 'disabled'} onClick={handleClickSubmit} className='btn-payment' >
                                            {allValues.isShowLoadingButton &&
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
                                            {!allValues.isShowLoadingButton &&
                                                <>
                                                    <span className="visually">Gửi</span>
                                                </>
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <InCommingFilms
                        dataMovieUpcoming={allValues.dataMovieUpcoming}
                    />

                </div>
            </div>
            <Footer />
        </>
    );
}

export default FeedBack;