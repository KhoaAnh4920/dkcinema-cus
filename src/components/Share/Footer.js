import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FacebookProvider, Like } from 'react-facebook';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';




export default function Footer() {
    return (
        <div className='home-footer container-fluid'>
            <div className='row row-footer'>
                <div className='col-footer-1'>
                    <ul>
                        <li ><h3><FormattedMessage id="footer.introduce" /></h3></li>
                        <li><Link to='/ve-chung-toi'><FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.aboutUs" /></Link></li>
                        <li><Link to='/thoa-thuan'><FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.termsOfUse" /></Link></li>
                        <li><Link to='/quy-che-hoat-dong'><FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.operatingRegulation" /></Link></li>
                        <li><Link to='/chinh-sach'><FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.privacyPolicy" /></Link></li>
                    </ul>
                </div>
                <div className='col-footer-2'>

                    <ul>
                        <li><h3><FormattedMessage id="footer.cinemaBlog" /></h3></li>
                        <li><Link to='/review-phim'> <FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.movieReview" /></Link></li>
                        <li><Link to='/gioi-thieu-phim'> <FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.movieBlog" /></Link></li>
                        {/* <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> review phim</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giới thiệu phim</a></li> */}
                    </ul>
                </div>
                <div className='col-footer-3'>

                    <ul>
                        <li><h3><FormattedMessage id="footer.support" /></h3></li>
                        <li><Link to=''> <FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.career" /></Link></li>
                        <li><Link to='/phan-hoi'> <FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.feedback" /></Link></li>
                        <li><Link to='/ho-tro'> <FontAwesomeIcon icon={faAngleDoubleRight} /><FormattedMessage id="footer.answers" /></Link></li>

                        {/* <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> tuyển dụng</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> góp ý</a></li>
                        <li><a href='#'><FontAwesomeIcon icon={faAngleDoubleRight} /> giải đáp</a></li> */}
                    </ul>
                </div>
                <div className='col-footer-4'>
                    <h3><FormattedMessage id="footer.dkcinema" /></h3>
                    <div className='icon'>
                        <Link to='https://www.facebook.com/'>
                            <i class="fa fa-facebook-square" aria-hidden="true"></i>
                        </Link>
                        <Link to='https://www.youtube.com/'>
                            <i class="fa fa-youtube-play" aria-hidden="true"></i>
                        </Link>
                        {/* <a href='https://www.facebook.com/' >
                            <i class="fa fa-facebook-square" aria-hidden="true"></i>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <i class="fa fa-youtube-play" aria-hidden="true"></i>
                        </a> */}
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
