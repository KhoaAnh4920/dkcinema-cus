import React from 'react';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import imageChange from "../../assets/doi_mat_khau.png";
import "./ChangePassword.scss";
function ChangePassword() {
    return (
        <div>
            <Header />
            <div className='container-fluid box-change' >
                <div className='container con-change'>
                    <div className='row row-input-change'>
                        <div className='col-7 col-left'>
                            <div className="form-group col-12" >
                                <label htmlFor="exampleInputEmail" className='col-3'>nhập mật khẩu mới</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail" className='col-3'>nhập lại mật khẩu</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail" className='col-3'>mã xác nhận</label>
                                <input type="text" className="form-control col-9"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail' />
                            </div>
                            <div className='text-warning form-group col-12'>
                                <div className='col-3'>&nbsp;</div>
                                <div className='col-9'>
                                    mã xác nhận đã được gửi qua email của bạn
                                </div>

                            </div>
                            <div className="form-group col-12">
                                <div className='col-3'></div>
                                <button className='col-9 btn-change'>đổi mật khẩu</button>
                            </div>

                        </div>
                        <div className='col-5 col-right' >
                            <img src={imageChange} />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default ChangePassword;