import React, { useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import Ratings from '../Share/Rating';
import { Rating } from 'react-simple-star-rating'

//import css
import "./DetailReviewFilm.scss";

function DetailReviewFilm() {
    const [show, setShow] = useState(false);
    const handleClickShow = () => {
        setShow(!show);
    }
    const [hovering, setHovering] = useState(false);
    const handleMouseOver = () => {
        setHovering(true);
    }
    const handleMouseLeave = () => {
        setHovering(false);
    }
    const [rating, setRating] = useState(0);
    return (
        <div>
            <Header />
            <div className='container con-de'>
                <div className='row row-de'>
                    <div className='col-8 col-de-left'>
                        <div className='row row-de-1'>
                            <p>
                                REVIEW <span>|</span> Nghề Siêu Dễ: Hài hước và không kém phần ý nghĩa
                            </p>
                        </div>
                        <hr />
                        <div className='row row-de-fc'>
                            <li><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></li>
                            <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">9.5</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>
                            <li><button className='btn btn-warning btn-review' onMouseOver={handleMouseOver} onClick={handleMouseLeave}>Đánh giá</button></li>
                            {
                                hovering && <Ratings />
                            }
                        </div>
                        <div className='row row-content-de'>
                            <p>
                                Những năm gần đây, điện ảnh Việt ngày càng có nhiều sự tiến bộ khi chứng kiến nhiều tác phẩm chất lượng ra đời. Với đa dạng đề tài từ hành động, hài, tình cảm…, các nhà làm phim đã chứng tỏ được tay nghề thông qua nhiều tựa phim đạt được thành công tại phòng vé.

                                Ngoài việc phát triển ý tưởng từ kịch bản gốc, phim remake cũng là một hướng đi mới mẻ của ngành phim ảnh trong nước. Từ có nhiều cái tên được Việt hóa từ nội dung nước ngoài, nhưng vẫn được sự đón nhận của đông đảo người xem.

                                Dịp lễ 30/4 sắp đến, Nghề Siêu Dễ sẽ là lựa chọn hoàn hảo cho những ai muốn có giờ phút thư giãn vui vẻ bên gia đình, bạn bè và người yêu.

                                Dựa trên phiên bản Extreme Job của Hàn Quốc, nhà sản xuất Thu Trang cùng đạo diễn Võ Thanh Hòa đã thảo luận, thay đổi vài chi tiết để cho ra thành phẩm Nghề Siêu Dễ mang đậm bản sắc Việt.
                            </p>
                            <img className='col-12 img__de' src="https://www.galaxycine.vn/media/2022/6/23/1135-1_1655988278572.jpg" />
                        </div>
                        <div className={`row row-content-readmore ${show === true ? 'active-readmore' : ''}`}>
                            <p >
                                Những năm gần đây, điện ảnh Việt ngày càng có nhiều sự tiến bộ khi chứng kiến nhiều tác phẩm chất lượng ra đời. Với đa dạng đề tài từ hành động, hài, tình cảm…, các nhà làm phim đã chứng tỏ được tay nghề thông qua nhiều tựa phim đạt được thành công tại phòng vé.

                                Ngoài việc phát triển ý tưởng từ kịch bản gốc, phim remake cũng là một hướng đi mới mẻ của ngành phim ảnh trong nước. Từ có nhiều cái tên được Việt hóa từ nội dung nước ngoài, nhưng vẫn được sự đón nhận của đông đảo người xem.

                                Dịp lễ 30/4 sắp đến, Nghề Siêu Dễ sẽ là lựa chọn hoàn hảo cho những ai muốn có giờ phút thư giãn vui vẻ bên gia đình, bạn bè và người yêu.

                                Dựa trên phiên bản Extreme Job của Hàn Quốc, nhà sản xuất Thu Trang cùng đạo diễn Võ Thanh Hòa đã thảo luận, thay đổi vài chi tiết để cho ra thành phẩm Nghề Siêu Dễ mang đậm bản sắc Việt.
                            </p>
                        </div>
                        <div className='row btn-readmore-de'>
                            <button onClick={() => handleClickShow()}>{show ? "Show Less" : "Show More"}</button>
                        </div>
                        <div className='comment-film'>
                            <div className='title-cmt'>
                                <h5>bình luận phim</h5>
                            </div>
                            <div className='form-cmt'>
                                <textarea className='area-51'></textarea>
                            </div>
                            <div className='btn-send'>
                                <button>Gửi</button>
                            </div>
                            <div className='row rating-cmt'>
                                Chọn số sao:&nbsp;<Ratings />
                            </div>
                        </div>
                        <div className='show-comment'>
                            <div className='user-name'>
                                Van a
                            </div>
                            <div className='number-rate'>
                                <Rating
                                    iconsCount={10}
                                    readonly={true}
                                    //ratingValue={10}
                                    initialValue={7}
                                    size={30}
                                />
                            </div>
                            <div className='content-cmt'>
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                    </div>

                    <FilmShowing />
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default DetailReviewFilm;