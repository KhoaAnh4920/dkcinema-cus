import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FacebookProvider, Like } from 'react-facebook';

export default function Footer() {
    return (
        <div className='home-footer container-fluid'>
            <div className='row row-footer'>
                <div className='col-3 col-footer-1'>
                    <ul>
                        <li ><a href='#'><h3>giới thiệu</h3></a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> về chúng tôi</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> thỏa thuận sử dụng</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> quy chế hoạt động</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> chính sách bảo mật</a></li>
                    </ul>
                </div>
                <div className='col-3 col-footer-2'>

                    <ul>
                        <li><a href='#'><h3>giới thiệu phim</h3></a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> review phim</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giới thiệu phim</a></li>
                    </ul>
                </div>
                <div className='col-3 col-footer-3'>

                    <ul>
                        <li><a href='#'><h3>hỗ trợ</h3></a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> tuyển dụng</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> góp ý</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giải đáp</a></li>
                    </ul>
                </div>
                <div className='col-3 col-footer-4'>
                    <h3>kết nối ngay với dk cinema</h3>
                    <div className='icon'>
                        <a href='https://www.facebook.com/' >
                            <i class="fa fa-facebook-square" aria-hidden="true"></i>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <i class="fa fa-youtube-play" aria-hidden="true"></i>
                        </a>
                    </div>

                </div>
            </div>
            <hr className='line' />
            <div className='row row-address'>
                <div className='col-12 col-address'>
                    <p>
                        tổng công ty cổ phần phim đa vũ trụ, tầng 82, tòa nhà landmark, 208 nguyễn hữu cảnh, phường 22, quận bình thạnh, <span>tphcm</span>
                    </p>
                </div>

                {/* <div className='col-6 col-address'>
                    <p>Bản quyền thuộc trường Đại Học Công Nghệ Sài Gòn</p>
                </div>
                <div className='col-6 col-address'>
                    <p>Địa Chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.Hồ Chí Minh</p>
                </div> */}
            </div>
        </div>
    )
}
