import React, { useState, useEffect } from 'react';
import './ErrorTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import Header from '../Share/Header';
import Footer from '../Share/Footer';

import bearImage from '../../assets/Con-gau-cute.png';






function ErrorTicket() {


    useEffect(() => {

    }, []);




    return (
        <>
            <Header />
            <br />

            <div className='errorTicketController container'>
                <div className='row'>
                    <div className='room-main col-12'>
                        <p className='title-select-seet'>Lỗi mua vé</p>
                        <div className='room-seet'>
                            { /* EXAMPLE MAP INTERGRATE*/}

                            <div className='row_chair col-lg-12'>
                                <div className='chair'>

                                    <div className='img-error'>
                                        <img src={bearImage} />
                                    </div>
                                    <div className='error-content'>
                                        <p>Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực hiện giao dịch online lần nữa và tới rạp DK Cinema gần nhất để mua vé.

                                            Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách thông cảm và kiên nhẫn cùng nhân viên CSKH của DK Cinema.

                                            Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị trừ tiền sau khi đội ngũ CSKH kiểm tra và xác nhận. Vui lòng gởi thông tin giao dịch lỗi về email <span style={{ color: '#FCAF17' }}>hotro@dkcinema.com.vn </span> hoặc tin nhắn trang fanpage<span style={{ color: '#FCAF17' }}> https://facebook.com/dkcinema</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />


        </>
    );
}

export default ErrorTicket;
