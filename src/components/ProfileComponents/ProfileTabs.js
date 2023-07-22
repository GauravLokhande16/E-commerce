import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {toast} from "react-toastify"
import { updateUserProfile } from "../../Redux/Actions/userActions";

export const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = useRef(null)

  const Toastobjects = {
    pauseOnFocussLoss :false,
    draggable :false,
    pauseOnHover :false,
    autoClose : 2000
  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile =  useSelector(state => state.userUpdateProfile)
  const { loading: updateLoading} = userUpdateProfile

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e)=>{
    e.preventDefault();
    // password match
    if(password !== confirmPassword){
      if(!toast.isActive(toastId.current)){
      toastId.current = toast.error("password does not match",Toastobjects)
      }
    }
    else{
      // Update profile
      dispatch(updateUserProfile({id:user._id, email,password}))
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.success("Profile Updated",Toastobjects)
        }
    }
  }

  return (
    <>
    <Toast />
    {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading />}
    {updateLoading && <Loading />}
      {/* FORM START  HERE   */}
      <div className="col-md-12    my-5 mx-3">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="exampleInputEmail1" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-3 col-md-6">
              <label class="form-label">E-mail Address</label>
              <input
                type="text"
                class="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label class="form-label">New Password</label>
              <input
                type="text"
                class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="mb-3 col-md-6">
              <label class="form-label">Confirm Password</label>
              <input
                type="text"
                class="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-success mt-3 "
            style={{ width: "100%" }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};
