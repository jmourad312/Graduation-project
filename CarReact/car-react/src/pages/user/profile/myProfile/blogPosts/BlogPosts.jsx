import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleDelete from "../../../../../components/SimpleDelete";
import { getUsersAction } from "../../../../../store/actions";
// import Footer from '../../../../../layout/footer/Footer';
import { useHistory } from "react-router-dom";
import { PaginationReact } from "../../../../../components/PaginationReact";

export default function BlogPosts(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.Data);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(getUsersAction(localStorage.getItem("UserID")));
      console.log(user ? user.person : "loading");
      console.log(localStorage.getItem("UserID"));
      setPosts(user ? user.postsUser : []);

    }
    fetchPosts();
  }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleClick = pageNumber => setCurrentPage(pageNumber.selected+1);

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
              <div
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "30px",
                  fontFamily: "cursive",
                  position: "absolute",
                  left: "40%",
                }}
              >
                No blogs yet{" "}
                <p
                  className="text-center"
                  style={{ fontSize: "20px", fontWeight: "200" }}
                >
                  to add blog{" "}
                </p>
                <div
                  className="text-center"
                  onClick={() => history.push("/BlogList")}
                  style={{
                    fontSize: "30px",
                    borderRadius: "25px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Go to Blogs List
                </div>
              </div>
            ) : (
              <div>
                {currentPosts.map((post) => {
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
                })}
                <PaginationReact
                  NumberOfItemsInDB={user.postsUser.length}
                  NumberToShow={postsPerPage}
                  handleClick={handleClick}
                />
              </div>
            )
          ) : (
            "Loading"
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
