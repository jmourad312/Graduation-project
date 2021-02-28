/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from "./types";

export default (
  state = {
    //Products-------------
    products: [],
    productDetails: [],
    relatedProducts: [],
    productID: "",

    //blog-----------
    blogDetails: [],
    blogs: [],
    blogID: "",
    blogFilterBrand: [],
    blogFilterBrandActive: false,
    blogFilterModel: [],
    blogFilterSearch: [],
    brand: [],
    model: [],
    modelAddFilter: [],
    filterblog: [],
    addVote: 0,
    removeVote: 0,
    //--------------
    user: [],
    userID: "",
    userSignIn: {},
    userSignUp: {},
    token: "",
    userBlogs: [],
    isUserLoggedIn: false,
    UserBookAndFavo: [],
    //vendor------------------
    vendor: [],
    isVendorLoggedIn: false,
    vendorID: "",
    vendorItems: [],

    vendorSignIn: {},
    vendorSignUp: {},
    //-------------------MISC-------------
    classNAME: "profileright2",
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES.GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    case TYPES.GET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: action.payload,
      };
    case TYPES.GET_PRODUCT_ID:
      return {
        ...state,
        productID: action.payload,
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
        blogDetails: action.payload,
      };
    case TYPES.GET_BLOG_ID:
      return {
        ...state,
        blogID: action.payload,
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
    case TYPES.GET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    case TYPES.GET_MODEL:
      return {
        ...state,
        model: action.payload,
      };

    case TYPES.ADD_VOTE:
      return {
        ...state,
        addVote: action.payload,
      };
    case TYPES.REMOVE_VOTE:
      return {
        ...state,
        removeVote: action.payload,
      };
    // case TYPES.GET_MODEL_ADD_FILTER:
    //   return {
    //     ...state,
    //     modelAddFilter: action.payload,
    //   };
    case TYPES.GET_RESULTS_FILTER:
      return {
        ...state,
        filterblog: action.payload,
      };
    // case TYPES.ADD_BLOG:
    //   return {
    //     ...state,
    //     blogs: action.payload,
    //   };

    //-------------USER----------------
    case TYPES.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case TYPES.GET_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case TYPES.GET_USER_BLOG:
      return {
        ...state,
        userBlogs: action.payload,
      };

    case TYPES.USER_SIGN_IN:
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };

    case TYPES.GET_USER_DATA:
      return {
        ...state,
        UserBookAndFavo: action.payload,
      };
    //---------------Vendor------------
    case TYPES.GET_VENDOR:
      return {
        ...state,
        vendor: action.payload,
      };
    case TYPES.GET_VENDOR_ID:
      return {
        ...state,
        vendorID: action.payload,
      };
    case TYPES.GET_VENDOR_ITEMS:
      return {
        ...state,
        vendorItems: action.payload,
      };

    case TYPES.VENDOR_SIGN_IN:
      return {
        ...state,
        isVendorLoggedIn: action.payload,
      };

    //-----------------------------MISC----------------
    case TYPES.CHANGE_STYLE:
      return {
        ...state,
        classNAME: action.payload,
      };
    default:
      return state;
  }
};
