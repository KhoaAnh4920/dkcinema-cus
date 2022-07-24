
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FaSearch, FaPlus } from 'react-icons/fa';
import "./SearchBar.scss";
import { getSearchMovie } from '../../services/MovieServices';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { useHistory } from "react-router-dom";


function SearchBar({ placeholder, data }) {
    let history = useHistory();
    const [filterData, setFilterData] = useState([]);
    const [keyEnter, setKeyEntr] = useState("");
    const [isShowLoading, setIsShowLoading] = useState(false)

    const handleFilter = async (e) => {

        const kw = e.target.value;
        console.log('kw:', kw);

        setKeyEntr(kw);

        let dataMovie = await getSearchMovie(keyEnter);

        console.log('dataMovie: ', dataMovie)




    };




    useEffect(() => {
        async function clientGetSearchMovie(kw) {
            let dataMovie = await getSearchMovie(kw);


            const newFilter = dataMovie.data.filter((value) => {
                return value.name.toLowerCase().includes(kw.toLowerCase());

            });

            if (kw === "") {
                setFilterData([]);
            } else {
                setFilterData(newFilter);
            }
            // setIsShowLoading(false);
        }

        const delayDebounceFn = setTimeout(() => {
            // setIsShowLoading(true);

            // Send Axios request here
            clientGetSearchMovie(keyEnter);
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [keyEnter])



    const clearCmm = () => {
        setFilterData([]);
        setKeyEntr("");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('key: ', keyEnter);

            history.push(`/tim-kiem?keyword=${keyEnter}`)
            // window.location.reload();
        }
    }

    const fetchDetailMovie = (value) => {
        history.push(`/chi-tiet-phim/${value.id}`)
    }


    return (

        <>

            <div className='center-contents'>
                <div className='searchInput'>
                    <input
                        type='text'
                        placeholder={placeholder}
                        value={keyEnter}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setKeyEntr(e.target.value)} />
                    <div className='iconSearch'>
                        {
                            filterData.length === 0 ? (
                                <FaSearch />
                            ) : (
                                //<FaPlus className='clearBtn' onClick={clearCmm} />
                                <FaSearch />
                            )}
                    </div>
                </div>

                {
                    filterData.length != 0 && (
                        <div className="result">
                            {
                                filterData.slice(0, 15).map((value, index) => {
                                    return (
                                        <a key={index} className='dataItem' onClick={() => fetchDetailMovie(value)} target="_blank">
                                            <p>{value.name}</p>
                                        </a>
                                    );
                                })
                            }
                        </div>

                    )
                }
            </div>

        </>
    );
}

export default SearchBar;