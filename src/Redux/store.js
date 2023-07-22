import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/userReducers";
import { producerCreateReviewReducer, producerDetailsReducer, producerListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from "./Reducers/OrderRedcers";


const reducer = combineReducers({
  productList: producerListReducer,
  productDetails: producerDetailsReducer,
  productReviewCreate : producerCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay : orderPayReducer,
  orderListMy : orderListMyReducer,
})

// login
const userInfoFromLocalStorage = localStorage.getItem(`userInfo`)
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const cartItemsFromLocalStorage = localStorage.getItem(`cartItem`)
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];


const shippingAddressFromLocalStorage = localStorage.getItem(`shippingAddress`)
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;