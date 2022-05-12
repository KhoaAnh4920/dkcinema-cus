import React, { useState } from 'react';
import logo from '../../assets/DKCinema.png';
import Select from 'react-select';
import './Login.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { Link } from 'react-router-dom';
import DatePicker from '../Share/DatePicker';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quang_cao_1 from '../../assets/1.jpg';
import quang_cao_2 from '../../assets/2.jpg';
import quang_cao_3 from '../../assets/3.jpg';
import quang_cao_4 from '../../assets/4.jpg';





const options = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' },
];






function Login() {
    const language = useSelector(selectLanguage);
    const [selectedOption, setSelectedOption] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const dispatch = useDispatch();


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const handleOnChangeDatePicker = (date) => {
        console.log(date);
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

            <div className='loginPage-container'>
                <div className='row col-12'>
                    <div className='login-cus col-5'>
                        <div className='form-login'>
                            <h4 className='title-login'>Đăng nhập</h4>
                            <div className="form-group">
                                <input type="email" className="form-control"
                                    placeholder="Enter email"
                                />

                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control"
                                    placeholder="Enter Password"
                                />

                            </div>
                            <Link to="#" className="link-forgot-pass">Quên mật khẩu ?</Link>
                            <div className='submit-container'>
                                <div className='button-login-submit'>
                                    <button className='btn btn-login' onClick={() => this.handleLogin()}>Đăng nhập</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='register-cus col-7'>
                        <div className='form-register'>
                            <h4 className='title-register'>Đăng ký tài khoản</h4>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Họ và tên</label>
                                <input type="email" className="form-control col-9"
                                    placeholder="Nhập họ và tên"
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Email</label>
                                <input type="email" className="form-control col-9"
                                    placeholder="Nhập email"
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Mật khẩu</label>
                                <input type="password" className="form-control col-9"
                                    placeholder="Nhập mật khẩu"
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Nhập lại mật khẩu</label>
                                <input type="password" className="form-control col-9"
                                    placeholder="Nhập lại mật khẩu"
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Số điện thoại</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="Nhập số điện thoại"
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Giới tính</label>
                                <div className='col-9' style={{ padding: 0 }}>
                                    <div class="form-check form-check-inline" style={{ marginRight: '50px' }}>
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio1">Nam</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio2">Nữ</label>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Ngày sinh</label>
                                <DatePicker
                                    onChange={handleOnChangeDatePicker}
                                    className="form-control"
                                    value={birthday}
                                />

                            </div>

                            <div className="form-group col-12" style={{ padding: '10px 0px' }}>
                                <label htmlFor="exampleInputEmail1" className='col-3'>ĐỊA CHỈ LIÊN HỆ</label>
                                <div className='strikethrough col-9'>
                                    <span className='line'></span>
                                </div>

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Tỉnh / Thành Phố</label>
                                <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Quận / Huyện</label>
                                <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Phường / Xã</label>
                                <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Số nhà và tên đường</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="Nhập địa chỉ nhà"
                                />

                            </div>

                            <div className='submit-container'>
                                <div className='col-3'></div>
                                <div className='button-register-submit col-9'>
                                    <button className='btn btn-register' onClick={() => this.handleLogin()}>Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className='khuyen-mai-container'>
                <div className='advertising-title'>
                    <h3>Thông tin khuyến mãi</h3>
                </div>

                <div className='advertising-body'>
                    <Slider {...settings}>
                        <div>
                            <img src={quang_cao_1} />
                        </div>
                        <div>
                            <img src={quang_cao_2} />
                        </div>
                        <div>
                            <img src={quang_cao_3} />
                        </div>
                        <div>
                            <img src={quang_cao_4} />
                        </div>
                        <div>
                            <img src={quang_cao_2} />
                        </div>
                        <div>
                            <img src={quang_cao_1} />
                        </div>


                    </Slider>
                </div>
            </div>


        </>
    );
}

export default Login;
