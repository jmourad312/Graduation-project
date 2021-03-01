// import Dropdown from "../../../../../components/Dropdown";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../../../store/actions";
import { useHistory } from "react-router-dom";
import SimpleDelete from "../../../../../components/SimpleDelete";
import { PaginationReact } from "../../../../../components/PaginationReact";
import { useTranslation } from "react-i18next";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

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

  const handleBlogClick = (params) => {
    localStorage.setItem("BlogID", params);
    history.push(`/BlogDetails/${params}`);
  };


  const handleRemoveBookmark = (params) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const body = {
      id: params,
    };
    const URL = "http://localhost:3000/user/removeBookmarkPosts";
    axios
      .put(URL, body, config)
      .then((req) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (pageNumber) => setCurrentPage(pageNumber.selected + 1);
  // const date = new Date ()
  const { t, i18n } = useTranslation();
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
          posts.length === 0 ? (
            <div
              className="text-center"
              style={{
                fontWeight: "700",
                fontSize: "30px",
                color:"black", 
                position: "absolute", 
                left: "31%",
                top:"240px" 
              }}
            >
              {t("BookmarkedItems.NoBookmarked")}
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
                let time = post.createdAt.split("T");
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
                            <div
                                style={{
                                  top: "70%",
                                  left: "370px",
                                  position: "absolute",
                                }}
                              >
                                <button className="btn btn-danger" onClick={() => handleRemoveBookmark(post._id)}>
                                 <DeleteIcon />
                                </button>
                              </div>
                            <div
                                style={{
                                  top: "70%",
                                  left: "425px",
                                  position: "absolute",
                                }}
                              >
                                <button className="btn btn-light" onClick={() => handleBlogClick(post._id)}>
                                 <InfoIcon />
                                </button>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {posts.length > 3 && (
                <div
                  style={{ position: "absolute", top: "-40px", left: "140px" }}
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
          "Loading"
        )}
      </div>
    </motion.div>
  );
}
