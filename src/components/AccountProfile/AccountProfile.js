import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Footer from '../Share/Footer';
import Header from '../Share/Header';
import "./AccountProfile.scss";
import useLocationForm from "./useLocationForm";
import { Image, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { CommonUtils } from '../../utils';
import Swal from 'sweetalert2';
import { getUserByExternalId, updateUserService, getTicketCustomer } from '../../services/UserService';
import { selectLanguage, updateLanguage, userState, processLogoutUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { testFunction } from './useLocationForm';
import { userLoginSuccess } from '../../redux/userSlice';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import moment from 'moment';
import DatePicker from '../Share/DatePicker';
import { getListMovieByStatus } from '../../services/MovieServices';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";







function AccountProfile() {
    let history = useHistory();
    const dispatch = useDispatch();
    let selectUser = useSelector(userState);
    const fileUploader = useRef(null);
    const [tabDefault, setTabDefault] = useState({
        isShowTab1: true,
        isShowTab2: false,
    });
    const [allValues, setAllValues] = useState({
        phone: '',
        userName: '',
        email: '',
        fullName: '',
        address: '',
        listGender: [],
        listRoles: [],
        testCity: { value: 278, label: 'An Giang' },
        selectedGender: '',
        selectedRoles: '',
        districtCode: {},
        cityCode: {},
        wardCode: {},
        address: '',
        selectedMovieTheater: '',
        isShowMovieTheater: true,
        errors: {},
        isShowLoading: true,
        isShowLoadingButton: false,
        imagePreviewUrl: 'https://res.cloudinary.com/cdmedia/image/upload/v1646921892/image/avatar/Unknown_b4jgka.png',
        activeTab: 'Tab1',
        listBooking: [],
        startTime: null,
        endTime: null,
    });

    const customStyles = {
        input: (provided, state) => ({
            ...provided,
            width: 100,
            height: 20,
            display: 'flex',
            alignItems: 'center',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            marginTop: 2,
        }),
    };

    let { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm(false);

    let {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;



    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (type === 'GENDERS') {
            result = [
                { value: 1, label: 'Nam' },
                { value: 0, label: 'Nữ' },
            ];
        }
        if (inputData && inputData.length > 0) {
            if (type === 'ROLES') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.rolesName;
                    object.value = item.id;
                    result.push(object);
                })
            } else {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.tenRap;
                    object.value = item.id;
                    result.push(object);
                })
            }

        }
        return result;
    }

    const handleOpenUploadFile = () => {
        fileUploader.current.click();
    }

    const _handleImageChange = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        /*------------ Duck ------------*/
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            Swal.fire({
                title: 'Missing data?',
                text: "Sai định dạng ảnh!",
                icon: 'warning',
            })
        }
        /*------------ Duck ------------*/

        else if (file) {
            let base64 = await CommonUtils.getBase64(file);
            reader.onloadend = () => {
                setAllValues({
                    ...allValues,
                    file: file,
                    imagePreviewUrl: reader.result,
                    avatar: base64,
                    fileName: file.name
                })
            }

            reader.readAsDataURL(file)
        }
    }


    const handleOnChangeDatePicker = (date) => {
        setAllValues({ ...allValues, birthday: date[0] })
    }

    const handleOnChangeDatePickerEndTime = async (date) => {
        setAllValues({ ...allValues, endTime: date[0] })

        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true,

        }));

        let endTime = date[0];
        const resDataTicket = await getTicketCustomer({
            cusId: allValues.id,
            startTime: (allValues.startTime) ? new Date(allValues.startTime).getTime() : null,
            endTime: new Date(endTime).getTime(),
        });
        setAllValues({ ...allValues, isShowLoading: false, endTime: date[0], listBooking: (resDataTicket && resDataTicket.data) ? resDataTicket.data : [] })
    }

    const handleOnChangeDatePickerStartTime = async (date) => {
        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true,

        }));

        let startTime = date[0];
        const resDataTicket = await getTicketCustomer({
            cusId: allValues.id,
            startTime: new Date(startTime).getTime(),
            endTime: (allValues.endTime) ? new Date(allValues.endTime).getTime() : null,
        });
        setAllValues({ ...allValues, isShowLoading: false, startTime: date[0], listBooking: (resDataTicket && resDataTicket.data) ? resDataTicket.data : [] })
    }


    useEffect(() => {


    }, []);

    const setDefaultValue = (inputData, value) => {
        let result = inputData.filter(item => item.value === value);
        if (result) {
            return result;
        }
    }


    const handleSetTab = (data) => {


        setAllValues((prevState) => ({
            ...prevState,
            isShowLoading: true,
        }));


        setTabDefault((prevState) => ({
            isShowTab1: !prevState.isShowTab1,
            isShowTab2: !prevState.isShowTab2,
        }));



        setAllValues((prevState) => ({
            ...prevState,
            activeTab: data,
            isShowLoading: false
        }));
    }




    useEffect(() => {
        async function fetchEditUser() {
            const res = await getUserByExternalId(selectUser.userInfo.externalid);
            const resDataTicket = await getTicketCustomer({
                cusId: selectUser.userInfo.id
            });
            let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);

            if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
                dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 4)
            } else
                dataMovieUpcoming = []

            // console.log('resDataTicket: ', resDataTicket)

            let listGender = buildDataInputSelect([], 'GENDERS');

            let dataUser = {}
            if (res && res.data) {
                dataUser = res.data
            }

            let selectedGender = setDefaultValue(listGender, (dataUser.gender) ? 1 : 0);

            let location = '';
            if (dataUser.cityCode && dataUser.districtCode && dataUser.wardCode)
                location = await testFunctionParent(dataUser.cityCode, dataUser.districtCode, dataUser.wardCode);

            setAllValues((prevState) => ({
                ...prevState,
                id: dataUser.id,
                fullName: dataUser.fullName,
                location: location,
                phone: dataUser.phone,
                email: dataUser.email,
                userName: dataUser.userName,
                imagePreviewUrl: dataUser.avatar,
                address: dataUser.address,
                birthday: dataUser.birthday,
                listGender: listGender,
                selectedGender,
                isShowLoading: false,
                listBooking: (resDataTicket && resDataTicket.data) ? resDataTicket.data : [],
                dataMovieUpcoming: dataMovieUpcoming,
            }));


        }
        async function testFunctionParent(cityCode, districtCode, wardCode) {
            const location = await testFunction(cityCode, districtCode, wardCode);

            if (location)
                return location;
            return null;

        }
        fetchEditUser();

    }, [selectUser]);



    useEffect(() => {


        if (allValues.location && allValues.location.cityOptions) {

            state.cityOptions = allValues.location.cityOptions;
            state.districtOptions = allValues.location.districtOptions;
            state.wardOptions = allValues.location.wardOptions;
            state.selectedCity = allValues.location.selectedCity;
            state.selectedDistrict = allValues.location.selectedDistrict;
            state.selectedWard = allValues.location.selectedWard;

            setAllValues((prevState) => ({
                ...prevState
            }));
        }
    }, [allValues.location])


    const handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...allValues };
        stateCopy[stateName] = selectedOption;

        setAllValues({ ...stateCopy })
    }

    const hanldeUpdateProfile = async () => {
        let allValuesInput = { ...allValues, selectedCity, selectedDistrict, selectedWard };

        setAllValues({
            ...allValues,
            isShowLoadingButton: true
        })


        let formatedDate = new Date(allValues.birthday).getTime(); // convert timestamp //

        let res = await updateUserService({
            fullName: allValues.fullName,
            birthday: formatedDate,
            phone: allValues.phone,
            gender: allValues.selectedGender.value,
            address: allValues.address,
            avatar: allValues.avatar,
            fileName: allValues.fileName,
            cityCode: selectedCity.value,
            districtCode: selectedDistrict.value,
            wardCode: selectedWard.value,
            externalid: selectUser.userInfo.externalid,
            roleId: 4,
        })

        if (res && res.errCode == 0) {
            // history.push("/users-management")
            toast.success("Cập nhật thành công");
            dispatch(userLoginSuccess({
                email: allValues.email,
                roleId: 4,
                fullName: allValues.fullName,
                avatar: allValues.imagePreviewUrl,
                externalid: selectUser.userInfo.externalid,
                phone: allValues.phone,
                isActive: true,
                id: allValues.id,
                accessToken: selectUser.userInfo.accessToken,

            }));
        } else {
            // history.push("/users-management")
            toast.error("Cập nhật thất bại");
        }

        setAllValues({
            ...allValues,
            isShowLoading: false
        })
    }

    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }


    const handleClickDetailFilms = (item) => {
        history.push(`/chi-tiet-phim/${item.id}`)
    }

    const handleClickFilms = (item) => {
        history.push(`/dat-ve-qua-phim/${item.id}`)
        window.location.reload();
    }



    return (
        <div className='profile-main'>
            <Header />

            <div className="tabbable-panel">
                <div className="tabbable-line">
                    <ul className="nav nav-tabs mb-3 ">
                        <li className={tabDefault.isShowTab1 ? 'active' : ''}>
                            <a className='nav-link profile-user' id="ex1-tab-1" onClick={() => handleSetTab('Tab1')} data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab" aria-controls="ex1-tabs-1" aria-selected="true">Thông tin thành viên</a>
                        </li>
                        <li className={tabDefault.isShowTab2 ? 'active' : ''}>
                            <a className='nav-link my-transfer' id="ex1-tab-2 my-tranfer" onClick={() => handleSetTab('Tab2')} data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab" aria-controls="ex1-tabs-2" aria-selected="false">Giao dịch của tôi</a>
                        </li>

                    </ul>
                </div>
            </div>


            <LoadingOverlay
                active={allValues.isShowLoading}
                spinner={<ClipLoader color='#FCAF17' size={50} />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: '#fff',
                    })
                }}
            >

                <div className='container con-info-u' style={{ display: (allValues.activeTab === "Tab1" ? 'block' : 'none') }}>
                    <div className='avatar-user-container'>
                        <div className='grap-avatar'>
                            <div className='avatar-main'>
                                <img className='avatar-user' onClick={handleOpenUploadFile} src={allValues.imagePreviewUrl} />
                                <input
                                    id='uploadFile'
                                    ref={fileUploader}
                                    accept="image/*"
                                    hidden type='file'
                                    onChange={(e) => _handleImageChange(e)}
                                />
                            </div>
                            <button className="btn btn-update-avatar" onClick={handleOpenUploadFile}><i className='fas fa-pencil-alt'></i></button>
                            <div className='name-user'>
                                <div className='text'>
                                    <span className='fullname'>{allValues.fullName}</span>
                                    <span className='address-user'>{allValues.address}</span>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='input-form-container'>
                        <div className='form-main'>

                            <div className='input-flex' style={{ marginTop: '0px' }}>
                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="email" className="form-control input-small" onChange={changeHandler} value={allValues.email} disabled name='email' placeholder="Email" />
                                </div>

                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Họ tên</label>
                                    <input type="text" className="form-control input-small" onChange={changeHandler} value={allValues.fullName} name='fullName' placeholder="Họ tên" />
                                </div>

                            </div>
                            <div className='input-flex'>
                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                    <input type="text" className="form-control input-small" name='phone' onChange={changeHandler} value={allValues.phone} placeholder="Số điện thoại" />
                                </div>

                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Giới tính</label>

                                    <Select
                                        className='gender-select'
                                        value={allValues.selectedGender}
                                        onChange={handleChangeSelect}
                                        options={allValues.listGender}
                                        placeholder='Chọn...'
                                        name='selectedGender'
                                        styles={customStyles}

                                    />
                                </div>
                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Ngày sinh</label>

                                    <DatePicker
                                        onChange={handleOnChangeDatePicker}
                                        className="form-control"
                                        name="birthday"
                                        value={allValues.birthday}
                                    />
                                </div>

                            </div>
                            <div className='input-flex'>
                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Thành phố</label>
                                    <Select
                                        className='city-select'
                                        name="cityId"
                                        key={`cityId_${selectedCity?.value}`}
                                        isDisabled={cityOptions.length === 0}
                                        options={cityOptions}
                                        onChange={(option) => onCitySelect(option)}
                                        placeholder="City"
                                        defaultValue={state.selectedCity}
                                        styles={customStyles}
                                    />
                                </div>

                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Quận</label>
                                    <Select
                                        className='district-select'
                                        name="districtId"
                                        key={`districtId_${selectedDistrict?.value}`}
                                        isDisabled={districtOptions.length === 0}
                                        options={districtOptions}
                                        onChange={(option) => onDistrictSelect(option)}
                                        placeholder="District"
                                        defaultValue={selectedDistrict}
                                        styles={customStyles}
                                    />
                                </div>

                                <div className='input-content'>
                                    <label htmlFor="exampleInputEmail1">Phường</label>
                                    <Select
                                        className='ward-select'
                                        name="wardId"
                                        key={`wardId_${selectedWard?.value}`}
                                        isDisabled={wardOptions.length === 0}
                                        options={wardOptions}
                                        placeholder="Phường/Xã"
                                        onChange={(option) => onWardSelect(option)}
                                        defaultValue={selectedWard}
                                        styles={customStyles}
                                    />
                                </div>

                            </div>
                            <div className='input-content' style={{ marginTop: '30px' }}>
                                <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                                <input type="text" className="form-control input-small" value={allValues.address} onChange={changeHandler} name='address' placeholder="Địa chỉ" />
                            </div>
                            <div className='submit-container'>
                                <Button variant="primary" {...allValues.isShowLoadingButton && 'disabled'} className="btn-update-profile" onClick={hanldeUpdateProfile} >
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
                                            <span className="visually">Lưu thay đổi</span>
                                        </>
                                    }
                                </Button>

                            </div>

                        </div>
                    </div>
                </div>

                <div className='container con-info-u' style={{ display: (allValues.activeTab === "Tab2" ? 'block' : 'none') }}>
                    <div className="form-group horizon-form form-filter">

                        <div className='horizon-input input-date'>
                            <label htmlFor="exampleInputEmail1">Từ</label>
                            <DatePicker
                                onChange={handleOnChangeDatePickerStartTime}
                                className="form-control"
                                value={allValues.startTime || {}}
                            />
                        </div>
                        <div className='horizon-input input-date'>
                            <label htmlFor="exampleInputEmail1">Đến</label>
                            <DatePicker
                                onChange={handleOnChangeDatePickerEndTime}
                                className="form-control"
                                value={allValues.endTime || {}}
                            />
                        </div>




                    </div>
                    <div className='table-payment-container'>
                        <Table striped bordered hover className='table-member' size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ngày</th>
                                    <th>Mã book</th>
                                    <th>Số lượng vé đặt</th>
                                    <th>Rạp</th>
                                    <th>Phim</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allValues.listBooking.length > 0 && allValues.listBooking.map((item, index) => {
                                    // console.log('item.BookingTicket[0].TicketShowtime.RoomShowTime.MovieTheaterRoom: ', item.BookingTicket[0].TicketShowtime.RoomShowTime.MovieTheaterRoom.tenR)
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{moment(item.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                                            <td>{item.id}</td>
                                            <td>{item.BookingTicket.length}</td>
                                            <td>{item.BookingTicket[0].TicketShowtime.RoomShowTime.MovieTheaterRoom.tenR}</td>
                                            <td>{item.BookingTicket[0].TicketShowtime.ShowtimeMovie.name}</td>
                                            <td>{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>

                </div>

                <div className='container col-12 col-right'>
                    <div className='title'>
                        <Link to="/phim-dang-chieu">phim đang chiếu</Link>
                    </div>
                    <div className='col-image'>
                        {
                            allValues.dataMovieUpcoming && allValues.dataMovieUpcoming.length > 0 && allValues.dataMovieUpcoming.map((item, index) => {
                                return (
                                    <>
                                        <div className='item-movie'>
                                            <div className='image' key={index} onClick={() => handleClickFilms(item)}>
                                                {
                                                    item.ImageOfMovie.map((item1, index1) => {
                                                        if (item1.typeImage === 2) {
                                                            return (
                                                                <Image style={{ width: '230px', height: '320px' }} src={item1.url} className='image__img' key={index1} />
                                                            )
                                                        }
                                                    })
                                                }

                                                <div className='image__overlay image__overlay--primary'>
                                                    <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                                </div>

                                            </div>
                                            <div className='text-detail' onClick={() => handleClickDetailFilms(item)}>
                                                <p className='vn'>{item.name}</p>
                                            </div>
                                        </div>

                                    </>


                                )

                            })
                        }
                    </div>
                </div>

            </LoadingOverlay>

            <Footer />
        </div>
    );
}

export default AccountProfile;