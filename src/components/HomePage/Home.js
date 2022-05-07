import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import './Home.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';




function Home() {

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

                                <input type='text' placeholder='Nhập nội dung bạn cần tìm...' />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='child-content'>
                            <i class="fas fa-user"></i>
                            <div className='login-customer'>Đăng nhập / Đăng ký</div>
                        </div>
                        <div className='language-vi active'><span>VN</span> </div>
                        <span className='dash-language'>|</span>
                        <div className='language-en'><span>EN</span></div>
                    </div>
                </div>

            </div>
            <div className='home-header-content-bottom'>
                <nav class="navbar navbar-expand-md navbar-light">
                    {/* <a class="navbar-brand" href="/">
                        <img src="/img/frontpage/logotest.png">logo
                    </a> */}
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarsExampleDefault">
                        <ul class="navbar-nav ">
                            <li class="nav-item "><a class="nav-link" href="/">TRANG CHỦ</a></li>
                            <li class="nav-item "><a class="nav-link" href="/">MUA VÉ</a></li>
                            <li class="nav-item "><a class="nav-link" href="/">PHIM</a></li>
                            <li class="nav-item "><a class="nav-link" href="/">TIN TỨC</a></li>
                            <li class="nav-item "><a class="nav-link" href="/">HỖ TRỢ</a></li>
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

        </>
    );
}

export default Home;
