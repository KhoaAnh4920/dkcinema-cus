import React, { useEffect, useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { getNewsByType } from '../../services/NewsServices';
import "./DiscountList.scss";
import { data } from 'jquery';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { getListMovieByStatus } from '../../services/MovieServices';
import InCommingFilms from '../Share/InCommingFilms';





function DiscountList() {
    let history = useHistory();
    const redirectDiscountDetail = (id) => {
        history.push(`/chi-tiet-review/${id}`);
    }
    const [allDis, setAllDis] = useState({
        listDis: [],
        isShowLoading: true,
        dataMovieUpcoming: [],
    })
    async function fetchDataDis(type) {
        const dataDis = await getNewsByType(type);

        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []


        // console.log(dataDis);
        if (dataDis && dataDis.data) {
            setAllDis({
                listDis: dataDis.data,
                isShowLoading: false,
                dataMovieUpcoming: dataMovieUpcoming,
            })
        }
    }
    useEffect(() => {
        fetchDataDis(3);
    }, [])
    return (
        <>
            <LoadingOverlay
                active={allDis.isShowLoading}
                spinner={<ClipLoader color='#fff' size={50} />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgb(10 10 10 / 68%)',
                    })
                }}
            >

                <Header />
                <div className='container con-dis'>
                    <div className='row row-dis'>
                        <div className='col-8 col-list-dis'>
                            <div className='title-discount'>
                                <h5>khuyến mãi</h5>
                            </div>
                            <div className='row row-img-dis'>
                                {
                                    allDis.listDis && allDis.listDis.length > 0
                                    && allDis.listDis.map((item, index) => {
                                        return (
                                            <div className='img-dis'>
                                                <img src={item.thumbnail} className="image__" />
                                                <div className='image__overlay__dis image__overlay--primary'>
                                                    <Button size='md' variant='warning' className='btn__show' onClick={() => redirectDiscountDetail(item.id)}>Chi tiết</Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className='img-dis'>
                                <img src={km1} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show' onClick={redirectDiscountDetail}>Chi tiết</Button>
                                </div>
                            </div>

                            <div className='img-dis'>
                                <img src={km2} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                                </div>
                            </div>
                            <div className='img-dis'>
                                <img src={km3} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                                </div>
                            </div> */}
                            </div>
                            {/* <div className='row row-img-dis-2'>
                            <div className='img-dis'>
                                <img src={km1} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                                </div>
                            </div>

                            <div className='img-dis'>
                                <img src={km2} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                                </div>
                            </div>
                            <div className='img-dis'>
                                <img src={km3} className="image__" />
                                <div className='image__overlay__dis image__overlay--primary'>
                                    <Button size='md' variant='warning' className='btn__show'>Chi tiết</Button>
                                </div>
                            </div>
                        </div> */}
                        </div>
                        <InCommingFilms
                            dataMovieUpcoming={allDis.dataMovieUpcoming}
                        />
                    </div>
                </div>
                <Footer />

            </LoadingOverlay>
        </>
    );
}

export default DiscountList;