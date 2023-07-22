import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import Header from "../components/Header";

const PaymentScreen = () => {
  
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  if(! shippingAddress){
      navigate(`/shipping`)
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      navigate(`/placeorder`)
  }

  return (
    <>
    <Header />
    <div className="container card mt-5 p-4" style={{ width: "25rem" }}>
      <h5>SELECT PAYMENT METHOD</h5>
      <form className="mx-2" >
        <div className="form-check text-start ms-3">
          <input
            className="form-check-input"
            type="checkbox"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
           
          />
          <label className="form-check-label" htmlFor="flexCheckIndeterminate">
            Paypal or Credit Card
          </label>
          
        </div>
        <div className="mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                backgroundColor: "#4c90cf",
                borderRadius: "5px",
                padding: "7px 0",
              }}
              onClick={submitHandler}
            >
              <strong>Continue</strong>
            </button>
            
          </div>
      </form>
    </div>
    </>
  );
};

export default PaymentScreen;
