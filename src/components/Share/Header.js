import React from 'react';
import './Header.scss';
import logo from '../../assets/DKCinema.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { Link, useHistory } from "react-router-dom";




export default function Header() {

    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();
    let history = useHistory();



    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const returnToHome = () => {
        history.push("/");
    }


    return (
        <>
            <div className='home-header-container'>
                <div className='home-header-content-top'>
                    <div className='left-content'>
                        {/* <i className="fas fa-bars"></i> */}
                        <img className='header-logo' src={logo} onClick={() => returnToHome()} />

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
                            <li className="nav-item ">
                                <Link to="/" className='nav-link'><FormattedMessage id="homeHeader.home" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/lich-chieu" className='nav-link'><FormattedMessage id="homeHeader.buyTicket" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/" className='nav-link'><FormattedMessage id="homeHeader.movie" /></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/" className='nav-link'><FormattedMessage id="homeHeader.news" /></Link>
                                <div className="drop-down-menu">
                                    <ul className="sub-navbar-nav">
                                        <li className="sub-nav-item">
                                            <Link to="/review-phim" className='sub-nav-link'><FormattedMessage id="homeHeader.reviewFilm" /></Link>
                                        </li>
                                        <li className="sub-nav-item">
                                            <Link to="/" className='sub-nav-link'><FormattedMessage id="homeHeader.introFilm" /></Link>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                            <li className="nav-item ">
                                <Link to="/" className='nav-link'><FormattedMessage id="homeHeader.support" /></Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        </>
    )
}
