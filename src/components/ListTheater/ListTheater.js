import React, { useState, useEffect } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DatePicker from '../Share/DatePicker';
import Select from 'react-select';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ListTheater.scss';
import { FaRegClock } from "react-icons/fa";
import { getListScheduleByTheater } from '../../services/ScheduleService';
import { useSelector } from "react-redux";
import { userState } from "../../redux/userSlice";
import { getListTheater } from '../../services/MovieTheaterServices';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateDataBooking } from "../../redux/BookingSlice";
import MyMapComponent from './MyMapComponent';
import { testFunction } from '../Share/useLocationForm';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { FormattedMessage } from 'react-intl';





function ListTheater() {
    const dispatch = useDispatch();
    let selectUser = useSelector(userState);
    let history = useHistory();
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }



    const customStyles = {
        input: (provided, state) => ({
            ...provided,
            width: 100,
            height: 20,
            display: 'flex',
            alignItems: 'center',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            marginTop: 2,
        }),
    };


    const [allValues, setAllValues] = useState({
        dateToday: '',
        dataMovie: {},
        movieTheaterId: null,
        showDate: new Date(),
        isLoginUser: false,
        cusId: null,
        lat: 10.7382316,
        lng: 106.6788115,
        selectedMovieTheater: {},
        isShowLoading: true,
        tenRap: '',
        arrImage: []
    });

    const groupBy = (arr, prop) => {
        const map = new Map(Array.from(arr, obj => [obj[prop], []]));
        arr.forEach(obj => map.get(obj[prop]).push(obj));
        return Array.from(map.values());
    }



    const buildDataInputSelect = (inputData) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.tenRap;
                object.value = item.id;

                result.push(object);
            })

        }
        return result;
    }


    async function testFunctionParent(cityCode, districtCode, wardCode) {
        const location = await testFunction(cityCode, districtCode, wardCode);

        if (location)
            return location;
        return null;

    }


    const handleChangeSelect = async (selectedOption, name) => {
        // setAllValues((prevState) => ({
        //     ...prevState,
        //     isShowLoading: true
        // }))

        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...allValues };
        stateCopy[stateName] = selectedOption;

        let dataTheater = allValues.dataMovieTheater.filter(item => item.id === selectedOption.value);


        let arrImage = dataTheater[0].MovieTheaterImage.filter(item => item.movieTheaterId === selectedOption.value)


        stateCopy['arrImage'] = arrImage;

        const location = await testFunctionParent(dataTheater[0].cityCode, dataTheater[0].districtCode, dataTheater[0].wardCode);
        let address = dataTheater[0].address + ', ' + location.selectedWard.label + ', ' + location.selectedDistrict.label + ', ' + location.selectedCity.label;
        let phoneNumber = dataTheater[0].soDienThoai;
        let tenRap = dataTheater[0].tenRap


        // call api get lịch chiếu //

        let listSchedule = await getListScheduleByTheater(null, allValues.showDate.getTime(), selectedOption.value);

        let finalSchedule = [];
        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieId = item.ShowtimeMovie.id;
                item.name = item.ShowtimeMovie.name;
                item.transName = item.ShowtimeMovie.transName;
                return item;
            })

            let timeNow = moment();
            const sortedActivities = customSchedule.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

            let res = sortedActivities.map((item, index) => {
                // if ngay hien tai < ngay cong chieu
                // status sap chieu 
                // if ngay hien tai > ngay cong chieu 
                // status da chieu
                // else
                // time hien tai is between start va end => dang chieu
                // time hien tai < start => sap chieu
                // else => da chieu


                var duration = moment.duration(timeNow.diff(moment(item.premiereDate)));

                // console.log("Check duation: ", duration);
                // console.log("Check day: ", duration.asDays() / 10);

                // console.log("Check day: ", Math.trunc(duration.asDays()));
                // console.log("Check asHours: ", Math.trunc(duration.asHours()));
                // console.log("Check asMinutes: ", Math.trunc(duration.asMinutes()));

                if (Math.trunc(duration.asDays()) < 0 || Math.trunc(duration.asHours()) < 0 || Math.trunc(duration.asMinutes()) < 0) {
                    item.status = 0
                } else if (Math.trunc(duration.asDays()) > 0) {
                    item.status = 2
                }
                else {

                    // time hien tai is between start va end => dang chieu
                    // time hien tai < start => sap chieu
                    // else => da chieu

                    let h = moment(timeNow).format("HH");
                    let m = moment(timeNow).format("mm");
                    let h1 = moment(item.startTime).format("HH");
                    let m1 = moment(item.startTime).format("mm");
                    let h2 = moment(item.endTime).format("HH");
                    let m2 = moment(item.endTime).format("mm");

                    if ((h1 < h || h1 == h && m1 <= m) && (h < h2 || h == h2 && m <= m2)) {
                        //   console.log("Dang chieu")
                        item.status = 1
                    }
                    else if (h < h1) {
                        //   console.log("Sap chieu");
                        item.status = 0
                    } else {
                        item.status = 2
                        //  console.log("Da chieu")
                    }

                }
                return item;

            })

            finalSchedule = res.filter(item => item.status === 0);

            finalSchedule = groupBy(finalSchedule, "movieId");
        }


        let lat = null;
        let lng = null;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC50PpD45fzUWVnBECoMjjYrmfOJluOlAY`)
            .then(res => {
                if (res.data && res.data.results) {
                    lat = res.data.results[0].geometry.location.lat;
                    lng = res.data.results[0].geometry.location.lng;
                }

                setAllValues({ ...stateCopy, listSchedule: finalSchedule, lat: lat, lng: lng, isShowLoading: false, address, phoneNumber, tenRap })
            })
            .catch(error => console.log(error));

    }

    const handleOnChangeDatePicker = async (date) => {
        let chooseDate = new Date(date[0]).getTime();
        // call api get lịch chiếu //
        let getSelectMovieTheater = (allValues.selectedMovieTheater && allValues.selectedMovieTheater.value) ? allValues.selectedMovieTheater.value : null;
        let listSchedule = await getListScheduleByTheater(null, chooseDate, getSelectMovieTheater);

        let finalSchedule = [];
        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieId = item.ShowtimeMovie.id;
                item.name = item.ShowtimeMovie.name;
                item.transName = item.ShowtimeMovie.transName;
                return item;
            })

            let timeNow = moment();
            const sortedActivities = customSchedule.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

            let res = sortedActivities.map((item, index) => {
                // if ngay hien tai < ngay cong chieu
                // status sap chieu 
                // if ngay hien tai > ngay cong chieu 
                // status da chieu
                // else
                // time hien tai is between start va end => dang chieu
                // time hien tai < start => sap chieu
                // else => da chieu


                var duration = moment.duration(timeNow.diff(moment(item.premiereDate)));

                // console.log("Check duation: ", duration);
                // console.log("Check day: ", duration.asDays() / 10);

                // console.log("Check day: ", Math.trunc(duration.asDays()));
                // console.log("Check asHours: ", Math.trunc(duration.asHours()));
                // console.log("Check asMinutes: ", Math.trunc(duration.asMinutes()));

                if (Math.trunc(duration.asDays()) < 0 || Math.trunc(duration.asHours()) < 0 || Math.trunc(duration.asMinutes()) < 0) {
                    item.status = 0
                } else if (Math.trunc(duration.asDays()) > 0) {
                    item.status = 2
                }
                else {

                    // time hien tai is between start va end => dang chieu
                    // time hien tai < start => sap chieu
                    // else => da chieu

                    let h = moment(timeNow).format("HH");
                    let m = moment(timeNow).format("mm");
                    let h1 = moment(item.startTime).format("HH");
                    let m1 = moment(item.startTime).format("mm");
                    let h2 = moment(item.endTime).format("HH");
                    let m2 = moment(item.endTime).format("mm");

                    if ((h1 < h || h1 == h && m1 <= m) && (h < h2 || h == h2 && m <= m2)) {
                        //  console.log("Dang chieu")
                        item.status = 1
                    }
                    else if (h < h1) {
                        //   console.log("Sap chieu");
                        item.status = 0
                    } else {
                        item.status = 2
                        //  console.log("Da chieu")
                    }

                }
                return item;

            })

            finalSchedule = res.filter(item => item.status === 0);

            finalSchedule = groupBy(finalSchedule, "movieId");
        }

        setAllValues({ ...allValues, showDate: date[0], listSchedule: finalSchedule, })
    }

    async function fetchInitSchedule(date, movieTheaterId) {
        let dataMovieTheater = await getListTheater();
        let listSchedule = [];
        let finalSchedule = [];
        let selectedMovieTheater = {};
        let address = '';
        let phoneNumber = '';
        let tenRap = '';
        let lat = null;
        let lng = null;
        let listMovieTheater = [];

        if (dataMovieTheater && dataMovieTheater.movie) {
            listMovieTheater = buildDataInputSelect(dataMovieTheater.movie);
            listSchedule = await getListScheduleByTheater(null, date, dataMovieTheater.movie[0].id);

            selectedMovieTheater = setDefaultValue(listMovieTheater, dataMovieTheater.movie[0].id);

            const location = await testFunctionParent(dataMovieTheater.movie[0].cityCode, dataMovieTheater.movie[0].districtCode, dataMovieTheater.movie[0].wardCode);
            address = dataMovieTheater.movie[0].address + ', ' + location.selectedWard.label + ', ' + location.selectedDistrict.label + ', ' + location.selectedCity.label;
            phoneNumber = dataMovieTheater.movie[0].soDienThoai;
            tenRap = dataMovieTheater.movie[0].tenRap;

            // gg map //



        }


        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieId = item.ShowtimeMovie.id;
                item.name = item.ShowtimeMovie.name;
                item.transName = item.ShowtimeMovie.transName;
                return item;
            })

            let timeNow = moment();
            const sortedActivities = customSchedule.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

            let res = sortedActivities.map((item, index) => {
                // if ngay hien tai < ngay cong chieu
                // status sap chieu 
                // if ngay hien tai > ngay cong chieu 
                // status da chieu
                // else
                // time hien tai is between start va end => dang chieu
                // time hien tai < start => sap chieu
                // else => da chieu


                var duration = moment.duration(timeNow.diff(moment(item.premiereDate)));

                // console.log("Check duation: ", duration);
                // console.log("Check day: ", duration.asDays() / 10);

                // console.log("Check day: ", Math.trunc(duration.asDays()));
                // console.log("Check asHours: ", Math.trunc(duration.asHours()));
                // console.log("Check asMinutes: ", Math.trunc(duration.asMinutes()));

                if (Math.trunc(duration.asDays()) < 0 || Math.trunc(duration.asHours()) < 0 || Math.trunc(duration.asMinutes()) < 0) {
                    item.status = 0
                } else if (Math.trunc(duration.asDays()) > 0) {
                    item.status = 2
                }
                else {

                    // time hien tai is between start va end => dang chieu
                    // time hien tai < start => sap chieu
                    // else => da chieu

                    let h = moment(timeNow).format("HH");
                    let m = moment(timeNow).format("mm");
                    let h1 = moment(item.startTime).format("HH");
                    let m1 = moment(item.startTime).format("mm");
                    let h2 = moment(item.endTime).format("HH");
                    let m2 = moment(item.endTime).format("mm");

                    if ((h1 < h || h1 == h && m1 <= m) && (h < h2 || h == h2 && m <= m2)) {
                        //   console.log("Dang chieu")
                        item.status = 1
                    }
                    else if (h < h1) {
                        //  console.log("Sap chieu");
                        item.status = 0
                    } else {
                        item.status = 2
                        //   console.log("Da chieu")
                    }

                }
                return item;

            })

            finalSchedule = res.filter(item => item.status === 0);

            finalSchedule = groupBy(finalSchedule, "movieId");
        }

        setAllValues((prevState) => ({
            ...prevState,
            dateToday: date,
            listSchedule: finalSchedule,
            listMovieTheater: listMovieTheater,
            dataMovieTheater: (dataMovieTheater && dataMovieTheater.movie) ? dataMovieTheater.movie : {},
            selectedMovieTheater,
            isShowLoading: false,
            address,
            phoneNumber,
            tenRap,
            arrImage: (dataMovieTheater && dataMovieTheater.movie && dataMovieTheater.movie[0].MovieTheaterImage.length > 0) ? dataMovieTheater.movie[0].MovieTheaterImage : [],
        }))


        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC50PpD45fzUWVnBECoMjjYrmfOJluOlAY`)
            .then(res => {
                if (res.data && res.data.results) {
                    lat = res.data.results[0].geometry.location.lat;
                    lng = res.data.results[0].geometry.location.lng;
                }
                setAllValues((prevState) => ({
                    ...prevState,
                    lat: lat,
                    lng: lng
                }))

            })
            .catch(error => console.log(error));

    }




    useEffect(() => {
        let dateToday = new Date();
        fetchInitSchedule(dateToday.getTime(), null)


    }, []);

    useEffect(() => {

        if (!selectUser.isLoggedInUser) {
            setAllValues((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
            }))
        } else {
            setAllValues((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
                cusId: selectUser.userInfo.id
            }))
        }



    }, [selectUser]);


    const handleClickSchedule = (schedule, movie) => {
        //  console.log('movie: ', movie)
        if (!allValues.isLoginUser) {
            toast.error("Vui lòng đăng nhập để đặt vé");
            history.push('/login')
            return;
        }


        if (schedule) {
            dispatch(updateDataBooking({
                cusId: allValues.cusId,
                movieId: movie.movieId,
                showTimeId: schedule.id,
                theaterId: schedule.RoomShowTime.movieTheaterId
            }));

            history.push('/dat-ve');
        }


    }


    const setDefaultValue = (inputData, value) => {
        let result = inputData.filter(item => item.value === value);
        if (result) {
            return result;
        }
    }



    return (
        <>

            <Header />
            <LoadingOverlay
                active={allValues.isShowLoading}
                spinner={<ClipLoader color='#FCAF17' size={50} />}
                styles={{
                    wrapper: {
                        // width: '400px',
                        // height: '400px',
                        overflow: 'hidden'
                    },
                    overlay: (base) => ({
                        ...base,
                        background: '#fff',
                    })
                }}
            >
                <div className='container con-theater'>
                    <div className='row-bread'>
                        <div className='breadcrumb list-bread'>
                            <ol>
                                <li className='breadcrumb-item'>
                                    <Link to='#' className='link' aria-current='page'><FormattedMessage id="cinema.home" /></Link>
                                </li>
                                <li className='breadcrumb-item'>
                                    <Link to='#' className='link' aria-current='page'><FormattedMessage id="cinema.cinema" /></Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <Link to='#' className='link' aria-current='page' style={{ fontWeight: '700', color: '#000' }}>{allValues.tenRap}</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className='row row-slider'>
                        <Slider {...settings}>
                            {allValues.arrImage && allValues.arrImage.length > 0 && allValues.arrImage.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.url} />
                                    </div>
                                )
                            })}

                        </Slider>
                    </div>
                    <div className='row row-film'>
                        <div className='col-6 col-film-left'>
                            <div className='row row-title-1'>
                                <h5><FormattedMessage id="cinema.nowShowing" /></h5>
                            </div>
                            <div className='combobox-group'>
                                <div className='row row-combobox'>
                                    <div className='form-group col-6 date'>
                                        <DatePicker
                                            className='form-control'
                                            value={allValues.dateToday}
                                            onChange={handleOnChangeDatePicker}

                                            minDate="today"
                                        />
                                    </div>
                                    <div className='form-group col-6' style={{ marginRight: '0px' }}>
                                        <Select
                                            onChange={handleChangeSelect}
                                            options={allValues.listMovieTheater}
                                            styles={customStyles}
                                            placeholder='Chọn rạp'
                                            name='selectedMovieTheater'
                                            value={allValues.selectedMovieTheater}
                                        />
                                    </div>
                                </div>

                            </div>
                            {allValues.listSchedule && allValues.listSchedule.map((item, index) => {

                                return (
                                    <>
                                        <div className='row row-theater-cal' key={index}>
                                            <div className='__image-theater'>

                                                {item[0].ShowtimeMovie && item[0].ShowtimeMovie.ImageOfMovie && item[0].ShowtimeMovie.ImageOfMovie.length > 0 && item[0].ShowtimeMovie.ImageOfMovie.map((image, index) => {
                                                    if (image.typeImage === 2) {
                                                        return (

                                                            <img key={index} src={image.url} />
                                                        )
                                                    }

                                                })}

                                            </div>
                                            <div className='infor-film'>
                                                <div className='title'>{item[0].name}</div>
                                                <div className='date-time'>
                                                    <span className='date'>{moment(item[0].ShowtimeMovie.releaseTime).format('YYYY')}</span>
                                                    <span className='time'><FaRegClock /> <span>{item[0].ShowtimeMovie.duration} Phút</span></span>
                                                </div>
                                                <div className='type-show'>
                                                    <span>2D - Phụ đề</span>
                                                    <div className='form-group btn-group'>
                                                        {item.map((schedule, indexSchedule) => {
                                                            return (
                                                                <button className='btn-vie' onClick={() => handleClickSchedule(schedule, item[0])} key={indexSchedule}>{moment(schedule.startTime).format('HH:mm')}</button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            })}

                            {allValues.listSchedule && allValues.listSchedule.length === 0 &&
                                <div className='row row-theater-cal' >
                                    <FormattedMessage id="cinema.notify-error" />
                                </div>

                            }

                        </div>
                        <div className='col-1'></div>
                        <div className='col-5 col-film-right'>
                            <div className='row-title-2'>
                                <h5><FormattedMessage id="cinema.detail" /></h5>
                            </div>
                            <div className='info-theater'>
                                <span>Địa chỉ: {allValues.address}</span>
                                <p>Số điện thoại: {allValues.phoneNumber}</p>
                            </div>

                            <div className='map-theater'>
                                <MyMapComponent lat={allValues.lat} lng={allValues.lng} />
                            </div>

                        </div>

                    </div>
                </div>
            </LoadingOverlay>
            <Footer />

        </>
    );
}

export default ListTheater;