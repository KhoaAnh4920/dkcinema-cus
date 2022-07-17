import React, { useEffect, useState } from 'react';
import logo from '../../assets/DKCinema.png';
import doctor from '../../assets/doctor.jpg';
import './DanhSachPhim.scss';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../redux/userSlice";
import { LANGUAGES } from '../../utils/constant';

import { useHistory } from "react-router-dom";
import { getListMovieByStatus } from '../../services/MovieServices';

//import Pagination from 'react-bootstrap/Pagination';
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css'

import { Pagination } from 'antd';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { Image, Button } from 'react-bootstrap';





function DanhSachPhim() {
    // const language = useSelector(selectLanguage);
    // const dispatch = useDispatch();


    // const changeLanguage = (language) => {
    //     // fire redux event: actions

    //     console.log(language);
    //     dispatch(updateLanguage(language));
    // }
    const [allValues, setAllValues] = useState({
        listMovie: [],
        totalData: 1,
        isShowLoading: true
    });
    const [titleDefault, setTitleDefault] = useState({
        isShowTitleDangChieu: true,
        isShowTitleSapChieu: false,
    });

    const [pageCurrent, setPageCurrent] = useState(1);
    let history = useHistory();






    async function onChangePagination(current) {
        // call api //
        let dataMovie = [];

        if (titleDefault.isShowTitleDangChieu) {
            dataMovie = await getListMovieByStatus(1, current, 6);
        } else {
            dataMovie = await getListMovieByStatus(0, current, 6);
        }

        console.log(dataMovie);

        setAllValues({
            listMovie: dataMovie.data,
            totalData: dataMovie.totalData
        })

        // dispatch(
        //     getList({
        //         ...paramFilter,
        //         page: current,
        //     })
        // );
        setPageCurrent(current);
        console.log(current);
    }

    const handleClickTitle = async e => {
        if (titleDefault.isShowTitleDangChieu) {
            await fetchDataMovie(0);
        } else {
            await fetchDataMovie(1);
        }
        if (e.target.name === 'pdc') {
            setTitleDefault({
                isShowTitleDangChieu: true,
                isShowTitleSapChieu: false,
            })
        } else {
            setTitleDefault({
                isShowTitleSapChieu: true,
                isShowTitleDangChieu: false,
            })
        }
    }

    async function fetchDataMovie(status) {
        // You can await here
        const dataMovie = await getListMovieByStatus(status);
        console.log("dataMovie: ", dataMovie);

        if (dataMovie && dataMovie.data) {
            setAllValues({
                listMovie: dataMovie.data,
                isShowLoading: false,
                totalData: dataMovie.totalData
            })
        }
    }
    useEffect(() => {
        fetchDataMovie(1);
    }, [])

    const getDetailMovie = (id) => {
        //alert(id);
        history.push(`/chi-tiet-phim/${id}`);
    }

    const handleClickFilms = (item) => {
        history.push(`/dat-ve-qua-phim/${item.id}`)
    }







    return (
        <>
            <LoadingOverlay
                active={allValues.isShowLoading}
                spinner={<ClipLoader color='#fff' size={50} />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgb(10 10 10 / 68%)',
                    })
                }}
            >
                <Header />

                <div className='list-movie-container'>
                    <div className='title-list'>
                        <a name='pdc' className={titleDefault.isShowTitleDangChieu ? 'playing-movie active' : 'playing-movie'} onClick={handleClickTitle}>phim đang chiếu</a>
                        <span>|</span>
                        <a name='psc' className={titleDefault.isShowTitleSapChieu ? 'upcoming-movie active' : 'upcoming-movie'} onClick={handleClickTitle}>phim sắp chiếu</a>
                    </div>
                    <div className='list-movie col-12 container'>
                        <div className='row'>
                            {
                                allValues.listMovie && allValues.listMovie.length > 0 &&
                                allValues.listMovie.map((item, index) => {
                                    return (
                                        <div className='col-4 col-image' key={index} >
                                            <div className='image' onClick={() => handleClickFilms(item)}>
                                                {
                                                    item.ImageOfMovie.map((item1, index1) => {
                                                        if (item1.typeImage === 1) {
                                                            return (
                                                                <Image style={{ height: '250px' }} src={item1.url} className='image__img' key={index1} />
                                                            )
                                                        }
                                                    })
                                                }

                                                <div className='image__overlay image__overlay--primary'>
                                                    <Button size='md' variant='warning' className='btn__show'>Đặt vé</Button>
                                                </div>

                                            </div>
                                            <div className='text-detail'>
                                                <p onClick={() => { getDetailMovie(item.id) }} style={{ marginBottom: '2px' }}>{item.name}</p>
                                                <p style={{ color: '#a0a3a7' }} className='desc-film'>{item.transName} </p>
                                            </div>

                                        </div>

                                        // <div className='col-4 film' onClick={() => getDetailMovie(item.id)} key={index}>
                                        //     {
                                        //         item.ImageOfMovie.map((item1, index1) => {
                                        //             if (item1.typeImage === 1) {
                                        //                 return (
                                        //                     <img src={item1.url} className='img-film' key={index1} />
                                        //                 )
                                        //             }

                                        //         })
                                        //     }

                                        //     <a href='#' className='name-film'>{item.name}</a>
                                        //     <p className='desc-film'>{item.transName}</p>
                                        // </div>
                                    )

                                })
                            }

                        </div>

                        {/* <Pagination className={'paginationStyle'} size="sm">
                        <Pagination.Prev />
                        <Pagination.Item active activeLabel="" className={'paginationItemStyle'}>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination> */}
                        <Pagination
                            style={{ display: 'flex', justifyContent: 'center' }}
                            responsive={true}
                            onChange={onChangePagination}
                            total={allValues.totalData}
                            pageSize={6}
                            current={pageCurrent}
                        />

                    </div>

                </div>

                <Footer />

            </LoadingOverlay>


        </>
    );
}

export default DanhSachPhim;
