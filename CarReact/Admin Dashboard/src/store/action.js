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

  export const getUserAction = async (dispatch) => {

    try {
        const res = await instance.get("admin/showAllUsers",
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        console.log(res);
        dispatch({
            type: TYPES.GET_USERS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
  }

  export const getVendorAction = async (dispatch) => {

    try {
        const res = await instance.get("admin/showAllVendors",
        {headers: { Authorization: localStorage.getItem("Authorization")}});
        console.log(res);
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
        console.log(res);
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
        console.log(res);
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
      console.log(res);
      dispatch({
          type: TYPES.GET_BLOGSS,
          payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}

export const getContactAction = async (dispatch) => {

  try {
      const res = await instance.get("admin/getContactUs",
      {headers: { Authorization: localStorage.getItem("Authorization")}});
      console.log(res);
      dispatch({
          type: TYPES.GET_CONTACTS,
          payload: res.data
      })
  } catch (error) {
      console.log(error);
  }
}

  