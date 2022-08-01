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
import { getMovieById, getListMovieByStatus, voteMovieRatingService } from '../../services/MovieServices';
import Slider from "react-slick";
import { Link, useParams } from 'react-router-dom';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import FilmShowing from '../Share/FilmShowing';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import Ratings from '../Share/Rating';
import { toast } from 'react-toastify';
import InCommingFilms from '../Share/InCommingFilms';
import { getNewsByType } from '../../services/NewsServices';
import { userState } from "../../redux/userSlice";







function ChiTietPhim() {
    let history = useHistory();
    let selectUser = useSelector(userState);


    const redirectBookTicket = () => {
        history.push("/dat-ve-qua-phim");
    }

    const [open, setOpen] = useState(false);
    const handleShowVideo = () => {
        setOpen(!open);
    }
    const [hovering, setHovering] = useState(false);
    const handleMouseOver = () => {
        setHovering(true);
    }
    const handleMouseLeave = () => {
        setHovering(false);
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
        director: '',
        cast: '',
        status: 0,
        typeMovie: [],
        typeImage: [],
        url: '',
        releaseTime: 0,
        errors: {},
        poster: '',
        isLoginUser: false,
        cusId: null,
    });
    const [allPromotionPost, setPromotionPost] = useState([])
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

    const { id } = useParams();
    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }


    async function fetchMovieById(id) {

        //console.log(id);
        let dataMovieId = await getMovieById(id);
        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.filter(item => item.id !== +id)
            dataMovieUpcoming = dataMovieUpcoming.slice(0, 3)
        } else
            dataMovieUpcoming = []


        let dateRe = moment(dataMovieId.data.releaseTime).format('DD-MM-YYYY');
        console.log(dataMovieId);
        //console.log(dateRe)
        if (dataMovieId && dataMovieId.data) {
            let newUrl = youtube_parser(dataMovieId.data.url);

            dataMovieId.data.type = '';
            dataMovieId.data.MovieOfType.map(item => {
                dataMovieId.data.type += item.name + ', ';
            })

            dataMovieId.data.type = dataMovieId.data.type.replace(/,\s*$/, "");

            setAllValues((prevState) => ({
                ...prevState,
                poster: dataMovieId.data.ImageOfMovie[0].url,
                id: id,
                name: dataMovieId.data.name,
                transName: dataMovieId.data.transName,
                country: dataMovieId.data.country,
                duration: dataMovieId.data.duration,
                language: dataMovieId.data.language,
                releaseTime: dateRe,
                brand: dataMovieId.data.brand,
                director: dataMovieId.data.director,
                cast: dataMovieId.data.cast,
                typeMovie: dataMovieId.data.MovieOfType,
                typeImage: dataMovieId.data.ImageOfMovie,
                status: dataMovieId.data.status,
                description: dataMovieId.data.description,
                type: dataMovieId.data.type,
                rating: dataMovieId.data.rating,
                url: newUrl,
                dataMovieUpcoming: dataMovieUpcoming
            }))

        }
    }

    async function fetchDataPost(type) {
        const dataPost = await getNewsByType(type);
        // console.log("dataPost", dataPost);

        if (dataPost && dataPost.data) {
            setPromotionPost(dataPost.data)
        }
    }


    useEffect(() => {
        fetchMovieById(id);
        fetchDataPost(3);
    }, []);

    useEffect(() => {
        fetchMovieById(id);
        fetchDataPost(3);
    }, [id]);

    useEffect(() => {

        if (!selectUser.isLoggedInUser) {
            setAllValues((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
            }))
        } else {
            setAllValues((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
                cusId: selectUser.userInfo.id
            }))
        }

    }, [selectUser]);


    const voteMovieRating = async (data) => {


        console.log('allValues: ', allValues.isLoginUser)
        if (!allValues.isLoginUser) {
            toast.warning('Vui lòng đăng nhập để thực hiện')
            return
        }

        // Call API //
        let res = await voteMovieRatingService({
            rating: data,
            cusId: allValues.cusId,
            movieId: id
        })

        console.log('res: ', res)

        if (res && res.errCode === 0) {
            toast.success("Thank you")

        } else {
            toast.error(res.errMessage);
        }

    }

    const handleBookTicket = () => {
        history.push(`/dat-ve-qua-phim/${id}`)
    }



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

                            <div variant='link' onClick={handleShowVideo} className='btn-show'>
                                <FontAwesomeIcon icon={faPlayCircle} className='icon-show' />
                            </div>

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
                                                {(allValues && allValues.name) ? allValues.name : ''}
                                            </div>
                                            <div className='title-right'>
                                                <div className="rating-movie rating-home"><span className="rating-value"><strong className="review-home ng-binding">{allValues.rating}</strong><span>/5</span><span className="ng-binding">&nbsp;(806)</span></span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row row-seen'>
                                <div className='row detail time-container'>
                                    <ul>
                                        <li >
                                            <div className='time-left'>
                                                <i className="icon-c13"></i>
                                            </div>
                                            <div className='time-right'>
                                                <i className="fas fa-clock"></i>
                                                {(allValues.duration) ? allValues.duration + ' phút' : ''}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row row-info'>
                                <div className='row row-info-detail'>
                                    <ul>
                                        <li>
                                            <div className='info-left'>Nhà sản xuất</div>
                                            <div className='info-right'>{(allValues.brand) ? allValues.brand : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Đạo diễn</div>
                                            <div className='info-right'>{(allValues.director) ? allValues.director : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Thể loại</div>
                                            <div className='info-right'>
                                                {(allValues.type) ? allValues.type : ''}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Diễn viên</div>
                                            <div className='info-right'>{(allValues.cast) ? allValues.cast : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Quốc gia</div>
                                            <div className='info-right'>{(allValues.country) ? allValues.country : ''}</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>Ngày khởi chiếu</div>
                                            <div className='info-right'>{(allValues.releaseTime) ? allValues.releaseTime : ''}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='row row-btn'>
                                <div className='blog'>
                                    <button className='btn-buy btn' onClick={handleBookTicket}>mua vé</button>
                                    <button className='btn btn-warning btn-review' onMouseOver={handleMouseOver} onClick={handleMouseLeave}>Đánh giá</button>
                                    {
                                        hovering && <Ratings checkClick={voteMovieRating} />
                                    }
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
                                    {allPromotionPost && allPromotionPost.length > 0 &&
                                        allPromotionPost.map((item, index) => {
                                            if (index < 5) {
                                                return (
                                                    <div key={index} >
                                                        <img src={item.thumbnail} />
                                                    </div>

                                                )
                                            }
                                        })

                                    }



                                </Slider>
                            </div>
                        </div>
                    </div>
                    {/* <FilmShowing /> */}
                    <InCommingFilms
                        dataMovieUpcoming={allValues.dataMovieUpcoming}
                    />

                </div>
            </div>



            <Footer />
        </>
    )
}
export default ChiTietPhim;