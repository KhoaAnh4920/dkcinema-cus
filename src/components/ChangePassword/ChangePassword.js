import React, { useState, useEffect } from 'react';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import imageChange from "../../assets/doi_mat_khau.png";
import "./ChangePassword.scss";
import { selectLanguage, updateLanguage, userState } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { customerChangePassword } from '../../services/UserService';
import { useHistory } from "react-router-dom";





function ChangePassword() {
    let history = useHistory();
    let selectUser = useSelector(userState);
    const [allValues, setAllValues] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        prePassword: '',
        isShowLoadingButton: false
    });


    useEffect(() => {


    }, []);



    useEffect(() => {

        setAllValues((prevState) => ({
            ...prevState,
            email: selectUser.userInfo.email
        }));

    }, [selectUser]);


    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }


    const hanldeSubmitPass = async () => {
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingButton: true
        }));

        if (allValues.newPassword !== allValues.prePassword) {
            toast.error("Mật khẩu không trùng khớp")
            return;
        }
        let datatRes = await customerChangePassword({
            email: allValues.email,
            currentPassword: allValues.currentPassword,
            newPassword: allValues.newPassword
        })

        if (datatRes && datatRes.errCode === 0) {
            toast.success("Đổi mật khẩu thành công")
            history.push('/');
            return;
        } else {
            toast.error(datatRes.errMessage)
        }
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoadingButton: false
        }));
    }


    return (
        <div>
            <Header />
            <div className='container-fluid box-change' >
                <div className='container con-change'>
                    <div className='row row-input-change'>
                        <div className='col-left'>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail" className='col-label'>Nhập mật khẩu hiện tại</label>
                                <input type="password" className="form-control col-input"
                                    onChange={changeHandler}
                                    value={allValues.currentPassword}
                                    placeholder="" name='currentPassword'
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12" >
                                <label htmlFor="exampleInputEmail" className='col-label'>nhập mật khẩu mới</label>
                                <input type="password" className="form-control col-input"
                                    onChange={changeHandler}
                                    value={allValues.newPassword}
                                    placeholder="" name='newPassword'
                                    id='exampleInputEmail' />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail" className='col-label'>nhập lại mật khẩu</label>
                                <input type="password" className="form-control col-input"
                                    placeholder="" name='prePassword'
                                    onChange={changeHandler}
                                    value={allValues.prePassword}
                                    id='exampleInputEmail' />
                            </div>

                            <div className="form-group col-12">
                                <div className='col-label'></div>
                                <Button variant="primary" {...allValues.isShowLoadingButton && 'disabled'} className="col-input btn-change" onClick={hanldeSubmitPass} >
                                    {allValues.isShowLoadingButton &&
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="visually" style={{ marginLeft: '10px' }}>Loading...</span>
                                        </>

                                    }
                                    {!allValues.isShowLoadingButton &&
                                        <>
                                            <span className="visually">đổi mật khẩu</span>
                                        </>
                                    }
                                </Button>

                            </div>

                        </div>
                        <div className=' col-right' >
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