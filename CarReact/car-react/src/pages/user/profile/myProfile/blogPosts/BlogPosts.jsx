import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleDelete from "../../../../../components/SimpleDelete";
import { getUsersAction } from "../../../../../store/actions";
// import Footer from '../../../../../layout/footer/Footer';
import { useHistory } from "react-router-dom";


export default function BlogPosts(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.Data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    console.log(user ? user.person : "loading");
    console.log(localStorage.getItem("UserID"));
  }, [localStorage.getItem("UserID")]);

  
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="MyBlogPosts"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div className="container mt-3">
          {user ? (
            user.postsUser.length === 0 ? (
              <div className="text-center" style={{ fontWeight: "700", fontSize: "30px", fontFamily: "cursive",position:"absolute",left:"40%" }}
              >No blogs yet <p className="text-center" style={{fontSize:"20px",fontWeight:"200"}}>to add blog </p>
              <div className="text-center" onClick={() => history.push("/BlogList")} style={{fontSize:"30px",borderRadius:"25px",textDecoration:"underline",cursor:"pointer"}}>
                Go to Blogs List 
              </div>
              </div>
            ) : <div>
            {(
              user.postsUser.map((post) => {
                return (
                  <div>
                    <div className="media border-rounded p-3" key={post._id}>
                      <img
                        src={post.image}
                        alt="No Supported Image"
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
                        {post.createdAt}
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
                      <SimpleDelete id={post._id} />
                    </div>
                    {/* <hr
                      className="position-relative"
                      style={{
                        borderTop: "6px dotted lightblue",
                        // borderTop: "0",
                        width: "40px",
                        left: "350px",
                      }}
                    /> */}
                  </div>
                );
              })
            )}
              </div>
          ) : (
            "Loading"
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
