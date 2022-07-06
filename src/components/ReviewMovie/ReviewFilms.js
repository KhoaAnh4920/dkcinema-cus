import React, { useEffect, useState } from 'react';
import logo from '../../assets/DKCinema.png';
import doctor_review from '../../assets/doctor_review.jpg';
import './ReviewFilms.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Pagination from 'react-bootstrap/Pagination';
import { FacebookProvider, Like } from 'react-facebook';
import { Link, useHistory } from "react-router-dom";
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import FilmShowing from '../Share/FilmShowing';
import { getNewsByType } from '../../services/NewsServices';




function ReviewFilms() {
    let history = useHistory();
    // const redirectReview = () => {
    //     history.push("/review-phim");
    // }
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }
    const [allNews, setAllNews] = useState({
        listReviews: [],
    })
    const getDetailReview = (id) => {
        history.push(`/chi-tiet-review/${id}`);
    }
    async function fecthNewsReview(type) {
        const dataReviews = await getNewsByType(type);
        console.log("Data news", dataReviews);
        if (dataReviews && dataReviews.data) {
            setAllNews({
                listReviews: dataReviews.data
            })
        }
    }
    useEffect(() => {
        fecthNewsReview(1);
    }, []);
    return (
        <>
            <Header />

            <div className='container-fluid review-con'>
                <div className='row row-review'>
                    <div className='col-8 col-left'>
                        <div className='list-films'>
                            {
                                allNews.listReviews && allNews.listReviews.length > 0 &&
                                allNews.listReviews.map((item, index) => {
                                    return (
                                        <div className='blog' key={index}>
                                            <div className='movie-thumb'>
                                                <img src={item.thumbnail} className="img-review" data-was-processed="true" />
                                            </div>
                                            <div className='content-title'>
                                                <h5>
                                                    <Link onClick={() => getDetailReview(item.id)} className='link'> {item.title}</Link>
                                                </h5>
                                                <div className='summary'>
                                                    {item.tomTat}
                                                </div>
                                                <div className='row row-fc'>
                                                    <ul className='list-fc'>
                                                        <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                                        <li>
                                                            <div class="rating-movie rating-home">
                                                                <span class="rating-value">
                                                                    <strong class="review-home ng-binding" style={{ fontSize: '12pt' }}>{item.rating}/10</strong>
                                                                </span>
                                                            </div>
                                                        </li>
                                                        <li><button className='btn btn-warning btn-review'>Đánh giá</button></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className='blog'>
                                <div className='movie-thumb'>
                                    <img src={doctor_review} className="img-review" data-was-processed="true" />
                                </div>
                                <div className='content-title' style={{ flexDirection: 'column' }}>
                                    <h5>
                                        <Link to='/chi-tiet-review' className='link'> [Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</Link>
                                    </h5>
                                    <div className='summary'>
                                        kkkk
                                    </div>
                                    <div className='row row-fc'>
                                        <ul className='list-fc'>
                                            <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                            <li>
                                                <div class="rating-movie rating-home">
                                                    <span class="rating-value">
                                                        <strong class="review-home ng-binding" style={{ fontSize: '12pt' }}>9.5/10</strong>
                                                    </span>
                                                </div>
                                            </li>
                                            <li><button className='btn btn-warning btn-review'>Đánh giá</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <FilmShowing />
                </div>

            </div>

            <Footer />


        </>
    );
}

export default ReviewFilms;
