import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import './Payment.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Table from 'react-bootstrap/Table';
import Select from 'react-select';
import $ from "jquery";
import Header from '../Share/Header';
import Footer from '../Share/Footer';



const options = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' },
];

function Payment() {
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    return (
        <>
            <Header />
            <br />

            <div className='paymentContainer'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='payment-wrapper'>
                            <div className='payment-header'>
                                <div className='text-countdown'>Vui lòng thanh toán trong</div>
                                <div className='countdown'>15:00</div>
                            </div>
                            <div className='form-payment'>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Hình thức thanh toán</label>
                                    <Select
                                        className='select-gender col-9'
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Họ và tên</label>
                                    <input type="email" className="form-control col-9"
                                        placeholder="Nhập họ và tên"
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Email</label>
                                    <input type="email" className="form-control col-9"
                                        placeholder="Nhập email"
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Số điện thoại</label>
                                    <input type="text" className="form-control col-9"
                                        placeholder="Nhập số điện thoại"
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'></label>
                                    <p className='col-9'>(*) Bằng việc click/chạm vào “THANH TOÁN”, bạn đã xác nhận hiểu rõ các quy định giao dịch trực tuyến của DK Cinema.</p>

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'></label>
                                    <div className='col-9'>
                                        <button className='btn btn-back' style={{ fontSize: '20px', width: '200px', border: '1px solid #000', backgroundColor: '#fff', marginRight: '10px' }}>Quay lại</button>
                                        <button className='btn btn-primary btn-payment' style={{ fontSize: '20px', width: '200px', backgroundColor: 'orange', border: 'none' }}>Thanh toán</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-2'></div>
                    <div className='col-4'>
                        <div className='ticket-header'>
                            <div style={{ textAlign: 'left' }} class="col-12">
                                <img src="https://cdn.galaxycine.vn/media/2022/4/27/1350x900---copy_1651029903245.jpg" style={{ width: '300px' }} />
                            </div>
                            <div className='col-12'>
                                <div className="ticket-detail">
                                    <h2 className="ticket-title upper-text">Doctor Strange In The Multiverse Of Madness</h2>
                                    <h2 className="ticket-title vn upper-text">Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn</h2>
                                    <div className="ticket-icon">
                                        <span><i className="icon-c13" />
                                            <span className="notice">(*) Phim chỉ dành cho khán giả từ 13 tuổi trở lên</span></span>
                                    </div>
                                    <div className="ticket-info"><p><b>Rạp: &nbsp;</b>Galaxy Nguyễn Du&nbsp; | RAP 3&nbsp;</p>{/*p*/}{/*  b #{i18n("Ngày")}: &nbsp*/}{/*  | #{sessionInfo.dayOfWeekLabel}, #{sessionInfo.showDate}*/}<p><b>Suất chiếu: &nbsp;</b>21:15&nbsp; | Thứ tư, 18/05/2022</p><p className="ng-binding"><b>Combo: &nbsp;</b></p><p className="ng-binding"><b>Ghế: &nbsp;</b></p></div>
                                    <div className="ticket-price-total">
                                        <p>Tổng: &nbsp;<galaxy-summary-ticket ng-model="tickets" ng-concession="concessions" className="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-not-empty">
                                            <span className="ng-binding">0 VNĐ</span></galaxy-summary-ticket></p></div>
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

export default Payment;
