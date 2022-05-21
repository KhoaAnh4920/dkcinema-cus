import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import doctor from '../../assets/doctor.jpg';
import './DanhSachPhim.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Pagination from 'react-bootstrap/Pagination'
import Header from '../Share/Header';
import Footer from '../Share/Footer';




function DanhSachPhim() {
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

            <div className='list-movie-container'>
                <div className='title-list'>
                    <a href='#' className='playing-movie active'>phim đang chiếu</a>
                    <span>|</span>
                    <a href='#' className='upcoming-movie'>phim sắp chiếu</a>
                </div>
                <div className='list-movie col-12 container'>
                    <div className='row'>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                        <div className='col-4 film'>
                            <img src={doctor} className='img-film' />
                            <a href='#' className='name-film'>Doctor strange 2</a>
                            <p className='desc-film'>bbbbbbbbb</p>
                        </div>
                    </div>

                    <Pagination className={'paginationStyle'} size="sm">
                        <Pagination.Prev />
                        <Pagination.Item active activeLabel="" className={'paginationItemStyle'}>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>

                </div>

            </div>

            <Footer />


        </>
    );
}

export default DanhSachPhim;
