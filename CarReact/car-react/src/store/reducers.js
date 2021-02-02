/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from "./types";

export default (
  state = {
    products: [],
    blogs: [],
    users: [],
    userSignIn: {},
    userSignUp: {},
    vendorSignIn: {},
    vendorSignUp: {},
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES.GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case TYPES.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case TYPES.USER_SIGN_IN:
      return {
        ...state,
        userSignIn: action.payload,
      };
    case TYPES.USER_SIGN_UP:
      return {
        ...state,
        userSignUp: action.payload,
      };
    case TYPES.VENDOR_SIGN_IN:
      return {
        ...state,
        vendorSignIn: action.payload,
      };
    case TYPES.VENDOR_SIGN_UP:
      return {
        ...state,
        vendorSignUp: action.payload,
      };
    default:
      return state;
  }
};
