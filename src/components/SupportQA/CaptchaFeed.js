import React, { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import "./CaptchaFeed.scss";


function CaptchaFeed() {
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const doSubmit = () => {
        let user_captcha = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha) === true) {
            alert('Captcha Matched');
            loadCaptchaEnginge(6);
            document.getElementById('user_captcha_input').value = "";
        }

        else {
            alert('Captcha Does Not Match');
            document.getElementById('user_captcha_input').value = "";
        }
    }
    return (
        <>
            <div className='capcha-main-feed'>
                <div className='row'>
                    <div className="col-12 captcha">
                        <LoadCanvasTemplate reloadText="<i class='fa fa-refresh' aria-hidden='true'></i>" />
                    </div>
                    <div className='input-form col-12'>
                        <input placeholder="Nhập mã captcha" className='form-control input-capcha' id="user_captcha_input" name="user_captcha_input" type="text"></input>
                    </div>

                </div>
            </div>


            {/* <div className="col mt-3">
                <div><button class="btn btn-primary" onClick={() => doSubmit()}>Submit</button></div>
            </div> */}
        </>
    );
}

export default CaptchaFeed;