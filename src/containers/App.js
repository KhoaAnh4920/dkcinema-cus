import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Routes, Route, Link, Switch } from "react-router-dom";
import Home from '../components/HomePage/Home';
import DanhSachPhim from '../components/ListMovie/DanhSachPhim';
import ReviewFilms from '../components/ReviewMovie/ReviewFilms';
import FilmsIntroduction from '../components/FilmsIntroduction/FilmsIntroduction';
import Login from '../components/Login/Login';
import HoTroGiaiDap from '../components/SupportQA/HoTroGiaiDap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { path } from '../utils/constant';
import ChiTietPhim from '../components/DetailFilms/ChiTietPhim';
// import { ConnectedRouter as Router } from 'connected-react-router';
import BookTicket from '../components/BuyTicket/BookTicket';
import BuyTicket from '../components/BuyTicket/BuyTicket';
import Payment from '../components/BuyTicket/Payment';
import BookTicketThrough from '../components/DetailFilms/BookTicket';
import Feedback from '../components/SupportQA/FeedBack';
import ManageAccount from '../components/AccountProfile/AccountProfile';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import DetailReviewFilm from '../components/ReviewMovie/DetailReviewFilm';
import DetailFilmIntro from '../components/FilmsIntroduction/DetailFilmIntro';
import DiscountList from '../components/Discount/DiscountList';
import DetailDiscount from '../components/Discount/DetailDiscount';
import AboutUs from '../components/AboutUs/AboutUs';
import OperatingReluration from '../components/OperatingReluration/OperatingReluration';
import Agreement from '../components/Agreement/Agreement';
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
import BookSeet from '../components/BuyTicket/BookSeet';
import TestCoundDown from '../components/BuyTicket/TestCoundDown';

import ListTheater from '../components/ListTheater/ListTheater';
import MyMapComponent from '../components/ListTheater/MyMapComponent';
import SearchPage from '../components/Search/SearchPage';
import ErrorTicket from '../components/ErrorTicket/ErrorTicket';






function App() {






  return (


    <Routes>
      {/* <Route path="/" exact component={Home} /> */}
      <div className="main-container">


        <span className="content-container">
          <Route path="/" exact component={Home} />
          <Route path="/phim-dang-chieu" exact component={DanhSachPhim} />
          <Route path="/review-phim" exact component={ReviewFilms} />
          <Route path="/gioi-thieu-phim" exact component={FilmsIntroduction} />
          <Route path="/login" exact component={Login} />
          <Route path="/ho-tro" exact component={HoTroGiaiDap} />
          <Route path="/chi-tiet-phim/:id" exact component={ChiTietPhim} />
          <Route path="/dat-ve" exact component={BookTicket} />
          <Route path="/lich-chieu" exact component={BuyTicket} />
          <Route path="/dat-ghe" exact component={BookSeet} />
          <Route path="/thanh-toan" exact component={Payment} />
          <Route path="/dat-ve-qua-phim/:id" exact component={BookTicketThrough} />
          <Route path="/phan-hoi" exact component={Feedback} />
          <Route path="/quan-ly-tai-khoan" exact component={ManageAccount} />
          <Route path="/reset-password" exact component={ForgetPassword} />
          <Route path="/doi-mat-khau" exact component={ChangePassword} />
          <Route path="/chi-tiet-review/:id" exact component={DetailReviewFilm} />
          <Route path="/chi-tiet-intro" exact component={DetailFilmIntro} />
          <Route path="/khuyen-mai" exact component={DiscountList} />
          <Route path="/chi-tiet-khuyen-mai/:id" exact component={DetailDiscount} />
          <Route path="/ve-chung-toi" exact component={AboutUs} />
          <Route path="/thoa-thuan" exact component={Agreement} />
          <Route path="/quy-che-hoat-dong" exact component={OperatingReluration} />
          <Route path="/chinh-sach" exact component={PrivacyPolicy} />
          <Route path="/test-countdown" exact component={TestCoundDown} />
          <Route path="/danh-sach-rap" exact component={ListTheater} />
          <Route path="/test-map" exact component={MyMapComponent} />
          <Route path="/tim-kiem" component={SearchPage} />
          <Route path="/loi-ve" component={ErrorTicket} />
        </span>

      </div>



      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Routes>

  );
}

export default App;
