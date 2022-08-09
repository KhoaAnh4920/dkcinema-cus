import React, { Children, useEffect, useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import Ratings from '../Share/Rating';
import { Link, useParams } from 'react-router-dom';
import './SearchPage.scss';
import { getSearchMovie } from '../../services/MovieServices';
import { useHistory } from "react-router-dom";



export default function SearchPage() {
    let history = useHistory();
    const [allValues, setAllValues] = useState({
        listResult: [],
        kw: '',
        keyInput: ''
    })

    async function fetchSearchMovie(keyword) {
        let dataMovie = await getSearchMovie(keyword);
        // console.log('dataMovie: ', dataMovie);
        if (dataMovie && dataMovie.data) {
            setAllValues({
                listResult: dataMovie.data,
                kw: keyword,
                keyInput: keyword
            })
        }
    }

    useEffect(() => {
        let url = window.location.href;
        if (url.includes('?')) {
            const keyword = new URLSearchParams(window.location.search).get('keyword');
            fetchSearchMovie(keyword)

        }
    }, [])

    useEffect(() => {
        let url = window.location.href;
        if (url.includes('?')) {
            const newKeyword = new URLSearchParams(window.location.search).get('keyword');

            if (newKeyword !== allValues.keyword) {
                fetchSearchMovie(newKeyword)
            }

        }

    }, [window.location.href])


    const fetchDetailMovie = (value) => {

        history.push(`/chi-tiet-phim/${value.id}`)
    }


    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            // setIsShowLoading(true);

            // Send Axios request here
            fetchSearchMovie(allValues.keyInput)
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [allValues.keyInput])

    const clearKeyword = () => {
        setAllValues((prevState) => ({
            ...prevState,
            keyInput: ''
        }));
    }


    return (
        <>
            <Header />
            <div className='search-page-main'>
                <div className='container'>
                    <div className='row'>
                        <div className='search-bar'>
                            <input type='text' name='keyInput' value={allValues.keyInput} onChange={(e) => setAllValues({ ...allValues, [e.target.name]: e.target.value })} placeholder='Tim kiem' className='form-control search-bar-input' />
                            <button className="search-bar-clear" onClick={clearKeyword}><i class="fas fa-times"></i></button>
                        </div>
                        <div className='search-tag'>
                            <p className="ng-binding">{allValues.listResult.length} Kết quả tìm kiếm cho từ khoá:&nbsp;<span className="ng-binding">{allValues.kw}</span></p>
                        </div>
                        <div className='search-content'>
                            <div className='row'>

                                {allValues.listResult && allValues.listResult.map((item, index) => {
                                    return (
                                        <div className='col-md-4 col-sm-6 col-xs-12' key={index} style={{ maxWidth: '100%', paddingRight: '20px' }} onClick={() => fetchDetailMovie(item)}>
                                            <article className='search-item'>
                                                <div class="item-thumb">
                                                    {item.ImageOfMovie && item.ImageOfMovie.map((image, index2) => {
                                                        if (image.typeImage === 1) {
                                                            return (
                                                                <img key={index2} src={image.url} />
                                                            )
                                                        }

                                                    })}

                                                </div>
                                                <h6>{item.name}</h6>
                                            </article>
                                        </div>
                                    )

                                })}



                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
