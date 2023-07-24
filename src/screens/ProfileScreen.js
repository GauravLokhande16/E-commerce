import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/userActions";
import moment from "moment";
import Header from "../components/Header";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import Orders from "../components/ProfileComponents/Orders";
import { ProfileTabs } from "../components/ProfileComponents/ProfileTabs";


const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(true)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const handleToggle = (e)=>{
    if(e.target.value === "order"){
      setPage(false)
    }else{
      setPage(true)
    }
  }

  return (
    <>
      <Header />
      <div className="container my-4  card" style={{ marginLeft: "7vw" }}>
        <div className="row">
          <div className="col-4 card mx-3 my-4  ">
            <div className="container">
              <div className="icon  m-5">
                <i
                  class="fa-solid fa-user  mx-auto"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>
              <div className="container my-auto ">
                <p>
                  <strong>{userInfo.name}</strong>
                </p>
                <p>
                  <>Joined {moment(userInfo.createdAt).format("LL")}</>
                </p>
              </div>
            </div>
            <div className="container ">
              <div class="border">
                <button className="my-2 border-0" value={"profile"} onClick={e => handleToggle(e)} style={{width:"100%"}}>PROFILE SETTINGS</button>
              </div>
              <div class="border mb-2 mt-2">
                <button className="my-2 border-0" value={"order"} onClick={e => handleToggle(e)} style={{width:"100%"}}  >
                  ORDER LIST{" "}
                  <span class="badge text-bg-danger my-auto " >{orders ? orders.length : 0}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-7">
          {
            page ? (
              <ProfileTabs />
            ):(
              <Orders orders={orders} loading={loading} error={error} />
            )
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
