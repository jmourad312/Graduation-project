import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setProductId } from "../store/actions";

export default function ProductComp(props) {
  var history = useHistory();
  const productID = useSelector((state) => state.productID);
  const dispatch = useDispatch();

  const handleClick = (params) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID",params)
    history.push(`/ProductDetails/${props.id}`);
    axios
      .put(
        `http://localhost:3000/user/recentlyViewed`,
        { id: props.id },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
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
  };

  return (
    <div className="col-md-4 col-lg-4 col-xl-4 mb-1 productComp">
      {/* <div className="card product">
        <div className="d-flex justify-content-between position-absolute w-100">
          <div className="label-new">
            <span className="text-white bg-success small d-flex align-items-center px-2 py-1">
              <i className="fa fa-star" aria-hidden="true"></i>
              <span className="ml-1">New</span>
            </span>
          </div>
          <div className="label-sale">
            <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
              <i className="fa fa-tag" aria-hidden="true"></i>
              <span className="ml-1">Sale</span>
            </span>
          </div>
        </div>
        <a href="#">
          <img
            src={props.image}
            className="card-img-top"
            alt="Product"
            style={{ maxHeight: "400px", maxWidth: "400px" }}
          />
        </a>
        <div className="card-body px-2 pb-2 pt-1">
          <div className="d-flex justify-content-between">
            <div>
              <p className="h4 text-primary">{props.price + "$"}</p>
            </div>
          </div>
          <p className="text-warning d-flex align-items-center mb-2">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
          </p>
          <p className="mb-0">
            <strong>
              <a href="#" className="text-secondary">
                {props.name}
              </a>
            </strong>
          </p>
          <p className="mb-1">
            <small>
              <a href="#" className="text-secondary">
                {props.brand}
              </a>
            </small>
          </p>
          <p className="mb-1">
            <small>
              <a href="#" className="text-secondary">
                {props.model}
              </a>
            </small>
          </p>
          <p className="">
            <small>
              <a href="#" className="text-secondary">
                {props.category}
              </a>
            </small>
          </p>
          <div className="row ml-1">
            <div className="col-9 px-0">
              <button
                className="button slide1 p-2"
                onClick={() => handleClick(props.id)}
              >
                Go to details{" "}
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
              </button>
            </div>
            <div className="col-3 px-0" style={{ marginTop: "6px" }}>
              <button className="button fill p-2 m-0" title="Add to Wishlist">
                <i className="fa fa-heart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        class="container mr-5"
        style={{
          background: `url(${props.image})`,
          backgroundSize: "100% 100%",
        }}
        onClick={() => handleClick(props.id)}
      >
        <div class="overlay">
          <div class="items"></div>
          <div class="items head">
            <p className="text-light">{props.name}</p>
            <hr />
          </div>
          <div class="items price">
            <p class="old">$699</p>
            <p class="new text-light">{props.price + "$"}</p>
          </div>
          <div class="items cart">
            <small>
              <i class="badge badge-light">{props.brand}</i>
              <i class="badge badge-light">{props.model}</i>
            </small>
            <i class="fa fa-shopping-cart"></i>
            <span>ADD TO CART</span>
          </div>
        </div> */}
      {/* </div> */}
      <article
        className="card"
        style={{
          background: `url(${props.image}) no-repeat`,
          backgroundSize: "100% 70%",
        }}
        onClick={() => handleClick(props.id)}
      >
        <div className="thumb"></div>
        <div className="infos">
          <h2 className="title">{props.name}</h2>
          <h3 className="price">{props.price + "$"}</h3>
          <p className="desc">
            <h3 className="tags">
              <i className="badge badge-dark">{props.brand}</i>
              <i className="badge badge-dark">{props.model}</i>
            </h3>
            {props.description}
          </p>
          {/* <h3 className="details">
            <i className="badge badge-dark">{props.brand}</i>
            <i className="badge badge-dark">{props.model}</i>
          </h3> */}
        </div>
      </article>
    </div>
  );
}
