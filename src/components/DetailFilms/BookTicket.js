import React, { useState, useEffect } from 'react';
import ModalVideo from 'react-modal-video'
//import logo from '../../assets/DKCinema.png';
import pdc1 from '../../assets/PDC/pdc1.jpg';
import imgtrail from '../../assets/trailer/t1.jpg';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from '../Share/DatePicker';
import Select from 'react-select';
import { faAngleDoubleRight, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import "react-modal-video/scss/modal-video.scss";
import { FacebookProvider, Like } from 'react-facebook';
import './BookTicket.scss';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import Rate from '../Share/Rate';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { getListScheduleByTheater } from '../../services/ScheduleService';
import { getMovieById } from '../../services/MovieServices';
import { useParams } from 'react-router-dom';
import { getListTheater } from '../../services/MovieTheaterServices';
import { getListMovieByStatus } from '../../services/MovieServices';
import { Link } from "react-router-dom";
import { userState } from "../../redux/userSlice";
import { updateDataBooking } from "../../redux/BookingSlice";
import { toast } from 'react-toastify';
import InCommingFilms from '../Share/InCommingFilms';






function BookTicketThrough() {
    let selectUser = useSelector(userState);
    let history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const handleShowVideo = () => {
        setOpen(!open);
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const language = useSelector(selectLanguage);



    const changeLanguage = (language) => {
        // fire redux event: actions
        console.log(language);
        dispatch(updateLanguage(language));
    }

    //Rating component
    const [rating, setRating] = useState(0);
    const [rating1, setRating1] = useState(0);
    const [allValues, setAllValues] = useState({
        dateToday: '',
        dataMovie: {},
        movieTheaterId: null,
        showDate: null,
        isLoginUser: false,
        cusId: null
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

    const handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...allValues };
        stateCopy[stateName] = selectedOption;



        // call api get lịch chiếu //

        let listSchedule = await getListScheduleByTheater(id, allValues.showDate.getTime(), selectedOption.value);

        let finalSchedule = [];
        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieTheaterId = item.RoomShowTime.MovieTheaterRoom.id;
                item.tenRap = item.RoomShowTime.MovieTheaterRoom.tenRap
                return item;
            })

            finalSchedule = groupBy(customSchedule, "movieTheaterId");
        }

        setAllValues({ ...stateCopy, listSchedule: finalSchedule, })
    }



    async function fetchAllSchedule(movieId, date, movieTheaterId) {

        let listSchedule = await getListScheduleByTheater(movieId, date, movieTheaterId);
        let dataMovie = await getMovieById(movieId);
        let dataMovieTheater = await getListTheater();
        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);

        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.filter(item => item.id !== +id)
            dataMovieUpcoming = dataMovieUpcoming.slice(0, 3)
        } else
            dataMovieUpcoming = []


        let finalSchedule = [];
        let listMovieTheater = [];

        if (dataMovieTheater && dataMovieTheater.movie) {
            listMovieTheater = buildDataInputSelect(dataMovieTheater.movie)
        }



        if (dataMovie && dataMovie.data) {
            dataMovie.data.type = '';
            dataMovie.data.url = youtube_parser(dataMovie.data.url)
            dataMovie.data.MovieOfType.map(item => {
                dataMovie.data.type += item.name + ', ';
            })

            dataMovie.data.type = dataMovie.data.type.replace(/,\s*$/, "");
        }

        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieTheaterId = item.RoomShowTime.MovieTheaterRoom.id;
                item.tenRap = item.RoomShowTime.MovieTheaterRoom.tenRap
                return item;
            })

            finalSchedule = groupBy(customSchedule, "movieTheaterId");
        }



        setAllValues((prevState) => ({
            ...prevState,
            dateToday: date,
            listSchedule: finalSchedule,
            dataMovie: (dataMovie && dataMovie.data) ? dataMovie.data : {},
            dataMovieTheater: (dataMovieTheater && dataMovieTheater.data) ? dataMovieTheater.data : {},
            listMovieTheater: listMovieTheater,
            dataMovieUpcoming: dataMovieUpcoming
        }))

    }


    const handleClickSchedule = (schedule) => {
        console.log(allValues.isLoginUser)
        if (!allValues.isLoginUser) {
            toast.error("Vui lòng đăng nhập để đặt vé");
            history.push('/login')
            return;
        }

        console.log('schedule: ', schedule)

        if (schedule) {
            dispatch(updateDataBooking({
                cusId: allValues.cusId,
                movieId: id,
                showTimeId: schedule.id,
                theaterId: schedule.movieTheaterId
            }));

            history.push('/dat-ve');
        }


    }



    useEffect(() => {
        let dateToday = new Date();
        fetchAllSchedule(id, dateToday.getTime(), null)


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

    useEffect(() => {
        let dateToday = new Date();
        fetchAllSchedule(id, dateToday.getTime(), null)
    }, [id]);



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


    const handleOnChangeDatePicker = async (date) => {
        let chooseDate = new Date(date[0]).getTime();
        // call api get lịch chiếu //
        let getSelectMovieTheater = (allValues.selectedMovieTheater && allValues.selectedMovieTheater.value) ? allValues.selectedMovieTheater.value : null;
        let listSchedule = await getListScheduleByTheater(id, chooseDate, getSelectMovieTheater);

        let finalSchedule = [];
        if (listSchedule && listSchedule.data && listSchedule.data.length > 0) {


            let customSchedule = listSchedule.data.map(item => {
                item.movieTheaterId = item.RoomShowTime.MovieTheaterRoom.id;
                item.tenRap = item.RoomShowTime.MovieTheaterRoom.tenRap
                return item;
            })

            finalSchedule = groupBy(customSchedule, "movieTheaterId");
        }

        setAllValues({ ...allValues, showDate: date[0], listSchedule: finalSchedule, })
    }


    const handleClickDetailFilms = (item) => {
        history.push(`/chi-tiet-phim/${item.id}`)
    }

    const handleClickFilms = (item) => {
        history.push(`/dat-ve-qua-phim/${item.id}`)
        window.location.reload();
    }


    return (
        <>
            <Header />
            <div className='book-ticket-film'>
                <div className='container box'>
                    <div className='row row-detail'>

                        <div className='col-3 col-left'>
                            {
                                allValues.dataMovie && allValues.dataMovie.ImageOfMovie && allValues.dataMovie.ImageOfMovie.map((item1, index1) => {
                                    if (item1.typeImage === 2) {
                                        return (
                                            <Image src={item1.url} key={index1} className='img-trail' />
                                        )
                                    }
                                })
                            }
                            <Button variant='link' onClick={handleShowVideo} className='btn-show'>
                                <FontAwesomeIcon icon={faPlayCircle} className='icon-show' />
                            </Button>

                            <ModalVideo
                                channel='youtube'
                                autoplay='0'
                                isOpen={open}
                                videoId={(allValues.dataMovie && allValues.dataMovie.url) ? allValues.dataMovie.url : ''}
                                onClose={() => setOpen(false)}
                            />
                        </div>
                        <div className='col-9 col-right'>
                            <div className='row row-title'>
                                <div className='row detail'>
                                    <ul>
                                        <li >
                                            <div className='title-left'>
                                                {(allValues.dataMovie && allValues.dataMovie.name) ? allValues.dataMovie.name : ''}
                                            </div>
                                            <div className='title-right'>
                                                <div className="rating-movie rating-home"><span className="rating-value"><strong className="review-home ng-binding">9.5</strong><span>/10</span><span className="ng-binding">&nbsp;(806)</span></span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row row-seen'>
                                <div className='row detail time-container'>
                                    <ul>
                                        <li >
                                            <div className='time-left'>
                                                <i className="icon-c13"></i>
                                            </div>
                                            <div className='time-right'>
                                                <i className="fas fa-clock"></i>
                                                {(allValues.dataMovie && allValues.dataMovie.duration) ? allValues.dataMovie.duration + ' phút' : ''}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row row-info'>
                                <div className='row row-info-detail'>
                                    <ul>
                                        <li>
                                            <div className='info-left'>Nhà sản xuất</div>
                                            <div className='info-right'>{(allValues.dataMovie && allValues.dataMovie.brand) ? allValues.dataMovie.brand : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Đạo diễn</div>
                                            <div className='info-right'>None</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Thể loại</div>
                                            <div className='info-right'>
                                                {(allValues.dataMovie && allValues.dataMovie.type) ? allValues.dataMovie.type : ''}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Diễn viên</div>
                                            <div className='info-right'>{(allValues.dataMovie && allValues.dataMovie.cast) ? allValues.dataMovie.cast : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Quốc gia</div>
                                            <div className='info-right'>{(allValues.dataMovie && allValues.dataMovie.country) ? allValues.dataMovie.country : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Ngày khởi chiếu</div>
                                            <div className='info-right'>{(allValues.dataMovie && allValues.dataMovie.releaseTime) ? moment(allValues.dataMovie.releaseTime).format('DD/MM/YYYY') : ''}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className='row row-btn'>
                                <div className='blog'>
                                    <button className='btn-buy' onClick={() => redirectBookTicket()}><a href='#'>mua vé</a></button>
                                    <li ><div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                    <button className='btn-review'><a href='#'>đánh giá</a> </button>
                                    <div className='rating'>
                                        <Rate />
                                    </div>
                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>

            </div >
            <div className='content-calendar container'>
                <div className='row row-book'>
                    <div className='box col-8 col-left'>
                        <div className='title'>
                            <h5>lịch chiếu</h5>
                        </div>
                        <div className='combobox-group col-12'>
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
                                    />
                                </div>
                            </div>

                        </div>
                        {allValues.listSchedule && allValues.listSchedule.map((item, index) => {
                            return (
                                <div className='calendar-group' key={index}>
                                    <div className='calender'>
                                        <div className='title-cal'>
                                            <h5>{item[0].tenRap}</h5>
                                        </div>
                                        <div className='type-film'>
                                            2D - Phụ Đề
                                        </div>
                                        <div className='form-group btn-group'>

                                            {item.map((schedule, indexSchedule) => {
                                                return (
                                                    <button className='btn-vie' onClick={() => handleClickSchedule(schedule)} key={indexSchedule}>{moment(schedule.startTime).format('HH:mm')}</button>
                                                )


                                            })}


                                        </div>
                                    </div>
                                </div>
                            )

                        })}

                        {allValues.listSchedule && allValues.listSchedule.length === 0 &&
                            <div className='calendar-group' >
                                Lịch chiếu đang cập nhật...
                            </div>

                        }


                    </div>
                    <InCommingFilms
                        dataMovieUpcoming={allValues.dataMovieUpcoming}
                    />
                    {/* <div className='col-4 col-right'>
                        <div className='title'>
                            <h5>phim đang chiếu</h5>
                        </div>
                        <div className='col-image'>
                            {
                                allValues.dataMovieUpcoming && allValues.dataMovieUpcoming.length > 0 && allValues.dataMovieUpcoming.map((item, index) => {
                                    return (
                                        <>
                                            <div className='image' onClick={() => handleClickFilms(item)}>
                                                {
                                                    item.ImageOfMovie.map((item1, index1) => {
                                                        if (item1.typeImage === 1) {
                                                            return (
                                                                <Image style={{ height: '250px' }} src={item1.url} className='image__img' key={index1} />
                                                            )
                                                        }
                                                    })
                                                }

                                                <div className='image__overlay image__overlay--primary'>
                                                    <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                                </div>

                                            </div>
                                            <div className='text-detail' onClick={() => handleClickDetailFilms(item)}>
                                                <p className='vn'>{item.name}</p>
                                                <p className='eng'>{item.transName}</p>
                                            </div>
                                        </>


                                    )

                                })
                            }

                            <div className='link-read-more'>
                  
                                <Link to="/phim-dang-chieu">Xem thêm</Link>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
            <Footer />
        </>
    )
}
export default BookTicketThrough