import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setProductId } from "../store/actions";

export default function ProductComp(props) {

  var history = useHistory();
  const productID = useSelector(state => state.productID)
  const dispatch = useDispatch();

  const handleClick = (params) =>{
    dispatch(setProductId(params));
    history.push(`/ProductDetails/${props.id}`);
  }



  return (
    <div className="col-md-3 col-lg-3 col-xl-3 mb-3">
      <div className="card product">
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
      </div>
    </div>
  );
}
