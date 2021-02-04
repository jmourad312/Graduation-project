/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from "./types";

export default (
  state = {
    products: [],
    blogDetails:[],
    blogs: [],
    blogID:"",
    blogFilterBrand: [],
    blogFilterBrandActive: false,
    blogFilterModel: [],
    blogFilterSearch: [],
    users: [],
    userSignIn: {},
    userSignUp: {},
    vendorSignIn: {},
    vendorSignUp: {},
    token: "",
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

    case TYPES.GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    //------------BLOG---------------
    case TYPES.GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case TYPES.GET_BLOG_DETAILS:
      return {
        ...state,
        blogID: action.payload,
      };
    case TYPES.GET_BLOG_ID:
      return {
        ...state,
        blogDetails: action.payload,
      };
    case TYPES.GET_BLOG_FILTER_BRAND:
      return {
        ...state,
        ...action.payload,
      };
    case TYPES.GET_BLOG_FILTER_BRAND_ACTIVE:
      return {
        ...state,
        blogFilterBrandActive: action.payload,
      };
    case TYPES.GET_BLOG_FILTER_MODEL:
      return {
        ...state,
        blogFilterModel: action.payload,
      };
    case TYPES.GET_BLOG_FILTER_SEARCH:
      return {
        ...state,
        blogFilterSearch: action.payload,
      };
    // case TYPES.ADD_BLOG:
    //   return {
    //     ...state,
    //     blogs: action.payload,
    //   };

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
