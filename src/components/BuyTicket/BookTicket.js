import React, { useState, useEffect } from 'react';
import logo from '../../assets/DKCinema.png';
import './BookTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Table from 'react-bootstrap/Table';
import $ from "jquery";
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { getAllCombo } from '../../services/ComboService';
import { dataBookingRedux } from "../../redux/BookingSlice";



function BookTicket() {
    const bookingRedux = useSelector(dataBookingRedux);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    useEffect(() => {
        console.log("Check data in redux: ", bookingRedux);
    }, [bookingRedux]);

    const test = (e) => {
        const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
        const input = $(e.target).closest('.input-group').find('input');
        if (input.is('input')) {
            input[0][isNegative ? 'stepDown' : 'stepUp']()
        }
    }
    const [allCombo, setAllCombo] = useState({
        listCombo: [],
    })
    async function fetchDataCombo() {
        const dataCombos = await getAllCombo();
        console.log("data Combo", dataCombos);
        if (dataCombos && dataCombos.dataCombo) {
            setAllCombo({
                listCombo: dataCombos.dataCombo
            })
        }
    }
    useEffect(() => {
        fetchDataCombo();
    }, []);
    return (
        <>
            <Header />
            <br />

            <div className='bookingDetailController'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='ticket-wrapper'>
                            <div className='book-ticket'>
                                <div className='title-book'>Chọn loại vé</div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Loại vé</th>
                                            <th style={{ textAlign: 'center' }}>Số lượng</th>
                                            <th>Đơn giá (VNĐ)</th>
                                            <th>Tổng (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Vé 2D-Người lớn</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantity" min="0" name="quantity" value="1" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>90.000</td>
                                            <td>90.000</td>
                                        </tr>
                                        {/* <tr>
                                            <td>Vé 2D-Thành viên</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantity" min="0" name="quantity" value="0" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>85.000</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>Vé 2D-Ghế đôi</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantity" min="0" name="quantity" value="0" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>200.000</td>
                                            <td>0</td>
                                        </tr> */}
                                        <tr>
                                            <td>Thành Tiền</td>
                                            <td></td>
                                            <td></td>
                                            <td>90.000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className='book-combo'>
                                <div className='title-book'>Chọn combo</div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Combo</th>
                                            <th style={{ textAlign: 'center' }}>Số lượng</th>
                                            <th>Đơn giá (VNĐ)</th>
                                            <th>Tổng (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCombo.listCombo && allCombo.listCombo.length > 0
                                            && allCombo.listCombo.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <div class="input-group inline-group">
                                                                <div class="input-group-prepend">
                                                                    <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                                        <i class="fa fa-minus"></i>
                                                                    </button>
                                                                </div>
                                                                <input class="form-control quantity" min="0" name="quantity" value="1" type="number" />
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                                        <i class="fa fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item.price}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        {/* <tr>
                                            <td>Combo Family 2: 2 bắp + 4 nước + 2 snack</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantity" min="0" name="quantity" value="0" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>85.000</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>Combo 1: 1 bắp + 1 nước  + 1 snack </td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantity" min="0" name="quantity" value="0" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>200.000</td>
                                            <td>0</td>
                                        </tr> */}
                                        <tr>
                                            <td>Thành Tiền</td>
                                            <td></td>
                                            <td></td>
                                            <td>90.000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
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
                                    <div className='submit-container'>
                                        <div className='button-book-submit'>
                                            <button className='btn btn-book'>Tiếp tục</button>
                                        </div>
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

export default BookTicket;
