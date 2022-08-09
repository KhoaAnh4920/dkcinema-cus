import React, { useState, useEffect } from 'react';
import Header from '../../components/Share/Header';
import Footer from '../../components/Share/Footer';
import FilmShowing from '../../components/Share/FilmShowing';
import { Link } from 'react-router-dom';
import "./AboutUs.scss";
import InCommingFilms from '../Share/InCommingFilms';
import { getListMovieByStatus } from '../../services/MovieServices';



function AboutUs() {
    const [allValues, setAllValues] = useState({
        dataMovieUpcoming: null
    });

    useEffect(() => {
        fetchDataMovie()


    }, []);


    async function fetchDataMovie() {
        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);

        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []

        setAllValues((prevState) => ({
            ...prevState,
            dataMovieUpcoming: dataMovieUpcoming,
            isShowLoading: false,
        }))
    }



    return (
        <>
            <Header />
            <div className='container con-about'>
                <div className='row row-about'>
                    <div className='col-8 col-about-left'>
                        <div className='breadcrumb list'>
                            <ol>
                                <li className='breadcrumb-item'>
                                    <Link to='/' className='link-about' aria-current='page'>Trang Chủ</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <Link to='/ve-chung-toi' className='link-about' aria-current='page'>Về Chúng Tôi</Link>
                                </li>
                            </ol>
                        </div>
                        <div className='title-about'>
                            <h5>về chúng tôi</h5>
                        </div>
                        <div className='content-about'>
                            <p>
                                Tính đến nay, DK Cinema đã có gần 30 năm hình thành và phát triển, hệ thống rạp chiếu phim đang có 18 cụm rạp trải khắp cả nước. DK Cinema trở thành điểm đến quen thuộc cho giới trẻ cả nước để tiếp cận nhanh nhất với các phim hay phim mới không chỉ Việt Nam hay Hollywood mà còn từ Hàn Quốc, Thái Lan, Nhật Bản…
                            </p>
                            <p>
                                Chẳng những nổi tiếng về chất lượng dịch vụ tốt, địa điểm đắc địa và nhân viên trẻ trung thân thiện, DK Cinema còn có nhiều chương trình khuyến mãi xuyên suốt năm và theo từng mùa phim. Mỗi tuần, rạp có chương trình Happy Day – giá vé chỉ từ 50k. Mỗi thứ 2 đầu tiên hằng tháng, ra rạp xem phim Ngày Tri Ân sẽ đồng giá vé và miễn phí châm thêm bắp nước.
                            </p>
                            <p>
                                Trở thành thành viên DK Cinema, bạn sẽ nhận được hàng loạt đặc quyền. Ngoài tích Star đổi bắp nước, các G-Stars và X-Stars còn được miễn phí đổi vị bắp. Mỗi năm, DK Cinema đều có chương trình tri ân siêu khủng cho các khách hàng thân thiết gồm nhiều phần quà, vé miễn phí hay bắp nước miễn phí.
                            </p>
                            <p>
                                <Link className='link-lich-chieu' to='/lich-chieu'>ĐẶT VÉ NGAY</Link> và trải nghiệm!
                            </p>
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
    );
}

export default AboutUs;