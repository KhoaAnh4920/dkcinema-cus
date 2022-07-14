import React, { useState, useEffect } from 'react';
import logo from '../../assets/DKCinema.png';
import './Payment.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LANGUAGES } from '../../utils/constant';
import Select from 'react-select';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { getScheduleById } from "../../services/ScheduleService";
import { getMomoPaymentLink, getCustomerVoucher } from "../../services/BookingServices";
import { dataBookingRedux, updateDataBooking } from "../../redux/BookingSlice";
import moment from 'moment';
import { useHistory, useParams } from "react-router-dom";
import { selectLanguage, updateLanguage, userState } from "../../redux/userSlice";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';



const options = [
    { value: 1, label: 'Ví điện tử Momo' },
];



function Payment() {
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();
    const bookingRedux = useSelector(dataBookingRedux);
    const dispatch = useDispatch();
    let selectUser = useSelector(userState);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dataSchedule, setDataSchedule] = useState([])
    const [allCombo, setAllCombo] = useState({
        listCombo: [],
        nameCombo: ''
    })
    const [allValues, setAllValues] = useState({
        nameSeet: '',
        name: '',
        email: '',
        phoneNumber: '',
        totalPrice: '',
        intervalId: '',
        voucherCode: null,
        isShowLoadingVoucher: false,
        isShowLoading: false,
        cusId: null
    });
    let history = useHistory();
    const [userInfo, setUserInfo] = useState({
        email: '',
        fullName: '',
        phone: ''
    })



    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    async function fetchDataScheduleById(scheduleId, bookingCombo) {
        const dataSchedule = await getScheduleById(scheduleId);
        console.log("dataSchedule", dataSchedule);
        if (dataSchedule && dataSchedule.data) {
            let schedule = dataSchedule.data;
            // Fetch room //

            let formatDate = moment(schedule.premiereDate).format("DD/MM/YYYY")
            let now = new Date(schedule.premiereDate).toLocaleDateString('vi-VN', { weekday: "long" });
            formatDate = now + ', ' + formatDate
            schedule.formatDate = formatDate;


            setDataSchedule(dataSchedule.data);
            let nameCombo = '';
            if (bookingCombo.length > 0) {
                bookingCombo.map(item => {
                    nameCombo += item.name + ', ';
                })
                nameCombo = nameCombo.replace(/,\s*$/, "");
            }

            setAllCombo((prevState) => ({
                ...prevState,
                nameCombo: nameCombo,
            }))
            setAllValues((prevState) => ({
                ...prevState,
                nameSeet: bookingRedux.dataBooking.nameSeet,
                // selectedColumn: selectedColumn
            }));
        }
    }

    useEffect(() => {
        console.log("Check data in redux: ", bookingRedux);
        let movieId = bookingRedux.dataBooking.movieId;
        let scheduleId = bookingRedux.dataBooking.showTimeId;

        let totalPriceBooking = document.getElementById('totalPriceBooking');


        console.log('totalPriceBooking: ', totalPriceBooking);

        totalPriceBooking.innerHTML = new Intl.NumberFormat('vi-VN').format(bookingRedux.dataBooking.totalPrice) + ' VND';

        fetchDataScheduleById(scheduleId, bookingRedux.dataBooking.combo);

        setAllValues((prevState) => ({
            ...prevState,
            totalPrice: bookingRedux.dataBooking.totalPrice
        }));

    }, [bookingRedux]);

    useEffect(() => {

        console.log('setUserInfo: ', selectUser.userInfo);


        setAllValues((prevState) => ({
            ...prevState,
            cusId: (selectUser.userInfo) ? selectUser.userInfo.id : '',
            name: (selectUser.userInfo) ? selectUser.userInfo.fullName : '',
            email: (selectUser.userInfo) ? selectUser.userInfo.email : '',
            phoneNumber: (selectUser.userInfo) ? selectUser.userInfo.phone : '',
        }));

    }, [selectUser]);


    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        let intervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + " " + " " + seconds;

            if (--timer < 0) {
                // timer = duration;
                localStorage.removeItem("seconds");
                localStorage.removeItem("minutes");
                toast.error("Hết thời gian thanh toán");
                clearInterval(intervalId);
                history.push('/')

            } else {
                window.localStorage.setItem("seconds", seconds)
                window.localStorage.setItem("minutes", minutes)
            }


        }, 1000);
        // setAllValues((prevState) => ({
        //     ...prevState,
        //     intervalId: intervalId,
        //     // selectedColumn: selectedColumn
        // }));

    }

    useEffect(() => {
        // let sec = parseInt(window.localStorage.getItem("seconds"))
        // let min = parseInt(window.localStorage.getItem("minutes"))

        // if (parseInt(min * sec)) {
        //     var fiveMinutes = (parseInt(min * 60) + sec);
        // } else {
        //     var fiveMinutes = 60 * 15;
        // }
        // // var fiveMinutes = 60 * 5;
        // let display = document.querySelector('#time');
        // startTimer(fiveMinutes, display);


    }, []);

    const handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...allValues };
        stateCopy[stateName] = selectedOption;
        setAllValues({ ...stateCopy })

        console.log("Check state: ", allValues);
    }

    const changeHandler = e => {

        setAllValues({ ...allValues, [e.target.name]: e.target.value })
        // console.log(allValues);
    }

    const handlePayment = async () => {
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true
        }));


        if (!allValues.name || !allValues.email || !allValues.phoneNumber || !allValues.selectedPayment) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        let bookData = bookingRedux.dataBooking;
        let dataFinal = {}

        let result = [];

        if (bookData.combo.length > 0) {
            bookData.combo.map(item => {
                let obj = {};
                obj.comboId = item.comboId;
                obj.quanlity = item.amount;
                result.push(obj);
            })

        }


        // dataFinal.cusId = allValues.cusId;
        // dataFinal.movieId = bookData.movieId;
        // dataFinal.showTimeId = bookData.showTimeId;
        // dataFinal.paymentId = allValues.selectedPayment.value || 1;
        // dataFinal.voucherCode = allValues.voucherCode;
        // dataFinal.price = allValues.totalPrice;
        // dataFinal.name = allValues.name;
        // dataFinal.email = allValues.email;
        // dataFinal.phoneNumber = allValues.phoneNumber;
        // dataFinal.seets = bookData.seets;
        // dataFinal.combo = result;

        // console.log('dataFinal: ', dataFinal)

        // let res = await handleCreateBookingTicket(dataFinal);

        let res = await getMomoPaymentLink({
            amount: allValues.totalPrice,
            orderId: bookData.bookingId,
            voucherCode: allValues.voucherCode,
            nameCus: allValues.name,
            email: allValues.email,
            phoneNumber: allValues.phoneNumber
        })

        console.log('res: ', res);

        if (res && res.statusCode === 200 && res.data) {
            console.log('res data: ', res.data);

            try {

                let resLink = JSON.parse(res.data);
                if (resLink.payUrl) {
                    window.location.replace(resLink.payUrl);
                }
            } catch (e) {
                console.log(e);
                toast.error("Something error. Please try again")
                setAllValues((prevState) => ({
                    ...prevState,
                    isShowLoading: false
                }));
            }



            // let payUrl = res.data.payUrl;
            // console.log('payUrl: ', payUrl);

        } else {
            toast.error(res.errMessage);
            setAllValues((prevState) => ({
                ...prevState,
                isShowLoading: false
            }));
        }


    }

    const handleClickVoucher = async () => {
        let dataVoucher = '';
        if (allValues.voucherCode) {
            dataVoucher = await getCustomerVoucher(allValues.voucherCode);
            console.log('dataVoucher: ', dataVoucher);

            if (dataVoucher && dataVoucher.data) {
                console.log('totalPrice: ', allValues.totalPrice);

                if (dataVoucher.data.condition && allValues.totalPrice < dataVoucher.data.condition) {
                    let con = dataVoucher.data.condition.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                    toast.error(`Voucher chỉ áp dụng cho đơn hàng từ ${con} trở lên`);
                    setAllValues((prevState) => ({
                        ...prevState,
                        voucherCode: ''
                    }));
                    return
                }

                let newPrice = (dataVoucher.data.discount > 100) ? allValues.totalPrice - dataVoucher.data.discount : (dataVoucher.data.discount * allValues.totalPrice) / 100

                setAllValues((prevState) => ({
                    ...prevState,
                    totalPrice: newPrice,
                    voucherCode: dataVoucher.data.code
                }));
            } else {
                toast.error("Voucher not found")
            }
        }

        else
            toast.error("Vui lòng nhập voucher")
    }




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
                                {/* Countdown */}
                                {/* <div className='countdown'>15:00</div> */}
                                <div id="time" className='countdown'>

                                </div>
                            </div>
                            <div className='form-payment'>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Hình thức thanh toán</label>
                                    <Select
                                        className='select-payment col-9'
                                        defaultValue={selectedOption}
                                        onChange={handleChangeSelect}
                                        options={options}
                                        name='selectedPayment'
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Họ và tên</label>
                                    <input type="text" className="form-control"
                                        placeholder="Nhập họ và tên"
                                        name="name"
                                        id="name"
                                        value={allValues.name}
                                        onChange={changeHandler}
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Email</label>
                                    <input type="email" className="form-control col-9"
                                        placeholder="Nhập email"
                                        value={allValues.email}
                                        name='email'
                                        id="email"
                                        onChange={changeHandler}
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Số điện thoại</label>
                                    <input type="text" className="form-control col-9"
                                        placeholder="Nhập số điện thoại"
                                        value={allValues.phoneNumber}
                                        name='phoneNumber'
                                        id="phoneNumber"
                                        onChange={changeHandler}
                                    />

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Nhập voucher</label>
                                    <input type="text" className="form-control col-6"
                                        placeholder="Nhập mã voucher"
                                        value={allValues.voucherCode}
                                        name='voucherCode'
                                        id="voucherCode"
                                        onChange={changeHandler}
                                    />
                                    <div className='col-1'></div>
                                    <Button variant="primary" {...allValues.isShowLoadingVoucher && 'disabled'} className='col-2' onClick={handleClickVoucher} >
                                        {allValues.isShowLoadingVoucher &&
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
                                        {!allValues.isShowLoadingVoucher &&
                                            <>
                                                <span className="visually">Áp dụng</span>
                                            </>
                                        }
                                    </Button>


                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'></label>
                                    <p className='col-9'>(*) Bằng việc click/chạm vào “THANH TOÁN”, bạn đã xác nhận hiểu rõ các quy định giao dịch trực tuyến của DK Cinema.</p>

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'></label>
                                    <div className='col-9'>
                                        <button className='btn btn-back' onClick={history.goBack}>Quay lại</button>
                                        {/* <button className='btn btn-primary btn-payment' onClick={() => handlePayment()} style={{ fontSize: '20px', width: '200px', backgroundColor: 'orange', border: 'none' }}>Thanh toán</button> */}
                                        <Button variant="primary " {...allValues.isShowLoading && 'disabled'} className='btn-payment' onClick={() => handlePayment()} >
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
                                                    <span className="visually">Thanh toán</span>
                                                </>
                                            }
                                        </Button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-2'></div>
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
                                            <b>Suất chiếu: &nbsp;</b>{(dataSchedule && dataSchedule.startTime) ? moment(dataSchedule.startTime).format("HH:mm") : ''}&nbsp; | {dataSchedule && dataSchedule.formatDate}</p><p className="ng-binding"><b>Combo: &nbsp;</b> <span id='listCombo'>{allCombo.nameCombo}</span> </p><p className="ng-binding"><b>Ghế: &nbsp;</b>{allValues.nameSeet}</p></div>
                                    <div className="ticket-price-total">
                                        <hr />
                                        <p style={{ 'display': 'inline', 'fontSize': '16px', 'fontWeight': 'bold' }}>TỔNG: </p>
                                        <span className="ng-binding" id='totalPriceBooking' style={{ 'color': '#FCAF17', 'fontSize': '16px', 'fontWeight': 'bold', 'marginLeft': '15px' }}>{allValues.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>

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

export default Payment;
