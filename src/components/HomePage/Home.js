import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import pdc1 from '../../assets/PDC/pdc1.jpg';
import pdc2 from '../../assets/PDC/pdc2.jpg';
import pdc3 from '../../assets/PDC/pdc3.jpg';
import km1 from '../../assets/khuyenmai/km1.jpg';
import km2 from '../../assets/khuyenmai/km2.jpg';
import km3 from '../../assets/khuyenmai/km3.jpg';
import km4 from '../../assets/khuyenmai/km4.png';
import './Home.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FacebookProvider, Like } from 'react-facebook';



function Home() {
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
            <Carousel showThumbs={false} centerSlidePercentage={2}>
                <div>
                    <img src={Phim1} />

                </div>
                <div>
                    <img src={Phim2} />

                </div>
            </Carousel>
            <div className='home-button container-fluid'>
                <div className='row-button'>
                    <button>
                        Phim đang chiếu
                    </button>
                    <button>
                        Phim sắp chiếu
                    </button>
                </div>
            </div>
            <div className='home-content-film container-fluid'>

                <div className='background'>
                    <div className='row-film'>
                        <div className='row'>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc1} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>

                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>

                            </div>
                            <div className='col-4'>
                                <div className='image'>
                                    <Image src={pdc2} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>

                            </div>
                            <div className='col-4'>
                                <div className='image'>
                                    <Image src={pdc3} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-film'>
                        <div className='row'>
                            <div className='col-4'>
                                <div className='image'>
                                    <Image src={pdc1} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='image'>
                                    <Image src={pdc2} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='image'>
                                    <Image src={pdc3} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <p>Đốc Tờ Trang Nè</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            <div className='button-read-more'>
                <button>
                    Xem Thêm
                </button>
            </div>
            <div className='home-content-discount container-fluid'>
                <h1 className='text-discount'>
                    <span>
                        Thông tin khuyến mãi
                    </span>

                </h1>
                <div className='row-img-discount'>
                    <div className='img-discount'>
                        <Image src={km1} className='img' />
                        <div className='image__overlay image__overlay--primary'>
                            <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                        </div>
                    </div>
                    <div className='img-discount'>
                        <Image src={km2} className='img' />
                        <div className='image__overlay image__overlay--primary'>
                            <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                        </div>
                    </div>
                    <div className='img-discount'>
                        <Image src={km3} className='img' />
                        <div className='image__overlay image__overlay--primary'>
                            <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                        </div>
                    </div>
                    <div className='img-discount'>
                        <Image src={km4} className='img' />
                        <div className='image__overlay image__overlay--primary'>
                            <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                        </div>
                    </div>
                </div>
                <div className='text-read-more'>
                    <p><a href='#'>Xem Thêm</a></p>
                </div>

            </div>
            <div className='home-news-content container-fluid'>
                <div className='row row-news'>
                    <div className='col-6 col-left'>
                        <h1 className='text-review'> review phim</h1>
                        <div className='content'>
                            <div className='content-image'>
                                <Image src={pdc1} className='image' />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                            <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">9.5</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>
                            <li><button className='btn btn-warning btn-review'>Đánh giá</button></li>
                            <p>AAAA</p>
                        </div>
                    </div>
                    <div className='col-6 col-right'>
                        <h1 className='text-intro'>giới thiệu phim sắp chiếu</h1>
                        <div className='content'>
                            <div className='content-image'>
                                <Image src={pdc1} className='image' />
                            </div>
                            <h5><a href="/binh-luan-phim/review-doctor-strange-2-strange-doi-dau-ke-ac-manh-nhat-mcu">[Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</a></h5>
                            <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                            <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">9.5</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>
                            <li><button className='btn btn-warning btn-review'>Đánh giá</button></li>
                            <p>AAAA</p>
                        </div>
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
                        <h3>kết nối ngay với dk cinema</h3>
                        <a href='https://www.facebook.com/'>
                            <button className='button-public'>
                                {/* <FaFacebookSquare className='icon' /> */}
                            </button>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <button className='button-public'>
                                {/* <FaYoutube className='icon' /> */}
                            </button>
                        </a>
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

        </>
    );
}

export default Home;
