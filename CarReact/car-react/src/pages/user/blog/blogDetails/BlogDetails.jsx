import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cars2 from '../../../../assets/js/cars2';
import cars3 from '../../../../assets/js/cars3';
import { getBlogDetails, addVoteComment, removeVoteComment } from '../../../../store/actions';

export default function BlogDetails(props) {
  // const blogs = useSelector((state) => state.blogs);
  const blogID = useSelector((state) => state.blogID);
  const blogDetails = useSelector((state) => state.blogDetails.Data);

  const dispatch = useDispatch();

  const getBlog = (params) => {
    dispatch(getBlogDetails(params));
    console.log(blogDetails);
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
    title: blogDetails ? blogDetails.title : "",
    body: blogDetails ? blogDetails.body : "",
    image: blogDetails ? blogDetails.image : "",
    brand: blogDetails ? blogDetails.brand : "",
    model: blogDetails ? blogDetails.model : "",
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
    formData.append("name", editValue.name);
    formData.append("description", editValue.description);
    formData.append("carBrand", editValue.carBrand);
    formData.append("carModel", editValue.carModel);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .put(
        `http://localhost:3000/vendor/updateItem/${params}`,
        formData,
        config
      )
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
    getBlog(blogID);
    // console.log(blogDetails);
    // console.log(blogID);
  }, [blogDetails]);
  return (
    <div className="container p-5">
      <div>
        <p
          className="font-weight-bold"
          style={{ fontSize: "26px", marginBottom: "0" }}
        >
          {" "}
          {blogDetails ? blogDetails.title : "LOADING"}{" "}
        </p>
        <p>
          by{" "}
          <span> {blogDetails ? blogDetails.person.firstName : "LOADING"}</span>
        </p>
        <hr />
        <p>
          <span style={{ color: "gray" }}>
            Date :{blogDetails && blogDetails.createdAt}
          </span>
          {/* <span style={{ color: "gray" }}> Viewed </span> 3 */}
          <span className="badge badge-success">
            {blogDetails ? blogDetails.state === true && "Answered" : "LOADING"}
          </span>
        </p>
        <hr />
        <h5 className="mt-0">Post Details</h5>
        <p>{blogDetails && blogDetails.body}</p>
        <hr />
        <img src={blogDetails && blogDetails.image} alt="" />
        <hr />
        <p>
          {" "}
          <span className="text-secondary">Tags</span>{" "}
          <span className="badge badge-info">
            {blogDetails && blogDetails.brand}
          </span>
          <span className="badge badge-info">
            {blogDetails && blogDetails.model}
          </span>
        </p>
      </div>

      {/* --------------------- EDIT SECTION--------------- */}
      <Button variant="info" onClick={() => openModal(props.id)}>
        Edit
      </Button>

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
              <Form.Label>Blog Image</Form.Label>
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

            <Button
              variant="primary"
              type="button"
              onClick={() => handleEditSubmit(props.id)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Comments Form --> */}
      <div className="card my-4">
        <h5 className="card-header">Leave a Comment:</h5>
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                name="content"
                value={inputValue.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* <!-- Single Comment --> */}
      {blogDetails
        ? blogDetails.comment.map((item, index) => {
            return (
              <div className="media mb-1" key={index}>
                <button
                  className="btn btn-info"
                  onClick={() => addVote(item._id)}
                >
                  <i className="fas fa-arrow-circle-up" />
                </button>
                <span className="btn badge-pill btn-success">
                  {item.vote.numberOfVoting}
                </span>
                <button
                  className="btn btn-info"
                  onClick={() => removeVote(item._id)}
                >
                  <i class="fas fa-arrow-circle-down" />
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
    </div>
  );
}
