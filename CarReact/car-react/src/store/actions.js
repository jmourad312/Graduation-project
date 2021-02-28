import * as TYPES from "./types";
import axios from "axios";

// export const setLanguage = (payload) => {
//   return {
//     type: TYPES.SITE_LANG,
//     payload,
//   };
// };
export const setClass = (payload) => {
  return {
    type: TYPES.CHANGE_STYLE,
    payload,
  };
};

// products requests --------------------------

export const getProductsAction = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/user/partOfItem", {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
    dispatch({
      type: TYPES.GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetails = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/user/showDetailsItem/${params}`,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_PRODUCT_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getRelatedProducts = (id,name,brand,model) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/user/showRelatedItems`,
      { id,name, brand, model },
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    console.log(res);
    dispatch({
      type: TYPES.GET_RELATED_PRODUCTS,
      payload: res.data,
    });
    console.log(res);

  } catch (error) {
    console.log(error);
  }
};
export const setProductId = (payload) => {
  return {
    type: TYPES.GET_PRODUCT_ID,
    payload,
  };
};
export const resultFromFilterProduct = (data, params) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/user/showFilterItems/${params}`,
      data,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//----------------------------------------------
// blog requests -------------------------------
export const getBlogDetails = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/user/showDetailsPost/${params}`
    );
    dispatch({
      type: TYPES.GET_BLOG_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addVoteComment = (params) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/user/upVoteToComment/${params}`,
      "s",
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.ADD_VOTE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeVoteComment = (params) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/user/downVoteToComment/${params}`,
      "j",
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.REMOVE_VOTE,
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
//     dispatch({
//       type: TYPES.ADD_BLOG,
//       payload: req.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// filter blog
export const filterCarBrand = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/admin/getBrand");
    dispatch({
      type: TYPES.GET_BRAND,
      payload: res.data.Data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const filterCarModel = (namebrand) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/admin/getModel/${namebrand}`
    );
    dispatch({
      type: TYPES.GET_MODEL,
      payload: res.data.Data[0].carModel,
    });
  } catch (error) {
    console.log(error);
  }
};
// export const filterCarModelAddFilter = (namebrand) => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:3000/admin/getModel/${namebrand}`
//     );
//     dispatch({
//       type: TYPES.GET_MODEL_ADD_FILTER,
//       payload: res.data.Data[0].carModel,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const resultFromFilter = (data, params) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/user/showFilterPosts/${params}`,
      data
    );
    dispatch({
      type: TYPES.GET_BLOGS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//filter add blog

//USER  ------------------------------------------------------------
// get user -----------------------
export const setUserIdAction = (payload) => {
  return {
    type: TYPES.GET_USER_ID,
    payload,
  };
};

export const getUsersAction = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/user/showUserProfile/${params}`,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_USER,
      payload: res.data,
    });
    localStorage.setItem("ProfileImage", res.data.Data.person.image);
  } catch (error) {
    console.log(error);
  }
};

export const getUsersBookAndFavo = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/user/showUserDetails/${params}`,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_USER_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlogs = () => async (dispatch) => {
  try {
    const req = await axios.post("https://fakestoreapi.com/users");
    dispatch({
      type: TYPES.ADD_USER,
      payload: req.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//-------------------user sign in
export const userSignInAction = (payload) => {
  return {
    type: TYPES.USER_SIGN_IN,
    payload,
  };
};

//VENDOR----------------------------------------------------------
export const setVendorIdAction = (payload) => {
  return {
    type: TYPES.GET_VENDOR_ID,
    payload,
  };
};
export const getVendorsAction = (params) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/vendor/showVendorProfile/${params}`,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_VENDOR,
      payload: res.data,
    });
    localStorage.setItem("ProfileImage", res.data.Data.person.image);
  } catch (error) {
    console.log(error);
  }
};
export const getVendorsItemsAction = (data, params) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/vendor/getItems/${params}`,
      data,
      { headers: { Authorization: localStorage.getItem("Authorization") } }
    );
    dispatch({
      type: TYPES.GET_VENDOR_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//-------------------vendor sign in
export const vendorSignInAction = (payload) => {
  return {
    type: TYPES.VENDOR_SIGN_IN,
    payload,
  };
};
///-----savee token
export const setToken = (payload) => {
  return {
    type: TYPES.GET_TOKEN,
    payload,
  };
};
