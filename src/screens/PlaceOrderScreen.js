import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderActions";
import Message from "../components/LoadingError/Error";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [pay,setPay] = useState(false)

  // calculate price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, dispatch, success, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPaid: pay
      })
    );
  };

 
  return (
    <>
      <Header />
      <div className="container mt-3">
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
                <p className="m-0">{userInfo.name}</p>
                <p className="m-0">{userInfo.email}</p>
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
                <p className="m-0">Shipping : {cart.shippingAddress.country}</p>
                <p className="m-0">Pay Method : {cart.paymentMethod}</p>
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
                  Address : {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                </p>
                <p className="m-0">{cart.shippingAddress.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5 d-flex">
          <div className="col-7">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item) => (
                  <div className="my-3 row d-flex border-bottom">
                    <div className="mx-4 col-sm-2">
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt={item.name}
                        style={{ width: "7vw" }}
                      />
                    </div>
                    <div className="mx-4 my-auto col-sm-4">
                      <Link to={`/products/${item.product}`}>
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                      </Link>
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
                      <p>₹{item.qty * item.price}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="col-sm-4 my-4 mx-5 text-start">
            <table className="table table-bordered ">
              <tbody>
                <tr>
                  <th>Products</th>
                  <td>₹{cart.itemsPrice}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>₹{cart.shippingPrice}</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>₹{cart.taxPrice}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>₹{cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null :(
                <div className="text-center">
                <button
                type="button"
                className="btn btn-success me-5"
                style={{ width: "40%" }}
                onMouseOver={()=>setPay(true)}
                onClick={placeOrderHandler}
              >
                  Pay Now
              </button>
               <button
               type="button"
               className="btn btn-primary"
               style={{ width: "40%" }}
               onClick={placeOrderHandler}
             >
                 Cash on Delivery
             </button>
             </div>               
            )}
            {error && (
            <div className="my-3 col-12">
              <Message variant="alert-danger">{error}</Message>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
