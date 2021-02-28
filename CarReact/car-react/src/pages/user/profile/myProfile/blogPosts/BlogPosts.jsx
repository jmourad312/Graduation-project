import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleDelete from "../../../../../components/SimpleDelete";
import { getUsersAction } from "../../../../../store/actions";
// import Footer from '../../../../../layout/footer/Footer';
import { useHistory } from "react-router-dom";
import { PaginationReact } from "../../../../../components/PaginationReact";
import Loading from "../../../../../components/Loading";
import { useTranslation } from "react-i18next";
import InfoIcon from "@material-ui/icons/Info";

export default function BlogPosts(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.Data);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const dispatch = useDispatch();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  const handleBlogClick = (params) => {
    localStorage.setItem("BlogID", params);
    history.push(`/BlogDetails/${params}`);
  };

  useEffect(() => {
    setPosts(user ? user.postsUser : []);
  });

  // Get current posts

  const handleClick = (pageNumber) => setCurrentPage(pageNumber.selected + 1);
  const { t, i18n } = useTranslation();
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
        <div className="container mt-3" style={{ width: "100%" }}>
          {user ? (
            posts.length === 0 ? (
              <div
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "30px",
                  color:"black", 
                  position: "absolute", 
                  left: "35%",
                  top:"200px" 
                }}
              >
                {t("MyBlogs.Noblogsyet")}{" "}
                <p
                  className="text-center"
                  style={{ fontSize: "25px", fontWeight: "500" }}
                >
                  {t("MyBlogs.ToAddBlog")}{" "}
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
                  {t("MyBlogs.GoToBlogsList")}
                </div>
              </div>
            ) : (
              <>
                {currentPosts.map((post, index) => {
                  return (
                    <div
                      className="card mb-3"
                      key={index}
                      style={{ marginTop: "0px", width: "100%" }}
                    >
                      <div className="row" style={{ marginTop: "0px" }}>
                        <div className="col-4">
                          <img
                            className="d-block w-100"
                            src={post.images[0]}
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
                            <strong >
                              <i> {t("repeated.Date")} </i>
                              {post.createdAt.split("T")[0]}
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
                            <div className="row w-100">
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
                              <div
                                style={{
                                  top: "8px",
                                  left: "485px",
                                  position: "absolute"
                                }}
                              >
                                <button
                                  className="btn btn-light"
                                  style={{height:"47px"}}
                                  onClick={() => handleBlogClick(post._id)}
                                >
                                  <InfoIcon />
                                </button>
                              </div>
                              <div
                                style={{
                                  top: "0px",
                                  left: "390px",
                                  position: "absolute",
                                }}
                              >
                                <SimpleDelete id={post._id} num={index} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <img
                          src={post.image}
                          alt="No Supported Image"
                          className="mr-3 rounded-circle"
                        /> */}
                      {/* <div className="media-body">
                          <h2 className="text-truncate"style={{ maxWidth: "500px" }}>
                            {post.title}
                          </h2>
                          <strong>
                            <i> Posted on </i>
                          </strong>
                          {post.createdAt}
                          <h4 className="text-truncate" style={{ maxWidth: "500px" }}>
                            {post.body}
                          </h4>
                          <strong>
                            <i className="badge badge-light">{post.brand}</i>{" "}
                            <i className="badge badge-light">{post.model}</i>
                          </strong>
                        </div> */}
                    </div>
                  );
                })}
                {posts.length > 3 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "140px",
                    }}
                  >
                    <PaginationReact
                      NumberOfItemsInDB={posts.length}
                      NumberToShow={postsPerPage}
                      handleClick={handleClick}
                    />
                  </div>
                )}
              </>
            )
          ) : (
            <Loading />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
