import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetails } from "../../../../store/actions";

export default function ProductDetails(props) {
  const productID = useSelector((state) => state.productID);
  const productDetails = useSelector((state) => state.productDetails.Data);
  const dispatch = useDispatch();
  const getProducts = (params) => {
    dispatch(getProductDetails(params));
  };
  useEffect(() => {
    getProducts(productID);
  }, []);
  useEffect(() => {
    getProducts(productID);
  }, [productDetails]);

  const handleAddFavourite= () =>{
    console.log(productID);
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      id: productID,
    };

    const URL = "http://localhost:3000/user/addFavouriteItems";

    axios
      .put(URL, body, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const pageVariants = {
    in: {
      opacity: 10,
      y: "0vh",
      scale: 1,
    },
    out: {
      opacity: 0,
      y: "100vh",
      scale: 0.1,
    },
  };
  const pageTransitions = {
    duration: 1,
    type: "tween",
    ease: "easeIn",
  };
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <section className="products-details" >
        {/* <!-- start product details --> */}
        <div className="container">
          <div className="row bg-light">
            {/* <!-- image of produce --> */}
            <div className="col-md-4">
              <img
                src={productDetails && productDetails.image}
                // width="100%"
                // height="100%"
                style={{ maxHeight: "400px", maxWidth: "350px" }}
                alt=""
              />
            </div>

            <div className="col-md-8">
              <h2>
                {productDetails && productDetails.name}
                <br /> By:{" "}
                <Link to="#">
                  {productDetails
                    ? productDetails.person
                      ? productDetails.person.firstName
                      : "(LOADING)"
                    : "LOADING"}
                </Link>
              </h2>
              {/* <!-- avalible or not --> */}
              {productDetails &&
                (productDetails.available ? (
                  <span className="badge badge-pill badge-success">
                    Avalible
                  </span>
                ) : (
                    <span
                      className="badge badge-pill badge-danger"
                      style={{ fontSize: "15px" }}
                    >
                      Not Avalible
                    </span>
                  ))}

              {/* <!-- number of stars --> */}
              <div className="mt-3 star" style={{ fontSize: "20px" }}>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"> No review</span>
              </div>
              {/* <!-- description --> */}
              <div className="mt-3" style={{ fontSize: "30px" }}>
                {productDetails && productDetails.description}
              </div>
              {/* <!-- Add to favorate and compare product --> */}
              {/* <!-- price --> */}
              <div className="mt-3">
                <span className="" style={{ fontSize: "40px" }}>
                  <li className="fas fa-coins pr-2 text-warning">
                    {productDetails && productDetails.price} LE
                  </li>
                </span>
                <span
                  className="fa-lg button fill fa-pull-right"
                  style={{ padding: "5px" }}
                  title="Add to favorate"
                  onClick={handleAddFavourite}
                >
                  <i
                    className="far fa-heart"
                    style={{ fontSize: "30px" }}
                  ></i>
                </span>
                {/* <span
                  className="fa-lg"
                  data-toggle="tooltip"
                  title="compare product"
                  data-placement="bottom"
                >
                  <i className="fas fa-sliders-h  text-primary"></i>
                </span> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end product details --> */}

        {/* <!-- start Location ,reviews,PRODUCT INFORMATION --> */}
        <div className="container mt-3">
          <div className="row">
            <div className="col-4 content">
              {/* <div [hidden]="tab == 2 || tab == 3"> */}
              <h3>
                <strong
                  className="pl-3"
                  style={{
                    borderLeft: "3px solid red",
                    height: "100%",
                    fontSize: "30px",
                  }}
                >
                  Product Information
                </strong>
              </h3>
              <br />
              {/* <p>
                <b style={{fontSize:"20px"}}>Manufacturer: </b>{" "}
                {productDetails
                  ? productDetails.case
                    ? productDetails.case
                    : "Loading"
                  : "Loading"}
              </p> */}
              <p style={{ fontSize: "1.5rem" }}>
                <b style={{ fontSize: "1.5rem" }}>Brand: </b>{" "}
                {productDetails
                  ? productDetails.carBrand
                    ? productDetails.carBrand
                    : "Loading"
                  : "Loading"}
              </p>
              <p style={{ fontSize: "1.5rem" }}>
                <b style={{ fontSize: "1.5rem" }}>Model: </b>
                {productDetails
                  ? productDetails.carModel
                    ? productDetails.carModel
                    : "Loading"
                  : "Loading"}
              </p>
              {/* </div> */}

              {/* <div [hidden]="tab == 1 || tab == 3"> */}

              {/* </div> */}

              <h3>
                <span
                  className="pl-3"
                  style={{ borderLeft: "3px solid red", height: "100%" }}
                ></span>
                Write your Feedback
              </h3>
              <br />
              <form>
                {/* <div className="form-group">
                  <label style={{fontSize:"20px"}} for="email">Email address:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    id="email"
                  />
                </div> */}
                <div className="form-group">
                  <label style={{ fontSize: "1.5rem" }} for="review">
                    review:
                  </label>
                  <input
                    type="review"
                    className="form-control"
                    placeholder="Enter your review"
                    id="review"
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
              {/* </div> */}
            </div>
            <div className="col-4">Product Rating (User Comments)</div>
            <div className="col-4 shadow-sm p-2 mb-4 rounded-lg">
              <h3>
                <span
                  className="pl-3"
                  style={{ borderLeft: "3px solid red", height: "100%" }}
                ></span>
                Location
              </h3>
              <br />
              <div className="d-flex flex-wrap">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                  width="100%"
                  height="300"
                  frameborder="0"
                  style={{ border: "rgb(0, 0, 0) solid", borderRadius: "1%" }}
                  allowfullscreen
                ></iframe>
                

                {/* <div className="pl-3">
                <img
                  src="https://docs.mapbox.com/ios/assets/maps-examples-user-location-annotation-960-52e38dd2f7dc18e02b816fffb4fded73.webp"
                  width="70px"
                  height="70px"
                  alt=""
                />
                <p>location two </p>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end Location ,reviews,PRODUCT INFORMATION --> */}
      </section>
    </motion.div>
  );
}
