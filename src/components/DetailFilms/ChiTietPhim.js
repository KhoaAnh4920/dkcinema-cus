import React, { useState } from 'react';
import ModalVideo from 'react-modal-video'
import logo from '../../assets/DKCinema.png';
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
import { faAngleDoubleRight, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import "./ChiTietPhim.scss";
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import "react-modal-video/scss/modal-video.scss";
import { FacebookProvider, Like } from 'react-facebook';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quang_cao_1 from '../../assets/1.jpg';
import quang_cao_2 from '../../assets/2.jpg';
import quang_cao_3 from '../../assets/3.jpg';
import quang_cao_4 from '../../assets/4.jpg';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
function ChiTietPhim() {
    const [open, setOpen] = useState(false);
    const handleShowVideo = () => {
        setOpen(!open);
    }
    const trailer = {
        type: "video",
        sources: [
            {
                src: "ijQGIHy88JM",
                provider: "youtube"
            }
        ]
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();


    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }
    return (
        <>
            <Header />

            <div className='detail-film'>
                <div className='container box'>
                    <div className='row row-detail'>

                        <div className='col-3 col-left'>
                            <Image src={imgtrail} className='img-trail' />
                            <Button variant='link' onClick={handleShowVideo} className='btn-show'>
                                <FontAwesomeIcon icon={faPlayCircle} className='icon-show' />
                            </Button>

                            <ModalVideo
                                channel='youtube'
                                autoplay='0'
                                isOpen={open}
                                videoId="ijQGIHy88JM"
                                onClose={() => setOpen(false)}
                            />
                        </div>
                        <div className='col-9 col-right'>
                            <div className='row row-title'>
                                <div className='row detail'>
                                    <ul>
                                        <li >
                                            <div className='title-left'>
                                                aaaaa
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
                                            <div className='info-right'>marvel studios</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>đạo diễn</div>
                                            <div className='info-right'>sam raimi</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>thể loại</div>
                                            <div className='info-right'>hành động, kinh dị, giả tưởng</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>diễn viên</div>
                                            <div className='info-right'>Benedict Cumberbatch, Elizabeth Olsen, Rachel McAdams, Patrick Stewart, Chiwetel Ejiofor, Benedict Wong</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>quốc gia</div>
                                            <div className='info-right'>mỹ</div>
                                        </li>
                                        <li>
                                            <div className='info-left'>ngày khởi chiếu</div>
                                            <div className='info-right'>04/05/2022</div>
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

            </div>
            <div className='content-film container'>
                <div className='row row-content'>
                    <div className='col-8 col-left'>
                        <div className='title'>
                            <h5>nội dung phim</h5>
                        </div>
                        <div className='content'>
                            <p>
                                With it installed in the code editor you are using, you can type “lorem” and then tab and it will expand into a paragraph of Lorem Ipsum placeholder text. But it can do more! You can control how much you get, place it within HTML structure as it expands, and get different bits of it in repeated elements.
                            </p>
                            <p>
                                With it installed in the code editor you are using, you can type “lorem” and then tab and it will expand into a paragraph of Lorem Ipsum placeholder text. But it can do more! You can control how much you get, place it within HTML structure as it expands, and get different bits of it in repeated elements.
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
                    <div className='col-4 col-right'>
                        <div className='title'>
                            <h5>phim đang chiếu</h5>
                        </div>
                        <div className='col-image'>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='image-pdc'>
                                <img src={pdc1} />
                                <p className='vn'>tên tiếng anh</p>
                                <p className='eng'>tên tiếng việt</p>
                            </div>
                            <div className='link-read-more'>
                                <a href='#'>Xem Thêm</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <Footer />
        </>
    )
}
export default ChiTietPhim;