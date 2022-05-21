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
import Header from '../Share/Header';
import Footer from '../Share/Footer';





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
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    const handleOnChangeDatePicker = (date) => {
        console.log(date);
    }

    return (
        <>
            <Header />

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

            <Footer />


        </>
    );
}

export default Login;
