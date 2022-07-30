import React, { useState, useEffect } from 'react';
import logo from '../../assets/DKCinema.png';
import './BookTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LANGUAGES } from '../../utils/constant';
import Table from 'react-bootstrap/Table';
import $ from "jquery";
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { getAllCombo } from '../../services/ComboService';
import { dataBookingRedux } from "../../redux/BookingSlice";
import { updateDataBooking } from "../../redux/BookingSlice";
import { getScheduleById } from "../../services/ScheduleService"
import { isContentEditable } from '@testing-library/user-event/dist/utils';
import moment from 'moment';
import { useHistory, useParams } from "react-router-dom";
import { selectLanguage, updateLanguage, userState } from "../../redux/userSlice";





function BookTicket() {
    const bookingRedux = useSelector(dataBookingRedux);
    const dispatch = useDispatch();
    let history = useHistory();
    let selectUser = useSelector(userState);
    const [allValues, setAllValues] = useState({
        priceTicket: 90000
    });
    const [allCombo, setAllCombo] = useState({
        listCombo: [],
    })
    const [dataSchedule, setDataSchedule] = useState([])


    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }


    async function fetchDataScheduleById(scheduleId) {
        const dataSchedule = await getScheduleById(scheduleId);
        // console.log("dataSchedule", dataSchedule);
        if (dataSchedule && dataSchedule.data) {
            let schedule = dataSchedule.data;
            let formatDate = moment(schedule.premiereDate).format("DD/MM/YYYY")
            let now = new Date(schedule.premiereDate).toLocaleDateString('vi-VN', { weekday: "long" });
            formatDate = now + ', ' + formatDate
            schedule.formatDate = formatDate;


            setDataSchedule(dataSchedule.data)
        }
    }


    useEffect(() => {
        console.log("Check data in redux: ", bookingRedux);

        if (!bookingRedux.dataBooking) {
            history.push('/lich-chieu');
            return;
        }

        let movieId = bookingRedux.dataBooking.movieId;
        let scheduleId = bookingRedux.dataBooking.showTimeId;


        fetchDataScheduleById(scheduleId)
        // fetch data schedule //

    }, [bookingRedux]);


    useEffect(() => {

        console.log('setUserInfo: ', selectUser.userInfo);

        if (!selectUser.isLoggedInUser) {
            history.push('/login');
            return;
        }

    }, [selectUser]);


    const test = (e) => {
        const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
        const input = $(e.target).closest('.input-group').find('input');
        if (input.is('input')) {
            input[0][isNegative ? 'stepDown' : 'stepUp']()
        }
        let quantity = document.getElementsByClassName("quantityTicket");


        let items = [];
        let sum = 0;
        for (let a = 0; a < quantity.length; a++) {
            let obj = {};
            if (+quantity[a].value !== '') {

                // console.log(+quantity[a].id)

                obj.typeId = quantity[a].id;
                obj.amount = +quantity[a].value;
                let test = document.getElementById(`type-${quantity[a].id}`);

                // console.log('test: ', test);

                let test2 = document.getElementById(`typePrice-${quantity[a].id}`);
                let totalPrice = document.getElementById('totalPriceTicket');


                let priceTicket = obj.amount * test2.value;
                test.innerHTML = priceTicket.toLocaleString('it-IT')

                sum += priceTicket

                // console.log('sum: ', sum);

                totalPrice.innerHTML = sum.toLocaleString('it-IT')


                items.push(obj);
            }
        }

        let priceTicket = sum;


        let totalTicket = +priceTicket;
        let totalPriceCombo = (document.getElementById('totalPriceCombo').innerText > 0) ? document.getElementById('totalPriceCombo').innerText.split('.').join("") : 0;
        let totalPriceBooking = document.getElementById('totalPriceBooking');

        // totalPriceBooking.innerText.split('.').join("");
        let total = +totalTicket + +totalPriceCombo;


        totalPriceBooking.innerHTML = new Intl.NumberFormat('vi-VN').format(total) + ' VND';

    }


    const handleChooseCombo = (e) => {
        const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
        const input = $(e.target).closest('.input-group').find('input');
        if (input.is('input')) {
            input[0][isNegative ? 'stepDown' : 'stepUp']()
        }
        // let quantityCombo = document.getElementsByClassName("quantityCombo");

        // console.log('quantityCombo: ', quantityCombo[0].value);
        // let priceCombo = quantityCombo[0].value * 90000;

        let quantity = document.getElementsByClassName("quantityCombo");

        let items = [];
        let sum = 0;
        let nameComBo = ''
        for (let a = 0; a < quantity.length; a++) {
            let obj = {};
            if (+quantity[a].value !== '') {
                if (+quantity[a].value !== 0) {
                    let listChoose = allCombo.listCombo.filter(item => item.id === +quantity[a].id)
                    // console.log('listCombo: ', listChoose);
                    nameComBo += listChoose[0].name + ', ';
                }

                obj.comboId = quantity[a].id;
                obj.amount = +quantity[a].value;
                let test = document.getElementById(`Combo-${quantity[a].id}`);
                let test2 = document.getElementById(`Price-${quantity[a].id}`);
                let totalPrice = document.getElementById('totalPriceCombo');


                let priceCombo = obj.amount * test2.value;
                test.innerHTML = priceCombo.toLocaleString('it-IT')

                sum += priceCombo

                // console.log('sum: ', sum);

                totalPrice.innerHTML = sum.toLocaleString('it-IT')

                items.push(obj);
            }
        }
        nameComBo = nameComBo.replace(/,\s*$/, "");

        let listName = document.getElementById('listCombo');

        listName.innerHTML = nameComBo;


        let totalTicket = document.getElementById('totalPriceTicket');
        let totalPriceCombo = sum;
        let totalPriceBooking = document.getElementById('totalPriceBooking');

        // console.log('totalTicket: ', totalTicket)
        // totalPriceBooking.innerText.split('.').join("");
        let total = +totalPriceCombo + +totalTicket;


        totalPriceBooking.innerHTML = total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        // console.log('quantityTicket: ', quantityTicket[0].value);
        // let priceTicket = quantityTicket[0].value * 90000;

    }



    async function fetchDataCombo() {
        const dataCombos = await getAllCombo();
        // console.log("data Combo", dataCombos);
        if (dataCombos && dataCombos.dataCombo) {
            let res = dataCombos.dataCombo.map(item => {
                item.nameFood = '';
                item.ComboInFood.map(x => {
                    item.nameFood += ' ' + x.Combo_Food.amount + ' ' + x.name + ' +';
                })
                item.nameFood = item.nameFood.substr(0, item.nameFood.length - 1);
                return item;
            })


            console.log('res: ', res)

            setAllCombo({
                listCombo: res.slice(0, 4)
            })
        }
    }
    const handleShowFilm = async (id) => {

    }
    useEffect(() => {
        fetchDataCombo();
    }, []);




    const handleBookTicket = () => {
        // Get combo //
        let quantity = document.getElementsByClassName("quantityCombo");
        let items = [];
        let sum = 0;
        for (let a = 0; a < quantity.length; a++) {
            let obj = {};
            if (+quantity[a].value !== 0) {


                obj.comboId = +quantity[a].id;
                obj.amount = +quantity[a].value;
                obj.name = ''

                allCombo.listCombo.map(item => {
                    if (item.id === obj.comboId) {
                        obj.name += item.name;
                        sum += (obj.amount * item.price);
                    }
                })

                items.push(obj);
            }
        }

        // // Get ticket v2 //

        // let quantityTicket = document.getElementsByClassName("quantityTicket");
        // let itemsTicket = [];
        // let sumTicket = 0;
        // for (let a = 0; a < quantityTicket.length; a++) {
        //     let obj = {};
        //     if (+quantityTicket[a].value !== '') {

        //         obj.typeId = quantityTicket[a].id;
        //         obj.amount = +quantityTicket[a].value;
        //         let test = document.getElementById(`type-${quantityTicket[a].id}`);

        //         let test2 = document.getElementById(`typePrice-${quantityTicket[a].id}`);
        //         let totalPrice = document.getElementById('totalPriceTicket');



        //         let priceTicket = obj.amount * test2.value;
        //         test.innerHTML = priceTicket.toLocaleString('it-IT')

        //         sumTicket += priceTicket



        //         totalPrice.innerHTML = sum.toLocaleString('it-IT')


        //         itemsTicket.push(obj);
        //     }
        // }



        // // Get ticket //

        // let totalPrice = sum + sumTicket;


        // // save redux //

        let newBookingRedux = { ...bookingRedux.dataBooking, 'combo': items, totalPrice: sum }

        dispatch(updateDataBooking(newBookingRedux));

        history.push('/dat-ghe');
    }



    return (
        <>
            <Header />
            <br />

            <div className='bookingDetailController'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='ticket-wrapper'>
                            {/* <div className='book-ticket'>
                                <div className='title-book'>Chọn loại vé</div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Loại vé</th>
                                            <th style={{ textAlign: 'center' }}>Số lượng</th>
                                            <th>Giá vé (VNĐ)</th>
                                            <th>Tổng (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ verticalAlign: 'middle' }}>GHẾ TIÊU CHUẨN</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantityTicket" min="0" id='1' name="quantityTicket" value="1" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <input type='hidden' id={`typePrice-1`} value='90000' />
                                            <td style={{ verticalAlign: 'middle' }}>90.000</td>

                                            <td id="type-1" style={{ verticalAlign: 'middle' }}>90.000</td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: 'middle' }}>GHẾ VIP</td>
                                            <td>
                                                <div class="input-group inline-group">
                                                    <div class="input-group-prepend">
                                                        <button class="btn btn-outline-secondary btn-minus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input class="form-control quantityTicket" min="0" id='2' name="quantityTicket" value="0" type="number" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-secondary btn-plus" onClick={(e) => test(e)}>
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <input type='hidden' id={`typePrice-2`} value='100000' />
                                            <td style={{ verticalAlign: 'middle' }}>100.000</td>

                                            <td id="type-2" style={{ verticalAlign: 'middle' }}>100.000</td>
                                        </tr>
                                        
                                        <tr>
                                            <td>Thành Tiền</td>
                                            <td></td>
                                            <td></td>
                                            <td id="totalPriceTicket">190.000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div> */}
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
                                                        <td style={{ display: 'flex' }}>
                                                            <img style={{ width: '100px', height: '67px', marginRight: '10px' }} src={item.image} />
                                                            <div className='info-item'>
                                                                <p style={{ fontWeight: '700', marginBottom: '3px' }}>{item.name}</p>
                                                                <p style={{ fontSize: '10px' }}>{item.nameFood}</p>
                                                            </div>
                                                        </td>
                                                        <td style={{ verticalAlign: 'middle' }}>
                                                            <input type='hidden' id={`Price-${item.id}`} value={item.price} />
                                                            <div class="input-group inline-group">
                                                                <div class="input-group-prepend">
                                                                    <button class="btn btn-outline-secondary btn-minus" onClick={(e) => handleChooseCombo(e)}>
                                                                        <i class="fa fa-minus"></i>
                                                                    </button>
                                                                </div>
                                                                <input class="form-control quantityCombo" min="0" name="quantityCombo" data={item.price} id={item.id} value="0" type="number" />
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-outline-secondary btn-plus" onClick={(e) => handleChooseCombo(e)}>
                                                                        <i class="fa fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td style={{ verticalAlign: 'middle' }}>{new Intl.NumberFormat('vi-VN').format(item.price)}</td>
                                                        <td id={`Combo-${item.id}`} style={{ verticalAlign: 'middle' }}>0</td>
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
                                            <td id='totalPriceCombo'>0</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='ticket-header'>
                            <div style={{ textAlign: 'center' }} class="col-12">
                                {dataSchedule && dataSchedule.ShowtimeMovie && dataSchedule.ShowtimeMovie.ImageOfMovie.length > 0 && dataSchedule.ShowtimeMovie.ImageOfMovie.map((item, index) => {
                                    if (item.typeImage === 1) {
                                        return (
                                            <img src={item.url} style={{ width: '300px' }} />
                                        )
                                    }
                                })}

                            </div>
                            <div className='col-12'>
                                <div className="ticket-detail">
                                    <h2 className="ticket-title upper-text">{(dataSchedule && dataSchedule.ShowtimeMovie) ? dataSchedule.ShowtimeMovie.name : ''}</h2>
                                    <h2 className="ticket-title vn upper-text">{(dataSchedule && dataSchedule.ShowtimeMovie) ? dataSchedule.ShowtimeMovie.transName : ''}</h2>
                                    {/* <div className="ticket-icon">
                                        <span><i className="icon-c13" />
                                            <span className="notice">(*) Phim chỉ dành cho khán giả từ 13 tuổi trở lên</span></span>
                                    </div> */}
                                    <div className="ticket-info"><p><b>Rạp: &nbsp;</b>
                                        {(dataSchedule && dataSchedule.RoomShowTime && dataSchedule.RoomShowTime.MovieTheaterRoom) ? dataSchedule.RoomShowTime.MovieTheaterRoom.tenRap : ''}&nbsp; | {(dataSchedule && dataSchedule.RoomShowTime) ? dataSchedule.RoomShowTime.name : ''}&nbsp;
                                    </p>{/*p*/}{/*  b #{i18n("Ngày")}: &nbsp*/}{/*  | #{sessionInfo.dayOfWeekLabel}, #{sessionInfo.showDate}*/}<p>
                                            <b>Suất chiếu: &nbsp;</b>{(dataSchedule && dataSchedule.startTime) ? moment(dataSchedule.startTime).format("HH:mm") : ''}&nbsp; | {dataSchedule && dataSchedule.formatDate}</p><p className="ng-binding"><b>Combo: &nbsp;</b> <span id='listCombo'></span> </p><p className="ng-binding"><b>Ghế: &nbsp;</b></p></div>
                                    <div className="ticket-price-total">
                                        <hr />
                                        <p style={{ 'display': 'inline', 'fontSize': '16px', 'fontWeight': 'bold' }}>TỔNG: </p>
                                        <span className="ng-binding" id='totalPriceBooking' style={{ 'color': '#FCAF17', 'fontSize': '16px', 'fontWeight': 'bold', 'marginLeft': '15px' }}>0 VNĐ</span>
                                    </div>
                                    <div className='submit-container'>
                                        <div className='button-book-submit'>
                                            <button className='btn btn-book' onClick={() => handleBookTicket()}>
                                                Tiếp tục
                                                <i className='fas fa-arrow-right' style={{ marginLeft: '10px' }}></i>
                                            </button>
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
