import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Rating from "./Rating";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(10000);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  
  console.log("Page", pages, page);

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber,low, high));
  }, [keyword, pagenumber,low,high]);

  return (
    <div className=" container-fluid text-start mx-2 mt-5 ">
      <div className="row ">
        <div className="col-md-2">
            <p className="mb-0"><strong>Price Filter</strong></p>
          <div className="d-flex">
            <p className="text-start">low :{low}</p>
            <p className="ms-auto">high:{high}</p>
          </div>
          <Slider
            range
            allowCross={false}
            draggableTrack
            defaultValue={[0, 1000]}
            onChange={(value) => {
              setLow(value[0] * 100);
              setHigh(value[1] * 100);
            }}
          />
        </div>
        <div className=" border-start mt-3  col-md-10">
          <div className="d-flex justify-content-center " style={{flexWrap:"wrap"}}>
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              products.map((product) => {
                return (
                  <div className="mx-3 my-3" key={product._id}>
                    <div className="card" style={{ width: "15rem" }}>
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.image}
                          height={"250px"}
                          className="card-img-top"
                          alt="Shoes"
                        />
                      </Link>
                      <div className="card-body">
                        <p className="card-text text-start mb-1">
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>
                        <p className="d-flex mb-1">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews}`}
                          />
              
                          <span className="ms-auto">
                            {product.numReviews} Reviews
                          </span>
                        </p>
                        <p className="text-start mb-1">
                          <strong>₹{product.price} </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </div>
  );
};

export default ShopSection;

