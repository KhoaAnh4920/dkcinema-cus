import React, { useEffect, useState } from 'react';
import { getListMovieByStatus } from '../../services/MovieServices';
import { Link } from "react-router-dom";
//import css file
import "./FilmShowing.scss";

function FilmShowing() {
    const [allValuesStt, setAllValuesStt] = useState({
        listMovieStt: []
    });


    async function fetchDataMovie(status) {
        // You can await here
        const dataMovieStt = await getListMovieByStatus(status);
        //  console.log("dataMovie: ", dataMovieStt);

        if (dataMovieStt && dataMovieStt.data) {
            setAllValuesStt({
                listMovieStt: dataMovieStt.data
            })
        }
    }


    useEffect(() => {
        fetchDataMovie(1);
    }, [])



    return (
        <>
            <div className='col-4 col-right'>
                <div className='title'>
                    <h5>phim đang chiếu</h5>
                </div>
                <div className='col-image'>
                    {
                        allValuesStt.listMovieStt.map((item, index) => {
                            return (
                                <div className='image-pdc'>
                                    {
                                        item.ImageOfMovie.map((item1, index1) => {
                                            if (item1.typeImage === 1) {
                                                return (
                                                    <img src={item1.url} key={index1} />
                                                )
                                            }

                                        })
                                    }
                                    <p className='vn'>{item.name}</p>
                                    <p className='eng'>{item.transName}</p>
                                </div>
                            )

                        })
                    }

                    <div className='link-read-more'>
                        {/* <a href='#'>Xem Thêm</a> */}
                        <Link to="/phim-dang-chieu">Xem thêm</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilmShowing;