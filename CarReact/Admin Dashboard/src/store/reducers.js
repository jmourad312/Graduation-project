import * as TYPES from "./types";

export default (
  state = {
    login: false,
    token: "",
    users: [],
    vendors: [],
    countData: {},
    products: [],
    blogs: [],
    contacts: [],
    nblog: [],
    nproduct: [],
    ads: [],
  },
  action
) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        login: action.payload,
      };

    case TYPES.TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case TYPES.GET_VENDORS:
      return {
        ...state,
        vendors: action.payload,
      };
    case TYPES.GET_COUNT_DATA:
      return {
        ...state,
        countData: action.payload,
      };

    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES.GET_BLOGSS:
      return {
        ...state,
        blogs: action.payload,
      };
    case TYPES.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case TYPES.GET_N_BLOGS:
      return {
        ...state,
        nblog: action.payload,
      };
    case TYPES.GET_N_PRODUCTS:
      return {
        ...state,
        nproduct: action.payload,
      };

    case TYPES.GET_ADS:
      return {
        ...state,
        ads: action.payload,
      };

    default:
      return state;
  }
};
