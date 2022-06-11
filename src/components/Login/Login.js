import React, { useState, useEffect } from 'react';
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
import { hanedleLoginUser, signUpNewUser } from '../../services/UserService';
import { userLoginSuccess } from '../../redux/userSlice';
import { useHistory } from "react-router-dom";
import useLocationForm from "./useLocationForm";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';






const options = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' },
];






function Login() {
    const language = useSelector(selectLanguage);
    const [selectedOption, setSelectedOption] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [allValues, setAllValues] = useState({
        email: '',
        password: '',
        emailLogin: '',
        passwordLogin: '',
        phone: '',
        userName: '',
        userName: '',
        address: '',
        birthday: '',
        address: '',
        errors: {},
        errPass: '',
        gender: 1,
        isShowLoading: false
    });
    const dispatch = useDispatch();
    let history = useHistory();

    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm(true);

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;





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
        setAllValues({ ...allValues, birthday: date[0] })
    }

    const handleLogin = async () => {
        // Clear mã lỗi //
        setErrMessage('');



        try {
            let data = await hanedleLoginUser(allValues.emailLogin, allValues.passwordLogin); // goi api login //
            if (data && data.errorCode !== 0) {
                setErrMessage(data.message);
            }
            if (data && data.errorCode === 0) {
                console.log('---login ok---');

                //this.props.testRedux();

                dispatch(userLoginSuccess(data.data));
                history.push("/");
            } else {
                toast.error("Login fail");
            }
        } catch (e) {
            // Lấy mã lỗi // 
            if (e.response) {
                if (e.response.data) {
                    setErrMessage(e.response.data);
                }
            }
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    const changeHandler = e => {
        if (e.target.name === 'rePassword') {
            if (e.target.value !== allValues.password)
                allValues.errPass = 'Mật khẩu không trùng khớp';
        }
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }


    const onGenderChanged = e => {
        console.log(e.currentTarget.value);
        setAllValues((preState) => ({
            ...preState,
            gender: e.currentTarget.value
        }))
    }

    const checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['email', 'password', 'rePassword', 'birthday', 'gender', 'phone']
        for (let i = 0; i < arrInput.length; i++) {
            if (!allValues[arrInput[i]]) {
                isValid = false;
                errors[arrInput[i]] = "Cannot be empty";
            }
        }

        if (!isValid) {
            Swal.fire({
                title: 'Missing data?',
                text: "Vui lòng điền đầy đủ thông tin!",
                icon: 'warning',
            })

            setAllValues((prevState) => ({
                ...prevState,
                errors: errors,
                isShowLoading: false
            }));
        }
        return isValid;
    }


    const handleSignInCustomer = async () => {
        console.log("Check state: ", allValues);

        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true
        }));

        let isValid = checkValidateInput();
        if (isValid) {
            let formatedDate = new Date(allValues.birthday).getTime();




            let res = await signUpNewUser({
                email: allValues.email,
                password: allValues.password,
                fullName: allValues.fullName,
                birthday: formatedDate,
                phone: allValues.phone,
                gender: allValues.gender,
                address: allValues.address,
                cityCode: selectedCity.value,
                districtCode: selectedDistrict.value,
                wardCode: selectedWard.value
            })

            if (res && res.errCode == 0) {
                toast.success("Đăng ký thành công");
                setAllValues({
                    email: '',
                    password: '',
                    rePassword: '',
                    phone: '',
                    userName: '',
                    fullName: '',
                    address: '',
                    birthday: '',
                    address: '',
                    errors: {},
                    gender: 1,
                    isShowLoading: false
                });
            } else {
                history.push("/users-management")
                toast.error("Đăng ký thất bại");
            }
        }
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
                                    name="emailLogin"
                                    id="emailLogin"
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control"
                                    placeholder="Enter Password"
                                    name="passwordLogin"
                                    id="passwordLogin"
                                    onChange={changeHandler}
                                    onKeyDown={event => handleKeyDown(event)}
                                />

                            </div>
                            <Link to="#" className="link-forgot-pass">Quên mật khẩu ?</Link>
                            <div className='submit-container'>
                                <div className='button-login-submit'>
                                    <button className='btn btn-login' onClick={handleLogin}>Đăng nhập</button>
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
                                    placeholder="Nhập họ và tên" name='fullName'
                                    value={allValues.fullName}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Email</label>
                                <input type="email" className="form-control col-9"
                                    placeholder="Nhập email" name='email'
                                    value={allValues.email}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Mật khẩu</label>
                                <input type="password" className="form-control col-9"
                                    placeholder="Nhập mật khẩu" name='password'
                                    value={allValues.password}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Nhập lại mật khẩu</label>
                                <input type="password" className="form-control col-9"
                                    placeholder="Nhập lại mật khẩu" name='rePassword'
                                    value={allValues.rePassword}
                                    onChange={changeHandler}
                                />
                                {/* {allValues.errPass && allValues.errPass !== '' &&
                                    <span className='error-pass'>{allValues.errPass}</span>
                                } */}

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Số điện thoại</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="Nhập số điện thoại" name='phone'
                                    value={allValues.phone}
                                    onChange={changeHandler}
                                />

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Giới tính</label>
                                <div className='col-9' style={{ padding: 0 }}>
                                    <div class="form-check form-check-inline" style={{ marginRight: '50px' }}>
                                        <input class="form-check-input" onClick={(e) => onGenderChanged(e)} type="radio" name="selectedGender" checked id="inlineRadio1" value='1' />
                                        <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio1">Nam</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" onClick={(e) => onGenderChanged(e)} type="radio" name="selectedGender" id="inlineRadio2" value='0' />
                                        <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio2">Nữ</label>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Ngày sinh</label>
                                <DatePicker
                                    onChange={handleOnChangeDatePicker}
                                    className="form-control"
                                    name="birthday"
                                    value={allValues.birthday}
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
                                {/* <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                /> */}
                                <Select
                                    className='select-gender col-9'
                                    name="cityId"
                                    key={`cityId_${selectedCity?.value}`}
                                    isDisabled={cityOptions.length === 0}
                                    options={cityOptions}
                                    onChange={(option) => onCitySelect(option)}
                                    placeholder="Tỉnh/Thành"
                                    defaultValue={selectedCity}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Quận / Huyện</label>
                                {/* <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                /> */}

                                <Select
                                    className='select-gender col-9'
                                    name="districtId"
                                    key={`districtId_${selectedDistrict?.value}`}
                                    isDisabled={districtOptions.length === 0}
                                    options={districtOptions}
                                    onChange={(option) => onDistrictSelect(option)}
                                    placeholder="Quận/Huyện"
                                    defaultValue={selectedDistrict}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Phường / Xã</label>

                                <Select
                                    className='select-gender col-9'
                                    name="wardId"
                                    key={`wardId_${selectedWard?.value}`}
                                    isDisabled={wardOptions.length === 0}
                                    options={wardOptions}
                                    placeholder="Phường/Xã"
                                    onChange={(option) => onWardSelect(option)}
                                    defaultValue={selectedWard}
                                />

                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail1" className='col-3'>Số nhà và tên đường</label>
                                <input type="text" className="form-control col-9"
                                    onChange={changeHandler}
                                    placeholder="Nhập địa chỉ nhà"
                                    name='address'
                                    value={allValues.address}
                                />

                            </div>

                            <div className='submit-container'>
                                <div className='col-3'></div>
                                <div className='button-register-submit col-9'>
                                    <button className='btn btn-register' onClick={() => handleSignInCustomer()}>Đăng ký</button>
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
