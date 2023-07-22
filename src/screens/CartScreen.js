import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartActions";

const CartScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {

    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const removeFromCartHandler = (id) => {
    // TODO
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      {/* cart  */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 p-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className="alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="container my-53">
        {/* cart items  */}
        {cartItems.map((item, index) => (
          <div className=" card mb-3 mt-4 d-flex " key={index}>
            <i
              className="fa-solid fa-circle-xmark  z-1 position-absolute "
              style={{ fontSize: "1.2rem", color: "#e32727" }}
              onClick={() => removeFromCartHandler(item.product)}
            ></i>
            <div className="row z-0">
              <div className="col-md-3" style={{ width: "15%", height:"100px" }}>
                <img src={item.image} className="img-fluid rounded-start" alt={item.name} style={{width:"100%", height:"100%"}} />
              </div>
              <div className="col-md-5 my-auto">
                <div className="card-body ">
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </div>
              <div className="dropdown col-md-3 my-auto">
                <div className="mb-3"
                >
                  <strong>Quantity</strong>
                </div>
                <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
              </div>

              <div className="col-md-2 my-auto">
                <p>
                  <strong>Price</strong>
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">₹{item.price}</small>
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="text-end ">
            <p className="me-5">
              TOTAL: <strong>₹{total}</strong>
            </p>
          </div>
          <span className="border-top"></span>
        </div>
        <div className="row">
          <div className="text-end mt-4 ">
          <Link to="/" className="col-md-6">
                <button className="btn btn-secondary me-5" type="button">Continue To Shopping</button>
              </Link>
           {total > 0 && (
              <button className="btn btn-primary me-5" type="button" onClick={checkOutHandler}>
              Checkout
            </button>
           )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
