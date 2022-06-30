import React, { useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import './DetailFilmIntro.scss';

function DetailFilmIntro() {
    return (
        <>
            <Header />
            <div className='container con-intro-de'>
                <div className='row row-intro-de'>
                    <div className='col-8 col-de-intro-left'>
                        <div className='title-intro-de'>
                            doctor strange
                        </div>
                        <hr />
                        <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div>
                        <div className='content-intro-de'>
                            <img className='img-intro-de' src="https://www.galaxycine.vn/media/2022/5/25/trailer-thor-love-and-thunder-tiet-lo-ke-sat-than-dang-so-1_1653469768353.jpg" />
                            <p>
                                Trận đánh máu lửa vừa xong, bộ ba quyết định đi lấp đầy bụng trước rồi mới tính tiếp. Chavez cho biết cô bé đang bị săn lùng. Strange giải thích Người Nhện là ai. Ở vũ trụ Chavez sống không tồn tại Spider-Man. Họ cùng thảo luận về phép thuật. Sau đó, Strange đến tìm Wanda nhờ giúp đỡ. Anh thừa nhận đã làm đa vũ trụ hỗn loạn và cần Wanda ra tay. Và rồi, đoạn spoil kết thúc!

                                Chắc hẳn, một số khoảnh khắc được chỉnh sửa để tránh tiết lộ nội dung. Tuy nhiên, điều chắc chắn là Doctor Strange In The Multiverse Of Madness mở đầu rất nhanh và đi thẳng vào vấn đề. Đây đúng là Sam Raimi với bộ ba Spider-Man huyền thoại mà chúng ta từng yêu thích.

                                Cũng tại Cinema Con, “trùm cuối” Marvel – Kevin Feige tiết lộ họ đang lên kế hoạch cho các phim Marvel trong thập kỉ mới.

                                Đa vũ trụ mở ra, MCU ngày càng bành trướng. Hãy cùng chờ xem Phase 4 của vũ trụ điện ảnh Marvel và loạt phim series mới.

                                Lỡ tay làm phép khiến đa vũ trụ nảy sinh vấn đề ở Spider-Man: No Way Home, Doctor Strange “trả nghiệp” thế nào trong Doctor Strange In The Multiverse Of Madness?

                                Có thể nói, chưa bao giờ Stephen Strange phải đối mặt với nhiều mối nguy như hiện tại. “Scarlet Witch” Wanda Maximoff tẩy não cả thị trấn (WandaVision), Loki và Sylvie quậy tung Cơ quan quản lí phương sai thời gian (Loki) và đỉnh điểm là điều ước thay đổi quá nhiều lần của Spider-Man Peter Parker khiến mọi thứ vô cùng hỗn loạn.

                                Cố gắng giải quyết vấn đề, Stephen Strange tìm đến Wanda, nhờ cô giúp đỡ. Tuy nhiên, nữ phù thủy vừa trải qua nỗi đau mất đi những người thân yêu cộng thêm tâm tính bất ổn có phải là cộng sự thích hợp? Wanda đáng thương sẽ thành phản diện ở phần này?

                                Người bạn cũ Mordo nay đã quay lưng và trở thành kẻ thù không đội trời chung với  Strange quay trở lại. Gần như chắc chắn, hắn là kẻ ngáng đường.

                                Chưa dừng lại ở đó, một phiên bản hắc ám của Doctor Strange – mạnh hơn và điên cuồng hơn cũng góp mặt. Gã đến từ đâu và mục đích của gã là gì? Strange hắc ám này là Strange Supreme từng khuấy đảo series What If…?

                                Bi đát hơn, cô người yêu Christine của Strange sắp bước vào lễ đường mà chú rể chẳng phải là anh. Điểm sáng hiếm hoi là phù thủy tối thượng Wong vẫn sát cánh bên Strange. Ngoài ra, America Chavez sẽ xuất hiện. Cô bé được dự đoán tham gia nhóm Young Avengers cùng Yelena, Kate Bishop và Spider-Man.

                                Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn do Sam Raimi ngồi ghế chỉ đạo. Vị đạo diễn lừng danh này chính là người cầm trịch 3 phần Spider-Man kinh điển mà Tobey Maguire đóng chính. Phim quy tụ dàn diễn viên hùng hậu Benedict Cumberbatch, Elizabeth Olsen, Rachel McAdams, Chiwetel Ejiofor, Benedict Wong, Michael Stuhlbarg, Xochitl Gomez…

                                Phim mới Doctor Strange In The Multiverse Of Madness ra mắt tại các rạp chiếu phim từ 04.05.2022.
                            </p>
                        </div>
                    </div>
                    <FilmShowing />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailFilmIntro;