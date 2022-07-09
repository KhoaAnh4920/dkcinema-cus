import React, { useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DatePicker from '../Share/DatePicker';
import Select from 'react-select';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ListTheater.scss';
import quang_cao_1 from '../../assets/1.jpg';
import { FaRegClock } from "react-icons/fa";
function ListTheater() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const [dayBook, setDayBook] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 0, label: 'Nữ' },
        { value: 1, label: 'Nam' },
    ];
    return (
        <>
            <Header />
            <div className='container con-theater'>
                <div className='row row-bread'>
                    <div className='breadcrumb list-bread'>
                        <ol>
                            <li className='breadcrumb-item'>
                                <Link to='/' className='link' aria-current='page'>Trang Chủ</Link>
                            </li>
                            <li className='breadcrumb-item active'>
                                <Link to='/thoa-thuan' className='link' aria-current='page'>Thỏa Thuận</Link>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className='row row-slider'>
                    <Slider {...settings}>
                        <div>
                            <img src="https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-3_1557134455385.jpg" />
                        </div>
                        <div>
                            <img src="https://rapchieuphim.com/photos/2/galaxy/galaxy-kinh-duong-vuong-2.png" />
                        </div>
                        <div>
                            <img src="https://cdn.galaxycine.vn/media/2019/12/11/galaxy7_1576054843437.jpg" />
                        </div>
                        <div>
                            <img src="https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-nguyen-du-3_1557134455385.jpg" />
                        </div>
                    </Slider>
                </div>
                <div className='row row-film'>
                    <div className='col-7 col-film-left'>
                        <div className='row row-title-1'>
                            <h5>phim đang chiếu</h5>
                        </div>
                        <div className='row row-input'>
                            <div className='form-group col-6 date-input' >
                                <DatePicker
                                    className='form-coltrol'
                                    value={dayBook}
                                    readonly='true'
                                    placeholder="DD/MM/YYYY"
                                    scrollableMonthYearDropdown

                                />
                            </div>
                            <div className='form-group col-6 select-input'>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={selectedOption}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className='row row-theater-cal'>
                            <div className='__image-theater'>
                                <img src='https://gamek.mediacdn.vn/133514250583805952/2022/6/20/image012-2-16556987236481912169381.jpg' />
                            </div>
                            <div className='infor-film'>
                                <div className='title'>kkkkk</div>
                                <div className='date-time'>
                                    <span className='date'>2022</span>
                                    <span className='time'><FaRegClock /> 110 Phút</span>
                                </div>
                                <div className='schedule'>
                                    <button>11:11</button>
                                    <button>11:11</button>
                                    <button>11:11</button>
                                    <button>11:11</button>
                                    <button>11:11</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className='col-5 col-film-right'>
                        <div className='row row-title-2'>
                            <h5>thông tin chi tiết</h5>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListTheater;