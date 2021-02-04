import * as TYPES from './types';
import axios from 'axios';
import { instance } from "../network/axiosConfig";

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
export const getBlogDetails = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/user/showDetailsPost/${params}`
    );
    // console.log(res);
    dispatch({
      type: TYPES.GET_BLOG_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const setBlogId = (payload) => {
  return {
    type: TYPES.GET_BLOG_ID,
    payload,
  };
};
export const getBlogsAction = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/user/showAllPosts");
    // console.log(res);
    dispatch({
      type: TYPES.GET_BLOGS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsFilterBrand = () => async (dispatch) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    // console.log(res);
    dispatch({
      type: TYPES.GET_BLOG_FILTER_BRAND,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsFilterBrandActive = (payload) => {
  return {
    type: TYPES.GET_BLOG_FILTER_BRAND_ACTIVE,
    payload,
  };
};
export const getBlogsFilterModel = () => async (dispatch) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    // console.log(res);
    dispatch({
      type: TYPES.GET_BLOG_FILTER_MODEL,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsFilterSearch = () => async (dispatch) => {
  try {
    const res = await axios.post("https://fakestoreapi.com/products");
    // console.log(res);
    dispatch({
      type: TYPES.GET_BLOG_FILTER_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
// export const AddBlogsAction = () => async (dispatch) => {
//   try {
//     const req = await axios.post("http://localhost:3000/user/addPost");
//     console.log(req);
//     dispatch({
//       type: TYPES.ADD_BLOG,
//       payload: req.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// filter blog
// export const filterCarModel = () => async (dispatch) => {
//   try {
//     const res = await instance.get('user');
//     console.log(res);
//     dispatch({
//       type: TYPES.GET_CAR_MODEL,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

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



//USER  ------------------------------------------------------------
//-------------------user sign in
export const userSignInAction = () => async (dispatch) => {
  try {
    const req = await axios.post("http://localhost:3000/user/auth/signin");
    console.log(req);
    dispatch({
      type: TYPES.USER_SIGN_IN,
      payload: req.data,
    });
    console.log(req);

  } catch (error) {
    console.log(error);

  }
};
//*--------------------user sign up
export const userSignUpAction = () => async (dispatch) => {
  try {
    const req = await axios.post("http://localhost:3000/user/auth/signup");
    console.log(req);
    dispatch({
      type: TYPES.USER_SIGN_UP,
      payload: req.data,
    });
    console.log(req);

  } catch (error) {
    console.log(error);
  }
};


//VENDOR----------------------------------------------------------
//-------------------vendor sign in
export const vendorSignInAction = () => async (dispatch) => {
  try {
    const req = await axios.post("http://localhost:3000/vendor/auth/signin");
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
    const req = await axios.post("http://localhost:3000/vendor/auth/signup");
    console.log(req);
    dispatch({
      type: TYPES.VENDOR_SIGN_UP,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};

///-----savee token
export const setToken = (payload) => {
  return {
    type: TYPES.GET_TOKEN,
    payload,
  };
};