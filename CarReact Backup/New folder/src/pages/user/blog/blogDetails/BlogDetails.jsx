import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cars2 from "../../../../assets/js/cars2";
import cars3 from "../../../../assets/js/cars3";
import LoginButton from "../../../../components/LoginButton";
import ToastMessage from "../../../../components/ToastMessage";
import UserIcon from "../../../../components/UserIcon";
import { useHistory } from "react-router-dom";
import {
  getBlogDetails,
  addVoteComment,
  removeVoteComment,
} from "../../../../store/actions";
import Loading from "../../../../components/Loading";
import {useTranslation} from "react-i18next";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

export default function BlogDetails(props) {

  // const blogs = useSelector((state) => state.blogs);
  const blogID = useSelector((state) => state.blogID);
  const blogDetails = useSelector((state) => state.blogDetails.Data);
  const userID = useSelector((state) => state.userID);
  const [checkOwner, setCheckOwner] = useState(false);

  const checkOwnerDetails = () => {
    if (blogDetails.person) {
      if (blogDetails.person._id === localStorage.getItem("UserID")) {
        setCheckOwner(true);
      }
    } else {
      setCheckOwner(false);
    }
  };

  const dispatch = useDispatch();

  const getBlog = (params) => {
    dispatch(getBlogDetails(params));
    // console.log(blogDetails);
  };

  //---------------------------EDIT FUNCTIONS----------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log(blogDetails);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [stateDisabled, setStateDisabled] = useState(false);
  const [editValue, setEditValue] = useState({
    title: "",
    body: "",
    images: [],
    brand: "",
    model: "",
  });

  const handleEditChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      setStateDisabled(true);
    }
    setEditValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleImageChange = (event) => {
    setEditValue((previous) => {
      return {
        ...previous,
        image: event.target.files,
      };
    });
  };
  const handleEditSubmit = (params) => {
    const formData = new FormData();
    for (var x = 0; x < editValue.images.length; x++) {
      formData.append("images", editValue.images[x]);
    }
    formData.append("title", editValue.title);
    formData.append("body", editValue.body);
    formData.append("brand", editValue.brand);
    formData.append("model", editValue.model);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .put(`http://localhost:3000/user/updatePost/${params}`, formData, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          // props.history.push("/MyProfile");
          closeModal();
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    closeModal();
  };
  const [toastStatus, setToastStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toggleStatus = () => {
    setToastStatus(true);
    setTimeout(() => {
      setToastStatus(false);
    }, 2000);
  };
  const handleRemoveBookmark = () => {
    console.log(blogID);
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const body = {
      id: blogID,
    };
    const URL = "http://localhost:3000/user/removeBookmarkPosts";
    axios
      .put(URL, body, config)
      .then((req) => {
        console.log(req);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleAddBookmark = () => {
    console.log(blogID);
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      id: blogID,
    };

    const URL = "http://localhost:3000/user/addBookmarkPosts";

    axios
      .put(URL, body, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          toggleStatus();
          setToastMessage("Blog added to bookmarks");
        } else {
          handleRemoveBookmark();
          toggleStatus();
          setToastMessage("Blog removed from bookmarks");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //---------------------------END EDIT FUNCTIONS----------------------------------------

  const [inputValue, setInputValue] = useState({
    content: "",
  });
  const [replyInput, setReplyInput] = useState({
    replyContent: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleReplyChange = (event) => {
    const { value, name } = event.target;
    setReplyInput((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    console.log(blogID);
    axios
      .post(`http://localhost:3000/user/addComment/${blogID}`, inputValue, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("success");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setInputValue({ content: "" });
  };

  const handleReplySubmit = (event, params) => {
    event.preventDefault();
    console.log(params);
    console.log(replyInput);
    // axios
    // .post(
    //   `http://localhost:3000/user/addCommentReply/${params}`,
    //   replyInput,
    //   {
    //     headers: { Authorization: localStorage.getItem("Authorization") },
    //   }
    // )
    // .then((req) => {
    //   console.log(req);
    //   if (req.data.Success === true) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    setReplyInput({ replyContent: "" });
  };

  const addVote = (id) => {
    dispatch(addVoteComment(id));
    setVoted(true);
    setTimeout(() => {
      setVoted(false);
    }, 2000);
  };
  const removeVote = (id) => {
    dispatch(removeVoteComment(id));
    setVoted(true);
    setTimeout(() => {
      setVoted(false);
    }, 2000);
  };

  // useEffect(() => {
  // getBlog(blogID);
  // console.log(blogDetails);
  // console.log(blogID);
  // }, []);
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    getBlog(localStorage.getItem("BlogID"));
    if (blogDetails) {
      checkOwnerDetails();
    }
  }, [blogDetails]);
  const pageVariants = {
    in: {
      opacity: 10,
      y: "0vh",
      scale: 1,
    },
    out: {
      opacity: 0,
      y: "100vh",
      scale: 0.1,
    },
  };
  const pageTransitions = {
    duration: 1,
    type: "tween",
    ease: "easeIn",
  };

  if (blogDetails) {
    var blogTime = blogDetails.createdAt.split("T");
  }
  const history = useHistory();
  const {t, i18n} = useTranslation();
  return (
    <motion.div
      className="container"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <div style={{ position: "absolute", top: "200px", right: "-150px" }}>
        <ToastMessage
          showFunction={toggleStatus}
          status={toastStatus}
          message={toastMessage}
        />
      </div>
      <div className="blogDetails">
        <div className="header" style={{ paddingBottom: "0px" }}>
          <div style={{ position: "absolute", top: "5%", right: "-30%" }}>
            {localStorage.getItem("Authorization") === null && <LoginButton />}
            {localStorage.getItem("Authorization") !== null && <UserIcon />}
          </div>
          <div className="row">
            <div className="col-6">
              <p
                className="font-weight-bold truncate"
                style={{ fontSize: "26px", marginBottom: "0" }}
              >
                {" "}
                {blogDetails ? blogDetails.title : "LOADING"}{" "}
              </p>
              <p style={{ fontWeight: "600", fontSize: "20px" }}>
                {t("repeated.By")}{" "}
                <span>
                  {" "}
                  {blogDetails
                    ? blogDetails.person
                      ? blogDetails.person.firstName
                      : "User"
                    : "LOADING"}
                </span>
              </p>
              <hr />
              <p>
                <span style={{ fontWeight: "700", fontSize: "20px" }}>
                {t("repeated.Date")} 
                  {blogDetails && blogTime ? " " + blogTime[0] : "Loading"}
                </span>
                {/* <span style={{ color: "gray" }}> Viewed </span> 3 */}
                <span className="badge badge-success">
                  {blogDetails
                    ? blogDetails.state === true && "Answered"
                    : "LOADING"}
                </span>
              </p>
              <hr />
              <h5
                className="mt-0"
                style={{ fontWeight: "700", fontSize: "25px" }}
              >
                {t("BlogDetails.PostDetails")} 
              </h5>
              <p
                className="truncate"
                style={{ fontWeight: "600", fontSize: "25px" }}
              >
                {blogDetails && blogDetails.body}
              </p>

              {/* <p>
                {" "}
                <span className="" style={{ fontWeight: "700" }}>
                Tags
                </span>{" "}
                <span className="badge badge-dark" style={{ fontSize: "20px" }}>
                {blogDetails && blogDetails.brand}
                </span>
                <span
                className="badge badge-dark ml-1"
                style={{ fontSize: "20px" }}
                >
                {blogDetails && blogDetails.model}
                </span>
              </p> */}
            </div>
            <div className="col-6">
              {blogDetails ? (
                blogDetails.images && blogDetails.images.length === 1 ? (
                  <img
                    className="ml-lg-5"
                    style={{
                      width: "400px",
                      height: "300px",
                      borderRadius: "10%",
                    }}
                    src={blogDetails.images[0]}
                    alt=""
                  />
                ) : (
                  blogDetails.images && (
                    <div>
                      <Carousel interval={1000}>
                        {blogDetails.images.map((img, index) => {
                          return (
                            <Carousel.Item>
                              <img
                                key={index}
                                className="d-block"
                                style={{ height: "300px", width: "500px" }}
                                src={img}
                                alt="Slide"
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                  )
                )
              ) : (
                <Loading />
              )}
            </div>
            <div className="row" style={{ marginLeft: "710px" }}>
              {localStorage.getItem("UserID") !== null && (
                <button
                  className="bookmarkbtn fourth"
                  style={{ marginLeft: "30px", height: "50px",fontSize:"20px",paddingTop:"15px" }}
                  onClick={handleAddBookmark}
                >
                  {t("repeated.Bookmark")} 
                </button>
              )}
              {checkOwner && (
                <Button
                  variant="dark"
                  style={{ margin: "10px" }}
                  onClick={() => openModal(props.id)}
                >
                  {t("repeated.Edit")}
                </Button>
              )}
            </div>

            <hr
              style={{
                border: "2px solid black",
                width: "100%",
                marginBottom: "8px",
                marginTop: "0px",
              }}
            />
          </div>
        </div>
      </div>
      {/* --------------------- EDIT SECTION--------------- */}
      {/* <p
        onClick={handleAddBookmark}
        className="button pulse"
        style={{
          width: "84px",
          height: "34px",
          padding: "5px",
          background: "grey",
          cursor: "pointer",
          display: "inline",
        }}
      >
        Bookmark
      </p> */}
      <Modal show={isOpen} onHide={!isOpen}>
        <Modal.Header>
          <Modal.Title>{t("EditBlogModal.EditBlog")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t("EditBlogModal.BlogTitle")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("EditBlogModal.EnterTitle")}
                name="title"
                id="title"
                value={editValue.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("EditBlogModal.BlogImage")}</Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("EditBlogModal.BlogContent")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={t("EditBlogModal.BlogDescription")}
                name="body"
                id="body"
                value={editValue.body}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>{t("repeated.Brand")}</Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="brand"
                  id="brand"
                  value={editValue.brand}
                  onChange={handleEditChange}
                >
                  {cars2.map((item, index) => {
                    return (
                      <option key={index} value={item.make}>
                        {item.make}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>{t("repeated.Model")}</Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="model"
                  id="model"
                  value={editValue.model}
                  onChange={handleEditChange}
                  disabled={!stateDisabled}
                >
                  {cars3.map((item, index) => {
                    return (
                      <option key={index} value={item.model}>
                        {item.model}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            type="button"
            onClick={() => handleEditSubmit(localStorage.getItem("BlogID"))}
          >
            {t("repeated.Submit")}
          </Button>
          <Button variant="danger" onClick={closeModal}>
          {t("repeated.Cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Comments Form --> */}
      <h3
        className="text-center mb-4"
        style={{
          fontWeight: "700",
          fontSize: "40px",
          backgroundImage: "linear-gradient(to top, #08091d 0%, #a2a5a8 100%)",
          color: "transparent",
          WebkitBackgroundClip: "text",
        }}
      >
        {t("BlogDetails.CommentSection")} 
      </h3>
      <div className="row">
        <div className="col-8">
          {/* <!-- Single Comment --> */}
          {blogDetails ? (
            blogDetails.comment.length === 0 ? (
              <div
                className="text-center mt-5"
                style={{ fontWeight: "700", fontSize: "30px", color: "black" }}
              >
                {t("BlogDetails.NoCommentsYet")} 
              </div>
            ) : (
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {blogDetails.comment.map((item, index) => {
                  return (
                    <div className="media mb-1" key={index}>
                      <div className="mr-2">
                        {!voted ? (
                          <button
                            className="btn"
                            style={{
                              position: "relative",
                              left: "95.7px",
                              fontSize: "20px",
                            }}
                            onClick={() => addVote(item._id)}
                          >
                            <ThumbUpIcon />
                          </button>
                        ) : (
                          <Spinner
                            animation="grow"
                            style={{
                              position: "relative",
                              left: "70.7px",
                              fontSize: "20px",
                            }}
                          />
                        )}
                        <span
                          className="btn badge-pill"
                          style={{
                            position: "relative",
                            left: "40px",
                            top: "45px",
                            fontSize: "20px",
                            width: "30px !important",
                            fontWeight: "700",
                          }}
                        >
                          {item.vote.upVoting - item.vote.downVoting}
                        </span>
                        {!voted ? (
                          <button
                            className="btn"
                            style={{
                              position: "relative",
                              left: "0px",
                              top: "85px",
                              fontSize: "20px",
                            }}
                            onClick={() => removeVote(item._id)}
                          >
                            <ThumbDownIcon />
                          </button>
                        ) : (
                          <Spinner
                            animation="grow"
                            style={{
                              position: "relative",
                              left: "0px",
                              top: "80px",
                              fontSize: "20px",
                            }}
                          />
                        )}
                      </div>

                      {/* <img
                      className="d-flex mr-3 rounded-circle"
                      src={item.image}
                      alt=""
                      style={{ maxHeight: "300px", maxWidth: "300px" }}
                    /> */}
                      <hr />
                      <br />
                      <div className="media-body">
                        <h5 className="mt-0">
                          {item.person.firstName ? item.person.firstName : null}
                        </h5>
                        <hr />
                        <p style={{ fontSize: "1.5rem" }}>{item.content}</p>
                        <hr style={{ border: "1px solid" }} />
                      </div>

                      {/* <form
                  method="post"
                  onSubmit={() => handleReplySubmit(item._id)}
                >
                  <textarea
                    className="form-control"
                    rows="3"
                    name="replyContent"
                    id={index}
                    value={replyInput.replyContent}
                    onChange={handleReplyChange}
                  ></textarea>
                  <button type="button" className="btn btn-primary">
                    Submit
                  </button>
                </form> */}
                      {/* {item
                  ? item.commentReply.map((rep) => {
                      return (
                        <div className="media mt-4">
                          <img
                            className="d-flex mr-3 rounded-circle"
                            src={rep.image}
                            alt=""
                            style={{ maxHeight: "300px", maxWidth: "300px" }}
                          />
                          <div className="media-body">
                            <h5 className="mt-0">
                              {rep.person ? rep.person.firstName : "NO NAME"}
                            </h5>
                            {rep.person ? rep.person.firstName : "NO NAME"}
                          </div>
                        </div>
                      );
                    })
                  : "LOADING"} */}
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            "LOADING"
          )}
        </div>
        <div className="col-4">
          {localStorage.getItem("Authorization") ? (
            <div className="card bgforleavecomment text-center">
              <h5
                className="card-header"
                style={{ fontSize: "25px", fontWeight: "700" }}
              >
                {t("BlogDetails.LeaveComment")}
              </h5>
              <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <textarea
                      className="form-control bgforleavecomment2"
                      rows="3"
                      name="content"
                      value={inputValue.content}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    {t("repeated.Submit")}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div
              className="shadow-sm p-2 mb-4 rounded-lg"
              onClick={() => history.push(`/SignChoice`)}
              style={{
                height: "300px",
                width: "500px",
                border: "solid white 3px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  color: "#737373",
                  position: "relative",
                  top: "35%",
                  textAlign: "center",
                }}
              >
                {t("BlogDetails.OnlyRegistered")}
              </h3>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Comment with nested comments --> */}
      {/* <div className="media mb-4">
          <img
            className="d-flex mr-3 rounded-circle"
            src="http://placehold.it/50x50"
            alt=""
          />
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            <p>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
              scelerisque ante sollicitudin. Cras purus odio, vestibulum in
              vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
              nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </p>
            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>

            <div className="media mt-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </div>
            </div>
          </div>
        </div> */}
      {/* <div>
        <h2>Related Questions</h2>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src="http://placehold.it/300x150"
                width="300px"
                height="150px"
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src="http://placehold.it/300x150"
                width="300px"
                height="150px"
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src="http://placehold.it/300x150"
                width="300px"
                height="150px"
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick content.</p>
              </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </motion.div>
  );
}
