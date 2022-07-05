import React, { useEffect, useState } from 'react';
// import logo from '../../assets/DKCinema.png';
// import Phim1 from '../../assets/Phim1.jpg';
// import Phim2 from '../../assets/Phim2.png';
import './BuyTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { updateDataBooking } from "../../redux/BookingSlice";
import { getListMovieByStatus } from '../../services/MovieServices';
import { getListTheater } from '../../services/MovieTheaterServices';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { getListScheduleByFilm } from '../../services/ScheduleService';
import moment from 'moment';
import { useHistory, useParams } from "react-router-dom";
import { userState } from "../../redux/userSlice";
import { toast } from 'react-toastify';



function BuyTicket() {
    // const language = useSelector(selectLanguage);
    const dispatch = useDispatch();
    let selectUser = useSelector(userState);

    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }
    let history = useHistory();
    // const redirectSelectSeat = () => {
    //     history.push('/');
    // }
    // const [isShowTheaer, setisShowTheaer] = useState(false);

    const [allValues, setAllValues] = useState({
        isShowTheaer: false,
        isLoginUser: false,
        listMovie: [],
        dataID: '',
        listTheater: [],
        listSchedule: [],
        listSchedule2: [
            {
                premiereDate: '',
                data: []
            }
        ],
        movieId: null,
        theaterId: null,
        scheduleId: null,
        cusId: null
    });





    async function fetchDataMovie(status) {
        // You can await here
        const dataMovie = await getListMovieByStatus(status);
        //console.log("dataMovie: ", dataMovie);

        if (dataMovie && dataMovie.data) {
            setAllValues((prevState) => ({
                ...prevState,
                listMovie: dataMovie.data,
                dataID: dataMovie.data.id
            }))

        }
    }

    async function fetchDataTheater() {
        const dataTheater = await getListTheater();
        console.log("data theater", dataTheater);

        if (dataTheater && dataTheater.movie) {
            setAllValues((prevState) => ({
                ...prevState,
                listTheater: dataTheater.movie
            }))
        }
    }


    useEffect(() => {
        fetchDataMovie(1);
        fetchDataTheater();
        // fetchDataSchedule(5, 1);
    }, [])

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


    const handleClickFilms = (id) => {
        console.log(id);

        if (allValues.listSchedule.length > 0) {
            setAllValues((prevState) => ({
                ...prevState,
                movieId: id,
                theaterId: null,
                // isShowTheaer: !allValues.isShowTheaer,
                listSchedule: []
            }))
        } else {
            setAllValues((prevState) => ({
                ...prevState,
                movieId: id,
                isShowTheaer: true
            }))
        }


    }

    const groupBy = (arr, prop) => {
        const map = new Map(Array.from(arr, obj => [obj[prop], []]));
        arr.forEach(obj => map.get(obj[prop]).push(obj));
        return Array.from(map.values());
    }


    const handleClickTheater = async (theaterId) => {
        // call api fetch schedule //
        if (allValues.movieId && theaterId) {
            setAllValues((prevState) => ({
                ...prevState,
                theaterId: theaterId,
            }))
            const dataSchedule = await getListScheduleByFilm(allValues.movieId, theaterId);
            console.log("Data Schedule", dataSchedule);

            if (dataSchedule && dataSchedule.data) {
                // Lọc các ngày chiếu trong danh sách //

                let testSchedule = dataSchedule.data;

                let timeNow = moment();
                let res = testSchedule.map((item, index) => {
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
                            console.log("Dang chieu")
                            item.status = 1
                        }
                        else if (h < h1) {
                            console.log("Sap chieu");
                            item.status = 0
                        } else {
                            item.status = 2
                            console.log("Da chieu")
                        }

                    }
                    return item;

                })



                let finalSchedule = res.filter(item => item.status === 0);

                let listSchedule = groupBy(finalSchedule, "premiereDate");

                setAllValues((prevState) => ({
                    ...prevState,
                    theaterId: theaterId,
                    listSchedule: listSchedule.reverse()
                }))
            }
        }


        console.log("Check state: ", allValues)
    }

    const handleClickSchedule = (scheduleId) => {
        console.log(allValues.isLoginUser)
        if (!allValues.isLoginUser) {
            toast.error("Vui lòng đăng nhập để đặt vé");
            history.push('/login')
            return;
        }

        if (scheduleId) {
            dispatch(updateDataBooking({
                cusId: allValues.cusId,
                movieId: allValues.movieId,
                showTimeId: scheduleId,
                theaterId: allValues.theaterId
            }));

            history.push('/dat-ve');
        }
        console.log("ScheduleId: ", scheduleId);

    }


    return (
        <>
            <Header />

            <div className='bookingPageController'>
                <div className='col-12'>
                    <div className='tab-movies'>
                        <div className='tab_showmovie col-12'>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='panel panel-default'>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Chọn phim</h4>
                                        </div>
                                        <ul className='list-group'>
                                            {
                                                allValues.listMovie && allValues.listMovie.length > 0 &&
                                                allValues.listMovie.map((item, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                (item.id === allValues.movieId) &&
                                                                <li className='movie-item active' key={index} onClick={() => handleClickFilms(item.id)}>
                                                                    <div className='showtimes-row'>
                                                                        {
                                                                            item.ImageOfMovie.map((item1, index1) => {
                                                                                if (item1.typeImage === 1) {
                                                                                    return (
                                                                                        <img src={item1.url} key={index1} className="error" data-was-processed="true" />
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                        <i className="icon-c13"></i>
                                                                        <div className="title-movie"><p className="upper-text ng-binding">{item.name}</p><p className="vn upper-text ng-binding">{item.transName}</p></div>
                                                                    </div>
                                                                </li>
                                                            }
                                                            {
                                                                (item.id !== allValues.movieId) &&
                                                                <li className='movie-item' key={index} onClick={() => handleClickFilms(item.id)}>
                                                                    <div className='showtimes-row'>
                                                                        {
                                                                            item.ImageOfMovie.map((item1, index1) => {
                                                                                if (item1.typeImage === 1) {
                                                                                    return (
                                                                                        <img src={item1.url} key={index1} className="error" data-was-processed="true" />
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                        <i className="icon-c13"></i>
                                                                        <div className="title-movie"><p className="upper-text ng-binding">{item.name}</p><p className="vn upper-text ng-binding">{item.transName}</p></div>
                                                                    </div>
                                                                </li>


                                                            }
                                                        </>

                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className='col-4'>
                                    <div className='panel panel-default'>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Chọn rạp</h4>
                                        </div>
                                        {
                                            allValues.isShowTheaer && <ul className='list-group' >
                                                {
                                                    allValues.listTheater && allValues.listTheater.length > 0
                                                    && allValues.listTheater.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item.id === allValues.theaterId &&
                                                                    <li className='movie-item active' key={index} onClick={() => handleClickTheater(item.id)}>
                                                                        <div className='showtimes-row'>
                                                                            <div className="title-movie"><p className="upper-text ng-binding">{item.tenRap}</p></div>
                                                                        </div>
                                                                    </li>

                                                                }

                                                                {item.id !== allValues.theaterId &&
                                                                    <li className='movie-item' key={index} onClick={() => handleClickTheater(item.id)}>
                                                                        <div className='showtimes-row'>
                                                                            <div className="title-movie"><p className="upper-text ng-binding">{item.tenRap}</p></div>
                                                                        </div>
                                                                    </li>

                                                                }

                                                            </>

                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                        {
                                            allValues.isShowTheaer === false &&
                                            <ul className='list-group' >
                                                <li className='movie-item' >
                                                    <div className='showtimes-row'>
                                                        <div className="title-movie"></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        }

                                    </div>
                                </div>

                                <div className='col-4'>
                                    <div className='panel panel-default'>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Chọn suất</h4>
                                        </div>
                                        {
                                            allValues.listSchedule && allValues.listSchedule.map((item, index) => {
                                                let formatDate = moment(item[0].premiereDate).format("DD/MM/YYYY")
                                                let now = new Date(item[0].premiereDate).toLocaleDateString('vi-VN', { weekday: "long" });
                                                formatDate = now + ', ' + formatDate
                                                return (
                                                    <ul className='list-group' key={index}>
                                                        <li className='scheudle-item'>
                                                            <div className='showtimes-row'>
                                                                <div className='ngay-chieu'>
                                                                    <h6> {formatDate}</h6>
                                                                </div>
                                                                <div className='book-schedule'>
                                                                    <div className='dinh-dang'>2D-Phụ đề</div>
                                                                    <div className='schedule-movies'>
                                                                        <div className='time-content-btns'>
                                                                            {item.slice(0).reverse().map(schedule => {
                                                                                return (
                                                                                    <button className='btn-vie' key={schedule.id} onClick={() => handleClickSchedule(schedule.id)}>{moment(schedule.startTime).format('HH:mm')}</button>
                                                                                )
                                                                            })}

                                                                        </div>
                                                                    </div>

                                                                </div>


                                                            </div>
                                                        </li>

                                                    </ul>
                                                )

                                            })
                                        }
                                        {
                                            allValues.listSchedule.length === 0 &&
                                            <ul className='list-group' >
                                                <li className='movie-item' >
                                                    <div className='showtimes-row'>
                                                        <div className="title-movie"></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        }

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

export default BuyTicket;
