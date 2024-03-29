import React, { useState, useEffect } from 'react';
import './Header.scss';
import logo from '../../assets/DKCinema.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, updateLanguage, userState, processLogoutUser } from "../../redux/userSlice";
import { updateDataBooking } from "../../redux/BookingSlice";
import { Link, useHistory } from "react-router-dom";
import SearchBar from '../Share/SearchBar';
import PhimData from '../../assets/Json/Data.json';
import avatar from '../../assets/man.png';



export default function Header() {

    const language = useSelector(selectLanguage);
    let selectUser = useSelector(userState);
    const dispatch = useDispatch();
    let history = useHistory();


    const [userInfo, setUserInfo] = useState({
        avatar: '',
        fullName: ''
    })


    const changeLanguage = (language) => {
        // fire redux event: actions

        //  console.log(language);
        dispatch(updateLanguage(language));
    }

    const returnToHome = () => {
        history.push("/");
    }

    const redirectAccountProfile = () => {
        history.push("/quan-ly-tai-khoan");
    }
    const redirectChangePassword = () => {
        history.push("/doi-mat-khau");
    }
    const handleLogout = async () => {
        dispatch(processLogoutUser());
        dispatch(updateDataBooking(null));
        history.push('/');
    }


    //Hamburger  

    const [active, setActive] = useState("nav__menu");
    const [icon, setIcon] = useState("nav__toggler");
    const navToggle = () => {
        if (active === "nav__menu") {
            setActive("nav__menu nav__active");
        } else setActive("nav__menu");

        // Icon Toggler
        if (icon === "nav__toggler") {
            setIcon("nav__toggler toggle");
        } else setIcon("nav__toggler");
    };



    useEffect(() => {

        setUserInfo({
            avatar: (selectUser.userInfo) ? selectUser.userInfo.avatar : '',
            fullName: (selectUser.userInfo) ? selectUser.userInfo.fullName : ''
        });


    }, [selectUser]);


    const parseJwt = (token) => {
        const decode = JSON.parse(atob(token.split('.')[1]));
        // console.log('decode.exp: ', decode.exp);
        // console.log('new Date().getTime(): ', new Date().getTime());

        if (decode.exp * 1000 < new Date().getTime()) {
            dispatch(processLogoutUser());
            dispatch(updateDataBooking(null));
            console.log('Time Expired');
            history.push('/login')
        }
    };


    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("persist:user"));

        if (data && data.user) {
            const dataLocal = JSON.parse(data.user)

            if (dataLocal && dataLocal.userInfo && dataLocal.userInfo.accessToken) {
                parseJwt(dataLocal.userInfo.accessToken)
            }
        }



    }, [])


    return (
        <>
            <div className='home-header-container'>
                <div className='home-header-content-top'>
                    <div className='left-content'>
                        {/* <i className="fas fa-bars"></i> */}
                        <img className='header-logo' src={logo} onClick={() => returnToHome()} />

                    </div>
                    <div className='center-content'>
                        <FormattedMessage id="homeHeader.search" defaultMessage="search">
                            {placeholder =>
                                <SearchBar
                                    placeholder={placeholder}
                                    data={PhimData}

                                />
                            }
                        </FormattedMessage>

                    </div>

                    <div className='right-content'>
                        <div className='child-content'>

                            <div className='login-customer'>
                                {
                                    selectUser.isLoggedInUser == true &&
                                    <>
                                        <div className="dropdown dropdown-userinfo">
                                            <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img className='avatar-user' src={selectUser.userInfo.avatar ? selectUser.userInfo.avatar : avatar} />
                                                <span className='user-fullname'>{selectUser.userInfo.fullName}</span>
                                            </div>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" onClick={redirectAccountProfile}>Tài khoản</a>
                                                <a className="dropdown-item" onClick={redirectChangePassword}>Đổi mật khẩu</a>
                                                <a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a>
                                            </div>
                                        </div>
                                    </>
                                }

                                {
                                    selectUser.isLoggedInUser == false &&
                                    <>

                                        <Link to="/login" className='nav-link login-text'>
                                            <i className="fas fa-user" style={{ marginRight: '5px' }}> </i>
                                            <FormattedMessage id="homeHeader.login" /> / <FormattedMessage id="homeHeader.register" />
                                        </Link>

                                    </>
                                }

                            </div>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span> </div>
                        <span className='dash-language'>|</span>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        <div onClick={navToggle} className={icon}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className='home-header-content-bottom'>
                <nav className="navbar navbar-expand-md navbar-light">
                    <button style={{ backgroundColor: 'red' }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarsExampleDefault">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <Link to="/" className='nav-link'><FormattedMessage id="homeHeader.home" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/lich-chieu" className='nav-link'><FormattedMessage id="homeHeader.buyTicket" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/phim-dang-chieu" className='nav-link'><FormattedMessage id="homeHeader.movie" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/danh-sach-rap" className='nav-link'><FormattedMessage id="homeHeader.theater" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="#" className='nav-link'><FormattedMessage id="homeHeader.news" /></Link>
                                <div className="drop-down-menu">
                                    <ul className="sub-navbar-nav">
                                        <li className="sub-nav-item">
                                            <Link to="/review-phim" className='sub-nav-link'><FormattedMessage id="homeHeader.reviewFilm" /></Link>
                                        </li>
                                        <li className="sub-nav-item">
                                            <Link to="/gioi-thieu-phim" className='sub-nav-link'><FormattedMessage id="homeHeader.introFilm" /></Link>
                                        </li>
                                        <li className="sub-nav-item">
                                            <Link to="/khuyen-mai" className='sub-nav-link'><FormattedMessage id="homeHeader.discount" /></Link>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                            <li className="nav-item ">
                                <Link to="/ho-tro" className='nav-link'><FormattedMessage id="homeHeader.support" /></Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div> */}
            <nav className='nav home-header-content-bottom'>
                <ul className={active}>
                    <li className='nav__item item__first'>
                        <Link to="/" className='nav__link'><FormattedMessage id="homeHeader.home" /></Link>
                    </li>
                    <li className='nav__item'>
                        <Link to="/lich-chieu" className='nav-link'><FormattedMessage id="homeHeader.buyTicket" /></Link>
                    </li>
                    <li className='nav__item'>
                        <Link to="/phim-dang-chieu" className='nav-link'><FormattedMessage id="homeHeader.movie" /></Link>
                    </li>
                    <li className="nav__item ">
                        <Link to="#" className='nav-link'><FormattedMessage id="homeHeader.news" /></Link>
                        <div className="drop-down-menu">
                            <ul className="sub-navbar-nav">
                                <li className="sub-nav-item" >
                                    <Link to="/review-phim" className='sub-nav-link'><FormattedMessage id="homeHeader.reviewFilm" /></Link>
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/gioi-thieu-phim" className='sub-nav-link'><FormattedMessage id="homeHeader.introFilm" /></Link>
                                </li>
                                <li className="sub-nav-item">
                                    <Link to="/khuyen-mai" className='sub-nav-link'><FormattedMessage id="homeHeader.discount" /></Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                    <li className='nav__item'>
                        <Link to="/danh-sach-rap" className='nav-link'><FormattedMessage id="homeHeader.theater" /></Link>
                    </li>
                    {/* {
                        icon === "nav__toggler" ? "" : <li className='nav__item'>
                            <Link to="/login" className='nav-link' style={{ textTransform: "uppercase" }}><FormattedMessage id="homeHeader.login" /></Link>
                        </li>
                    } */}
                    {
                        selectUser.isLoggedInUser == true && icon != "nav__toggler" &&
                        <>
                            <li className='nav__item'>
                                <div className="dropdown dropdown-userinfo">
                                    <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='row'>
                                        <img className='avatar-user' src={selectUser.userInfo.avatar ? selectUser.userInfo.avatar : avatar} />
                                        <span className='user-fullname'>{selectUser.userInfo.fullName}</span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={redirectAccountProfile}>Tài khoản</a>
                                        <a className="dropdown-item" onClick={redirectChangePassword}>Đổi mật khẩu</a>
                                        <a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a>
                                    </div>
                                </div>
                            </li>

                        </>
                    }
                    {
                        selectUser.isLoggedInUser == false && icon != "nav__toggler" &&
                        <>
                            <li className='nav__item'>
                                <Link to="/login" className='nav-link' style={{ textTransform: "uppercase" }}><FormattedMessage id="homeHeader.login" /></Link>
                            </li>
                        </>
                    }
                    <li className='nav__item item__last'>
                        <Link to="/ho-tro" className='nav-link'><FormattedMessage id="homeHeader.support" /></Link>
                    </li>
                </ul>

            </nav>
        </>
    )
}
