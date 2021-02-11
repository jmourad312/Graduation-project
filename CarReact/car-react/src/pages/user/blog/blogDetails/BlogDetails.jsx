import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cars2 from "../../../../assets/js/cars2";
import cars3 from "../../../../assets/js/cars3";
import LoginButton from "../../../../components/LoginButton";
import UserIcon from "../../../../components/UserIcon";
import {
  getBlogDetails,
  addVoteComment,
  removeVoteComment,
} from "../../../../store/actions";

export default function BlogDetails(props) {
  // const blogs = useSelector((state) => state.blogs);
  const blogID = useSelector((state) => state.blogID);
  const blogDetails = useSelector((state) => state.blogDetails.Data);
  const userID = useSelector((state) => state.userID);
  const [checkOwner, setCheckOwner] = useState(false);

  const checkOwnerDetails = () => {
    if (blogDetails.person._id === localStorage.getItem("UserID")) {
      setCheckOwner(true);
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
    image: "",
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
        image: event.target.files[0],
      };
    });
  };
  const handleEditSubmit = (params) => {
    const formData = new FormData();
    formData.append("image", editValue.image);
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
          console.log("Success");
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
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
  };
  const removeVote = (id) => {
    dispatch(removeVoteComment(id));
  };

  // useEffect(() => {
  // getBlog(blogID);
  // console.log(blogDetails);
  // console.log(blogID);
  // }, []);
  useEffect(() => {
    getBlog(localStorage.getItem("BlogID"));
    // console.log(blogDetails);
    // console.log(blogID);
    if (blogDetails) {
      console.log(blogDetails.person._id);
      console.log(userID);

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
  return (
    <motion.div
      className="container"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <div className="blogDetails">
        <div className="header">
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
                by{" "}
                <span>
                  {" "}
                  {blogDetails ? blogDetails.person.firstName : "LOADING"}
                </span>
              </p>
              <hr />
              <p>
                <span style={{ fontWeight: "700" }}>
                  Date :{blogDetails && blogDetails.createdAt}
                </span>
                {/* <span style={{ color: "gray" }}> Viewed </span> 3 */}
                <span className="badge badge-success">
                  {blogDetails
                    ? blogDetails.state === true && "Answered"
                    : "LOADING"}
                </span>
              </p>
              <hr />
              <h5 className="mt-0" style={{ fontWeight: "700" }}>Post Details</h5>
              <p className="truncate" style={{ fontWeight: "600", fontSize: "20px" }}>{blogDetails && blogDetails.body}</p>
              <hr />

              <p>
                {" "}
                <span className="" style={{ fontWeight: "700" }}>Tags</span>{" "}
                <span className="badge badge-dark" style={{ fontSize: "20px" }}>
                  {blogDetails && blogDetails.brand}
                </span>
                <span className="badge badge-dark ml-1" style={{ fontSize: "20px" }}>
                  {blogDetails && blogDetails.model}
                </span>
              </p>
            </div>
            <div className="col-6">
              <img
                className=""
                style={{ width: "400px", height: "300px", borderRadius: "10%" }}
                src={blogDetails && blogDetails.image}
                alt=""
              />
            </div>
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
      <div className="row">
        {localStorage.getItem("UserID") !== null && (
          <button className="bookmarkbtn fourth" style={{ marginLeft: "30px" }} onClick={handleAddBookmark}>
            Bookmark
          </button>
        )}
        {checkOwner && (
          <Button

            variant="info"
            style={{ margin: "10px" }}
            onClick={() => openModal(props.id)}
          >
            Edit
          </Button>
        )}
      </div>

      <Modal show={isOpen} onHide={!isOpen}>
        <Modal.Header>
          <Modal.Title>Edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Blog title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                id="title"
                value={editValue.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blog image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blog Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Blog description"
                name="body"
                id="body"
                value={editValue.body}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Brand</Form.Label>
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
                <Form.Label>Model</Form.Label>
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
            variant="primary"
            type="button"
            onClick={() => handleEditSubmit(localStorage.getItem("BlogID"))}
          >
            Submit
          </Button>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Comments Form --> */}
      <div className="card bgforleavecomment">
        <h5 className="card-header">Leave a Comment:</h5>
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
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
      <h3 className="text-center mt-2">Comments</h3>
      {/* <!-- Single Comment --> */}
      {blogDetails
        ? blogDetails.comment.map((item, index) => {
          return (
            <div className="media mb-1" key={index}>
             
              <button
                className="btn" style={{position:"absolute",left:"-17px",fontSize:"20px"}}
                onClick={() => addVote(item._id)}
              >
                <i class="fas fa-chevron-up"></i>
              </button> 
              <span className="btn badge-pill" style={{position:"relative",left:"-30px",top:"40px",fontSize:"20px"}}>
                {item.vote.numberOfVoting}
              </span>   
              <button
                className="btn" style={{position:"relative",left:"-70px",top:"80px",fontSize:"20px"}}
                onClick={() => removeVote(item._id)}
              >
                <i class="fas fa-chevron-down"></i>
              </button>

              <img
                className="d-flex mr-3 rounded-circle"
                src={item.image}
                alt=""
                style={{ maxHeight: "300px", maxWidth: "300px" }}
              />
              <hr />
              <br />
              <div className="media-body">
                <h5 className="mt-0">
                  {item.person.firstName ? item.person.firstName : null}
                </h5>
                <hr />
                <br />
                <p>{item.content}</p>
                <hr style={{border:"1px solid"}}/>
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
        })
        : "LOADING"}

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
