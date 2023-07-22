import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Redux/Actions/CartActions";
import Header from "../components/Header";

const ShippingScreen = () => {

  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [country, setCountry] = useState(shippingAddress.postalCode)
  const [postalCode, setPostalCode] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate(`/payment`)
  }

  return (
    <>
      <Header />
      <form className="container mt-5 card" style={{ width: "30rem" }} onSubmit={submitHandler}>
        <h5 className="mt-4">DELIVERY ADDRESSS</h5>
        <div className="text-start mt-3 px-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control py-2"
              rows="3"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
            type="text"
              className="form-control py-2"
              rows="3"
              placeholder="Enter Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
            type="text"
              className="form-control py-2"
              rows="3"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3" >
            <button type="submit" className="btn btn-primary" style={{ width: "100%", backgroundColor: "#4c90cf", borderRadius: "5px", padding: "7px 0" }}>
              <strong>Continue</strong>
            </button>
          </div>
        </div>
      </form>
    </>

  );
};

export default ShippingScreen;
