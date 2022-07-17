import React, { useEffect, useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { getNewsByType } from '../../services/NewsServices';
import "./DiscountList.scss";
import km1 from '../../assets/khuyenmai/km1.jpg';
import km2 from '../../assets/khuyenmai/km2.jpg';
import km3 from '../../assets/khuyenmai/km3.jpg';
import { data } from 'jquery';

function DiscountList() {
    let history = useHistory();
    const redirectDiscountDetail = (id) => {
        history.push(`/chi-tiet-review/${id}`);
    }
    const [allDis, setAllDis] = useState({
        listDis: [],
    })
    async function fetchDataDis(type) {
        const dataDis = await getNewsByType(type);
        console.log(dataDis);
        if (dataDis && dataDis.data) {
            setAllDis({
                listDis: dataDis.data
            })
        }
    }
    useEffect(() => {
        fetchDataDis(3);
    }, [])
    return (
        <>
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
                    <FilmShowing />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DiscountList;