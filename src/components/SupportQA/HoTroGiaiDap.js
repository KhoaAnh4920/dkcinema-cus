import React, { useEffect, useState } from 'react';
import Phim1 from '../../assets/Phim1.jpg';
import Phim2 from '../../assets/Phim2.png';
import pdc1 from '../../assets/PDC/pdc1.jpg';
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
import { getListMovieByStatus } from '../../services/MovieServices';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import { useHistory } from "react-router-dom";
import InCommingFilms from '../Share/InCommingFilms';


function HoTroGiaiDap() {
    const [show, setShow] = useState(false);
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();
    let history = useHistory();
    const [allValues, setAllValues] = useState({
        dataMovieUpcoming: []
    });




    const redirectFeedBack = () => {
        history.push("/phan-hoi");
    }
    const changeLanguage = (language) => {
        // fire redux event: actions

        console.log(language);
        dispatch(updateLanguage(language));
    }

    const handleClickShow = () => {
        setShow(!show);
    }

    async function fetchDataMovieIncomming() {
        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []

        setAllValues((prevState) => ({
            ...prevState,
            dataMovieUpcoming: dataMovieUpcoming
        }))
    }


    useEffect(() => {
        fetchDataMovieIncomming();
    }, []);



    return (
        <>
            <Header />


            <div className='support-content container-fluid' style={{ maxWidth: '1400px' }}>
                <div className='row row-support'>
                    <div className='col-8 col-left'>
                        <div className='title-tab'>
                            <ul>
                                <li><a>tuyển dụng</a></li>
                                <li><a onClick={redirectFeedBack}>góp ý</a></li>
                                <li><a>giải đáp</a></li>
                            </ul>
                        </div>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne" style={{ backgroundColor: "#e6e8eb", }}>
                                    <h5 className="mb-0">
                                        <div className='title' style={{ width: "100%", cursor: "pointer" }} data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <i className='icon'></i> làm sao để đặt vé online
                                        </div>
                                    </h5>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p>
                                            Bước 1: Bạn truy cập vào Website/App của DK, đăng nhập tài khoản thành viên trước khi mua vé để hệ thống tích điểm vào tài khoản thành viên của bạn.
                                        </p>
                                        <p>
                                            Bước 2: Bạn vào mục Mua vé đối với Website/chọn Phim đang chiếu đối với App, bạn chọn Phim - chọn Rạp - chọn Suất chiếu - chọn Số lượng ghế (tối đa 8 ghế cho một giao dịch/Combo bắp nước - chọn Ghế - tiến hành thanh toán.
                                        </p>
                                        <p>
                                            Bước 3: Khi đến bước thanh toán, bạn chọn loại thẻ:
                                            <ul>
                                                <li>
                                                    Đối với thẻ ATM, bạn chọn cổng thanh toán Zalopay/Onepay (tài khoản Ngân hàng đã đăng ký dịch vụ internet banking) - bạn nhập một số thông tin tài khoản Ngân hàng như Tên chủ thẻ, Mã số thẻ, Tên đăng nhập…. sau đó nhập mã OTP để hoàn tất giai đoạn thanh toán bạn nhé.
                                                </li>
                                                <li>
                                                    Đối với thẻ Visa/Master/JCB, bạn chọn cổng thanh toán Zalopay, chọn mục CC, Visa/Master/JCB, bạn nhập một số thông tin tài khoản Ngân hàng như Tên chủ thẻ, Mã số thẻ, Tên đăng nhập…. sau đó nhập mã OTP để hoàn tất giai đoạn thanh toán bạn nhé.
                                                </li>
                                            </ul>
                                        </p>
                                        <p>
                                            Bước 4: Sau 15-20 phút bạn vẫn chưa nhận được thông tin xác nhận đặt vé được gửi đến SĐT đặt vé/Email đặt vé, bạn vui lòng liên hệ với hotline của DK theo số: 19002224 hoặc gửi thông tin (thông tin bao gồm: Tên, SĐT đặt vé, Tên phim – Suất chiếu – Cụm rạp, Cổng thanh toán và Số tiền thanh toán) đến địa chỉ Email: hotro@DK.com.vn để được hỗ trợ bạn nhé.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card">
                                <div className="card-header" id="heading2" style={{ backgroundColor: "#e6e8eb", }}>
                                    <h5 className="mb-0 t">
                                        <div className='title' style={{ width: "100%", cursor: "pointer" }} data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                            <i className='icon'></i>&nbsp;Tôi có thể hủy hoặc thay đổi thông tin của vé đã mua online được không?
                                        </div>
                                    </h5>
                                </div>
                                <div id="collapse2" className="collapse" aria-labelledby="heading2" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p>
                                            Theo quy định của DK vé đã mua thành công rồi thì không thể hủy/thay đổi thông tin được ạ. Tuy nhiên, trong trường hợp bạn không thể sắp xếp xem đúng suất chiếu mà bạn đã đặt nhầm, bạn vui lòng mang mã đặt vé đến trực tiếp tại rạp trước suất chiếu và liên hệ Ban quản lý để được hỗ trợ bạn nhé.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card">
                                <div className="card-header" id="heading3" style={{ backgroundColor: "#e6e8eb", }}>
                                    <h5 className="mb-0">
                                        <div className='title' style={{ width: "100%", cursor: "pointer" }} data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                            <i className='icon'></i>&nbsp;Khi mua vé online tôi có được tích điểm hay không?
                                        </div>
                                    </h5>
                                </div>
                                <div id="collapse3" className="collapse" aria-labelledby="heading3" data-parent="#accordionExample">
                                    <div className='card-body'>
                                        <p>
                                            Khi bạn mua vé online trên Web/App của DK, bạn vui lòng đăng nhập tài khoản thành viên của DK để hệ thống tích điểm vào tài khoản của bạn nhé. Hệ thống DK sẽ không tích điểm được khi bạn thực hiện mua vé online tại Web/App của 123Phim, Momo….
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card">
                                <div className="card-header" id="heading4" style={{ backgroundColor: "#e6e8eb", }}>
                                    <h5 className="mb-0">
                                        <div className='title' style={{ width: "100%", cursor: "pointer" }} data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                            <i className='icon'></i>&nbsp;thông tin liên hệ
                                        </div>
                                    </h5>
                                </div>
                                <div id="collapse4" className="collapse" aria-labelledby="heading4" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <h3 style={{ textTransform: "capitalize" }}>tổng công ty cổ phần phim đa vũ trụ</h3>
                                        <ul>
                                            <li style={{ textTransform: "capitalize", fontSize: "13pt" }}>địa chỉ: tầng 82, tòa nhà landmark, 208 nguyễn hữu cảnh, phường 22, quận bình thạnh, thành phố hồ chí minh</li>
                                            <li style={{ textTransform: "capitalize", fontSize: "13pt" }}>điện thoại: (+84) 3900 8900</li>
                                            <li style={{ textTransform: "capitalize", fontSize: "13pt" }}>fax: (+84) 8900 6599</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card">
                                <div className="card-header" id="heading5" style={{ backgroundColor: "#e6e8eb", }}>
                                    <h5 className="mb-0">
                                        <div className='title' style={{ width: "100%", cursor: "pointer" }} data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                            <i className='icon'></i>&nbsp;Thanh toán online đã bị trừ tiền nhưng không nhận được mã đặt vé?
                                        </div>
                                    </h5>
                                </div>
                                <div id="collapse5" className="collapse" aria-labelledby="heading5" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <ul>
                                            <li> Bạn có thể inbox qua fanpage Facebook chính thức của DK Cinema tại địa chỉ https://facebook.com/DKcine.vn hoặc liên hệ với hotline 19002224 để được hỗ trợ bạn nhé (Thời gian làm việc từ 8:00 đến 22:00 hàng ngày)</li>
                                            <li>Cập nhật lại thời gian của thẻ ATM từ 7 đến 15 ngày làm việc, thẻ Visa/Master từ 7 đến 45 ngày làm việc (không tính Cuối tuần và Ngày Lễ)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <InCommingFilms
                        dataMovieUpcoming={allValues.dataMovieUpcoming}
                    />

                </div>
            </div>


            <Footer />
        </>
    )
}


export default HoTroGiaiDap;