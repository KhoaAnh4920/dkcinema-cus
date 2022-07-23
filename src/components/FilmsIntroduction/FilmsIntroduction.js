import React, { useEffect, useState } from 'react';
import logo from '../../assets/DKCinema.png';
import doctor_review from '../../assets/doctor_review.jpg';
import './FilmsIntroduction.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';
import Pagination from 'react-bootstrap/Pagination';
import { FacebookProvider, Like } from 'react-facebook';
import { Link, useHistory } from "react-router-dom";
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import FilmShowing from '../Share/FilmShowing';
import { getNewsByType } from '../../services/NewsServices';
import Ratings from '../Share/Rating';
import { toast } from 'react-toastify';
import { userState } from "../../redux/userSlice";
import { getListMovieByStatus } from '../../services/MovieServices';
import InCommingFilms from '../Share/InCommingFilms';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'






function FilmsIntroduction() {
    let history = useHistory();
    let selectUser = useSelector(userState);
    // const redirectReview = () => {
    //     history.push("/review-phim");
    // }
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }


    const [allNews, setAllNews] = useState({
        listReviews: [],
        isLoginUser: false,
        cusId: null,
        dataMovieUpcoming: [],
        isShowLoading: true,
        id: null
    })
    const [hovering, setHovering] = useState([{
        indexInit: 0,
        isShow: false
    }]);
    const handleMouseOver = (indexNews, item) => {
        // setHovering(true);

        // let data = hovering;

        if (!hovering[indexNews]) {

            let obj = {}
            obj.indexInit = indexNews;
            obj.isShow = true
            hovering.push(obj)

            setHovering(hovering)
        } else {
            let res = hovering.map((item, index) => {

                if (item.indexInit !== indexNews) {
                    item.isShow = false;
                } else {
                    item.isShow = !item.isShow
                }
                return item;
            })

            setHovering(res)
        }


        setAllNews((prevState) => ({
            ...prevState,
            id: item.id
        }))
        // console.log('hovering: ', hovering);
    }


    const handleMouseLeave = (indexNews) => {
        console.log('Leave chay: ', indexNews)
        let res = hovering.map((item, index) => {
            if (item.indexInit === indexNews) {
                console.log('item: ', item)
                console.log(item.isShow)
                console.log('AAA: ', !item.isShow);
                item.isShow = !item.isShow;
                return item;
            }

        })

        console.log('hovresering: ', res)

        setHovering(res);
    }
    const getDetailReview = (id) => {
        history.push(`/chi-tiet-review/${id}`);
    }
    async function fecthNewsReview(type) {
        const dataReviews = await getNewsByType(type);

        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []



        if (dataReviews && dataReviews.data) {
            setAllNews({
                listReviews: dataReviews.data,
                dataMovieUpcoming: dataMovieUpcoming,
                isShowLoading: false
            })
        }
    }

    useEffect(() => {

        if (!selectUser.isLoggedInUser) {
            setAllNews((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
            }))
        } else {
            setAllNews((prevState) => ({
                ...prevState,
                isLoginUser: selectUser.isLoggedInUser,
                cusId: selectUser.userInfo.id
            }))
        }

    }, [selectUser]);



    const votePostRating = async (data) => {

        if (!allNews.isLoggedInUser) {
            toast.warning('Vui lòng đăng nhập để thực hiện')
            return
        }

        // // Call API //
        // let res = await votePostRatingService({
        //     rating: data,
        //     cusId: allValuesDetail.cusId,
        //     newsId: id
        // })

        // console.log('res: ', res)

        // if (res && res.errCode === 0) {
        //     toast.success("Thank you")

        // } else {
        //     toast.error(res.errMessage);
        // }

    }
    useEffect(() => {
        fecthNewsReview(2);
    }, []);




    return (
        <>

            <Header />
            <LoadingOverlay
                active={allNews.isShowLoading}
                spinner={<ClipLoader color='#FCAF17' size={50} />}
                styles={{
                    wrapper: {
                        // width: '400px',
                        // height: '400px',
                        overflow: 'hidden'
                    },
                    overlay: (base) => ({
                        ...base,
                        background: '#fff',
                    })
                }}
            >

                <div className='container-fluid review-con'>
                    <div className='row row-review'>
                        <div className='col-8 col-left'>
                            <div className='title'>
                                <h5>Blog điện ảnh</h5>
                            </div>
                            <div className='list-films'>
                                {
                                    allNews.listReviews && allNews.listReviews.length > 0 &&
                                    allNews.listReviews.map((item, index) => {
                                        return (
                                            <div className='blog' key={index}>
                                                <div className='movie-thumb'>
                                                    <img src={item.thumbnail} className="img-review" data-was-processed="true" />
                                                </div>
                                                <div className='content-title'>
                                                    <h5>
                                                        <Link onClick={() => getDetailReview(item.id)} className='link'> {item.title}</Link>
                                                    </h5>
                                                    <div className='summary'>
                                                        {item.tomTat}
                                                    </div>
                                                    <div className='row row-fc'>
                                                        <ul className='list-fc'>
                                                            {/* <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li> */}
                                                            <li>
                                                                <div class="rating-movie rating-home">
                                                                    <span class="rating-value">
                                                                        <strong class="review-home ng-binding" style={{ fontSize: '10pt' }}>{item.rating}/10</strong>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                            <li><button className='btn btn-warning btn-review' onClick={() => handleMouseOver(index, item)}>Đánh giá</button></li>
                                                            {
                                                                // console.log('hovering[index]: ', (hovering[index] && hovering[index].isShow) ? hovering[index].isShow : false)
                                                                hovering[index] && hovering[index].isShow && <Ratings checkClick={votePostRating} />
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                                {/* <div className='blog'>
                                <div className='movie-thumb'>
                                    <img src={doctor_review} className="img-review" data-was-processed="true" />
                                </div>
                                <div className='content-title' style={{ flexDirection: 'column' }}>
                                    <h5>
                                        <Link to='/chi-tiet-review' className='link'> [Review] Doctor Strange 2: Strange Đối Đầu Kẻ Ác Mạnh Nhất MCU?</Link>
                                    </h5>
                                    <div className='summary'>
                                        kkkk
                                    </div>
                                    <div className='row row-fc'>
                                        <ul className='list-fc'>
                                            <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                            <li>
                                                <div class="rating-movie rating-home">
                                                    <span class="rating-value">
                                                        <strong class="review-home ng-binding" style={{ fontSize: '12pt' }}>9.5/10</strong>
                                                    </span>
                                                </div>
                                            </li>
                                            <li><button className='btn btn-warning btn-review'>Đánh giá</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>

                        <InCommingFilms
                            dataMovieUpcoming={allNews.dataMovieUpcoming}
                        />
                    </div>

                </div>
            </LoadingOverlay>

            <Footer />



        </>
    );
}

export default FilmsIntroduction;
