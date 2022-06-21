import React from 'react';
import { useHistory } from "react-router-dom";
import pdc1 from '../../assets/PDC/pdc1.jpg';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import "./FeedBack.scss";
import Captcha from '../Share/Captcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPhone } from '@fortawesome/free-solid-svg-icons';



function FeedBack() {

    let history = useHistory();
    const redirectFeedBack = () => {
        history.push("/phan-hoi");
    }
    const redirectQA = () => {
        history.push("/ho-tro")
    }
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
                            <p><FontAwesomeIcon icon={faMessage} /> &nbsp;mail@gmail.com</p>
                            <p><FontAwesomeIcon icon={faPhone} /> &nbsp;0000000000</p>
                        </div>
                        <div className='form-feedback' style={{ marginLeft: '60px' }}>
                            <h5 className='title'>
                                gửi thắc mắc cho dk cinema
                            </h5>
                            <div className='row row-feed'>
                                <div className='col-6 col-feed-left'>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail1" className='col-12'>họ và tên</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập họ và tên" name='phone'
                                            id='exampleInputEmail1'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail2" className='col-12'>địa chỉ email</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập địa chỉ email" name='phone'
                                            id='exampleInputEmail2'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail3" className='col-12'>Số điện thoại</label>
                                        <input type="text" className="form-control col-12"
                                            placeholder="Nhập số điện thoại" name='phone'
                                            id='exampleInputEmail3'
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <Captcha />
                                    </div>
                                </div>
                                <div className='col-6 col-feed-right'>
                                    <div className="form-group col-12">
                                        <label htmlFor="exampleInputEmail4" className='col-12'>nội dung phản hồi</label>
                                        <textarea className="form-control col-12" placeholder="Nội dung" name='phone' id='exampleInputEmail4' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 col-right'>
                        <div className='title'>
                            <h5>phim đang chiếu</h5>
                        </div>
                        <div className='col-image'>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='link-read-more'>
                                <a href='#'>Xem Thêm</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default FeedBack;