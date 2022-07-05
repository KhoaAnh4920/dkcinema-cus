import React from 'react';
import Header from '../../components/Share/Header';
import Footer from '../../components/Share/Footer';
import FilmShowing from '../../components/Share/FilmShowing';
import { Link } from 'react-router-dom';
import "./OperatingReluration.scss";
function OperatingReluration() {
    return (
        <>
            <Header />
            <div className='container  con-op'>
                <div className='row row-op'>
                    <div className='col-8 col-op-left'>
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
                        <div className='title-op'>
                            <h3>quy chế</h3>
                        </div>
                        <div className='content-op'>
                            <p>
                                Xin vui lòng đọc quy chế hoạt động và điều khoản sử dụng trước khi bạn chính thức sử dụng DK Cinema. Khi bạn tiếp tục truy cập và sử dụng website này và các sản phẩm liên quan đến DK Cinema có nghĩa là bạn đã đồng ý và chấp nhận quy chế hoạt động và điều khoản sử dụng. Nếu bạn không đồng ý, vui lòng không sử dụng website hay bất kỳ sản phẩm nào của DK Cinema.
                            </p>
                            <ol>
                                <li className='out-item'>chấp nhận và đồng ý các điều khoản sử dụng</li>
                                <p>
                                    Chào mừng và cám ơn bạn đã chọn sử dụng dịch vụ của DK Cinema. Khi đã sử dụng website và các sản phẩm liên quan đến DK Cinema đồng nghĩa với việc bạn đã chấp nhận và đồng ý với những ràng buộc về mặt pháp lý, và tuân thủ theo quy chế hoạt động và điều khoản sử dụng của website.
                                </p>
                                <p>
                                    DK Cinema có quyền thay đổi, bổ sung quy chế hoạt động và điều khoản sử dụng trên website và các sản phẩm liên quan vào bất cứ lúc nào. Người sử dụng có trách nhiệm cập nhật và theo dõi những thay đổi mới nhất trên website DK Cinema. Nếu bạn không đồng ý với những thay đổi mới nhất, bạn có quyền yêu cầu ngưng sử dụng tài khoản tại website và các sản phẩm liên quan của DK Cinema.
                                </p>
                                <li className='out-item'>tạo tài khoản và chế độ bảo mật</li>
                                <p>
                                    Khi đăng ký tham gia DK Cinema, bạn vui lòng:
                                </p>
                                <ul>
                                    <li className='in-item'>
                                        Cung cấp những thông tin chính xác, đầy đủ theo bản đăng ký mẫu của DK Cinema.
                                    </li>
                                    <li className='in-item'>
                                        Duy trì và cập nhật những thông tin, thay đổi mới nhất một cách chính xác và đầy đủ.
                                    </li>
                                </ul>
                                <p>
                                    Sự không chính xác của những thông tin bạn cung cấp có thể làm bạn không tận dụng được hết những sản phẩm và dịch vụ DK Cinema cung cấp. Trong một số trường hợp đặc biệt, DK Cinema có quyền từ chối cung cấp dịch vụ cho bạn và đình chỉ tài khoản của bạn vào thời điểm hiện tại và trong tương lai nếu những thông tin mà bạn cung cấp không chính xác hoặc DK Cinema có lý do nghi ngờ tính trung thực của những thông tin mà bạn cung cấp.
                                </p>
                                <p>
                                    Chúng tôi sẽ không sử dụng những thông tin cá nhân của bạn nếu chưa được sự cho phép của bạn. Bạn có thể yên tâm rằng khi bạn cung cấp thông tin cho DK Cinema, thông tin của bạn luôn được bảo mật tuyệt đối. Thông tin của bạn chỉ được sử dụng với mục đích gửi thông báo cho bạn về phim ảnh, các chương trình khuyến mãi… DK Cinema cam kết sẽ không tiết lộ thông tin của bạn cho một bên thứ ba mà không có sự đồng ý, ngoại trừ yêu cầu cung cấp bởi pháp luật.
                                </p>
                                <li className='out-item'>sự cố phát sinh</li>
                                <p>
                                    Khi đã sử dụng dịch vụ của DK Cinema, bạn đã chấp nhận một số sự cố có thể phát sinh trong quá trình truy cập và đồng ý rằng DK Cinema và các đối tác liên quan sẽ không chịu trách nhiệm pháp lý về những thất thoát, thiệt hại xảy ra một cách trực tiếp hay gián tiếp trong khi truy cập vào website và các sản phẩm liên quan, khi tải dữ liệu, không loại trừ những tổn hại do virus, những tác động ảnh hưởng đến hệ thống máy tính, đường dây điện thoại, huỷ hoại các chương trình phần cứng, phần mềm, các trở ngại của đường truyền máy vi tính hoặc kết nối mạng.
                                </p>
                                <li className='out-item'>ý kiến, bình luận, tranh chấp của người sử dụng</li>
                                <p>
                                    DK Cinema không chịu trách nhiệm sàng lọc, chỉnh sửa hoặc giám sát nội dung được người sử dụng đăng tải lên website và các sản phẩm liên quan, cũng như không thể đảm bảo tính chính xác của những ý kiến, bình luận này. Nếu nhận được thông tin về những vi phạm, gây tổn hại hoặc bất hợp pháp, DK Cinema có quyền điều tra những cáo buộc trên để xác minh, và có quyền quyết định chấm dứt cung cấp dịch vụ đối với thành viên vi phạm những điều khoản sử dụng.
                                </p>
                                <p>
                                    Mặc dù đã có những quy định nêu trên, nhưng DK Cinema cũng như những cá thể, tập thể liên quan không thể bảo đảm có thể chỉnh sửa hoặc xoá bỏ lập tức những nội dung vi phạm. Cũng như chúng tôi không phải chịu trách nhiệm pháp lý đối với những nội dung do người dùng đăng tải trên DK Cinema. Đồng thời, bạn cũng có trách nhiệm cho mối liên hệ giữa bạn và những người dùng khác. DK Cinema có quyền, nhưng không có nghĩa vụ theo dõi các tranh chấp giữa các người dùng với nhau.
                                </p>
                                <li className='out-item'>ngưng cung cấp dịch vụ</li>
                                <p>
                                    DK Cinema có quyền ngưng cung cấp dịch vụ cho người dùng nếu vi phạm những điều sau đây:
                                </p>
                                <ul>
                                    <li className='in-item'>
                                        Thông tin bạn cung cấp không chính xác, không đầy đủ, không trung thực, hoặc DKcine.vn  có căn cứ để nghi ngờ độ chính xác của thông tin.
                                    </li>
                                    <li className='in-item'>
                                        Đăng tải lên website và các sản phẩm liên quan những nội dung không phù hợp như những nội dung có tính chất khiêu dâm, đồi truỵ, phỉ báng, thô tục, gây hiểu lầm, hoặc phạm pháp.
                                    </li>
                                    <li className='in-item'>
                                        Quấy rối, đe doạ hoặc phân biệt một cá nhân hoặc một tập thể vì lý do giới tính, tôn giáo, khuynh hướng tình dục, chủng tộc, dân tộc, tuổi tác hoặc khuyết tật.
                                    </li>
                                </ul>
                                <p>
                                    DK Cinema không chịu trách nhiệm với những nội dung do thành viên đăng tải và sẽ cung cấp những nội dung này cho các cơ quan có thẩm quyền trong trường hợp cần thiết.
                                </p>
                                <li className='out-item'>nội dung</li>
                                <p>
                                    Những thông tin được đăng tải trên DK Cinema được cung cấp cho bạn và không kèm theo bất kỳ cam kết nào, DK Cinema không bảo đảm hoặc chịu trách nhiệm về độ chính xác, độ xác thực, độ tin cậy của việc sử dụng hoặc kết quả của việc sử dụng những dữ liệu này. DK Cinema luôn cố gắng cập nhật toàn bộ thông tin một cách kịp thời nhưng chúng tôi không bảo đảm rằng những nội dung hiện tại là mới nhất hoặc chính xác nhất.
                                </p>
                                <p>
                                    Tất cả thông tin, bao gồm nội dung, phần mềm, dữ liệu… được đăng tải lên website và các sản phẩm liên quan của DK Cinema đều thuộc bản quyền của DK Cinema, bạn có thể tải về và sử dụng. Tuy nhiên, những nội dung đó không thuộc quyền sở hữu của bạn nên chúng tôi nghiêm cấm mua bán, phân phối, bẻ khoá, sao chép, sửa đổi hay sử dụng bất kỳ nội dung nào mà không có sự đồng ý của DK Cinema.
                                </p>
                                <li className='out-item'>bản quyền sở hữu</li>
                                <p>
                                    DK Cinema là chủ bản quyền của website và các sản phẩm liên quan. DK Cinema có quyền chỉnh sửa, thay đổi, sắp xếp lại nội dung website và các sản phẩm liên quan. Việc chỉnh sửa, thay đổi, sắp xếp lại hoặc tái sử dụng những nội dung này mà không có sự đồng ý của DK Cinema đều là vi phạm quyền lợi hợp pháp của DK Cinema.
                                </p>
                                <p>
                                    DK Cinema luôn tôn trọng sở hữu trí tuệ của người khác, và chúng tôi yêu cầu người dùng của chúng tôi cũng làm như vậy. Chúng tôi luôn cố gắng đảm bảo những dữ liệu trên website và các sản phẩm liên quan đều là hợp pháp, nhưng chúng tôi không chắc chắn có thể kiểm soát tất cả thông tin trên website và các sản phẩm liên quan. Khi phát hiện được bất kỳ hành vi vi phạm bản quyền nào trên website và các sản phẩm liên quan, Ban quản trị sẽ xoá nội dung đó khỏi website một cách nhanh nhất có thể.
                                </p>
                                <li className='out-item'>các website liên kết</li>
                                <p>
                                    Ngoại trừ nội dung trên website và các sản phẩm liên quan của DK Cinema, chúng tôi không trực tiếp hay gián tiếp quản lý những website liên kết. DK Cinema không hợp tác, tài trợ, xác thực hay sát nhập với những website đó, trừ khi sự hợp tác đó được công bố rõ ràng. Khi truy cập vào DK Cinema, chúng tôi hy vọng bạn có thể hiểu rằng DK Cinema không kiểm soát, quản lý những trang liên kết và không chịu trách nhiệm về nội dung của bất kỳ website liên kết nào.
                                </p>
                                <li className='out-item'>dừng sử dụng dịch vụ</li>
                                <p>
                                    Bạn có thể dừng việc sử dụng tài khoản của bạn bất cứ khi nào bằng cách thông báo cho supports@DK.com.vn. Bạn sẽ nhận được e-mail xác nhận và tài khoản của bạn sẽ ngưng hoạt động trong vòng 2 ngày làm việc. Bạn sẽ chịu trách nhiệm cho tất cả các chi phí phát sinh (nếu có) cho đến khi tài khoản ngưng hoạt động.
                                </p>
                            </ol>
                        </div>
                    </div>
                    <FilmShowing />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OperatingReluration;