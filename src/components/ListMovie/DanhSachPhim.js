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




function DanhSachPhim() {
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();


    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    return (
        <>
            <div className='home-header-container'>
                <div className='home-header-content-top'>
                    <div className='left-content'>
                        {/* <i className="fas fa-bars"></i> */}
                        <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />

                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div className='search'>
                                <FormattedMessage id="homeHeader.search" defaultMessage="search">
                                    {placeholder =>
                                        <input type='text' placeholder={placeholder} />
                                    }
                                </FormattedMessage>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='child-content'>
                            <i className="fas fa-user"></i>
                            <div className='login-customer'><FormattedMessage id="homeHeader.login" /> / <FormattedMessage id="homeHeader.register" /></div>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span> </div>
                        <span className='dash-language'>|</span>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>

            </div>
            <div className='home-header-content-bottom'>
                <nav className="navbar navbar-expand-md navbar-light">
                    {/* <a className="navbar-brand" href="/">
                        <img src="/img/frontpage/logotest.png">logo
                    </a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarsExampleDefault">
                        <ul className="navbar-nav ">
                            <li className="nav-item "><a className="nav-link" href="/"><FormattedMessage id="homeHeader.home" /></a></li>
                            <li className="nav-item "><a className="nav-link" href="/"><FormattedMessage id="homeHeader.buyTicket" /></a></li>
                            <li className="nav-item "><a className="nav-link" href="/"><FormattedMessage id="homeHeader.movie" /></a></li>
                            <li className="nav-item "><a className="nav-link" href="/"><FormattedMessage id="homeHeader.news" /></a></li>
                            <li className="nav-item "><a className="nav-link" href="/"><FormattedMessage id="homeHeader.support" /></a></li>
                        </ul>
                    </div>
                </nav>

            </div>

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


        </>
    );
}

export default DanhSachPhim;
