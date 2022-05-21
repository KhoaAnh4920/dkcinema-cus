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

            <div className='review-films-container'>
                <div className='review-films'>
                    <p className='title-review'>GIỚI THIỆU PHIM SẮP CHIẾU</p>
                    <div className='list-films'>
                        <div className='blog'>
                            <div className='movie-thumb'>
                                <img src={doctor_review} className="img-review" data-was-processed="true" />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <li><div class="fb-like" id="fboverlay" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                            <p>Giới thiệu 1</p>
                        </div>
                        <div className='blog'>
                            <div className='movie-thumb'>
                                <img src={doctor_review} className="img-review" data-was-processed="true" />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <li><div class="fb-like" id="fboverlay" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                            {/* <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">9.5</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li> */}
                            {/* <li><button className='btn btn-warning btn-review'>Đánh giá</button></li> */}
                            <p>Giới thiệu 2</p>
                        </div>
                    </div>
                </div>
                <div className='upcoming-films'>
                    <p className='title-review'>PHIM ĐANG CHIẾU</p>
                    <div className='list-films'>
                        <div className='blog'>
                            <div className='movie-thumb'>
                                <img src={doctor_review} className="img-review" data-was-processed="true" />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <p>AAAA</p>
                        </div>
                        <div className='blog'>
                            <div className='movie-thumb'>
                                <img src={doctor_review} className="img-review" data-was-processed="true" />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <p>AAAA</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


        </>
    );
}

export default FilmsIntroduction;
