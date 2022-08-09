import React, { useEffect, useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { getNewsByType } from '../../services/NewsServices';
import "./DiscountList.scss";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { getListMovieByStatus } from '../../services/MovieServices';
import InCommingFilms from '../Share/InCommingFilms';
import { FormattedMessage } from 'react-intl';




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


            <Header />
            <LoadingOverlay
                active={allDis.isShowLoading}
                spinner={<ClipLoader color='#FCAF17' size={50} />}
                styles={{
                    wrapper: {
                        // width: '400px',
                        // height: '400px',
                        overflow: 'hidden'
                    },
                    overlay: (base) => ({
                        ...base,
                        background: '#fff',
                    })
                }}
            >
                <div className='container con-dis'>
                    <div className='row row-dis'>
                        <div className='col-list-dis'>
                            <div className='title-discount'>
                                <h5><FormattedMessage id="homeHeader.promotionNews" /></h5>
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
                            </div>
                        </div>
                        <InCommingFilms
                            dataMovieUpcoming={allDis.dataMovieUpcoming}
                        />
                    </div>
                </div>
            </LoadingOverlay>
            <Footer />


        </>
    );
}

export default DiscountList;