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