import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import 'rc-slider/assets/index.css';

const Header = () => {
  const [keyword, setKeyword] = useState()

  let navigate = useNavigate()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };


  const submitHandler = (e) =>{
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/search/${keyword}`)
    }else{
      navigate("/")
    }
  }


  return (
    <>
      <div className="container-fluid">
        <nav
          className="navbar navbar-expand-lg "
          style={{ backgroundColor: "#e3f2fd", color: "black" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand mx-5" to="/">
              <strong>ANYTHING</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <a className="nav-link active" aria-current="page" href="#">
                    {userInfo ? userInfo.name : ""}
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">
                    {userInfo ? userInfo.email : ""}
                  </a>
                </li>
              </ul>
              <div className="me-3">
                <Link to="">
                  <i className="fa-brands fa-facebook mx-2"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-instagram mx-2"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-linkedin mx-2"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-youtube mx-2"></i>
                </Link>
                <Link to="">
                  <i className="fa-brands fa-pinterest mx-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="container  text-center">
        <div className="row d-flex align-items-center">
          <div className="col-3 mt-2 py-auto ps-4">
           
          </div>
          <div className="col-md-5 mt-2 px-5">
            <form onSubmit={submitHandler} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={keyword}
                placeholder="Search"
                aria-label="Search"
                onChange={e => setKeyword(e.target.value)}
                style={{width: '100%'}}
              />
              <button className="btn btn-outline-success " type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="col-md-4 justify-content-around d-flex mt-2 px-2">
            {userInfo ? (
              <>
                <Link to="/profile">
                  <button type="button" className="btn btn-light mx-3">
                    Profile
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" onClick={logoutHandler} className="btn btn-light ms-3 me-0">
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button type="button" className="btn btn-light mx-3">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button type="button" className="btn btn-light ms-3 me-0">
                    Login
                  </button>
                </Link>
              </>
            )}
          <div className="my-auto">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: "23px" }}
            ></i>
            {
              cart.cartItems.length === 0 ? (
               null
              ):(
                <span className="position-relative   translate-middle badge border border-light rounded-circle bg-danger p-2">
                <span className="">{cart.cartItems.length}</span>
              </span>
              )
            }
            
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
