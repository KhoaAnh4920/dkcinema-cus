import React, { useState } from 'react';
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
import DatePicker from '../Share/DatePicker';
import Select from 'react-select';
import { faAngleDoubleRight, faPlayCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import "react-modal-video/scss/modal-video.scss";
import { FacebookProvider, Like } from 'react-facebook';
import './BookTicket.scss';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quang_cao_1 from '../../assets/1.jpg';
import quang_cao_2 from '../../assets/2.jpg';
import quang_cao_3 from '../../assets/3.jpg';
import quang_cao_4 from '../../assets/4.jpg';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import Rate from '../Share/Rate';
import { useHistory } from "react-router-dom";
function BookTicketThrough() {
    let history = useHistory();
    const redirectBookTicket = () => {
        history.push("/dat-ve-qua-phim");
    }
    const [open, setOpen] = useState(false);
    const handleShowVideo = () => {
        setOpen(!open);
    }
    const options = [
        { value: 0, label: 'Nữ' },
        { value: 1, label: 'Nam' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

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
    const [dayBook, setDayBook] = useState(null);
    //Rating component
    const [rating, setRating] = useState(0);
    const [rating1, setRating1] = useState(0);
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
                            <div className='row row-btn'>
                                <div className='blog'>
                                    <button className='btn-buy' onClick={() => redirectBookTicket()}><a href='#'>mua vé</a></button>
                                    <li ><div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                                    <button className='btn-review'><a href='#'>đánh giá</a> </button>
                                    <div className='rating'>
                                        <Rate />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div >
            <div className='content-calendar container'>
                <div className='row row-book'>
                    <div className='box col-8 col-left'>
                        <div className='title'>
                            <h5>lịch chiếu</h5>
                        </div>
                        <div className='combobox-group col-12'>
                            <div className='row row-combobox'>
                                <div className='form-group col-4 se-province'>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={selectedOption}
                                        options={options}
                                    />
                                </div>
                                <div className='form-group col-4 date'>
                                    <DatePicker
                                        className='form-coltrol'
                                        value={dayBook}
                                        readonly='true'
                                        placeholder="DD/MM/YYYY"
                                        scrollableMonthYearDropdown

                                    />
                                </div>
                                <div className='form-group col-4'>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={selectedOption}
                                        options={options}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='calendar-group'>
                            <div className='calender'>
                                <div className='title-cal'>
                                    <h5>rạp nguyễn du</h5>
                                </div>
                                <div className='type-film'>
                                    2D - Không Phụ Đề
                                </div>
                                <div className='form-group btn-group'>
                                    <button>10:00</button>
                                    <button>12:00</button>
                                    <button>13:45</button>
                                    <button>15:15</button>
                                </div>
                            </div>
                        </div>
                        <div className='calendar-group'>
                            <div className='calender'>
                                <div className='title-cal'>
                                    <h5>rạp nguyễn du</h5>
                                </div>
                                <div className='type-film'>
                                    2D - Không Phụ Đề
                                </div>
                                <div className='form-group btn-group'>
                                    <button>10:00</button>
                                    <button>12:00</button>
                                    <button>13:45</button>
                                    <button>15:15</button>
                                </div>
                            </div>
                        </div>
                        <div className='calendar-group'>
                            <div className='calender'>
                                <div className='title-cal'>
                                    <h5>rạp nguyễn du</h5>
                                </div>
                                <div className='type-film'>
                                    2D - Không Phụ Đề
                                </div>
                                <div className='form-group btn-group'>
                                    <button>10:00</button>
                                    <button>12:00</button>
                                    <button>13:45</button>
                                    <button>15:15</button>
                                </div>
                            </div>
                        </div>
                        <div className='calendar-group'>
                            <div className='calender'>
                                <div className='title-cal'>
                                    <h5>rạp nguyễn du</h5>
                                </div>
                                <div className='type-film'>
                                    2D - Không Phụ Đề
                                </div>
                                <div className='form-group btn-group'>
                                    <button>10:00</button>
                                    <button>12:00</button>
                                    <button>13:45</button>
                                    <button>15:15</button>
                                </div>
                            </div>
                        </div>
                        <div className='calendar-group'>
                            <div className='calender'>
                                <div className='title-cal'>
                                    <h5>rạp nguyễn du</h5>
                                </div>
                                <div className='type-film'>
                                    2D - Không Phụ Đề
                                </div>
                                <div className='form-group btn-group'>
                                    <button>10:00</button>
                                    <button>12:00</button>
                                    <button>13:45</button>
                                    <button>15:15</button>
                                </div>
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
export default BookTicketThrough