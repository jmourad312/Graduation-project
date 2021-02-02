import * as TYPES from './types';
import axios from 'axios';

// export const setLanguage = (payload) => {
//   return {
//     type: TYPES.SITE_LANG,
//     payload,
//   };
// };

export const getProducts = () => async (dispatch) =>{
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

export const getBlogs = () => async (dispatch) => {
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