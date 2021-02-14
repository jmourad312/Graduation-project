// import Dropdown from "../../../../../components/Dropdown";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../../../store/actions";
import { useHistory } from "react-router-dom";
import SimpleDelete from "../../../../../components/SimpleDelete";
import { PaginationReact } from "../../../../../components/PaginationReact";

export default function BookmarkedPosts(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.Data);
  const dispatch = useDispatch();

   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(3);
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setPosts(user ? user.bookmarkPosts : []);
  });

  const handleClick = (pageNumber) => setCurrentPage(pageNumber.selected + 1);
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
        {user ? (
          currentPosts.length === 0 ? (
            <div
              className="text-center"
              style={{
                fontWeight: "700",
                fontSize: "30px",
                fontFamily: "cursive",
                position: "absolute",
                left: "30%",
              }}
            >
              No Bookmarked Posts yet
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
            <>
              {currentPosts.map((post, index) => {
                let time = post.createdAt.split("T");
                console.log(time);
                return (
                  <div
                    style={{ paddingBottom: "15px", paddingTop: "15px" }}
                    key={index}
                  >
                    {/* <div className="media border-rounded p-3" key={post._id}>
                  <img src={post.image} alt="John Doe" className="mr-3 rounded-circle" />
                  <div className="media-body">
                    <h2 className="text-truncate" style={{ maxWidth: "500px" }}>{post.title}</h2>
                    <strong><i> Posted on </i></strong>
                    {time[0]}
                    <h4 className="text-truncate" style={{ maxWidth: "500px" }}>{post.body}</h4>
                    <strong>
                      <i className="badge badge-light">{post.brand}</i>{" "}
                      <i className="badge badge-light">{post.model}</i>
                    </strong>
                  </div>
                </div> */}

                    <div className="card m-auto" key={post._id}>
                      <div className="row">
                        <div className="col-4">
                          <img
                            className="d-block w-100"
                            src={post.image}
                            style={{ height: "100%" }}
                            alt="No supported image"
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-block">
                            <h2
                              className="card-title text-truncate"
                              style={{
                                maxWidth: "500px",
                                marginBottom: "0px",
                                paddingBottom: "5px",
                              }}
                            >
                              {post.title}
                            </h2>
                            <strong style={{}}>
                              <i> Posted on </i>
                              {time[0]}
                            </strong>
                            <h4
                              className="text-truncate"
                              style={{
                                maxWidth: "500px",
                                marginBottom: "0px",
                                paddingBottom: "5px",
                              }}
                            >
                              {post.body}
                            </h4>
                            <br />
                            <strong>
                              <i
                                className="badge badge-dark"
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                {post.brand}
                              </i>{" "}
                              <i
                                className="badge badge-dark"
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                {post.model}
                              </i>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ position: "absolute", top: "-40px" }}>
                <PaginationReact
                  NumberOfItemsInDB={posts.length}
                  NumberToShow={postsPerPage}
                  handleClick={handleClick}
                />
              </div>
            </>
          )
        ) : (
          "Loading"
        )}
      </div>
    </motion.div>
  );
}
