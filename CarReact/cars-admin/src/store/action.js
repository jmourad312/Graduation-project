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
