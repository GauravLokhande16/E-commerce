import axios from "axios"
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";
import { logout } from "./userActions";


// Product List 
export const listProduct = (keyword="", pageNumber="",low="",high="") => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}&page=${pageNumber}&price[gt]=${low}&price[lt]=${high}`);
      console.log("Dataadfasdf: ", data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // single product 
export const singleProduct = (id)=> async (dispatch)=>{
    try {
      dispatch({type: PRODUCT_DETAILS_REQUEST})
      const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)
      dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})
      
    } catch (error) {
      dispatch({
        type:PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
      
    }
  }
  

  // Product review create
export const createProductReview = (productId, review) => async (dispatch, getState) =>{
  try {
      dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})

      const { userLogin : { userInfo}} = getState()

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization : `Bearer ${userInfo.token}`
          }
      }

      await axios.post(`http://localhost:5000/api/products/${productId}/review`, review, config)
    
      dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS});

  } catch (error) {
      const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

      if(message === "Not authorized, token failed"){
          dispatch(logout())
      }
      dispatch({
          type: PRODUCT_CREATE_REVIEW_FAIL,
          payload: message
      })
  }
}