import React from 'react';
import './InCommingFilms.scss';
import { Image, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';




export default function InCommingFilms(props) {
    let history = useHistory();

    const handleClickFilms = (item) => {
        history.push(`/dat-ve-qua-phim/${item.id}`)
        // window.location.reload();
    }

    const handleClickDetailFilms = (item) => {
        history.push(`/chi-tiet-phim/${item.id}`)
    }


    return (
        <div className='col-right'>
            <div className='title'>
                <h5><FormattedMessage id="homeHeader.nowShowing" /></h5>
            </div>
            <div className='col-image'>
                {
                    props.dataMovieUpcoming && props.dataMovieUpcoming.length > 0 && props.dataMovieUpcoming.map((item, index) => {
                        return (
                            <>
                                <div className='image' key={index} onClick={() => handleClickFilms(item)}>
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
                                <div className='text-detail' onClick={() => handleClickDetailFilms(item)}>
                                    <p className='vn'>{item.name}</p>
                                    <p className='eng'>{item.transName}</p>
                                </div>
                            </>
                        )

                    })
                }

                <div className='link-read-more'>
                    {/* <a href='#'>Xem Thêm</a> */}
                    <Link to="/phim-dang-chieu"><FormattedMessage id="homeHeader.loadMore" /></Link>
                </div>
            </div>
        </div>
    )
}
