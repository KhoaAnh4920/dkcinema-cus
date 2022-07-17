import React, { useState, useEffect } from 'react';
import './ErrorTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LANGUAGES } from '../../utils/constant';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
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
import bearImage from '../../assets/Con-gau-cute.png';





function ErrorTicket() {
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
        fullName: ''
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


    async function fetchDataScheduleById(scheduleId, bookingCombo) {
        const dataSchedule = await getScheduleById(scheduleId);
        const seetWasBooking = await getSeetWasBooking(scheduleId);
        console.log("seetWasBooking", seetWasBooking);

        let seetBook = [];
        if (seetWasBooking && seetWasBooking.data && seetWasBooking.data.length > 0) {
            seetWasBooking.data.map(item => {
                seetBook.push(item.TicketSeet.id);
            })
        }
        console.log('seetBook: ', seetBook);

        if (dataSchedule && dataSchedule.data) {
            let schedule = dataSchedule.data;
            // Fetch room //


            let dataRoom = await fetchDataRoom(schedule.RoomShowTime.id, seetBook);

            console.log('dataRoom: ', dataRoom)

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
        }
    }


    async function fetchDataRoom(id, seetBook) {
        // You can await here

        const dataRoom = await getEditRoom(id);
        console.log("Check data room: ", dataRoom);

        console.log("Check data room length: ", dataRoom.data.RoomSeet.length);

        if (dataRoom && dataRoom.data && dataRoom.data.RoomSeet && dataRoom.data.RoomSeet.length > 0) {
            let result = [];

            // tìm posOfColumn max 

            let maxPosColoumn = Math.max(...dataRoom.data.RoomSeet.map(o => +o.posOfColumn))

            console.log("Check maxPosColoumn: ", maxPosColoumn);


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
                // selectedColumn: selectedColumn
            }));

            console.log(allValues);
        }
    }


    // useEffect(() => {
    //     console.log("Check data in redux: ", bookingRedux);
    //     let movieId = bookingRedux.dataBooking.movieId;
    //     let scheduleId = bookingRedux.dataBooking.showTimeId;

    //     let totalPriceBooking = document.getElementById('totalPriceBooking');


    //     totalPriceBooking.innerHTML = new Intl.NumberFormat('vi-VN').format(bookingRedux.dataBooking.totalPrice) + ' VNĐ';

    //     fetchDataScheduleById(scheduleId, bookingRedux.dataBooking.combo);
    //     // fetchDataRoom();
    //     // fetch data schedule //



    // }, [bookingRedux]);










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

    // useEffect(() => {

    //     console.log('setUserInfo: ', selectUser.userInfo);


    //     setAllValues((prevState) => ({
    //         ...prevState,
    //         cusId: (selectUser.userInfo) ? selectUser.userInfo.id : '',
    //         fullName: (selectUser.userInfo) ? selectUser.userInfo.fullName : '',
    //         email: (selectUser.userInfo) ? selectUser.userInfo.email : '',
    //         phoneNumber: (selectUser.userInfo) ? selectUser.userInfo.phone : '',
    //     }));

    // }, [selectUser]);




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
        console.log('item1: ', item1);
        console.log('item2: ', item2);

        // let nameSeet = allValues.nameSeet;




        // Get name seet //


        if (item2.id >= 0) {

            if (res.some(id => id === item2.id)) {
                if (item2.typeId === 1)
                    allValues.countSeetStandard--
                else
                    allValues.countSeetVip--
                res = res.filter(function (item) {
                    return item !== item2.id
                })
            }
            else {
                if (item2.typeId === 1) {
                    // Check bao nhieu ghe thuong da co trong mang //
                    let amoutStandard = bookingRedux.dataBooking.itemsTicket.filter(item => item.typeId == item2.typeId);
                    console.log(amoutStandard);
                    if (amoutStandard && amoutStandard[0] && allValues.countSeetStandard < amoutStandard[0].amount) {
                        console.log("Cho dat")


                        allValues.countSeetStandard++;
                        res.push(item2.id);
                    } else {
                        toast.error("Fail")
                    }

                }
                if (item2.typeId === 2) {
                    let amoutVip = bookingRedux.dataBooking.itemsTicket.filter(item => item.typeId == item2.typeId);
                    console.log(amoutVip);
                    if (amoutVip && amoutVip[0] && allValues.countSeetVip < amoutVip[0].amount) {

                        console.log("Cho dat")
                        allValues.countSeetVip++;
                        res.push(item2.id);

                    } else {
                        toast.error("Fail")
                    }
                }

            }

        }

        console.log('res: ', res);

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

        console.log('nameSeet: ', nameSeet);




        setAllValues((prevState) => ({
            ...prevState,
            selectSeet: res,
            nameSeet: nameSeet
        }));
    }


    const handleBookingSeet = async () => {
        console.log(allValues);

        let bookData = bookingRedux.dataBooking;
        let amoutVip = bookData.itemsTicket.filter(item => item.typeId == 2);
        let amoutStandard = bookData.itemsTicket.filter(item => item.typeId == 1);
        let dataCombo = bookData.combo;


        if (allValues.countSeetStandard != amoutStandard[0].amount || allValues.countSeetVip != amoutVip[0].amount) {
            toast.error('Vui lòng chọn đủ số lượng ghế');
            return;
        }


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
            price: bookData.totalPrice,
            name: allValues.fullName,
            email: allValues.email,
            phoneNumber: allValues.phoneNumber,
            seets: resSeet,
            combo: result
        });

        console.log('dataBooking: ', dataBooking);

        if (dataBooking && dataBooking.errCode === 0) {
            // save redux //
            let newBookingRedux = { ...bookingRedux.dataBooking, bookingId: dataBooking.result };
            dispatch(updateDataBooking(newBookingRedux));
            history.push('/thanh-toan');
        } else {
            Swal.fire({
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
