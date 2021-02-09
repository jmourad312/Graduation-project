import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setProductId } from "../../../../../store/actions";

export default function RecentViews(props) {
    const dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (params) => {
      dispatch(setProductId(params));
      history.push(`/ProductDetails/${params}`);
    };
  return (
    <motion.div
      className="RecentViews"
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <div className="container">
        {props.recentlyViewed.map((item) => {
          return (
            <div className="card">
              <img className="card-img-top" src={item.image} alt="Card" />
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <p className="card-text">{item.description}</p>
                <p className="card-text">{item.price}</p>
                <small>
                  <i className="badge badge-light">{item.carBrand}</i>{" "}
                  <i className="badge badge-light">{item.carModel}</i>
                </small>
                <button
                  className="btn btn-success"
                  onClick={() => handleClick(item._id)}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}