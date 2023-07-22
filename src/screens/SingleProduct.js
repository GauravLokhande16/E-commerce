import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview,  singleProduct } from "../Redux/Actions/ProductActions";
import Rating from "../components/homeComponent/Rating";
import Header from "../components/Header";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import {toast} from 'react-toastify';
import Toast from "../components/LoadingError/Toast";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const toastId = useRef(null)


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  const Toastobjects = {
    pauseOnFocussLoss :false,
    draggable :false,
    pauseOnHover :false,
    autoClose : 2000
  }

  useEffect(() => {
    if (successCreateReview) {
      toast.success("Review Submmited !",Toastobjects)
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(singleProduct(id));
  }, [dispatch, id, successCreateReview]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(createProductReview(id, {rating,comment}))
  }

  return (
    <>
      <Header />
      <Toast />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="container  mt-5 my-5 ">
              <div className="row">
                <div className="col-sm-6" style={{width:"48%", height:"450px"}}>
                  <img className="img-fluid" src={product.image} alt={product.name} style={{width:"100%", height:"100%"}} />
                </div>
                <div className="col-sm-6  text-start">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="card" style={{ width: "18rem" }}>
                    <ul className="list-group list-group-flush position-relative">
                      <li className="list-group-item">
                        <strong>Price</strong>
                        <span className="position-absolute end-0 pe-3">
                          ${product.price}
                        </span>
                      </li>
                      <li className="list-group-item">
                        <strong>Status</strong>
                        <span className="position-absolute end-0 pe-3">
                          {product.countInStock > 0 ? (
                            <span>In Stock</span>
                          ) : (
                            <span>Unavailable</span>
                          )}
                        </span>
                      </li>
                      <li className="list-group-item">
                        <strong>Reviews</strong>
                        <span className="position-absolute end-0 pe-3">
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews}`}
                          />
                        </span>
                      </li>
                      <li className="list-group-item">
                        <strong>Quantity</strong>
                        <span className="position-absolute end-0 pe-3">
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={addToCartHandler}
                    class="btn btn-secondary mt-4"
                    style={{ width: "18rem" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Rating  */}
            <div className="container mt-5 my-5 ">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="text-start ms-1">Reviews</h3>
                  {product.reviews.length === 0 && (
                    <Message variant={"alert-info mt-3"}>No Reviews</Message>
                  )}
                  {product.reviews.map((review) => (
                    <div key={review._id} className="card text-start mt-2">
                      <h5 className="card-header">{review.name}</h5>
                      <div className="card-body">
                        <span>{moment(review.createdAt).calendar()}</span>
                        
                        <Rating value={review.rating} />
                        <p className="card-text">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-sm-6">
                  <h4 className="text-start ms-1">Write a customer review</h4>
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant={"alert-danger"}>
                      {errorCreateReview}
                    </Message>
                  )}
                  <div
                    className="container ms-2 me-4 text-start px-4 rounded "
                    style={{ backgroundColor: "#edcc53" }}
                  >
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="my-4 pt-2">
                          <strong>Rating</strong>
                          <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="col-12 bg-lite p-2 border-0 rounded"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="mt-3 ">
                          <strong>Comment</strong>
                          <textarea
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="col-12 bg-lite  border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-2">
                          <button
                            disabled={loadingCreateReview}
                            type="submit"
                            class="btn btn-secondary mb-3"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Please{" "}
                          <Link to="/login">
                            " <strong>Login</strong> "
                          </Link>{" "}
                          to write a review{" "}
                        </Message>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
