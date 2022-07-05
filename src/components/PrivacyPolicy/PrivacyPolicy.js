import React from 'react';
import Header from '../../components/Share/Header';
import Footer from '../../components/Share/Footer';
import FilmShowing from '../../components/Share/FilmShowing';
import { Link } from 'react-router-dom';
import "./PrivacyPolicy.scss";

function PrivacyPolicy(props) {
    return (
        <>
            <Header />
            <div className='container con-pri'>
                <div className='row row-pri'>
                    <div className='col-8 col-pri-left'>
                        <div className='breadcrumb list'>
                            <ol>
                                <li className='breadcrumb-item'>
                                    <Link to='/' className='link-about' aria-current='page'>Trang Chủ</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <Link to='/chinh-sach' className='link-about' aria-current='page'>Chính Sách</Link>
                                </li>
                            </ol>
                        </div>
                        <div className='title-pri'>
                            <h3>chính sách</h3>
                        </div>
                        <div className='content-pri'>
                            <ol>
                                <li className='out-item'>phạm vi thu thập thông tin</li>
                                <p>
                                    Việc cung cấp thông tin cá nhân của thành viên được thực hiện chủ yếu trực tiếp trên ứng dụng / website Galaxy Cinema trong quá trình thành viên đăng ký tài khoản và tương tác với Galaxy Cinema (Ví dụ, Galaxy Cinema sử dụng "cookies" giống như nhiều website khác để ghi nhận một số loại thông tin khi trình duyệt web của thành viên truy cập vào Galaxy Cinema hoặc các quảng cáo và các nội dung khác được hiển thị trên Galaxy Cinema, hoặc về Galaxy Cinema trên các website khác..) Các thông tin thu thập chủ yếu bao gồm: Họ tên, ngày tháng năm sinh, địa chỉ, số điện thoại, email, thông tin đăng nhập tài khoản (tên đăng nhập,, địa chỉ đăng nhập,...).
                                </p>
                                <p>
                                    Ngoài ra, khi tải ứng dụng Galaxy Cinema, ứng dụng sẽ yêu cầu người dùng cho phép truy cập thêm những thông tin trên thiết bị di động để cung cấp một số tính năng nâng cao. Sau khi nhận được thông báo, Khách hàng được quyền lựa chọn việc cho phép hay không cho phép thu thập thông qua cơ chế của ứng dụng.
                                </p>
                                <li className='out-item'>nguyên tắc thu thập và quản lý thông tin</li>
                                <p>
                                    Thông tin cá nhân của thành viên trên ứng dụng Galaxy Cinema được Galaxy Cinema cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của Galaxy Cinema, phù hợp với quy định của Luật Bảo về quyền lợi người tiêu dùng. Việc thu thập và sử dụng thông tin của mỗi Thành viên chỉ được thực hiện khi có sự đồng ý của thành viên đó trừ những trường hợp pháp luật có quy định khác. Thành viên có quyền cung cấp thông tin cá nhân cho Galaxy Cinema và có thể thay đổi quyết định đó vào bất cứ lúc nào.
                                </p>
                                <p>
                                    Mọi thông tin cá nhân do thành viên cung cấp sẽ được lưu giữ bởi Galaxy Cinema. Nhân viên và Đối tác của Galaxy Cinema trong quá trình thực hiện các mục đích nêu tại điều này có thể tiếp cận với thông tin của thành viên. Những chủ thể này có trách nhiệm giữ bí mật và chỉ được phép sử dụng thông tin của thành viên cho mục đích được chỉ định, không sử dụng cho mục đích của riêng họ (kể cả tiếp thị trực tiếp) trừ khi được thành viên đồng ý.
                                </p>
                                <p>
                                    Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, Galaxy Cinema sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.
                                </p>
                                <li className='out-item'>trách nhiệm của thành viên trong quá trình cung cấp và quản lý thông tin</li>
                                <p>
                                    Đảm bảo tính xác thực, đầy đủ, chính xác, và cập nhật thường xuyên đối với các thông tin cung cấp cho Galaxy Cinema và chịu trách nhiệm về tính pháp lý của những thông tin đó. Galaxy Cinema không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy thông tin cá nhân thành viên đó cung cấp không chính xác.
                                </p>
                                <p>
                                    Thông báo kịp thời cho Galaxy Cinema về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
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

export default PrivacyPolicy;