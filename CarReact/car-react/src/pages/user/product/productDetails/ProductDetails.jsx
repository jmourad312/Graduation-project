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
  return (
    <section className="products-details">
      {/* <!-- start product details --> */}
      <div className="container mx-auto mt-3">
        <div className="row shadow-sm  mb-4 bg-light rounded-lg">
          {/* <!-- image of produce --> */}
          <div className="col-md-4">
            <img
              src={productDetails && productDetails.image}
              // width="100%"
              // height="100%"
              style={{ maxHeight: "400px", maxWidth: "400px" }}
              alt=""
            />
          </div>

          <div className="col-md-8 p-2">
            <h2>
              {productDetails && productDetails.name} By{" "}
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
                <span className="badge badge-pill badge-success">Avalible</span>
              ) : (
                <span className="badge badge-pill badge-danger">
                  Not Avalible
                </span>
              ))}

            {/* <!-- number of stars --> */}
            <div className="mt-3 star">
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"> No review</span>
            </div>
            {/* <!-- description --> */}
            <div className="mt-3">
              {productDetails && productDetails.description}
            </div>
            {/* <!-- Add to favorate and compare product --> */}
            {/* <!-- price --> */}
            <div className="mt-3">
              <span className="" style={{ fontSize: "25px" }}>
                <li className="fas fa-coins pr-2 text-warning">
                  {productDetails && productDetails.price}
                </li>
              </span>
              <div className="d-flex justify-content-end">
                <span
                  className="fa-lg pr-3"
                  data-toggle="tooltip"
                  title="Add to favorate"
                  data-placement="bottom"
                >
                  <i className="far fa-heart  text-danger"></i>
                </span>
                <span
                  className="fa-lg"
                  data-toggle="tooltip"
                  title="compare product"
                  data-placement="bottom"
                >
                  <i className="fas fa-sliders-h  text-primary"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end product details --> */}

      {/* <!-- start Location ,reviews,PRODUCT INFORMATION --> */}
      <div className="accordion container mx-auto mt-3">
        <div className="row">
          <div className="col-md-2 shadow-sm p-2 mb-4 rounded-lg">
            {/* <ul className="tabs">
                    <li id="tab1" [className.active]="tab == 1" (click) = "changeTap(1)"><i className="fas fa-info  mr-2"></i> Product information</li>
                    <hr>
                    <li id="tab2" [className.active]="tab == 2" (click) = "changeTap(2)"><i className="fas fa-map-marker-alt mr-2"></i> locations</li>
                    <hr>
                    <li id="tab3" [className.active]="tab == 3" (click) = "changeTap(3)"><i className="fas fa-pen  mr-2"></i> write your review</li>
                </ul> */}
          </div>

          <div className="col-md-10 content">
            {/* <div [hidden]="tab == 2 || tab == 3"> */}
            <h3>
              <span
                className="pl-3"
                style={{ borderLeft: "3px solid red", height: "100%" }}
              >
                Product Information
              </span>
            </h3>
            <br />
            <p>
              <b>Manufacturer: </b>{" "}
              {productDetails
                ? productDetails.case
                  ? productDetails.case
                  : "Loading"
                : "Loading"}
            </p>
            <p>
              <b>Brand: </b>{" "}
              {productDetails
                ? productDetails.carBrand
                  ? productDetails.carBrand
                  : "Loading"
                : "Loading"}
            </p>
            <p>
              <b>Compatible car models: </b>
              {productDetails
                ? productDetails.carModel
                  ? productDetails.carModel
                  : "Loading"
                : "Loading"}
            </p>
            {/* </div> */}

            {/* <div [hidden]="tab == 1 || tab == 3"> */}
            <h3>
              <span
                className="pl-3"
                style={{ borderLeft: "3px solid red", height: "100%" }}
              ></span>
              Location
            </h3>
            <br />
            <div className="d-flex flex-wrap">
              <div>
                <img
                  src="https://docs.mapbox.com/ios/assets/maps-examples-user-location-annotation-960-52e38dd2f7dc18e02b816fffb4fded73.webp"
                  width="70px"
                  height="70px"
                  alt=""
                />
                <p>location one </p>
              </div>
              <div className="pl-3">
                <img
                  src="https://docs.mapbox.com/ios/assets/maps-examples-user-location-annotation-960-52e38dd2f7dc18e02b816fffb4fded73.webp"
                  width="70px"
                  height="70px"
                  alt=""
                />
                <p>location two </p>
              </div>
            </div>
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
              <div className="form-group">
                <label for="email">Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                />
              </div>
              <div className="form-group">
                <label for="review">review:</label>
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
        </div>
      </div>
      {/* <!-- end Location ,reviews,PRODUCT INFORMATION --> */}
    </section>
  );
}
