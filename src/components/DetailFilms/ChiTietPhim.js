import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video'
//import logo from '../../assets/DKCinema.png';
import pdc1 from '../../assets/PDC/pdc1.jpg';
import imgtrail from '../../assets/trailer/t1.jpg';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import { Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import "./ChiTietPhim.scss";
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import "react-modal-video/scss/modal-video.scss";
import { FacebookProvider, Like } from 'react-facebook';
import { getMovieById, getListMovieByStatus } from '../../services/MovieServices';
import Slider from "react-slick";
import { Link, useParams } from 'react-router-dom';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quang_cao_1 from '../../assets/1.jpg';
import quang_cao_2 from '../../assets/2.jpg';
import quang_cao_3 from '../../assets/3.jpg';
import quang_cao_4 from '../../assets/4.jpg';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import FilmShowing from '../Share/FilmShowing';
import { useHistory } from "react-router-dom";
import moment from 'moment';
function ChiTietPhim() {
    let history = useHistory();
    const redirectBookTicket = () => {
        history.push("/dat-ve-qua-phim");
    }

    const [open, setOpen] = useState(false);
    const handleShowVideo = () => {
        setOpen(!open);
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const [allValues, setAllValues] = useState({
        transName: '',
        country: '',
        language: '',
        duration: '',
        description: '',
        brand: '',
        cast: '',
        status: 0,
        typeMovie: [],
        typeImage: [],
        url: '',
        releaseTime: 0,
        errors: {},
        poster: '',
    });
    //const urlTrailer = allValues.url;
    //console.log(urlTrailer);
    const trailer = {
        type: "video",
        sources: [
            {
                src: allValues.url,
                provider: "youtube"
            }
        ]
    };
    console.log(trailer);
    const { id } = useParams();
    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }
    async function fetchMovieById(id) {

        //console.log(id);
        let dataMovieId = await getMovieById(id);
        let dateRe = moment(dataMovieId.data.releaseTime).format('DD-MM-YYYY');
        console.log(dataMovieId);
        //console.log(dateRe)
        if (dataMovieId && dataMovieId.data) {
            setAllValues({
                poster: dataMovieId.data.ImageOfMovie[0].url,
                id: id,
                name: dataMovieId.data.name,
                transName: dataMovieId.data.transName,
                country: dataMovieId.data.country,
                duration: dataMovieId.data.duration,
                language: dataMovieId.data.language,
                releaseTime: dateRe,
                brand: dataMovieId.data.brand,
                cast: dataMovieId.data.cast,
                typeMovie: dataMovieId.data.MovieOfType,
                typeImage: dataMovieId.data.ImageOfMovie,
                status: dataMovieId.data.status,
                description: dataMovieId.data.description,
                url: dataMovieId.data.url
            })
        }

    }

    useEffect(() => {
        fetchMovieById(id);
    }, []);
    return (
        <>
            <Header />

            <div className='detail-film'>
                <div className='container box'>

                    <div className='row row-detail'>

                        <div className='col-3 col-left'>
                            {
                                allValues.typeImage.map((item1, index1) => {
                                    if (item1.typeImage === 2) {
                                        return (
                                            <Image src={item1.url} key={index1} className='img-trail' />
                                        )
                                    }
                                })
                            }

                            <Button variant='link' onClick={handleShowVideo} className='btn-show'>
                                <FontAwesomeIcon icon={faPlayCircle} className='icon-show' />
                            </Button>

                            <ModalVideo
                                channel='youtube'
                                autoplay='0'
                                isOpen={open}
                                videoId={allValues.url}
                                onClose={() => setOpen(false)}
                            />
                        </div>
                        <div className='col-9 col-right'>
                            <div className='row row-title'>
                                <div className='row detail'>
                                    <ul>
                                        <li >
                                            <div className='title-left'>
                                                {allValues.name}
                                            </div>
                                            <div className='title-right'>
                                                aaaaa
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className='row row-seen'>
                                <div className='row detail'>
                                    <ul>
                                        <li >
                                            <div className='seen-left'>
                                                aaaaa
                                            </div>
                                            <div className='seen-right'>
                                                aaaaa
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row row-info'>
                                <div className='row row-info-detail'>
                                    <ul>
                                        <li>
                                            <div className='info-left'>nhà sản xuất</div>
                                            <div className='info-right'>{allValues.brand}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>đạo diễn</div>
                                            <div className='info-right'>None</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>thể loại</div>
                                            <div className='info-right' style={{ display: 'flex' }}>
                                                {
                                                    allValues.typeMovie.map((item, index) => {
                                                        return (
                                                            <div key={index}>{item.name + ','} &nbsp; </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </li>
                                        <div className='info-right'></div>
                                        <li>
                                            <div className='info-left'>diễn viên</div>
                                            <div className='info-right'>{allValues.cast}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>quốc gia</div>
                                            <div className='info-right'>{allValues.country}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>ngày khởi chiếu</div>
                                            <div className='info-right'>{allValues.releaseTime}</div>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                            <div className='row row-btn' style={{ 'paddingLeft': '20px' }}>
                                <div className='blog'>
                                    <button className='btn-buy btn'>mua vé</button>
                                    <li><div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                    <button className='btn btn-review'>đánh giá</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
            <div className='content-film container'>
                <div className='row row-content'>
                    <div className='col-8 col-left'>
                        <div className='title'>
                            <h5>nội dung phim</h5>
                        </div>
                        <div className='content'>
                            <p>
                                {allValues.description}
                            </p>
                            <div className='trailer'>
                                <Plyr source={trailer} />
                            </div>
                        </div>
                        <div className='discount'>
                            <div className='title-discount'>
                                <h5>thông tin khuyến mãi</h5>
                            </div>
                            <div className='slide-discount'>
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
                                    {/* <div>
                                        <img src={quang_cao_2} />
                                    </div>
                                    <div>
                                        <img src={quang_cao_1} />
                                    </div> */}


                                </Slider>
                            </div>
                        </div>
                    </div>
                    <FilmShowing />

                </div>
            </div>



            <Footer />
        </>
    )
}
export default ChiTietPhim;