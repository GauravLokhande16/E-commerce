import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/userActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";


const Login = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const userLogin = useSelector((state)=> state.userLogin)
  const { error , loading, userInfo} = userLogin

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(login(email,password))
  }
  return (
    <>
    <Header />
    <div className="container card  text-start mt-5" style={{width: "23rem"}}>
    { error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading />}
      <form  onClick={submitHandler}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            <strong>Email address</strong>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
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
        
        <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
          Login
        </button>
      </form>
      <Link to="/register">
      <p className="text-center">Create an Account</p>
      </Link>
    </div>
    </>
  );
};

export default Login;
