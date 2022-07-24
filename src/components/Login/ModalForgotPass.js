import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './ModalForgotPass.scss';
import { CommonUtils } from '../../utils';
import Captcha from '../Share/Captcha';

import { validateCaptcha } from 'react-simple-captcha';
import { toast } from 'react-toastify';

export default function ModalForgotPass(props) {


    const [allValues, setAllValues] = useState({
        email: ''
    });


    const doSubmit = () => {
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (!validateCaptcha(user_captcha)) {
            alert('Captcha Does Not Match');
            document.getElementById('user_captcha_input').value = "";
            return false;
        }
        return true;
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    const handleGenerateCode = () => {

        const genCode = makeid(9);

        setAllValues((prevState) => ({
            ...prevState,
            code: genCode
        }));

    }



    useEffect(() => {
        // async function fetchDataTypeFood() {
        //     // You can await here
        //     let dataType = await getAllTypeFood();


        //     if (dataType && dataType.dataTypeFood) {
        //         let listTypeFood = buildDataInputSelect(dataType.dataTypeFood)

        //         setAllValues((prevState) => ({
        //             ...prevState,
        //             listTypeFood: listTypeFood
        //         }));
        //     }
        // }
        // fetchDataTypeFood();

    }, []);



    const toggle = () => {
        props.toggleFromParent();
    }




    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

        if (!allValues.email) {
            toast.error("Vui lòng điền email")
            return;
        }
        let check = doSubmit();

        if (check) {
            setAllValues((prevState) => ({
                ...prevState,
                isShowLoading: true
            }));

            let allValuesInput = { ...allValues };
            props.sendMailResetPass(allValuesInput);
        }

        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: false
        }));

    }

    const handleOnChangeDatePickerStart = (date) => {
        setAllValues({ ...allValues, timeStart: date[0] })
    }

    const handleOnChangeDatePickerEnd = (date) => {
        setAllValues({ ...allValues, timeEnd: date[0] })
    }


    return (
        <Modal className={'modal-add-forgotPass'} isOpen={props.isOpen} toggle={() => toggle()} centered size="md-down" >
            <ModalHeader toggle={() => toggle()} className='titleModal' >
                <h5 className='title'>Quên mật khẩu</h5>
                <div className="text-heading">
                    <span className="sub-text">Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi link kích hoạt cho bạn.</span>
                </div>
            </ModalHeader>
            <ModalBody className='modal-body-container'>
                <div className='modal-add-forgotPass-body'>
                    <div className='input-container'>
                        <div className='input-row'>
                            <div className='form-name-forgotPass'>
                                <div className='label-forgotPass'>
                                    <input type="text" className="form-control input-small" value={allValues.email} placeholder="Email" name='email' onChange={changeHandler} />
                                </div>
                            </div>
                            <div className="form-group col-12 capcha-form">
                                <Captcha />
                            </div>


                        </div>

                    </div>
                </div>
            </ModalBody>
            <ModalFooter className='modal-footer-container'>
                {/* <Button color="primary" className='btn btn-save-edit' onClick={() => handleSubmit()}>Save</Button> */}

                <Button variant="primary" {...allValues.isShowLoading && 'disabled'} className="btn btn-submit" onClick={() => handleSubmit()}>
                    {allValues.isShowLoading &&
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
                    {!allValues.isShowLoading &&
                        <>
                            <span className="visually">CẤP LẠI MẬT KHẨU</span>
                        </>
                    }
                </Button>


            </ModalFooter>
        </Modal>
    )
}
