/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from './types'; 

export default (state ={
    products:[],
    blogs:[],
}, action)=>{
    switch (action.type) {
      case TYPES.GET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        };
      case TYPES.GET_BLOGS:
        return {
          ...state,
          products: action.payload,
        };
      default:
        return state;
    }
}