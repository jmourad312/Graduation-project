import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../../../store/actions";
// import Review from '../../../../../components/Review'

export default function FavouriteItems(props) {
  const user = useSelector((state) => state.user.Data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    console.log(user ? user.person : "loading");
    console.log(localStorage.getItem("UserID"));
  }, [localStorage.getItem("UserID")]);
  return (
    <motion.div
      className="FavouriteItems"
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <div className="container">
        <div className="row">
        <div className="col-3">
          <div className="card">
            <img
              className="card-img-top"
              src="https://pngimage.net/wp-content/uploads/2018/05/exhaust-png-3.png"
              alt="Card image"
            />
            <div className="card-body">
              <h4 className="card-title">John Doe</h4>
              <p className="card-text">some example text.</p>
              <a href="#" className="btn btn-success">
                Details
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
