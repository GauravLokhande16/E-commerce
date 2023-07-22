import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/userActions";
import Header from "../components/Header";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div
        className="container card  text-start mt-5"
        style={{ width: "23rem" }}
      >
        <form  onClick={submitHandler}>
          <div className="mb-3 mt-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Username</strong>
            </label>
            <input
              type="name"
              className="form-control"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>

          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{ width: "100%" }}
          >
            Register
          </button>
          </Link>
        </form>
        <p className="mt-3 text-center">
          I have Account{" "}
          <Link to="/login">
            <strong>Login</strong>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
