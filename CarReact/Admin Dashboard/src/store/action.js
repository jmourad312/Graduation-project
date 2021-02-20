import * as TYPES from './types'
import { instance } from "../network/axiosConfig";


export const setLoginAction = (payload) => {
    return {
      type: TYPES.LOGIN,
      payload
    }
  }

  export const setTokenAction = (payload) => {
    return {
      type: TYPES.TOKEN,
      payload
    }
  }

  export const getUserAction = (skip,search) => async (dispatch) => {

    try {
        const res = await instance.post(`admin/showAllUsers/${skip}`,{search:search},
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_USERS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getVendorAction = (skip,search) => async (dispatch) => {

    try {
        const res = await instance.post(`admin/showAllVendors/${skip}`,{search:search},
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_VENDORS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getCountDataAction = async (dispatch) => {

    try {
        const res = await instance.get("admin/countAll",
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_COUNT_DATA,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getItemsVendor = (id) => async (dispatch) =>{
    try {
        const res = await instance.get(`admin/getItemsVendor/${id}`,
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}


export const getBlogsUser = (id) => async (dispatch) =>{
  try {
      const res = await instance.get(`user/showPostsOfUser/${id}`,
      {headers: { Authorization: localStorage.getItem("Authorization")}});
      dispatch({
          type: TYPES.GET_BLOGSS,
          payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}

export const getContactAction = (skip) => async (dispatch) => {

  try {
      const res = await instance.get(`admin/getContactUs/${skip}`,
      {headers: { Authorization: localStorage.getItem("Authorization")}});
      dispatch({
          type: TYPES.GET_CONTACTS,
          payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}

export const getBlogAction = (skip,search) => async (dispatch) => {

    try {
        const res = await instance.post(`admin/showAllUsers/${skip}`,{search:search},
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_N_BLOGS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getProductAction = (skip,search) => async (dispatch) => {

    try {
        const res = await instance.post(`admin/showAllVendors/${skip}`,{search:search},
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_N_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getAdsAction = (skip) => async (dispatch) => {

    try {
        const res = await instance.get(`admin/showVAds/${skip}`,
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        dispatch({
            type: TYPES.GET_ADS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  