import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loading from "../../../../../components/Loading";
import {
  getUsersAction,
  setProductId,
  setUserIdAction,
} from "../../../../../store/actions";

export default function RecentViews(props) {
  const user = useSelector((state) => state.user.Data);

  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    console.log(user ? user.person : "loading");
    console.log(localStorage.getItem("UserID"));
  }, [localStorage.getItem("UserID")]);
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
      <div className="container" >
        <div className="row">
          {user ? (
            user.recentlyViewed.map((item) => {
              return (
                <div className="col-4 mb-3 h-25 w-25">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt="Card"
                      style={{ maxHeight: "100px" }}
                    />
                    <div className="card-body">
                      <h3 className="card-title text-truncate">{item.name}</h3>
                      <h4 className="card-text text-truncate">
                        {item.description}
                      </h4>
                      <h5
                        className="card-text"
                        style={{ color: "yellow" }}
                      >
                        <i class="fas fa-coins"></i> {item.price}
                      </h5>
                      <strong>
                        <i className="badge badge-light">{item.carBrand}</i>{" "}
                        <i className="badge badge-light">{item.carModel}</i>
                      </strong>
                      <button
                        className="btn btn-success"
                        onClick={() => handleClick(item._id)}
                      >
                        Go to product
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </motion.div>
  );
}
