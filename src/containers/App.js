import logo from '../logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from '../components/HomePage/Home';
import DanhSachPhim from '../components/ListMovie/DanhSachPhim';
import ReviewFilms from '../components/ReviewMovie/ReviewFilms';
import { ToastContainer } from 'react-toastify';
import { path } from '../utils/constant';
// import { ConnectedRouter as Router } from 'connected-react-router';




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

    <Router>
      {/* <Route path="/" exact component={Home} /> */}
      <div className="main-container">


        <span className="content-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/phim-dang-chieu" exact component={DanhSachPhim} />
            <Route path="/review-phim" exact component={ReviewFilms} />
          </Switch>
        </span>
      </div>
    </Router>
  );
}

export default App;
