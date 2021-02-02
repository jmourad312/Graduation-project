import * as TYPES from './types';
import axios from 'axios';

// export const setLanguage = (payload) => {
//   return {
//     type: TYPES.SITE_LANG,
//     payload,
//   };
// };

// products requests -----------------------
export const getProductsAction = () => async (dispatch) =>{
    try {
        const res = await axios.get('https://fakestoreapi.com/products');
        console.log(res);
        dispatch({
            type: TYPES.GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

// blog requests -------------------------
export const getBlogsAction = () => async (dispatch) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    console.log(res);
    dispatch({
      type: TYPES.GET_BLOGS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const AddBlogsAction = () => async (dispatch) => {
  try {
    const req = await axios.post("https://fakestoreapi.com/products");
    console.log(req);
    dispatch({
      type: TYPES.ADD_BLOG,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get user -----------------------
export const getUsersAction = () => async (dispatch) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/users");
    console.log(res);
    dispatch({
      type: TYPES.GET_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addUserAction = () => async (dispatch) => {
  try {
    const req = await axios.post("https://fakestoreapi.com/users");
    console.log(req);
    dispatch({
      type: TYPES.ADD_USER,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};