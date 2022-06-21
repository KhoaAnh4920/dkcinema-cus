import React, { useState, useEffect } from 'react';

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

import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { getListMovieByStatus } from '../../services/MovieServices';
import { Image, Button } from 'react-bootstrap';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function Home() {
    let history = useHistory();
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    const [buttonDefault, setButtonDefault] = useState({
        isShowButtonDangChieu: true,
        isShowButtonSapChieu: false,
    });

    const [allValues, setAllValues] = useState({
        listMovie: []
    });



    const redirectListFilms = () => {
        history.push("/phim-dang-chieu");
    }

    const handleClickDefaultButton = e => {
        // Call api get phim //

        /// 

        if (e.target.name === 'phimDangChieu') {
            setButtonDefault({
                isShowButtonDangChieu: true,
                isShowButtonSapChieu: false,
            })
        } else {
            setButtonDefault({
                isShowButtonDangChieu: false,
                isShowButtonSapChieu: true,
            })
        }
    }

    useEffect(() => {

        async function fetchDataMovie() {
            // You can await here
            const dataMovie = await getListMovieByStatus(1);
            console.log("dataMovie: ", dataMovie);
            if (dataMovie && dataMovie.data) {
                setAllValues({
                    listMovie: dataMovie.data
                })
            }
        }
        fetchDataMovie();
    }, []);

    return (
        <>
            <Header />
            <Carousel showThumbs={false} centerSlidePercentage={2}>
                <div>
                    <img src={Phim1} />

                </div>
                <div>
                    <img src={Phim2} />

                </div>
            </Carousel>

            <div className='home-content-film container-fluid'>
                <div className='home-button container-fluid'>
                    <div className='row-button'>
                        <button className={buttonDefault.isShowButtonDangChieu ? 'active' : ''} name='phimDangChieu' onClick={handleClickDefaultButton}>
                            Phim đang chiếu
                        </button>
                        <button className={buttonDefault.isShowButtonSapChieu ? 'active' : ''} name='phimSapChieu' onClick={handleClickDefaultButton} >
                            Phim sắp chiếu
                        </button>
                    </div>
                </div>
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
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>

                                </div>

                            </div>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc2} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>
                                </div>

                            </div>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc3} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-film '>
                        <div className='row'>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc1} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>
                                </div>
                            </div>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc2} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>
                                </div>
                            </div>
                            <div className='col-4 col-image'>
                                <div className='image'>
                                    <Image src={pdc3} className='image__img' />
                                    <div className='image__overlay image__overlay--primary'>
                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                    </div>
                                </div>
                                <div className='text'>
                                    <Link to="/chi-tiet-phim" className='name-films'><p>Đốc Tờ Trang Nè</p> </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            <div className='button-read-more' onClick={() => redirectListFilms()}>
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
            <div className='home-news-content container-fluid' style={{ marginBottom: '50px' }}>
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

            <Footer />


        </>
    );
}

export default Home;
