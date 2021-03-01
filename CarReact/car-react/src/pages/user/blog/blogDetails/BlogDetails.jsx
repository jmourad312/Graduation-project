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
  filterCarModel,
  filterCarBrand,
  removeVoteComment,
  getUsersBookAndFavo,
} from "../../../../store/actions";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Loading from "../../../../components/Loading";
import { useTranslation } from "react-i18next";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
// import DeleteForeverIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SimpleDelete from "../../../../components/SimpleDelete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
  Zoom,
} from "@material-ui/core";

export default function BlogDetails(props) {
  // const blogs = useSelector((state) => state.blogs);
  const blogID = useSelector((state) => state.blogID);
  const blogDetails = useSelector((state) => state.blogDetails.Data);
  const userID = useSelector((state) => state.userID);
  const [checkOwner, setCheckOwner] = useState(false);
  const userDetails = useSelector((state) => state.UserBookAndFavo.Data);

  const checkOwnerDetails = () => {
    if (blogDetails.person) {
      if (blogDetails.person._id === localStorage.getItem("UserID")) {
        setCheckOwner(true);
      }
    } else {
      setCheckOwner(false);
    }
  };
  const stateRedux = useSelector((state) => state);

  const dispatch = useDispatch();

  const getBlog = (params) => {
    dispatch(getBlogDetails(params));
    dispatch(filterCarBrand());
  };

  //---------------------------EDIT FUNCTIONS----------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    if (blogDetails) {
      setEditValue({
        title: blogDetails.title,
        body: blogDetails.body,
        images: [],
        brand: blogDetails.brand,
        model: blogDetails.model,
      });
    }
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
      dispatch(filterCarModel(value));
      setEditValue((previous) => {
        return {
          ...previous,
          model: "",
        };
      });
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
        images: event.target.files,
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
        if (req.data.Success === true) {
          closeModal();
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
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const body = {
      id: localStorage.getItem("BlogID"),
    };
    const URL = "http://localhost:3000/user/removeBookmarkPosts";
    axios
      .put(URL, body, config)
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddBookmark = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      id: localStorage.getItem("BlogID"),
    };

    const URL = "http://localhost:3000/user/addBookmarkPosts";

    axios
      .put(URL, body, config)
      .then((req) => {
        if (req.data.Success === true) {
          toggleStatus();
          setToastMessage(t("ToastMessages.BlogAdded"));
        } else {
          handleRemoveBookmark();
          toggleStatus();
          setToastMessage(t("ToastMessages.BlogRemoved"));
        }
      })
      .catch((error) => {});
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
  const [editing, setEditing] = useState(false);
  const [editingID, setEditingID] = useState("");

  const handleEditing = (paramId, paramContent) => {
    setEditing(true);
    setEditingID(paramId);
    setInputValue((previous) => {
      return {
        ...previous,
        content: paramContent,
      };
    });
    document.getElementById("commentTextArea").focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.content.length === 0) {
      toggleStatus();
      setToastMessage(t("ToastMessages.Youcan'tsubmit"));
    } else {
      if (!editing) {
        axios
          .post(
            `http://localhost:3000/user/addComment/${localStorage.getItem(
              "BlogID"
            )}`,
            inputValue,
            {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          )
          .then((req) => {})
          .catch((error) => {
            console.log(error);
          });
        setInputValue({ content: "" });
      } else {
        axios
          .put(
            `http://localhost:3000/user/updateComment/${editingID}`,
            inputValue,
            {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            }
          )
          .then((req) => {
            if (req.data.Success === true) {
              setEditing(false);
              setEditingID("");
              setInputValue({ content: "" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleReplySubmit = (event, params) => {
    event.preventDefault();
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
  // }, []);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getBlog(localStorage.getItem("BlogID"));
    dispatch(getUsersBookAndFavo(localStorage.getItem("UserID")));
    if (blogDetails) {
      checkOwnerDetails();
    }
  }, [blogDetails]);

  const sortComment = (data) => {
    var dataAsc = [];
    dataAsc = data.sort(function(a, b) {
      return b.vote.resultVoting - a.vote.resultVoting;
    });
    return dataAsc;
  };

  const handleDelete = (params) => {
    axios
      .delete(`http://localhost:3000/user/deletePost/${params}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [reportState, setReportState] = useState({
    message: "",
    idBlog: localStorage.getItem("BlogID"),
  });

  const handleReportChange = (event) => {
    const { value, name } = event.target;
    setReportState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      message: reportState.message,
      idBlog: reportState.idBlog,
    };

    const URL = "http://localhost:3000/user/sendReport";

    axios
      .post(URL, body, config)
      .then((req) => {
        if (req.data.Success === true) {
          toggleStatus();
          setToastMessage(t("ToastMessages.ThankForReport"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
    setReportState((previous) => {
      return {
        ...previous,
        message: "",
      };
    });
  };

  const handleEditComment = (params) => {};

  const handleDeleteComment = (params) => {
    axios
      .delete(`http://localhost:3000/user/deleteComment/${params}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
  };

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
  const { t, i18n } = useTranslation();
  return (
    <motion.div
      className="container"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "75%",
          width: "350px",
        }}
      >
        <ToastMessage
          showFunction={toggleStatus}
          status={toastStatus}
          message={toastMessage}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <div style={{ fontSize: "25px" }}>{t("Report.reporttitle")}</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontSize: "20px", fontWeight: "500", width: "570px" }}
            >
              {t("Report.ToReport")}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              name="message"
              label={t("Report.ReportDetails")}
              type="text"
              onChange={handleReportChange}
              value={reportState.message}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ fontSize: "20px", fontWeight: "500" }}
              onClick={handleReport}
              variant="dark"
            >
              {t("repeated.Submit")}
            </Button>
            <Button
              style={{ fontSize: "20px", fontWeight: "500" }}
              onClick={handleClose}
              variant="danger"
            >
              {t("repeated.Cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="blogDetails">
        <div className="header" style={{ paddingBottom: "0px" }}>
          <div style={{ position: "absolute", top: "5%", right: "-30%" }}>
            {localStorage.getItem("Authorization") === null && <LoginButton />}
            {localStorage.getItem("Authorization") !== null && <UserIcon />}
          </div>
          <div className="row">
            <div className="col-8 px-5">
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
            <div className="col-4">
              {blogDetails ? (
                blogDetails.images &&
                (blogDetails.images.length === 1 ||
                  blogDetails.images.length === 0) ? (
                  <img
                    className="py-0"
                    style={{
                      width: "350px",
                      height: "310px",
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
                                style={{ height: "310px", width: "350px" }}
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

            {/* <hr
              style={{
                border: "2px solid black",
                width: "100%",
                marginBottom: "8px",
                marginTop: "0px",
              }}
            /> */}
          </div>
        </div>
        {/* <div className="row" style={{ marginLeft: "710px" }}> */}
        {localStorage.getItem("UserID") !== null && !checkOwner && (
          <>
            <button
              className="bookmarkbtn fourth"
              style={{
                position: "absolute",
                // marginLeft: "300px",
                left: "750px",
                height: "50px",
                fontSize: "20px",
                paddingTop: "15px",
              }}
              onClick={handleAddBookmark}
            >
              {blogDetails && userDetails
                ? userDetails.bookmarkPosts.includes(blogDetails._id)
                  ? t("repeated.RemoveBookmark")
                  : t("repeated.Bookmark")
                : t("repeated.Bookmark")}
            </button>
            <button
              className="bookmarkbtn first"
              style={{
                position: "absolute",
                // marginLeft: "300px",
                right: "20px",
                height: "50px",
                fontSize: "20px",
                paddingTop: "15px",
              }}
              onClick={handleClickOpen}
            >
              {t("Report.reporttitle")}
            </button>
          </>
        )}
        {checkOwner && (
          <div style={{ position: "absolute", left: "800px" }}>
            <Button
              variant="light"
              style={{ margin: "7px", height: "50px", width: "70px" }}
              onClick={() => openModal(props.id)}
            >
              {t("repeated.Edit")}
            </Button>
          </div>
        )}
        {checkOwner && (
          <div style={{ position: "absolute", left: "1000px" }}>
            <SimpleDelete id={localStorage.getItem("BlogID")} num={0} />
          </div>
        )}
        {/* </div> */}
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
          <Modal.Title style={{ fontWeight: "700", fontSize: "25px" }}>
            {t("EditBlogModal.EditBlog")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                {t("EditBlogModal.BlogTitle")}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t("EditBlogModal.EnterTitle")}
                name="title"
                id="title"
                value={editValue.title}
                onChange={handleEditChange}
                required
                style={{ fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                {t("EditBlogModal.BlogImage")}
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                multiple
                required
                style={{ fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                {t("EditBlogModal.BlogContent")}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={t("EditBlogModal.BlogDescription")}
                name="body"
                id="body"
                value={editValue.body}
                onChange={handleEditChange}
                required
                style={{ fontWeight: "500" }}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                  {t("repeated.Brand")}
                </Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="brand"
                  id="brand"
                  value={editValue.brand}
                  onChange={handleEditChange}
                  required
                  style={{ fontWeight: "500" }}
                >
                  <option key={"no-value"} value="">
                    {t("Filter.ChooseBrand")}
                  </option>
                  {stateRedux.brand.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                  {t("repeated.Model")}
                </Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="model"
                  id="model"
                  value={editValue.model}
                  onChange={handleEditChange}
                  disabled={!editValue.brand}
                  required
                  style={{ fontWeight: "500" }}
                >
                  <option key={"no-value"} value="">
                    {t("Filter.ChooseModel")}
                  </option>
                  {stateRedux.model.map((item, index) => {
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
      {/* <h3
        className="text-center"
        style={{
          fontWeight: "700",
          fontSize: "40px",
          backgroundImage: "linear-gradient(210deg,#2e3547 30%,#D7DDE8 70%)",
          color: "transparent",
          WebkitBackgroundClip: "text",
        }}
      >
        {t("BlogDetails.CommentSection")}
      </h3> */}

      <div className="comments">
        <div className="row">
          <div className="col-8">
            {/* <!-- Single Comment --> */}
            {blogDetails ? (
              blogDetails.comment.length === 0 ? (
                <div
                  className="text-center mt-5"
                  style={{
                    fontWeight: "700",
                    fontSize: "30px",
                    color: "black",
                  }}
                >
                  {t("BlogDetails.NoCommentsYet")}
                </div>
              ) : (
                <div
                  style={{
                    maxHeight: "380px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {sortComment(blogDetails.comment).map((item, index) => {
                    return (
                      <div className="media mb-1 mr-3" key={index}>
                        <div className="mr-2">
                          {!voted ? (
                            (localStorage.getItem("Authorization")&&
                            <button
                              className="btn"
                              style={{
                                position: "relative",
                                left: "55.7px",
                                top: "-10px",
                                fontSize: "20px",
                              }}
                              onClick={() => addVote(item._id)}
                            >
                              <ThumbUpIcon />
                            </button>)
                          ) : (
                            <Spinner
                              animation="grow"
                              style={{
                                position: "relative",
                                left: "40.7px",
                                fontSize: "20px",
                              }}
                            />
                          )}
                          <span
                            className={localStorage.getItem("Authorization")?"btn badge-pill":"btn badge-pill mr-3 ml-3"}
                            style={{
                              position: "relative",
                              left: "10px",
                              top: "25px",
                              fontSize: "20px",
                              width: "30px !important",
                              fontWeight: "700",
                            }}
                          >
                            {item.vote.resultVoting}
                          </span>
                          {!voted ? (
                            (localStorage.getItem("Authorization") &&
                            <button
                              className="btn"
                              style={{
                                position: "relative",
                                left: "-35px",
                                top: "55px",
                                fontSize: "20px",
                              }}
                              onClick={() => removeVote(item._id)}
                            >
                              <ThumbDownIcon />
                            </button>)
                          ) : (
                            <Spinner
                              // animation="grow"
                              style={{
                                position: "relative",
                                left: "-40px",
                                top: "50px",
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
                            {item.person.firstName
                              ? item.person.firstName
                              : null}
                            <div className="handleComment">
                              {item.person._id ===
                                (localStorage.getItem("UserID") ||
                                  localStorage.getItem("VendorID")) && (
                                <>
                                  <Zoom in={true}>
                                    <Fab
                                      size="small"
                                      style={{
                                        width: "35px",
                                        height: "10px",
                                        marginRight: "10px",
                                      }}
                                      aria-label="edit"
                                      onClick={() =>
                                        handleEditing(item._id, item.content)
                                      }
                                    >
                                      <EditIcon style={{ fontSize: "25px" }} />
                                    </Fab>
                                  </Zoom>
                                  <Zoom in={true}>
                                    <Fab
                                      // color="secondary"
                                      size="small"
                                      style={{
                                        width: "35px",
                                        height: "10px",
                                      }}
                                      aria-label="delete"
                                      onClick={() => {
                                        handleDeleteComment(item._id);
                                        setEditing(false);
                                        setInputValue({ content: "" });
                                      }}
                                    >
                                      <DeleteForeverIcon
                                        style={{ fontSize: "25px" }}
                                      />
                                    </Fab>
                                  </Zoom>
                                </>
                              )}
                            </div>
                          </h5>
                          <hr />
                          <p
                            className="truncate"
                            style={{ fontSize: "1.5rem", maxWidth: "600px" }}
                          >
                            {item.content}
                          </p>
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
                        id="commentTextArea"
                        rows="3"
                        name="content"
                        value={inputValue.content}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={editing ? "btn btn-dark mr-3" : "btn btn-dark"}
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      {editing ? t("repeated.Edit") : t("repeated.Submit")}
                    </button>
                    {editing && (
                      <button
                        type="buttom"
                        className="btn btn-danger"
                        onClick={() => {
                          setEditing(false);
                          setInputValue({ content: "" });
                        }}
                        style={{ fontWeight: "700", fontSize: "20px" }}
                      >
                        {t("repeated.Cancel")}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div
                className="shadow-sm p-2 mb-4 rounded-lg"
                onClick={() => history.push(`/SignChoice`)}
                style={{
                  height: "300px",
                  width: "300px",
                  color: "#000",
                  border: "solid white 3px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <h3
                  style={{
                    color: "#000",
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
