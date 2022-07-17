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
import { getMovieById } from '../../services/MovieServices';
import { getListTheater } from '../../services/MovieTheaterServices';
import { getListMovieByStatus } from '../../services/MovieServices';
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
        tenRap: ''
    });

    const groupBy = (arr, prop) => {
        const map = new Map(Array.from(arr, obj => [obj[prop], []]));
        arr.forEach(obj => map.get(obj[prop]).push(obj));
        return Array.from(map.values());
    }

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
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
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true
        }))

        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...allValues };
        stateCopy[stateName] = selectedOption;

        let dataTheater = allValues.dataMovieTheater.filter(item => item.id === selectedOption.value);

        console.log('dataTheater: ', dataTheater)

        const location = await testFunctionParent(dataTheater[0].cityCode, dataTheater[0].districtCode, dataTheater[0].wardCode);
        let address = dataTheater[0].address + ', ' + location.selectedWard.label + ', ' + location.selectedDistrict.label + ', ' + location.selectedCity.label;
        let phoneNumber = dataTheater[0].soDienThoai;
        let tenRap = dataTheater[0].tenRap
        console.log('address: ', address);

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

            finalSchedule = groupBy(customSchedule, "movieId");
        }


        let lat = null;
        let lng = null;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC50PpD45fzUWVnBECoMjjYrmfOJluOlAY`)
            .then(res => {
                console.log('res: ', res.data);
                if (res.data && res.data.results) {
                    lat = res.data.results[0].geometry.location.lat;
                    lng = res.data.results[0].geometry.location.lng;
                }
                console.log(lat, lng)
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

            finalSchedule = groupBy(customSchedule, "movieId");
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
        console.log('dataMovieTheater: ', dataMovieTheater)

        let listMovieTheater = [];

        if (dataMovieTheater && dataMovieTheater.movie) {
            listMovieTheater = buildDataInputSelect(dataMovieTheater.movie);
            listSchedule = await getListScheduleByTheater(null, date, dataMovieTheater.movie[0].id);

            selectedMovieTheater = setDefaultValue(listMovieTheater, dataMovieTheater.movie[0].id);

            const location = await testFunctionParent(dataMovieTheater.movie[0].cityCode, dataMovieTheater.movie[0].districtCode, dataMovieTheater.movie[0].wardCode);
            address = dataMovieTheater.movie[0].address + ', ' + location.selectedWard.label + ', ' + location.selectedDistrict.label + ', ' + location.selectedCity.label;
            phoneNumber = dataMovieTheater.movie[0].soDienThoai;
            tenRap = dataMovieTheater.movie[0].tenRap;
        }


        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieId = item.ShowtimeMovie.id;
                item.name = item.ShowtimeMovie.name;
                item.transName = item.ShowtimeMovie.transName;
                return item;
            })

            finalSchedule = groupBy(customSchedule, "movieId");
        }

        console.log('finalSchedule: ', finalSchedule);



        setAllValues((prevState) => ({
            ...prevState,
            dateToday: date,
            listSchedule: finalSchedule,
            dataMovieTheater: (dataMovieTheater && dataMovieTheater.data) ? dataMovieTheater.data : {},
            listMovieTheater: listMovieTheater,
            dataMovieTheater: dataMovieTheater.movie,
            selectedMovieTheater,
            isShowLoading: false,
            address,
            phoneNumber,
            tenRap
        }))

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
        console.log('movie: ', movie)
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
            <LoadingOverlay
                active={allValues.isShowLoading}
                spinner={<ClipLoader color='#fff' size={50} />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgb(10 10 10 / 68%)',
                    })
                }}
            >


                <Header />
                <div className='container con-theater'>
                    <div className='row-bread'>
                        <div className='breadcrumb list-bread'>
                            <ol>
                                <li className='breadcrumb-item'>
                                    <Link to='#' className='link' aria-current='page'>Trang Chủ</Link>
                                </li>
                                <li className='breadcrumb-item'>
                                    <Link to='#' className='link' aria-current='page'>Rạp chiếu phim</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <Link to='#' className='link' aria-current='page' style={{ fontWeight: '700', color: '#000' }}>{allValues.tenRap}</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className='row row-slider'>
                        <Slider {...settings}>
                            <div>
                                <img src="https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-3_1557134455385.jpg" />
                            </div>
                            <div>
                                <img src="https://rapchieuphim.com/photos/2/galaxy/galaxy-kinh-duong-vuong-2.png" />
                            </div>
                            <div>
                                <img src="https://cdn.galaxycine.vn/media/2019/12/11/galaxy7_1576054843437.jpg" />
                            </div>
                            <div>
                                <img src="https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-3_1557134455385.jpg" />
                            </div>
                        </Slider>
                    </div>
                    <div className='row row-film'>
                        <div className='col-6 col-film-left'>
                            <div className='row row-title-1'>
                                <h5>phim đang chiếu</h5>
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
                                    Lịch chiếu đang cập nhật...
                                </div>

                            }

                        </div>
                        <div className='col-1'></div>
                        <div className='col-5 col-film-right'>
                            <div className='row-title-2'>
                                <h5>thông tin chi tiết</h5>
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
                <Footer />
            </LoadingOverlay>
        </>
    );
}

export default ListTheater;