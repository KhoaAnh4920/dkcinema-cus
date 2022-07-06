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

        console.log(language);
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
    //search    



    useEffect(() => {

        setUserInfo({
            avatar: (selectUser.userInfo) ? selectUser.userInfo.avatar : '',
            fullName: (selectUser.userInfo) ? selectUser.userInfo.fullName : ''
        });


    }, [selectUser]);


    return (
        <>
            <div className='home-header-container'>
                <div className='home-header-content-top'>
                    <div className='left-content'>
                        {/* <i className="fas fa-bars"></i> */}
                        <img className='header-logo' src={logo} onClick={() => returnToHome()} />

                    </div>
                    <div className='center-content'>
                        <SearchBar
                            placeholder={"Entering...."}
                            data={PhimData}
                        />
                    </div>

                    <div className='right-content'>
                        <div className='child-content'>

                            <div className='login-customer'>
                                {
                                    selectUser.isLoggedInUser === true &&
                                    <>
                                        <div className="dropdown dropdown-userinfo">
                                            <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img className='avatar-user' src={avatar} />
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
                                    selectUser.isLoggedInUser === false &&
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

            </div>
        </>
    )
}
