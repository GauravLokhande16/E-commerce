import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 50);
    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)));
    order.totalPrice = (
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
    ).toFixed(2);
  }


  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="container mt-3">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div
              className="d-flex card pb-3 pt-1"
              style={{ backgroundColor: "#b0c8e8" }}
            >
              <div className="d-flex ps-3 " style={{ flexDirection: "row" }}>
                <div className="col-md-4 d-flex">
                  <div
                    className="my-auto "
                    style={{
                      backgroundColor: "#cad8eb",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                    }}
                  >
                    <div className="container ">
                      <i
                        className="fa-solid fa-user fs-3 "
                        style={{ marginTop: "50%" }}
                      ></i>
                    </div>
                  </div>
                  <div className="container m-auto text-start ps-5">
                    <p className="m-0">
                      <strong>Customer</strong>
                    </p>
                    <p className="m-0">{order.user.name}</p>
                    <p className="m-0">{order.user.email} </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex ">
                  <div
                    className="mt-2 ms-3"
                    style={{
                      backgroundColor: "#cad8eb",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                    }}
                  >
                    <div className="container">
                      <i
                        className="fa-solid fa-truck fs-3 "
                        style={{ marginTop: "50%" }}
                      ></i>
                    </div>
                  </div>
                  <div className="container m-auto text-start ps-5">
                    <p className="m-0">
                      <strong>Order Info</strong>
                    </p>
                    <p className="m-0">
                      Shipping : {order.shippingAddress.city}
                    </p>
                    <p className="m-0">Pay Method : {order.paymentMethod} </p>
                    <div
                      className="pe-5" 
                          style={order.isPaid ? {backgroundColor:"#71db3b", width:"100%"} : { backgroundColor: "#f24f44", width: "100%" }  }
                      // style={{ backgroundColor: "#71d63e", width: "100%" }}    
                    >
                      <p className="m-3 " style={{ color: "white" }}>
                        <strong>{order.isPaid ? "Paid" : "Not Paid"}</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex text-start">
                  <div
                    className="mt-2 ms-3"
                    style={{
                      backgroundColor: "#cad8eb",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  >
                    <div className="container">
                      <p className="my-auto mx-auto ps-2">
                        <i
                          className="fa-solid fa-location-dot fs-3 "
                          style={{ marginTop: "50%" }}
                        ></i>
                      </p>
                    </div>
                  </div>
                  <div className="container m-auto text-start ps-5 ">
                    <p className="m-0">
                      <strong>Deliver To</strong>
                    </p>
                    <p className="m-0">
                      Address : {order.shippingAddress.city},{" "}
                      {order.shippingAddress.address},{" "}
                    </p>
                    <p className="m-0">{order.shippingAddress.postalCode}</p>
                    <div
                      className=""
                      style={{ backgroundColor: "#f24f44", width: "100%" }}
                    >
                      <p className="m-3 " style={{ color: "white" }}>
                        <strong>
                          {order.isDelivered ? "Delivered" : "Not Delivered"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-5 d-flex">
              <div className=" col-sm-7 ">
                {order.orderItems.map((item) => (
                  <div className="my-3 row d-flex border-bottom">
                    <div className="mx-4 col-sm-2">
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt="shoes"
                        style={{ width: "7vw" }}
                      />
                    </div>
                    <div className="mx-4 my-auto col-sm-4">
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                    </div>
                    <div className="mx-4 my-auto col-sm-1">
                      <p className="mb-0">
                        <strong>QUANTITY</strong>
                      </p>
                      <p>{item.qty}</p>
                    </div>
                    <div className="mx-4 my-auto col-sm-1">
                      <p className="mb-0">
                        <strong>SUBTOTAL</strong>
                      </p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-sm-4 my-4 mx-5 text-start">
                <table className="table table-bordered ">
                  <tbody>
                    <tr>
                      <th>Products</th>
                      <td>₹{order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>₹{order.shippingPrice}</td>
                    </tr>
                    <tr>
                      <th>Tax</th>
                      <td>₹{order.taxPrice}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>₹{order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/">
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "100%" }}
                >
                  Continue Shopping
                </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;


