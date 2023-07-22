import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants"


// PRODUCT LIST
export const producerListReducer = (state = { products: []}, action) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading:true, products:[]}            
        case PRODUCT_LIST_SUCCESS:
            return { loading:false, 
                pages : action.payload.pages,
                page : action.payload.page,
                products : action.payload.products,
            }
        case PRODUCT_LIST_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
}

// Single Product
export const producerDetailsReducer = (state = { product: {reviews:[]}}, action) =>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading:true}            
        case PRODUCT_DETAILS_SUCCESS:
            return { loading:false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state
    }
}

// Product Review create
export const producerCreateReviewReducer = (state = { }, action) =>{
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {  loading:true}            
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading:false, success:true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading:false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return { }
        default:
            return state
    }
}