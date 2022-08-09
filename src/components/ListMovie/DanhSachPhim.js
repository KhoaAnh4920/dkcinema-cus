import React, { useEffect, useState } from 'react';
import './DanhSachPhim.scss';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FormattedMessage } from 'react-intl';


import { useHistory } from "react-router-dom";
import { getListMovieByStatus } from '../../services/MovieServices';
import 'antd/dist/antd.min.css'

import { Pagination } from 'antd';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { Image, Button } from 'react-bootstrap';





function DanhSachPhim() {

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

        // console.log(dataMovie);

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
        // console.log(current);
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
        // console.log("dataMovie: ", dataMovie);

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

            <Header />

            <div className='list-movie-container'>
                <div className='title-list'>
                    <a name='pdc' className={titleDefault.isShowTitleDangChieu ? 'playing-movie active disable' : 'playing-movie'} onClick={handleClickTitle} ><FormattedMessage id="homeHeader.nowShowing" /></a>
                    <span>|</span>
                    <a name='psc' className={titleDefault.isShowTitleSapChieu ? 'upcoming-movie active disable' : 'upcoming-movie'} onClick={handleClickTitle}><FormattedMessage id="homeHeader.commingSoon" /></a>
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
                    <div className='list-movie col-12 container'>
                        <div className='row'>
                            {
                                allValues.listMovie && allValues.listMovie.length > 0 &&
                                allValues.listMovie.map((item, index) => {
                                    return (
                                        <div className='col-image' key={index} >
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
                                                    <Button size='md' variant='warning' className='btn__show'><FormattedMessage id="homeHeader.buyTicket" /></Button>
                                                </div>

                                            </div>
                                            <div className='text-detail'>
                                                <p onClick={() => { getDetailMovie(item.id) }} style={{ marginBottom: '2px' }}>{item.name}</p>
                                                <p style={{ color: '#a0a3a7' }} className='desc-film'>{item.transName} </p>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                        <Pagination
                            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                            responsive={true}
                            onChange={onChangePagination}
                            total={allValues.totalData}
                            pageSize={6}
                            current={pageCurrent}
                        />

                    </div>
                </LoadingOverlay>

            </div>

            <Footer />

        </>
    );
}

export default DanhSachPhim;
