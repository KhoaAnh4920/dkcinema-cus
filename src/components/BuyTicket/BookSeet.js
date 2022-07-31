import React, { useState, useEffect } from 'react';
import './BookSeet.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LANGUAGES } from '../../utils/constant';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { getAllCombo } from '../../services/ComboService';
import { dataBookingRedux } from "../../redux/BookingSlice";
import { updateDataBooking } from "../../redux/BookingSlice";
import { getScheduleById } from "../../services/ScheduleService";
import { getSeetWasBooking } from "../../services/BookingServices";
import moment from 'moment';
import { getEditRoom } from "../../services/RoomService";
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";
import { selectLanguage, updateLanguage, userState } from "../../redux/userSlice";
import { handleCreateBookingTicket } from "../../services/BookingServices";
import Swal from 'sweetalert2';


function BookSeet() {
    const bookingRedux = useSelector(dataBookingRedux);
    const dispatch = useDispatch();
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let history = useHistory();
    let selectUser = useSelector(userState);



    const [allValues, setAllValues] = useState({
        name: '',
        errors: {},
        listAlpha: [],
        listSeet: [],
        seetCopy: [],
        isShowLoading: false,
        numberOfColumn: '',
        numberOfRow: '',
        numberSeet: '',
        selectSeet: [],
        countSeetStandard: 0,
        countSeetVip: 0,
        nameSeet: '',
        fullName: '',
        totalPrice: 0,
        flag: false,
        resCheck: []
    });
    const [allCombo, setAllCombo] = useState({
        listCombo: [],
        nameCombo: ''
    })
    const [dataSchedule, setDataSchedule] = useState([])


    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }


    // async function fetchDataScheduleById(scheduleId) {
    //     const dataSchedule = await getScheduleById(scheduleId);
    //     console.log("dataSchedule", dataSchedule);
    //     if (dataSchedule && dataSchedule.data) {
    //         let schedule = dataSchedule.data;
    //         let formatDate = moment(schedule.premiereDate).format("DD/MM/YYYY")
    //         let now = new Date(schedule.premiereDate).toLocaleDateString('vi-VN', { weekday: "long" });
    //         formatDate = now + ', ' + formatDate
    //         schedule.formatDate = formatDate;


    //         setDataSchedule(dataSchedule.data)
    //     }
    // }


    async function fetchDataScheduleById(scheduleId, bookingCombo, totalPrice) {
        const dataSchedule = await getScheduleById(scheduleId);
        const seetWasBooking = await getSeetWasBooking(scheduleId);
        // console.log("seetWasBooking", seetWasBooking);

        let seetBook = [];
        if (seetWasBooking && seetWasBooking.data && seetWasBooking.data.length > 0) {
            seetWasBooking.data.map(item => {
                seetBook.push(item.TicketSeet.id);
            })
        }
        // console.log('seetBook: ', seetBook);

        if (dataSchedule && dataSchedule.data) {
            let schedule = dataSchedule.data;
            // Fetch room //


            let dataRoom = await fetchDataRoom(schedule.RoomShowTime.id, seetBook, totalPrice);

            // console.log('dataRoom: ', dataRoom)

            let formatDate = moment(schedule.premiereDate).format("DD/MM/YYYY")
            let now = new Date(schedule.premiereDate).toLocaleDateString('vi-VN', { weekday: "long" });
            formatDate = now + ', ' + formatDate
            schedule.formatDate = formatDate;


            setDataSchedule(dataSchedule.data);
            let nameCombo = '';
            if (bookingCombo && bookingCombo.length > 0) {
                bookingCombo.map(item => {
                    nameCombo += item.name + ', ';
                })
                nameCombo = nameCombo.replace(/,\s*$/, "");
            }

            setAllCombo((prevState) => ({
                ...prevState,
                nameCombo: nameCombo,
            }))
        }
    }


    async function fetchDataRoom(id, seetBook, totalPrice) {
        // You can await here

        const dataRoom = await getEditRoom(id);
        // console.log("Check data room: ", dataRoom);

        // console.log("Check data room length: ", dataRoom.data.RoomSeet.length);

        if (dataRoom && dataRoom.data && dataRoom.data.RoomSeet && dataRoom.data.RoomSeet.length > 0) {
            let result = [];

            // tìm posOfColumn max 

            let maxPosColoumn = Math.max(...dataRoom.data.RoomSeet.map(o => +o.posOfColumn))

            // console.log("Check maxPosColoumn: ", maxPosColoumn);


            for (let i = 0; i <= maxPosColoumn; i++) {
                let objSeet = {};
                let posOfRow = [];
                objSeet.posOfColumn = i;
                dataRoom.data.RoomSeet.map((item, index) => {
                    if (i === +item.posOfColumn) {
                        let obj = {};
                        obj.pos = +item.posOfRow;

                        obj.id = item.id;

                        // Check Ghế đã đặt hay chưa //
                        if (seetBook.some(id => id === item.id)) {
                            obj.typeId = -1
                        }
                        else
                            obj.typeId = item.typeId;

                        posOfRow.push(obj);
                    }
                    else return;
                })
                objSeet.posOfRow = posOfRow;
                objSeet.posOfRow.sort((a, b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0))
                result.push(objSeet);
            }

            // let listAlpha = buildDataInputSelect(dataRoom.data.numberOfColumn);

            // let selectedColumn = listAlpha[maxPosColoumn + 1];


            setAllValues((prevState) => ({
                ...prevState,
                name: dataRoom.data.name,
                errors: {},
                // listAlpha: listAlpha,
                listSeet: result,
                isShowLoading: false,
                numberOfColumn: dataRoom.data.numberOfColumn,
                numberOfRow: dataRoom.data.numberOfRow,
                numberSeet: '',
                totalPrice: totalPrice
                // selectedColumn: selectedColumn
            }));

            //  console.log(allValues);
        }
    }


    useEffect(() => {
        //   console.log("Check data in redux: ", bookingRedux);

        if (!bookingRedux.dataBooking) {
            history.push('/lich-chieu');
            return;
        }


        let scheduleId = bookingRedux.dataBooking.showTimeId;
        let totalPrice = bookingRedux.dataBooking.totalPrice;

        fetchDataScheduleById(scheduleId, bookingRedux.dataBooking.combo, totalPrice);
        // fetchDataRoom();
        // fetch data schedule //



    }, [bookingRedux]);



    // async function fetchDataCombo() {
    //     const dataCombos = await getAllCombo();
    //     console.log("data Combo", dataCombos);
    //     if (dataCombos && dataCombos.dataCombo) {
    //         setAllCombo({
    //             listCombo: dataCombos.dataCombo
    //         })
    //     }
    // }
    useEffect(() => {
        // fetchDataCombo();
    }, []);

    useEffect(() => {

        //  console.log('setUserInfo: ', selectUser.userInfo);

        if (!selectUser.isLoggedInUser) {
            history.push('/login');
            return;
        }


        setAllValues((prevState) => ({
            ...prevState,
            cusId: (selectUser.userInfo) ? selectUser.userInfo.id : '',
            fullName: (selectUser.userInfo) ? selectUser.userInfo.fullName : '',
            email: (selectUser.userInfo) ? selectUser.userInfo.email : '',
            phoneNumber: (selectUser.userInfo) ? selectUser.userInfo.phone : '',
        }));

    }, [selectUser]);




    // const handleBookTicket = () => {
    //     // Get combo //
    //     let quantity = document.getElementsByClassName("quantityCombo");
    //     let items = [];
    //     let sum = 0;
    //     for (let a = 0; a < quantity.length; a++) {
    //         let obj = {};
    //         if (+quantity[a].value !== 0) {


    //             obj.comboId = +quantity[a].id;
    //             obj.amount = +quantity[a].value;

    //             allCombo.listCombo.map(item => {
    //                 if (item.id === obj.comboId) {
    //                     sum += (obj.amount * item.price);
    //                 }
    //             })

    //             items.push(obj);
    //         }
    //     }



    //     // Get ticket //
    //     let quantityTicket = document.getElementsByClassName("quantityTicket")[0];

    //     sum += 90000 * +quantityTicket.value


    //     // save redux //
    //     let newBookingRedux = { ...bookingRedux.dataBooking, 'combo': items, quantityTicket: +quantityTicket.value, totalPrice: sum }

    //     dispatch(updateDataBooking(newBookingRedux));

    //     console.log('newBookingRedux: ', newBookingRedux);


    // }


    const handleClickSeet = (item1, item2) => {
        let res = allValues.selectSeet;
        let resTest = allValues.resCheck;
        let price = allValues.totalPrice;
        // console.log('item1: ', item1);
        // console.log('item2: ', item2);

        // let nameSeet = allValues.nameSeet;

        // Get name seet //


        if (item2.id >= 0) {



            if (res.some(id => id === item2.id)) {
                (item2.typeId === 1) ? price -= 90000 : price -= 10000
                // if (item2.typeId === 1)
                //     allValues.countSeetStandard--
                // else
                //     allValues.countSeetVip--
                res = res.filter(function (item) {
                    return item !== item2.id
                })

                resTest = resTest.filter(function (item) {
                    return item.id !== item2.id
                })
            }
            else {
                if (item2.typeId === 1) {
                    // Check bao nhieu ghe thuong da co trong mang //
                    // let amoutStandard = bookingRedux.dataBooking.itemsTicket.filter(item => item.typeId == item2.typeId);
                    // console.log(amoutStandard);
                    // if (amoutStandard && amoutStandard[0] && allValues.countSeetStandard < amoutStandard[0].amount) {
                    //     console.log("Cho dat")


                    //     allValues.countSeetStandard++;
                    //     res.push(item2.id);
                    // } else {
                    //     toast.error("Fail")
                    // }

                    res.push(item2.id);
                    resTest.push({
                        ...item2,
                        posOfColumn: item1.posOfColumn
                    });
                    price += 90000

                }
                if (item2.typeId === 2) {
                    // let amoutVip = bookingRedux.dataBooking.itemsTicket.filter(item => item.typeId == item2.typeId);
                    // console.log(amoutVip);
                    // if (amoutVip && amoutVip[0] && allValues.countSeetVip < amoutVip[0].amount) {

                    //     console.log("Cho dat")
                    //     allValues.countSeetVip++;
                    //     res.push(item2.id);

                    // } else {
                    //     toast.error("Fail")
                    // }
                    res.push(item2.id);
                    resTest.push({
                        ...item2,
                        posOfColumn: item1.posOfColumn
                    });
                    price += 100000
                }

            }

        }

        // console.log('res: ', res);

        let nameSeet = '';
        allValues.listSeet && allValues.listSeet.map(item => {
            item.posOfRow.map(row => {
                if (res.some(id => id === row.id)) {

                    nameSeet += alphabet[+item.posOfColumn];
                    nameSeet = nameSeet + (+row.pos + 1) + ', ';
                }
            })
        })

        nameSeet = nameSeet.replace(/,\s*$/, "");



        setAllValues((prevState) => ({
            ...prevState,
            selectSeet: res,
            nameSeet: nameSeet,
            totalPrice: price,
            resCheck: resTest
        }));
    }


    const findItemSeet = (item, pos) => {
        let dataSeet = allValues.listSeet;

        // console.log('item: ', item)
        // console.log('dataSeet: ', dataSeet)

        let test = dataSeet.filter(x => x.posOfColumn == item.posOfColumn)

        // console.log('test: ', test);


        let result = test[0];

        // console.log('result: ', result);

        return (result.posOfRow.filter(y => y.pos === pos)[0])


    }


    const handleBookingSeet = async () => {

        // console.log(allValues);

        let resTest = allValues.resCheck;
        let res = allValues.selectSeet;

        if (res.length === 0 || resTest.length === 0) {
            Swal.fire({
                showCloseButton: true,
                icon: 'error',
                title: 'Thông báo',
                text: 'Vui lòng chọn ghế',

            })

            return;
        }

        // console.log('resTest: ', resTest)

        // check chọn lẻ ghế //
        for (let i = 0; i < resTest.length; i++) {
            let item = resTest[i];
            let preSeet = findItemSeet(item, item.pos - 1);
            // console.log('preSeet: ', preSeet);

            let testIsBook = res.includes(preSeet.id)
            // console.log('testIsBook', testIsBook);
            if (!testIsBook) {
                let preSeet2 = findItemSeet(item, item.pos - 2);
                // console.log('preSeet2: ', preSeet2);
                if (preSeet2) {
                    let testIsBook2 = res.includes(preSeet2.id)
                    if (testIsBook2) {
                        // console.log('LOI');
                        Swal.fire({
                            icon: 'error',
                            showCloseButton: true,
                            title: 'Thông báo',
                            html:
                                'Việc chọn vị trí ghế của bạn không được để trống 1 ghế ở bên trái, giữa hoặc bên phải trên cùng hàng ghế mà bạn vừa chọn',
                        })

                        return;
                    }
                }

            }
        }

        console.log('OK');

        console.log('allValues: ', allValues);



        let bookData = bookingRedux.dataBooking;
        let dataCombo = bookData.combo;


        let resSeet = []
        if (allValues.selectSeet.length > 0) {
            allValues.selectSeet.map(item => {
                let obj = {};
                obj.seetId = item;
                resSeet.push(obj);
            })
        }


        let result = [];

        if (dataCombo.length > 0) {
            dataCombo.map(item => {
                let obj = {};
                obj.comboId = item.comboId;
                obj.quanlity = item.amount;
                result.push(obj);
            })

        }

        console.log('resSeet: ', resSeet);
        console.log('result: ', result);

        // call api save booking //
        let dataBooking = await handleCreateBookingTicket({
            cusId: allValues.cusId,
            movieId: bookData.movieId,
            showTimeId: bookData.showTimeId,
            paymentId: null,
            voucherCode: null,
            price: allValues.totalPrice,
            name: allValues.fullName,
            email: allValues.email,
            phoneNumber: allValues.phoneNumber,
            seets: resSeet,
            combo: result
        });

        console.log('dataBooking: ', dataBooking);

        if (dataBooking && dataBooking.errCode === 0) {
            // save redux //
            let newBookingRedux = { ...bookingRedux.dataBooking, bookingId: dataBooking.result, nameSeet: allValues.nameSeet, totalPrice: allValues.totalPrice };
            dispatch(updateDataBooking(newBookingRedux));
            history.push('/thanh-toan');
        } else {
            Swal.fire({
                showCloseButton: true,
                icon: 'error',
                title: 'Lỗi đặt ghế',
                text: 'Ghế đang trong trạng thái chờ thanh toán',
            })
        }

    }



    return (
        <>
            <Header />
            <br />

            <div className='bookingSeetController'>
                <div className='row'>
                    <div className='room-main col-8'>
                        <p className='title-select-seet'>Chọn ghế: {allValues.nameSeet}</p>
                        <div className='room-seet'>
                            { /* EXAMPLE MAP INTERGRATE*/}

                            <div className='row_chair col-lg-12'>
                                <div className='chair'>
                                    {allValues.listSeet && allValues.listSeet.length > 0 &&
                                        allValues.listSeet.map((item, index) => {
                                            return (
                                                <div className='one_row' key={index}>
                                                    <p className='name-column'>{alphabet[item.posOfColumn]}</p>
                                                    {
                                                        item.posOfRow.map((item2, index2) => {
                                                            if (allValues.selectSeet.some(id => id === item2.id)) {
                                                                return (<p className='seet-item selected' key={index2} onClick={() => handleClickSeet(item, item2)}>{item2.pos + 1}</p>)
                                                            }
                                                            else if (item2.typeId === 2)
                                                                return (<p className='seet-item active' key={index2} onClick={() => handleClickSeet(item, item2)}>{item2.pos + 1}</p>);
                                                            else if (item2.typeId === -1)
                                                                return (<p className='seet-item sold' key={index2}>{item2.pos + 1}</p>);
                                                            else
                                                                return (<p className='seet-item' key={index2} onClick={() => handleClickSeet(item, item2)}>{item2.pos + 1}</p>);
                                                        })
                                                    }
                                                    <p className='name-column'>{alphabet[item.posOfColumn]}</p>
                                                </div>
                                            )
                                        })

                                    }


                                </div>

                            </div>
                            <div className='sreen-room'>
                                <div className='text'>
                                    <p>Màn hình</p>
                                    <p className='line'></p>
                                </div>
                                <div className='infoSeet'>
                                    <div className='content-seet'>
                                        <div className='seet-default'>
                                            <p className='color-default'></p>
                                            <p className='name-seet'>Ghế đang chọn</p>
                                        </div>
                                        <div className='seet-sold'>
                                            <p className='color-sold'></p>
                                            <p className='name-seet'>Ghế đã bán</p>
                                        </div>
                                        <div className='seet-available'>
                                            <p className='color-available'></p>
                                            <p className='name-seet'>Ghế có thể chọn</p>
                                        </div>

                                        <div className='seet-vip'>
                                            <p className='color-vip'></p>
                                            <p className='name-seet'>Ghế Vip</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='ticket-header'>
                            <div style={{ textAlign: 'center' }} className="col-12">
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
                                    <div className='submit-container'>
                                        <div className='button-book-submit'>

                                            <button className='btn btn-backToPage' onClick={history.goBack} >
                                                <i className='fas fa-arrow-left' style={{ marginRight: '10px' }}></i>
                                                Quay lại
                                            </button>
                                            <button className='btn btn-book' onClick={() => handleBookingSeet()} >
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

export default BookSeet;
