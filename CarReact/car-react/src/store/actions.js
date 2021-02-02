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


//-------------------user sign in
export const userSignInAction = () => async (dispatch) => {
  try {
    const req = await axios.post("localhost:3000/user/auth/signin");
    console.log(req);
    dispatch({
      type: TYPES.USER_SIGN_IN,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//*--------------------user sign up
export const userSignUpAction = () => async (dispatch) => {
  try {
    const req = await axios.post("localhost:3000/user/auth/signup");
    console.log(req);
    dispatch({
      type: TYPES.USER_SIGN_UP,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//-------------------vendor sign in
export const vendorSignInAction = () => async (dispatch) => {
  try {
    const req = await axios.post("localhost:3000/vendor/auth/signin");
    console.log(req);
    dispatch({
      type: TYPES.VENDOR_SIGN_IN,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//-------------------vendor sign Up
export const vendorSignUpAction = () => async (dispatch) => {
  try {
    const req = await axios.post("localhost:3000/vendor/auth/signup");
    console.log(req);
    dispatch({
      type: TYPES.VENDOR_SIGN_UP,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};