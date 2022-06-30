import React from 'react';

import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';

import "./DetailDiscount.scss";

function DetailDiscount() {

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-8'>

                    </div>
                    <FilmShowing />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailDiscount;