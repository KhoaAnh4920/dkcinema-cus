
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FaSearch, FaPlus } from 'react-icons/fa';
import "./SearchBar.scss";

function SearchBar({ placeholder, data }) {
    const [filterData, setFilterData] = useState([]);
    const [keyEnter, setKeyEntr] = useState("");

    const handleFilter = (e) => {
        const kw = e.target.value;
        setKeyEntr(kw);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(kw.toLowerCase());
        });
        if (kw === "") {
            setFilterData([]);
        } else {
            setFilterData(newFilter);
        }
    };

    const clearCmm = () => {
        setFilterData([]);
        setKeyEntr("");
    };
    return (
        <>
            <div className='center-contents'>
                <div className='searchInput'>
                    <input
                        type='text'
                        placeholder={placeholder}
                        value={keyEnter}
                        onChange={handleFilter} />
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
                                        <a key={index} className='dataItem' href={value.link} target="_blank">
                                            <p>{value.title}</p>
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