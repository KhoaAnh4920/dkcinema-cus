import React from 'react';
import Select from 'react-select';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import "./AccountProfile.scss";
import useLocationForm from "./useLocationForm";

function AccountProfile() {
    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm(true);

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;
    return (
        <div>
            <Header />
            <div className='container con-info-u'>
                <div className='row row-info-u'>
                    <div className='col-6 col-u-left'>
                        <div className='row row-info'>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail" className='col-12'>họ và tên</label>
                                <input type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail' readOnly />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail1" className='col-12'>địa chỉ email</label>
                                <input type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail1' readOnly />
                            </div>
                        </div>
                        <div className='row row-info'>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail2" className='col-12'>số điện thoại</label>
                                <input type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail2' readOnly />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail3" className='col-12'>giới tính</label>
                                <input type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail3' readOnly />
                            </div>
                        </div>
                        <div className='row row-info'>
                            <div className="form-group col-12">
                                <label htmlFor="exampleInputEmail4" className='col-12'>ngày sinh</label>
                                <input type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail4' readOnly />
                            </div>
                        </div>
                        <div className='row row-info'>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail5" className='col-12'>tỉnh/ thành phố</label>
                                <Select
                                    name="cityId"
                                    key={`cityId_${selectedCity?.value}`}
                                    isDisabled={cityOptions.length === 0}
                                    options={cityOptions}
                                    onChange={(option) => onCitySelect(option)}
                                    placeholder="Tỉnh/Thành"
                                    defaultValue={selectedCity}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail" className='col-12'>quận/ huyện</label>
                                <Select
                                    name="districtId"
                                    key={`districtId_${selectedDistrict?.value}`}
                                    isDisabled={districtOptions.length === 0}
                                    options={districtOptions}
                                    onChange={(option) => onDistrictSelect(option)}
                                    placeholder="Quận/Huyện"
                                    defaultValue={selectedDistrict}
                                />
                            </div>
                        </div>
                        <div className='row row-info'>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail6" className='col-12'>phường/ xã</label>
                                <Select
                                    name="wardId"
                                    key={`wardId_${selectedWard?.value}`}
                                    isDisabled={wardOptions.length === 0}
                                    options={wardOptions}
                                    placeholder="Phường/Xã"
                                    onChange={(option) => onWardSelect(option)}
                                    defaultValue={selectedWard}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail7" className='col-12'>số nhà và tên đường</label>
                                <input style={{ height: '55px' }} type="text" className="form-control col-12"
                                    placeholder="" name='phone'
                                    id='exampleInputEmail7' />
                            </div>
                        </div>
                    </div>
                    <div className='col-5 col-u-right'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{ fontSize: '13pt' }}>Avatar</label>
                            <div className="custom-file">
                                <input type="file"
                                    className="custom-file-input"
                                    id="customFile" />
                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                            </div>
                            <div className="imgPreview">
                                <img src="" />
                                <div className="previewText">Please select an Image for Preview</div>
                            </div>
                        </div>
                        <div className='row btn-save'>
                            <button className='btn btn-primary'>Lưu</button>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className='container show-infor' style={{ maxWidth: '1400px' }}>
                <div className='title'>
                    <h5>thông tin cá nhân</h5>
                </div>
                <div className='row row-1st'>
                    <div className='col-6 col-infor'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail" className='col-12'>họ và tên</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail' readOnly />
                        </div>
                    </div>
                    <div className='col-6 col-infor'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail1" className='col-12'>địa chỉ email</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail1' readOnly />
                        </div>
                    </div>
                </div>
                <div className='row row-2nd'>
                    <div className='col-4 col-infor'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail2" className='col-12'>số điện thoại</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail2' readOnly />
                        </div>
                    </div>
                    <div className='col-4 col-infor'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail3" className='col-12'>giới tính</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail3' readOnly />
                        </div>
                    </div>
                    <div className='col-4 col-infor'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail4" className='col-12'>ngày sinh</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail4' readOnly />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='title-2'>
                    <h5>
                        địa chỉ liên hệ
                    </h5>
                </div>
                <div className='row row-add'>
                    <div className='col-3 col-add'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail5" className='col-12'>tỉnh/ thành phố</label>
                            <Select
                                name="cityId"
                                key={`cityId_${selectedCity?.value}`}
                                isDisabled={cityOptions.length === 0}
                                options={cityOptions}
                                onChange={(option) => onCitySelect(option)}
                                placeholder="Tỉnh/Thành"
                                defaultValue={selectedCity}
                            />
                        </div>
                    </div>
                    <div className='col-3 col-add'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail" className='col-12'>quận/ huyện</label>
                            <Select
                                name="districtId"
                                key={`districtId_${selectedDistrict?.value}`}
                                isDisabled={districtOptions.length === 0}
                                options={districtOptions}
                                onChange={(option) => onDistrictSelect(option)}
                                placeholder="Quận/Huyện"
                                defaultValue={selectedDistrict}
                            />
                        </div>
                    </div>
                    <div className='col-3 col-add'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail6" className='col-12'>phường/ xã</label>
                            <Select
                                name="wardId"
                                key={`wardId_${selectedWard?.value}`}
                                isDisabled={wardOptions.length === 0}
                                options={wardOptions}
                                placeholder="Phường/Xã"
                                onChange={(option) => onWardSelect(option)}
                                defaultValue={selectedWard}
                            />
                        </div>
                    </div>
                    <div className='col-3 col-add'>
                        <div className="form-group col-12">
                            <label htmlFor="exampleInputEmail7" className='col-12'>số nhà và tên đường</label>
                            <input type="text" className="form-control col-12"
                                placeholder="" name='phone'
                                id='exampleInputEmail7' />
                        </div>
                    </div>
                </div>
                <div className='row btn-save'>
                    <button className='btn btn-primary'>Lưu</button>
                </div>
            </div> */}
            <Footer />
        </div>
    );
}

export default AccountProfile;