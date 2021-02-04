import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails } from '../../../../store/actions';

export default function BlogDetails(props) {
  // const blogs = useSelector((state) => state.blogs);
  const blogID = useSelector((state) => state.blogID);
  const blogDetails = useSelector((state) => state.blogDetails.Data);

  const dispatch = useDispatch();

  const getBlog = (params) => {
    dispatch(getBlogDetails(params));
  };
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

  const handleReplySubmit = (event,params) => {
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

  useEffect(() => {
    getBlog(blogID);
    // console.log(blogDetails);
    // console.log(blogID);
  }, []);
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
        ? blogDetails.comment.map((item,index) => {
            return (
              <div className="media mb-4" key={index}>
                <img
                  className="d-flex mr-3 rounded-circle"
                  src={item.image}
                  alt=""
                />
                <div className="media-body">
                  <h5 className="mt-0">
                    {item.person.firstName ? item.person.firstName : null}
                  </h5>
                  {item.content}
                </div>
                
                <form
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
                </form>
                {item
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
                  : "LOADING"}
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
