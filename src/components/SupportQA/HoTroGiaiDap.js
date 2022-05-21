import React, { useEffect, useState } from 'react';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import logo from '../../assets/DKCinema.png';
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { updateLanguage } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import "./HoTroGiaiDap.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
// let acc = document.getElementsByClassName('btn-show');


function HoTroGiaiDap() {
    const [show, setShow] = useState(false);
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();
    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const handleClickShow = () => {
        setShow(!show);
    }
    return (
        <>
            <div className='home-header-container' id='sa'>
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
            <Carousel showThumbs={false}>
                <div>
                    <img src={Phim1} />

                </div>
                <div>
                    <img src={Phim2} />

                </div>
            </Carousel>

            <div className='support-content container-fluid'>
                <div className='row row-support'>
                    <div className='col-10 col-left'>
                        <div className='title-tab'>
                            <ul>
                                <li><a href='#'>tuyển dụng</a></li>
                                <li><a href='#'>góp ý</a></li>
                                <li><a href='#'>giải đáp</a></li>
                            </ul>
                        </div>
                        <div className='accordion'>
                            <button className='btn-show ' onClick={handleClickShow} id='as'>R u OK ? </button>
                            <div className={`answer ${show === true ? 'activeShow' : ''}`}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <hr />
                            <button className='btn-show'>R u OK ? </button>
                            <div className='answer'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>


                    </div>
                    <div className='col-2'>
                        bbbb
                    </div>

                </div>
            </div>


            <div className='home-footer container-fluid'>
                <div className='row row-footer'>
                    <div className='col-3 col-footer-1'>

                        <ul>
                            <li><a href='#'><h3>giới thiệu</h3></a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> về chúng tôi</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> thỏa thuận sử dụng</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> quy chế hoạt động</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> chính sách bảo mật</a></li>
                        </ul>
                    </div>
                    <div className='col-3 col-footer-2'>

                        <ul>
                            <li><a href='#'><h3>giới thiệu phim</h3></a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> review phim</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giới thiệu phim</a></li>
                        </ul>
                    </div>
                    <div className='col-3 col-footer-3'>

                        <ul>
                            <li><a href='#'><h3>hỗ trợ</h3></a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> tuyển dụng</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> góp ý</a></li>
                            <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giải đáp</a></li>
                        </ul>
                    </div>
                    <div className='col-3 col-footer-4'>
                        {/* <h3>kết nối ngay với dk cinema</h3>
                        <a href='https://www.facebook.com/'>
                            <button className='button-public'>

                            </button>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <button className='button-public'>

                            </button>
                        </a> */}
                    </div>
                </div>
                <hr className='line' />
                <div className='row row-address'>
                    <div className='col-6 col-address'>
                        <p>Bản quyền thuộc trường Đại Học Công Nghệ Sài Gòn</p>
                    </div>
                    <div className='col-6 col-address'>
                        <p>Địa Chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.Hồ Chí Minh</p>
                    </div>
                </div>
            </div>
            <div className='fuck'>

                <hr />

            </div>
        </>
    )
}


export default HoTroGiaiDap;