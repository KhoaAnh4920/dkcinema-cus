import React, { useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import Rating from '../Share/Rating';

//import css
import "./DetailReviewFilm.scss";

function DetailReviewFilm() {
    const [show, setShow] = useState(false);
    const handleClickShow = () => {
        setShow(!show);
    }
    return (
        <div>
            <Header />
            <div className='container con-de'>
                <div className='row row-de'>
                    <div className='col-8 col-de-left'>
                        <div className='row row-de-1'>

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
                            <div className='rating-cmt'>
                                <Rating />
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