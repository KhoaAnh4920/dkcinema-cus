import React, { useEffect, useState } from 'react';
import logo from '../../assets/DKCinema.png';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import './BuyTicket.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { getListMovieByStatus } from '../../services/MovieServices';
import Header from '../Share/Header';
import Footer from '../Share/Footer';




function BuyTicket() {
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }
    const [allValues, setAllValues] = useState({
        listMovie: [],
    });
    async function fetchDataMovie(status) {
        // You can await here
        const dataMovie = await getListMovieByStatus(status);
        console.log("dataMovie: ", dataMovie);

        if (dataMovie && dataMovie.data) {
            setAllValues({
                listMovie: dataMovie.data
            })
        }
    }
    useEffect(() => {
        fetchDataMovie(1);
    }, [])
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
                                                        <li className='movie-item'>
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
                                        <ul className='list-group'>
                                            <li className='movie-item'>
                                                <div className='showtimes-row'>
                                                    <div className="title-movie"><p className="upper-text ng-binding">Rạp phim 1</p></div>
                                                </div>
                                            </li>
                                            <li className='movie-item'>
                                                <div className='showtimes-row'>
                                                    <div className="title-movie"><p className="upper-text ng-binding">Rạp phim 2</p></div>
                                                </div>
                                            </li>
                                            <li className='movie-item'>
                                                <div className='showtimes-row'>
                                                    <div className="title-movie"><p className="upper-text ng-binding">Rạp phim 3</p></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='col-4'>
                                    <div className='panel panel-default'>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Chọn suất</h4>
                                        </div>
                                        <ul className='list-group'>
                                            <li className='scheudle-item'>
                                                <div className='showtimes-row'>
                                                    <div className='ngay-chieu'>
                                                        <h6>Thứ 7, 07/05/2022</h6>
                                                    </div>
                                                    <div className='book-schedule'>
                                                        <div className='dinh-dang'>2D-Phụ đề</div>
                                                        <div className='schedule-movies'>
                                                            <div className='time-content-btns'>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </li>

                                            <li className='scheudle-item'>
                                                <div className='showtimes-row'>
                                                    <div className='ngay-chieu'>
                                                        <h6>Chủ nhật, 08/05/2022</h6>
                                                    </div>
                                                    <div className='book-schedule'>
                                                        <div className='dinh-dang'>2D-Phụ đề</div>
                                                        <div className='schedule-movies'>
                                                            <div className='time-content-btns'>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                                <button className='btn-vie'>9:45</button>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </li>


                                        </ul>
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
