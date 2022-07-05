import React from 'react';
import Header from '../../components/Share/Header';
import Footer from '../../components/Share/Footer';
import FilmShowing from '../../components/Share/FilmShowing';
import { Link } from 'react-router-dom';

import "./Agreement.scss";

function Agreement() {
    return (
        <>
            <Header />
            <div className='container con-agree'>
                <div className='row row-agree'>
                    <div className='col-8 col-agree-left'>
                        <div className='breadcrumb list'>
                            <ol>
                                <li className='breadcrumb-item'>
                                    <Link to='/' className='link' aria-current='page'>Trang Chủ</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <Link to='/thoa-thuan' className='link' aria-current='page'>Thỏa Thuận</Link>
                                </li>
                            </ol>
                        </div>
                        <div className='title-agree'>
                            <h3>thỏa thuận</h3>
                        </div>
                        <div className='content-agree'>
                            <p>
                                Chào mừng bạn đã đến với website của DK Cinema. DK Cinema cung cấp các sản phẩm và dịch vụ dựa trên những điều kiện dưới đây.
                            </p>
                            <p>
                                Khi bạn sử dụng sản phẩm và dịch vụ do DK Cinema cung cấp, bạn đồng ý với những điều khoản sử dụng sau. Vui lòng đọc kỹ các điều khoản dưới đây.
                            </p>
                            <ol>
                                <li>bản quyền</li>
                                <p>
                                    Tất cả nội dung được hiển thị trên website và các sản phẩm liên quan DK Cinema dưới bất kỳ hình thức nào như ký tự, hình ảnh, logo, video clip… là tài sản của DK Cinema hoặc các đối tác cung cấp nội dung của DK Cinema, được bảo vệ bởi luật pháp Việt Nam và các quy định bản quyền quốc tế. Sự biên soạn và hiển thị các nội dung này thông qua DK Cinema là tài sản riêng của DK Cinema.
                                </p>
                                <li>quyền truy cập</li>
                                <p>
                                    Với điều kiện bạn tuân theo các Thỏa thuận sử dụng và các khoản thanh toán cho các dịch vụ bổ sung, bạn có quyền truy cập và sử dụng các dịch vụ của DK Cinema. Quyền truy cập này không bao gồm bất kỳ giao dịch mua đi bán lại hoặc sử dụng vì mục đích thương mại các dịch vụ và nội dung của DK Cinema; các thông tin mô tả, đánh giá, bình luận; bất kỳ sự sao chép hoặc download thông tin để phục vụ lợi ích của bên thứ ba; hoặc việc sử dụng các công cụ khai thác dữ liệu. DK Cinema có quyền khiếu nại tất cả các hành động sao chép, sử dụng với mục đích thương mại mà không được sự đồng ý từ DK Cinema. Bạn có thể bị tước quyền truy cập vào DK Cinema nếu bạn không tuân theo các Thỏa thuận sử dụng này.
                                </p>
                                <li>tài khoản của bạn</li>
                                <p>
                                    Nếu bạn sử dụng dịch vụ của DK Cinema, bạn có trách nhiệm duy trì sự bảo mật tài khoản và mật khẩu của bạn, cũng như hạn chế sự truy cập vào máy tính cá nhân. Bạn cũng đồng ý chịu trách nhiệm cho tất cả các hoạt động phát sinh dưới tài khoản và mật khẩu của bạn. Bạn có trách nhiệm đảm bảo các bộ phim hoặc sản phẩm bạn mua từ DK Cinema phù hợp với độ tuổi của bạn. DK Cinema có quyền đơn phương từ chối cung cấp dịch vụ, đóng tài khoản cá nhân, xóa bỏ hoặc thay đổi nội dung, hoặc hủy đơn hàng của bạn.
                                </p>
                                <li>bình luận, đánh giá và những nội dung khác</li>
                                <p>
                                    Khách hàng có thể đăng tải các bình luận/ đánh giá/những nội dung khác và gửi các gợi ý/ ý tưởng/ bình luận/ câu hỏi hoặc những loại thông tin khác nếu như những thông tin này không chứa các nội dung bất hợp pháp, đồi trụy, đe dọa, phỉ báng, xâm phạm quyền riêng tư cá nhân, xâm phạm quyền sở hữu trí tuệ, những nội dung gây hại cho bên thứ ba hoặc những nội dung không phù hợp với thuần phong mỹ tục; không chứa virus, nội dung vận động chính trị, nội dung mang tính thương mại hoặc bất kỳ hình thức thư rác nào.
                                </p>
                                <p>
                                    Khi bạn đăng tải thông tin hoặc gửi các loại tài liệu cho DK Cinema thì DK Cinema có toàn quyền sử dụng, sao chép, thay đổi, biên dịch, công bố, hiển thị nội dung đó cho tất cả mọi người dưới bất kỳ hình thức nào trừ trường hợp có thỏa thuận khác giữa DK Cinema và người dùng. Đồng thời, bạn cũng cho phép DK Cinema có quyền được sử dụng tên đi kèm với nội dung mà bạn gửi hoặc đăng tải. Bạn đảm bảo rằng bạn sở hữu và có toàn quyền sử dụng nội dung mà bạn đăng tải; rằng nội dung được đăng tải là chính xác; rằng việc sử dụng các nội dung bạn cung cấp không vi phạm Thỏa thuận sử dụng này và không gây hại cho bên thứ ba nào và rằng bạn sẽ bồi thường cho DK Cinema nếu như có bất kỳ khiếu kiện nào phát sinh từ những nội dung mà bạn cung cấp. DK Cinema có quyền nhưng không phải là nghĩa vụ kiểm soát và thay đổi hoặc xóa bỏ bất kỳ nội dung nào. DK Cinema không chịu bất kỳ trách nhiệm pháp lý nào cho những nội dung được đăng tải từ người dùng hoặc bất kỳ bên thứ 3 nào.
                                </p>
                                <li>thông tin phim, chương trình, sự kiện</li>
                                <p>
                                    DK Cinema luôn cố gắng cung cấp cho bạn những thông tin chính xác và đa chiều về các bộ phim có hệ thống phân phối vé thông qua DK Cinema. Nếu vé bạn nhận được không tương ứng với chỗ ngồi bạn chọn khi đặt, bạn vui lòng liên hệ với nhân viên chăm sóc khách hàng của DK Cinema để có thêm chi tiết theo email supports@DK.com.vn hoặc fanpage DK Cinema.
                                </p>
                                <p>
                                    Tuy nhiên, DK Cinema không chịu bất kỳ trách nhiệm nào liên quan đến mức độ yêu thích của bạn đối với bộ phim.
                                </p>
                                <li>giá cả</li>
                                <p>
                                    Trừ phi có ghi chú khác bằng văn bản, mức giá được hiển thị cho mỗi loại sản phẩm trên DK Cinema là mức giá bán lẻ cuối cùng của sản phẩm.
                                </p>
                                <p>
                                    Chúng tôi không cam kết mức giá của chỗ ngồi bạn đặt sẽ không thay đổi cho đến khi bạn đặt vé. Tuy nhiên, đối với những chỗ ngồi bị sai giá, nếu như mức giá của chỗ ngồi trên thực tế cao hơn mức giá hiển thị trên DK Cinema, thì chúng tôi sẽ liên lạc trực tiếp với bạn về vấn đề này.
                                </p>
                                <li>tình trạng chỗ ngồi</li>
                                <p>
                                    DK Cinema không cam kết chỗ ngồi bạn đang chọn chưa được khách hàng khác đặt cho đến khi bạn bắt đầu thanh toán cho đơn hàng của mình. Tuy nhiên, nếu bạn không nhận được đúng số ghế mà bạn đã đặt vì bất kỳ lý do gì, bạn vui lòng liên lạc với chúng tôi email supports@DK.com.vn hoặc fanpage DK Cinema.
                                </p>
                                <li>trách nhiệm pháp lý</li>
                                <p>
                                    Trừ phi có ghi chú khác bằng văn bản, tất cả dịch vụ, thông tin, nội dung, công cụ, sản phẩm (bao gồm cả phần mềm) của DK Cinema hoặc được hiển thị trên website và các sản phẩm liên quan của DK Cinema được cung cấp dựa trên các quy chế hoạt động của DK Cinema và các nhà cung cấp.
                                </p>
                                <p>
                                    Bạn đồng ý rằng việc sử dụng các dịch vụ, thông tin, nội dung, công cụ và sản phẩm của DK Cinema hoặc được hiển thị trên website và các sản phẩm liên quan của DK Cinema thuộc phạm trù rủi ro riêng của bạn. DK Cinema không bảo đảm cho bất kỳ dịch vụ, thông tin, nội dung, công cụ của DK Cinema hoặc được hiển thị trên website và các sản phẩm liên quan của DK Cinema. DK Cinema server và các thông điệp truyền thông được gửi đi từ DK Cinema không chứa virus hay bất kỳ tác nhân gây hại nào cho bạn. Trừ phi có ghi chú khác bằng văn bản, DK Cinema từ chối trách nhiệm pháp lý cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng các dịch vụ, thông tin, nội dung, công cụ và sản phẩm của DK Cinema hoặc được hiển thị trên website và các sản phẩm liên quan của DK Cinema.
                                </p>
                                <p>
                                    Nếu các bộ luật, và quy định pháp luật được ban hành bởi Nhà Nước có bất kỳ nội dung nào mâu thuẫn với bất kỳ quy định về từ chối bảo đảm và trách nhiệm pháp lý, thì những điểm quy định đó không có hiệu lực áp dụng đối với bạn. Điều này đồng nghĩa với việc bạn có quyền lợi bổ sung.
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

export default Agreement;