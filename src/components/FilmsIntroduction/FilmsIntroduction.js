import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import doctor_review from '../../assets/doctor_review.jpg';
import './FilmsIntroduction.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Pagination from 'react-bootstrap/Pagination';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import { Link } from "react-router-dom";




function FilmsIntroduction() {
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    return (
        <>
            <Header />
            <div className='container con-intro'>
                <div className='row row-intro'>
                    <div className='col-8 col-intro-left'>
                        <div className='list-films'>
                            <div className='blog'>
                                <div className='movie-thumb'>
                                    <img src={doctor_review} className="img-review" data-was-processed="true" />
                                </div>
                                <div className='row row-intro-detail'>
                                    <h5>
                                        <Link to='/chi-tiet-intro' className='link'> [Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</Link>
                                    </h5>
                                    <ul className='list-intro'>
                                        <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                    </ul>
                                    <div className='content-intro'>
                                        kkkkkkkkkkk
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <FilmShowing />
                </div>
            </div>
            <Footer />


        </>
    );
}

export default FilmsIntroduction;
