import logo from '../logo.svg';
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




function App() {
  return (
    // <Routes>
    //   <Route path={path.HOME} exact element={<Home />} />

    // </Routes>
    // <ToastContainer
    //   position="bottom-right"
    //   autoClose={5000}
    //   hideProgressBar={false}
    //   newestOnTop={false}
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    // />

    // <Router >
    //   <div className="main-container">

    //     {/* {this.props.isLoggedIn && <Header />} */}

    //     <span className="content-container">
    //       <Switch>
    //         <Route path={path.HOME} exact component={(Home)} />
    //       </Switch>
    //     </span>
    //   </div>

    //   <ToastContainer
    //     position="bottom-right"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //   />
    // </Router>

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
          <Route path="/chi-tiet-phim" exact component={ChiTietPhim} />
          <Route path="/dat-ve" exact component={BookTicket} />
          <Route path="/lich-chieu" exact component={BuyTicket} />
          <Route path="/thanh-toan" exact component={Payment} />
          <Route path="/dat-ve-qua-phim" exact component={BookTicketThrough} />
          <Route path="/phan-hoi" exact component={Feedback} />
          <Route path="/quan-ly-tai-khoan" exact component={ManageAccount} />
          <Route path="/quen-mat-khau" exact component={ForgetPassword} />
          <Route path="/doi-mat-khau" exact component={ChangePassword} />

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
