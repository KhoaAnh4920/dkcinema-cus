import React, { Children, useEffect, useState } from 'react';
import Header from '../Share/Header';
import Footer from '../Share/Footer';
import FilmShowing from '../Share/FilmShowing';
import Ratings from '../Share/Rating';
import { Rating } from 'react-simple-star-rating';
import { getNewsById, votePostRatingService, handleCommentService } from '../../services/NewsServices';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userState } from "../../redux/userSlice";
//import css
import "./DetailReviewFilm.scss";
import { toast } from 'react-toastify';
import moment from 'moment';
import InCommingFilms from '../Share/InCommingFilms';
import { getListMovieByStatus } from '../../services/MovieServices';
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from 'react-spinners/ClipLoader'
import { FormattedMessage } from 'react-intl';





function DetailReviewFilm() {
    const [show, setShow] = useState(true);


    let selectUser = useSelector(userState);
    const handleClickShow = () => {
        setShow(!show);
    }
    const [hovering, setHovering] = useState(false);
    const handleMouseOver = () => {
        setHovering(true);
    }
    const handleMouseLeave = () => {
        setHovering(false);
    }
    const [rating, setRating] = useState(0);

    //chi tiet review
    const [allValuesDetail, setAllValuesDetail] = useState({
        title: '',
        noiDung: '',
        thumbnail: '',
        cusId: '',
        name: '',
        email: '',
        phoneNumber: '',
        ratingComment: null,
        cusCmt: '',
        listCmt: [],
        dataMovieUpcoming: [],
        isShowLoading: true,
    });



    const { id } = useParams();
    async function fetchDetailById(id) {
        let dataDetail = await getNewsById(id);

        let dataMovieUpcoming = await getListMovieByStatus(1, 1, 6);


        if (dataMovieUpcoming && dataMovieUpcoming.data && dataMovieUpcoming.data.length > 0) {
            dataMovieUpcoming = dataMovieUpcoming.data.slice(0, 3)
        } else
            dataMovieUpcoming = []



        if (dataDetail && dataDetail.data) {
            setAllValuesDetail((prevState) => ({
                ...prevState,
                title: dataDetail.data.title,
                noiDung: dataDetail.data.noiDung,
                thumbnail: dataDetail.data.thumbnail,
                rating: dataDetail.data.rating,
                listCmt: dataDetail.data.CommentNews || [],
                type: dataDetail.data.type,
                dataMovieUpcoming: dataMovieUpcoming,
                isShowLoading: false
            }));

        }
    }
    useEffect(() => {
        fetchDetailById(id);
    }, [])

    useEffect(() => {


        setAllValuesDetail((prevState) => ({
            ...prevState,
            cusId: (selectUser.userInfo) ? selectUser.userInfo.id : '',
            name: (selectUser.userInfo) ? selectUser.userInfo.fullName : '',
            email: (selectUser.userInfo) ? selectUser.userInfo.email : '',
            phoneNumber: (selectUser.userInfo) ? selectUser.userInfo.phone : '',
            isLoggedInUser: selectUser.isLoggedInUser
        }));

    }, [selectUser]);


    const renderHTML = (p) => (<span dangerouslySetInnerHTML={{ __html: p.HTML }}></span>)

    const createMarkup = () => {
        return { __html: allValuesDetail.noiDung };
    }

    const votePostRating = async (data) => {

        if (!allValuesDetail.isLoggedInUser) {
            toast.warning('Vui lòng đăng nhập để thực hiện')
            return
        }

        // Call API //
        let res = await votePostRatingService({
            rating: data,
            cusId: allValuesDetail.cusId,
            newsId: id
        })

        console.log('res: ', res)

        if (res && res.errCode === 0) {
            toast.success("Thank you")

        } else {
            toast.error(res.errMessage);
        }

    }

    const voteRatingComment = (data) => {
        console.log("Check vote comment: ", data);

        setAllValuesDetail((prevState) => ({
            ...prevState,
            ratingComment: data
        }));
    }

    const changeHandler = e => {
        setAllValuesDetail({ ...allValuesDetail, [e.target.name]: e.target.value })
    }

    const handleComment = async () => {
        if (!allValuesDetail.isLoggedInUser) {
            toast.warning('Vui lòng đăng nhập để thực hiện')
            return
        }

        if (allValuesDetail.cusCmt) {
            let res = await handleCommentService({
                comment: allValuesDetail.cusCmt,
                rating: allValuesDetail.ratingComment,
                cusId: allValuesDetail.cusId,
                newsId: id
            })
            if (res && res.errCode === 0) {
                // Load comment //
                fetchDetailById(id);
            }
        } else {
            toast.error("Comment gì đi nè !!!")
        }

    }

    return (
        <div>
            <Header />
            <LoadingOverlay
                active={allValuesDetail.isShowLoading}
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
                <div className='container con-de'>
                    <div className='row row-de'>
                        <div className='col-8 col-de-left'>
                            <div className='row row-de-1'>
                                <p>
                                    {allValuesDetail.title}
                                </p>
                            </div>
                            <hr />
                            <div className='row row-de-fc'>
                                <li><div class="rating-movie rating-home"><span class="rating-value"><strong class="review-home ng-binding">{allValuesDetail.rating}</strong><span>/10</span><span class="ng-binding">&nbsp;(806)</span></span></div></li>
                                <li><button className='btn btn-warning btn-review' onMouseOver={handleMouseOver} onClick={handleMouseLeave}>Đánh giá</button></li>
                                {
                                    hovering && <Ratings checkClick={votePostRating} />
                                }
                            </div>
                            <div className='row row-content-de editor' dangerouslySetInnerHTML={createMarkup()}>

                                {/* {
                                show ? allValuesDetail.noiDung.slice(0, 400) : allValuesDetail.noiDung
                            } */}
                            </div>
                            <div>
                                {/* {
                                content.detail && content.detail.length > 400 && (
                                    <button onClick={handleClickShow}>
                                        {show ? "Xem Them" : "An di"}
                                    </button>
                                )
                            } */}
                            </div>
                            {allValuesDetail.type !== 3 &&
                                <>
                                    <div className='comment-film'>
                                        <div className='title-cmt'>
                                            <h5><FormattedMessage id="homeHeader.comment" /></h5>
                                        </div>
                                        <div className='form-cmt'>
                                            <textarea className='area-51 form-control animated' name='cusCmt' onChange={changeHandler} value={allValuesDetail.cusCmt} placeholder='Bình luận của bạn...' cols="50"></textarea>
                                        </div>
                                        <div className='bottom-cmt'>
                                            <div className='row rating-cmt'>
                                                <FormattedMessage id="homeHeader.chooseStar" />&nbsp;&nbsp;<Ratings checkClick={voteRatingComment} />
                                            </div>
                                            <div className='btn-send'>
                                                <button className='btn btn-light' onClick={() => handleComment()}><FormattedMessage id="homeHeader.submit" /></button>
                                            </div>
                                        </div>


                                    </div>
                                    {allValuesDetail.listCmt && allValuesDetail.listCmt.length > 0 &&
                                        allValuesDetail.listCmt.map((item, index) => {
                                            return (
                                                <div className='show-comment' key={index}>
                                                    <div className='user-name'>
                                                        <span>{(item.CustomerComment && item.CustomerComment.fullName) ? item.CustomerComment.fullName : ''}</span>
                                                        <span style={{ fontSize: '12px', marginLeft: '10px', color: '#aaa', fontWeight: 500 }}>{moment(item.createdAt).fromNow()}</span>
                                                    </div>
                                                    <div className='number-rate'>
                                                        <Rating
                                                            iconsCount={5}
                                                            readonly={true}
                                                            //ratingValue={10}
                                                            initialValue={item.rating}
                                                            size={15}
                                                        />
                                                    </div>

                                                    <div className='content-cmt'>
                                                        {item.comment}
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }

                                    {
                                        allValuesDetail.listCmt && allValuesDetail.listCmt.length === 0 &&
                                        <div className='show-comment'>
                                            <p style={{ textAlign: 'center' }}>Hãy để lại bình luận đầu tiên cho bài viết</p>
                                        </div>
                                    }
                                </>
                            }



                        </div>

                        <InCommingFilms
                            dataMovieUpcoming={allValuesDetail.dataMovieUpcoming}
                        />
                    </div>

                </div>
            </LoadingOverlay>
            <Footer />
        </div>
    );
}

export default DetailReviewFilm;