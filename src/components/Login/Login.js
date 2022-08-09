import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Login.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import DatePicker from '../Share/DatePicker';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { hanedleLoginUser, signUpNewUser, sendMailResetPassServices } from '../../services/UserService';
import { userLoginSuccess, userState } from '../../redux/userSlice';
import { useHistory } from "react-router-dom";
import useLocationForm from "./useLocationForm";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ModalForgotPass from './ModalForgotPass';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getNewsByType } from '../../services/NewsServices';




const schema = yup.object().shape({
    emailLogin: yup
        .string()
        .email('Vui lòng nhập email hợp')
        .required("Vui lòng nhập email"),
    passwordLogin: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, 'Tối thiểu 6 ký tự')

});

const schemaRegister = yup.object().shape({
    fullName: yup
        .string()
        .required("Vui lòng nhập họ tên"),
    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email('Vui lòng nhập email hợp lệ'),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, 'Tối thiểu 6 ký tự'),
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .min(10, 'Tối thiểu 10 ký tự')
        .max(11, 'Tối thiểu 11 ký tự'),


});




function Login() {
    let selectUser = useSelector(userState);
    // sử dụng schema đã tạo ở trên vào RHF
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(schema), mode: "onBlur", });

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        resolver: yupResolver(schemaRegister),
        mode: "onBlur",
    });

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
        allPromotionPost: null,
        gender: true,
        isShowLoadingLogin: false,
        isShowLoadingSignIn: false
    });
    const dispatch = useDispatch();
    let history = useHistory();
    const [isOpenModalForgotPass, setOpenModalForgotPass] = useState(false);

    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm(false);

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


    const toggleForgotPassModal = () => {
        setOpenModalForgotPass(isOpenModalForgotPass => !isOpenModalForgotPass)
    }

    const handleOnChangeDatePicker = (date) => {
        setAllValues({ ...allValues, birthday: date[0] })
    }

    async function fetchDataPost() {

        const dataPost = await getNewsByType(3);

        //  console.log('dataPost: ', dataPost);

        setAllValues((prevState) => ({
            ...prevState,
            allPromotionPost: dataPost.data,
            isShowLoadingLogin: false
        }));

    }



    useEffect(() => {

        if (selectUser.isLoggedInUser) {
            history.push('/');
        }

        fetchDataPost()
    }, []);




    const handleLogin = async () => {


        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingLogin: true
        }));


        try {
            let data = await hanedleLoginUser(allValues.emailLogin, allValues.passwordLogin); // goi api login //
            if (data && data.errorCode === 0) {
                console.log('---login ok---');

                dispatch(userLoginSuccess(data.data));
                toast.success("Đăng nhập thành công")
                history.push("/");
            } else
                toast.error(data.errMessage);
            setAllValues((prevState) => ({
                ...prevState,
                isShowLoadingLogin: false
            }));
        } catch (e) {
            // Lấy mã lỗi // 
            if (e.response) {
                if (e.response.data) {
                    toast.error(e.response.data);
                }
                setAllValues((prevState) => ({
                    ...prevState,
                    isShowLoadingLogin: false
                }));
            }
        }

    }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         handleLogin();
    //     }
    // }

    const checkKeyDown = (e) => {
        if (e.code === 'Enter') handleSubmit(handleLogin);
    }

    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }


    const onGenderChanged = e => {
        //  console.log(e.target.value);
        let gender = true;
        (e.target.value === 'male') ? gender = true : gender = false;


        setAllValues((preState) => ({
            ...preState,
            gender: e.currentTarget.value
        }))
    }



    const handleSignInCustomer = async () => {

        //  console.log(allValues);
        if (allValues.password !== allValues.rePassword) {
            toast.error("Mật khẩu không trùng khớp");
            return;
        }

        if (!allValues.email || !allValues.fullName || !allValues.phone || !allValues.password) {
            if (allValues.password !== allValues.rePassword) {
                toast.error("Vui lòng điền đầy đủ thông tin");
                return;
            }
        }



        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingSignIn: true
        }));

        let formatedDate = new Date(allValues.birthday).getTime();


        let res = await signUpNewUser({
            email: allValues.email,
            password: allValues.password,
            fullName: allValues.fullName,
            birthday: formatedDate,
            phone: allValues.phone,
            gender: allValues.gender,
            address: allValues.address,
            cityCode: (selectedCity && selectedCity.value) ? selectedCity.value : null,
            districtCode: (selectedDistrict && selectedDistrict.value) ? selectedDistrict.value : null,
            wardCode: (selectedWard && selectedWard.value) ? selectedWard.value : null
        })

        if (res && res.errCode == 0) {
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công',
                text: 'Quý khách vui lòng kiểm tra email để kích hoạt tài khoản',
                showConfirmButton: false,
                timer: 3000
            })
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
                isShowLoadingSignIn: false
            });
            return;
        } else {
            toast.error(res.message);
        }
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingSignIn: false
        }));
    }


    const handleSendMailResetPass = async (data) => {
        //   console.log("Check data from modal: ", data);
        if (data) {
            let res = await sendMailResetPassServices({
                email: data.email
            })

            if (res && res.errCode == 0) {
                setOpenModalForgotPass(false);
                Swal.fire({
                    icon: 'success',
                    text: 'Chúng tôi đã gửi thông tin đặt lại mật khẩu vào email của bạn, vui lòng kiểm tra email và làm theo hướng dẫn',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                toast.error(res.errMessage);
            }
        }
    }



    return (
        <>
            <Header />

            <div className='loginPage-container'>
                <div className='row col-12'>
                    <div className='login-cus'>
                        <div className='form-login'>
                            <h4 className='title-login'><FormattedMessage id="loginPage.login" /></h4>
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="form-group">
                                    <FormattedMessage id="loginPage.enterEmail">
                                        {placeholder =>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder={placeholder}
                                                name="emailLogin"
                                                id="emailLogin"
                                                onChange={changeHandler}
                                                required
                                                {...register("emailLogin", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>

                                    {errors.emailLogin && errors.emailLogin.message &&
                                        <span className='errorInput'>{errors.emailLogin.message}</span>
                                    }

                                </div>


                                <div className="form-group">
                                    <FormattedMessage id="loginPage.enterPassword">
                                        {placeholder =>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder={placeholder}
                                                name="passwordLogin"
                                                id="passwordLogin"
                                                onChange={changeHandler}
                                                onKeyDown={(e) => checkKeyDown(e)}
                                                required
                                                {...register("passwordLogin", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>


                                    {errors.passwordLogin && errors.passwordLogin.message &&
                                        <span className='errorInput'>{errors.passwordLogin.message}</span>
                                    }

                                </div>

                                <Link className="link-forgot-pass" onClick={() => setOpenModalForgotPass(true)}><FormattedMessage id="loginPage.forgotPass" /></Link>
                                <div className='submit-container'>
                                    <div className='button-login-submit'>
                                        <Button {...allValues.isShowLoadingLogin && 'disabled'} className="btn btn-login" type='submit' >
                                            {allValues.isShowLoadingLogin &&
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="visually" style={{ marginLeft: '10px' }}>Loading...</span>
                                                </>

                                            }
                                            {!allValues.isShowLoadingLogin &&
                                                <>
                                                    <span className="visually"><FormattedMessage id="loginPage.login" /></span>
                                                </>
                                            }
                                        </Button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='register-cus'>
                        <div className='form-register'>
                            <form onSubmit={handleSubmit2(handleSignInCustomer)}>
                                <h4 className='title-register'><FormattedMessage id="loginPage.register" /></h4>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'><FormattedMessage id="loginPage.fullName" /></label>
                                    <FormattedMessage id="loginPage.enterFullname">
                                        {placeholder =>
                                            <input type="text" className="form-control col-9"
                                                placeholder={placeholder}
                                                name='fullName'
                                                required
                                                value={allValues.fullName}
                                                {...register2("fullName", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>



                                </div>

                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-3'>Email</label>
                                    <FormattedMessage id="loginPage.enterEmail">
                                        {placeholder =>
                                            <input type="email" className="form-control col-9"
                                                placeholder={placeholder} name='email'
                                                value={allValues.email}
                                                required
                                                {...register2("email", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>


                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.password" /></label>
                                    <FormattedMessage id="loginPage.enterPassword">
                                        {placeholder =>
                                            <input type="password" className="form-control col-input"
                                                placeholder={placeholder} name='password'
                                                value={allValues.password}
                                                required
                                                {...register2("password", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>



                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.retypePassword" /></label>
                                    <FormattedMessage id="loginPage.retypePassword">
                                        {placeholder =>
                                            <input type="password" className="form-control col-input"
                                                placeholder={placeholder} name='rePassword'
                                                value={allValues.rePassword}
                                                required
                                                onChange={changeHandler}
                                            />
                                        }
                                    </FormattedMessage>


                                    {/* {allValues.errPass && allValues.errPass !== '' &&
                                    <span className='error-pass'>{allValues.errPass}</span>
                                } */}

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.phoneNumber" /></label>
                                    <FormattedMessage id="loginPage.enterPhone">
                                        {placeholder =>
                                            <input type="text" className="form-control col-input"
                                                placeholder={placeholder} name='phone'
                                                required
                                                value={allValues.phone}
                                                {...register2("phone", {
                                                    onChange: changeHandler
                                                })}
                                            />
                                        }
                                    </FormattedMessage>



                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.gender" /></label>
                                    <div className='col-input' style={{ padding: 0 }}>
                                        <div class="form-check form-check-inline" style={{ marginRight: '50px' }}>
                                            <input class="form-check-input" onClick={(e) => onGenderChanged(e)} type="radio" defaultChecked={allValues.gender} name="selectedGender" id="inlineRadio1" value='male' />
                                            <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio1"><FormattedMessage id="loginPage.male" /></label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" onClick={(e) => onGenderChanged(e)} type="radio" name="selectedGender" defaultChecked={!allValues.gender} id="inlineRadio2" value='female' />
                                            <label class="form-check-label" style={{ marginBottom: 0 }} for="inlineRadio2"><FormattedMessage id="loginPage.female" /></label>
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.birthday" /></label>
                                    <DatePicker
                                        onChange={handleOnChangeDatePicker}
                                        className="form-control col-input"
                                        name="birthday"
                                        value={allValues.birthday}
                                    />

                                </div>

                                <div className="form-group col-12" style={{ padding: '10px 0px' }}>
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.addressContract" /></label>
                                    <div className='strikethrough col-input'>
                                        <span className='line'></span>
                                    </div>

                                </div>

                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.city" /></label>
                                    {/* <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                /> */}
                                    <Select
                                        className='select-gender col-input'
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
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.district" /></label>
                                    {/* <Select
                                    className='select-gender col-9'
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                /> */}

                                    <Select
                                        className='select-gender col-input'
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
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.ward" /></label>

                                    <Select
                                        className='select-gender col-input'
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
                                    <label htmlFor="exampleInputEmail1" className='col-label'><FormattedMessage id="loginPage.address" /></label>
                                    <FormattedMessage id="loginPage.enterAddress">
                                        {placeholder =>
                                            <input type="text" className="form-control col-input"
                                                onChange={changeHandler}
                                                placeholder={placeholder}
                                                name='address'
                                                value={allValues.address}
                                            />
                                        }
                                    </FormattedMessage>



                                </div>

                                {Object.keys(errors2).length !== 0 &&
                                    <ul className="error-container">
                                        {errors2.fullName && errors2.fullName.message &&
                                            <li>{errors2.fullName.message}</li>
                                        }
                                        {errors2.email && errors2.email.message &&
                                            <li>{errors2.email.message}</li>
                                        }
                                        {errors2.password && errors2.password.message &&
                                            <li>{errors2.password.message}</li>
                                        }
                                        {errors2.phone && errors2.phone.message &&
                                            <li>{errors2.phone.message}</li>
                                        }
                                    </ul>
                                }

                                <div className='submit-container'>
                                    <div className='col-3'></div>
                                    <div className='button-register-submit col-label'>
                                        <Button variant="primary" {...allValues.isShowLoadingSignIn && 'disabled'} className="btn btn-register col-input" type='submit' >
                                            {allValues.isShowLoadingSignIn &&
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="visually" style={{ marginLeft: '10px' }}>Loading...</span>
                                                </>

                                            }
                                            {!allValues.isShowLoadingSignIn &&
                                                <>
                                                    <span className="visually">Đăng ký</span>
                                                </>
                                            }
                                        </Button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

            <div className='khuyen-mai-container'>
                <div className='advertising-title'>
                    <h3><FormattedMessage id="homeHeader.promotionNews" />  </h3>
                </div>

                <div className='advertising-body'>
                    <Slider {...settings}>
                        {allValues.allPromotionPost && allValues.allPromotionPost.length > 0 &&
                            allValues.allPromotionPost.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <div>
                                            <img src={item.thumbnail} className='img' />
                                        </div>
                                    )
                                }
                            })

                        }

                    </Slider>
                </div>
            </div>

            <Footer />


            {isOpenModalForgotPass &&
                <ModalForgotPass
                    isOpen={isOpenModalForgotPass}
                    toggleFromParent={toggleForgotPassModal}
                    sendMailResetPass={handleSendMailResetPass}
                />
            }


        </>
    );
}

export default Login;
