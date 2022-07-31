import React, { useState, useEffect } from 'react';
import pdc1 from '../../assets/PDC/pdc1.jpg';
import km1 from '../../assets/khuyenmai/km1.jpg';
import km2 from '../../assets/khuyenmai/km2.jpg';
import km3 from '../../assets/khuyenmai/km3.jpg';
import km4 from '../../assets/khuyenmai/km4.png';
import './Home.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { getListMovieByStatus } from '../../services/MovieServices';
import { verifyEmail } from '../../services/UserService';
import { Image, Button } from 'react-bootstrap';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getValidateSignature } from "../../services/BookingServices";
import { getAllBanner } from "../../services/BannerServices";
import { toast } from 'react-toastify';
import { updateDataBooking } from "../../redux/BookingSlice";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { getNewsByType } from '../../services/NewsServices';





function Home() {
    let history = useHistory();
    // const language = useSelector(selectLanguage);
    const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }

    const [buttonDefault, setButtonDefault] = useState({
        isShowButtonDangChieu: true,
        isShowButtonSapChieu: false,
    });

    const [allValues, setAllValues] = useState({
        listMovie: []
    });

    const [allBanner, setAllBanner] = useState({
        listBanner: []
    })
    const [allReviewMovie, setAllReviewMovie] = useState([])
    const [allInComingMovie, setInComingMovie] = useState([])
    const [allPromotionPost, setPromotionPost] = useState([])

    const [isShowLoading, setIsShowLoading] = useState(true)



    const redirectListFilms = () => {
        history.push("/phim-dang-chieu");
    }
    const getDetailMovie = (id) => {
        //alert(id);
        history.push(`/chi-tiet-phim/${id}`);
    }

    const handleClickDefaultButton = async e => {


        // Call api get phim //
        if (buttonDefault.isShowButtonDangChieu) {
            await fetchDataMovie(0)
        } else {
            await fetchDataMovie(1)
        }
        /// 

        if (e.target.name === 'phimDangChieu') {
            setButtonDefault({
                isShowButtonDangChieu: true,
                isShowButtonSapChieu: false,
            })
        } else {
            setButtonDefault({
                isShowButtonDangChieu: false,
                isShowButtonSapChieu: true,
            })
        }

    }

    async function fetchDataMovie(status) {
        // You can await here
        const dataMovie = await getListMovieByStatus(status);

        if (dataMovie && dataMovie.data) {
            setAllValues({
                listMovie: dataMovie.data
            })
        }
    }

    async function handleSignature(rawSignature, signature) {
        // You can await here

        const signatureRes = await getValidateSignature(rawSignature);

        if (signatureRes === signature) {
            toast.success("Thanh toán thành công");
            dispatch(updateDataBooking(null));
            // Clear booking redux //

        }
        else
            toast.error("Thông tin không hợp lệ")
        localStorage.removeItem("seconds");
        localStorage.removeItem("minutes");
    }
    async function fetchDataBanner() {
        const dataBanner = await getAllBanner();
        if (dataBanner && dataBanner.data) {
            setAllBanner({
                listBanner: dataBanner.data
            })
        }
    }

    async function fetchDataPost(type) {

        const dataPost = await getNewsByType(type);



        if (dataPost && dataPost.data) {
            let listPost = groupBy(dataPost.data, "type");
            // console.log("listPost", listPost);
            for (let i = 0; i < listPost.length; i++) {
                if (listPost[i][0].type === 2) {
                    setInComingMovie(listPost[i])
                }
                if (listPost[i][0].type === 1) {
                    setAllReviewMovie(listPost[i])
                }
                if (listPost[i][0].type === 3) {
                    setPromotionPost(listPost[i])
                }
                continue;
            }
        }

        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
        setIsShowLoading(false);

    }

    async function clientVerifyEmail(data) {

        let res = await verifyEmail({
            userId: data.userId,
            userToken: data.userToken
        })
        if (res && res.errCode === 0) {
            toast.success("Xác thực email thành công")
        }
    }

    const groupBy = (arr, prop) => {
        const map = new Map(Array.from(arr, obj => [obj[prop], []]));
        arr.forEach(obj => map.get(obj[prop]).push(obj));
        return Array.from(map.values());
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";

        fetchDataMovie(1);
        fetchDataBanner();

        fetchDataPost();

        // fetchDataPost(1);
        // fetchDataPost(2);
        // fetchDataPost(3);

        // Check thanh toán //
        let url = window.location.href;
        if (url.includes('?')) {

            const userId = new URLSearchParams(window.location.search).get('userId');
            const userToken = new URLSearchParams(window.location.search).get('userToken');


            if (userId && userToken) {
                clientVerifyEmail({
                    userId,
                    userToken
                })

            } else {
                const resultCode = new URLSearchParams(window.location.search).get('resultCode');
                const message = new URLSearchParams(window.location.search).get('message');


                if (resultCode != 0) {
                    toast.error(message);
                    return;
                }
                // partnerCode=MOMO&orderId=MOMO1656834097867&requestId=MOMO1656834097867&amount=220000&orderInfo=pay with MoMo&orderType=momo_wallet&transId=2696246745&resultCode=0&message=Successful.&payType=qr&responseTime=1656834220502&
                //extraData=23&signature=60940af08d81bb9f6697f524267f666df839c3afc7436758347636627ba210c8
                const partnerCode = new URLSearchParams(window.location.search).get('partnerCode');
                const orderId = new URLSearchParams(window.location.search).get('orderId');
                const amount = new URLSearchParams(window.location.search).get('amount');
                const extraData = new URLSearchParams(window.location.search).get('extraData');

                const orderInfo = new URLSearchParams(window.location.search).get('orderInfo');
                const orderType = new URLSearchParams(window.location.search).get('orderType');
                const payType = new URLSearchParams(window.location.search).get('payType');
                const requestId = new URLSearchParams(window.location.search).get('requestId');
                const responseTime = new URLSearchParams(window.location.search).get('responseTime');

                const transId = new URLSearchParams(window.location.search).get('transId');
                const signature = new URLSearchParams(window.location.search).get('signature');

                var accessKey = "F8BBA842ECF85";

                var rawSignature =
                    "accessKey=" +
                    accessKey +
                    "&amount=" +
                    amount +
                    "&extraData=" +
                    extraData +
                    "&message=" +
                    message +
                    "&orderId=" +
                    orderId +
                    "&orderInfo=" +
                    orderInfo +
                    "&orderType=" +
                    orderType +
                    "&partnerCode=" +
                    partnerCode +
                    "&payType=" +
                    payType +
                    "&requestId=" +
                    requestId +
                    "&responseTime=" +
                    responseTime +
                    "&resultCode=" +
                    resultCode +
                    "&transId=" +
                    transId;


                if (rawSignature) {
                    handleSignature(rawSignature, signature);
                }

                const queryParams = ""
                history.replace({
                    search: queryParams,
                })
            }

        }

        let sec = parseInt(window.localStorage.getItem("seconds"))
        let min = parseInt(window.localStorage.getItem("minutes"))

        if (sec || min) {
            localStorage.removeItem("seconds");
            localStorage.removeItem("minutes");
            dispatch(updateDataBooking(null));
    
            return;
        }



    }, []);


    const handleClickFilms = (item) => {
        history.push(`/dat-ve-qua-phim/${item.id}`)
    }

    const handleClickDetailPromotion = (id) => {
        history.push(`/chi-tiet-review/${id}`)
    }




    return (
        <>

            <Header />
            <LoadingOverlay
                active={isShowLoading}
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
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    swipeable={true}
                    emulateTouch={true}
                >
                    {
                        allBanner.listBanner && allBanner.listBanner.length > 0 &&
                        allBanner.listBanner.map((item, index) => {
                            return (
                                <div>
                                    <img src={item.url} key={index} />
                                </div>
                            )
                        })
                    }
                </Carousel>


                <div className='home-content-film container-fluid'>
                    <div className='home-button container-fluid'>
                        <div className='row-button'>
                            <button className={buttonDefault.isShowButtonDangChieu ? 'active' : ''} name='phimDangChieu' onClick={handleClickDefaultButton} disabled={buttonDefault.isShowButtonDangChieu}>
                                Phim đang chiếu
                            </button>
                            <button className={buttonDefault.isShowButtonSapChieu ? 'active' : ''} name='phimSapChieu' onClick={handleClickDefaultButton} disabled={buttonDefault.isShowButtonSapChieu} >
                                Phim sắp chiếu
                            </button>
                        </div>
                    </div>
                    <div className='background'>
                        <div className='row-film'>
                            <div className='row'>
                                {
                                    allValues.listMovie && allValues.listMovie.length > 0 &&
                                    allValues.listMovie.map((item, index) => {

                                        return (
                                            <div className='col-4 col-image' key={index} >
                                                <div className='image' onClick={() => handleClickFilms(item)}>
                                                    {
                                                        item.ImageOfMovie.map((item1, index1) => {
                                                            if (item1.typeImage === 1) {
                                                                return (
                                                                    <Image style={{ height: '250px', width: '80%' }} src={item1.url} className='image__img' key={index1} />
                                                                )
                                                            }
                                                        })
                                                    }

                                                    <div className='image__overlay image__overlay--primary'>
                                                        <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                                    </div>

                                                </div>
                                                <div className='text-detail'>
                                                    <p onClick={() => { getDetailMovie(item.id) }} >{item.name}</p>
                                                </div>

                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    </div>


                </div>
                <div className='button-read-more' onClick={() => redirectListFilms()}>
                    <button>
                        Xem Thêm
                    </button>
                </div>
                <div className='home-content-discount container-fluid'>
                    <h1 className='text-discount'>
                        <span>
                            Thông tin khuyến mãi
                        </span>

                    </h1>
                    <div className='row-img-discount'>
                        {allPromotionPost && allPromotionPost.length > 0 &&
                            allPromotionPost.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <div className='img-discount'>
                                            <Image src={item.thumbnail} className='img' />
                                            <div className='image__overlay image__overlay--primary'>
                                                <Button size='md' variant='warning' className='btn__show' onClick={() => handleClickDetailPromotion(item.id)}>Chi tiết</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            })

                        }

                    </div>
                    <div className='text-read-more'>
                        <p><Link to={`/khuyen-mai`}>Xem Thêm</Link></p>
                    </div>

                </div>
                <div className='home-news-content container-fluid' style={{ marginBottom: '50px' }}>
                    <div className='row row-news'>
                        <div className='col-6 col-left'>
                            <h1 className='text-review'> review phim</h1>
                            {allReviewMovie && allReviewMovie.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div className='content' key={index}>
                                            <div className='content-image'>
                                                <Image src={item.thumbnail} className='image' />
                                            </div>

                                            <h5><Link to={`/chi-tiet-review/${item.id}`}>{item.title}</Link></h5>
                                            {/* <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li> */}
                                            <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">{item.rating}</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>

                                            <p className='summary' >{item.tomTat}</p>
                                        </div>
                                    )

                                }
                            })}

                        </div>
                        <div className='col-6 col-right'>
                            <h1 className='text-intro'>Blog điện ảnh</h1>
                            {allInComingMovie && allInComingMovie.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div className='content' key={index} >
                                            <div className='content-image'>
                                                <Image src={item.thumbnail} className='image' />
                                            </div>
                                            <h5><h5><Link to={`/chi-tiet-review/${item.id}`}>{item.title}</Link></h5></h5>
                                            {/* <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li> */}
                                            <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">{item.rating}</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>

                                            <p className='summary' >{item.tomTat}</p>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </div>

            </LoadingOverlay>

            <Footer />

        </>
    );
}

export default Home;
