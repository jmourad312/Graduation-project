// import Dropdown from "../../../../../components/Dropdown";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../../../store/actions";
import { useHistory } from "react-router-dom";

export default function BookmarkedPosts(props) {
  const history = useHistory();

  const carBrand = ["BMW", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand2 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
  const carBrand3 = ["BMW2", "AUDI", "MAZARATI", "HYUNDAI"];
  const user = useSelector((state) => state.user.Data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    console.log(user ? user.person : "loading");
    console.log(localStorage.getItem("UserID"));
  }, [localStorage.getItem("UserID")]);

  // const date = new Date ()
  return (
    <motion.div
      className="BookmarkedPosts"
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <div className="container mt-3">
        {user
          ?
            user.bookmarkPosts.length === 0 ? (
              <div className="text-center" style={{ fontWeight: "700", fontSize: "30px", fontFamily: "cursive",position:"absolute",left:"30%" }}
              >No Bookmarked Posts yet
              <div className="text-center" onClick={() => history.push("/BlogList")} style={{fontSize:"30px",borderRadius:"25px",textDecoration:"underline",cursor:"pointer"}}>
                Go to Blogs List 
              </div>
              </div>
            ) : user.bookmarkPosts.map((post) => {
              let time = post.createdAt.split("T");
              console.log(time)
              return (
                <div>
                  <div className="media border-rounded p-3" key={post._id}>
                    <img
                      src={post.image}
                      alt="John Doe"
                      className="mr-3 rounded-circle"
                    />
                    <div className="media-body">
                      <h2
                        className="text-truncate"
                        style={{ maxWidth: "500px" }}
                      >
                        {post.title}
                      </h2>
                      <strong>
                        <i> Posted on </i>
                      </strong>
                      {time[0]}
                      <h4
                        className="text-truncate"
                        style={{ maxWidth: "500px" }}
                      >
                        {post.body}
                      </h4>
                      <strong>
                        <i className="badge badge-light">{post.brand}</i>{" "}
                        <i className="badge badge-light">{post.model}</i>
                      </strong>
                    </div>
                  </div>
                  
                </div>
              );
            })
          : "Loading"}
      </div>
    </motion.div>
  );
}
