import React, { useEffect, useState } from 'react';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import logo from '../../assets/DKCinema.png';
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { updateLanguage } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import "./HoTroGiaiDap.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
// let acc = document.getElementsByClassName('btn-show');


function HoTroGiaiDap() {
    const [show, setShow] = useState(false);
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();
    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const handleClickShow = () => {
        setShow(!show);
    }
    return (
        <>
            <Header />


            <div className='support-content container-fluid'>
                <div className='row row-support'>
                    <div className='col-10 col-left'>
                        <div className='title-tab'>
                            <ul>
                                <li><a href='#'>tuyển dụng</a></li>
                                <li><a href='#'>góp ý</a></li>
                                <li><a href='#'>giải đáp</a></li>
                            </ul>
                        </div>
                        <div className='accordion'>
                            <button className='btn-show ' onClick={handleClickShow} id='as'>R u OK ? </button>
                            <div className={`answer ${show === true ? 'activeShow' : ''}`}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <hr />
                            <button className='btn-show'>R u OK ? </button>
                            <div className='answer'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>


                    </div>
                    <div className='col-2'>
                        bbbb
                    </div>

                </div>
            </div>


            <Footer />
        </>
    )
}


export default HoTroGiaiDap;