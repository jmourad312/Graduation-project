import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginButton from "../../../../components/LoginButton";
import Review from "../../../../components/Review";
import ToastMessage from "../../../../components/ToastMessage";
import UserIcon from "../../../../components/UserIcon";
import { getProductDetails } from "../../../../store/actions";
import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { TabContainer } from "react-bootstrap";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import CommentIcon from "@material-ui/icons/Comment";
import RoomIcon from "@material-ui/icons/Room";
import ShowRating from "../../../../components/ShowRating";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    height: 550,
    backgroundColor: "#ffffff7e",
  },
  indicator: {
    backgroundColor: "black",
  },
});

export default function ProductDetails(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const productID = useSelector((state) => state.productID);
  const productDetails = useSelector((state) => state.productDetails.Data);
  const dispatch = useDispatch();
  const getProducts = (params) => {
    dispatch(getProductDetails(params));
  };

  useEffect(() => {
    getProducts(localStorage.getItem("ProductID"));
  }, [productDetails]);

  const [toastStatus, setToastStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toggleStatus = () => {
    setToastStatus(true);
    setTimeout(() => {
      setToastStatus(false);
    }, 2000);
  };
  const handleRemoveFavourite = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const body = {
      id: productID,
    };
    const URL = "http://localhost:3000/user/removeFavouriteItems";
    axios
      .put(URL, body, config)
      .then((req) => {
        console.log(req);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFavourite = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      id: productID,
    };

    const URL = "http://localhost:3000/user/addFavouriteItems";

    axios
      .put(URL, body, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          setToastMessage("Item added to favourite");
          toggleStatus();
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
          handleRemoveFavourite();
          toggleStatus();
          setToastMessage("Item removed from favourites");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //--------------------------------REVIEW--------------------------------
  const [userFeedbackInfo, setuserFeedbackInfo] = useState({
    comment: "",
  });
  const handleCommentChange = (event) => {
    const { value, name } = event.target;
    setuserFeedbackInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleAddReview = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    const body = {
      car: localStorage.getItem("ProductID"),
      comment: userFeedbackInfo.comment,
    };

    const URL = "http://localhost:3000/user/writeFeedback";

    axios
      .post(URL, body, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
        } else {
          console.log("fail");
        }
      })
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
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
    <ShowRating />
      {localStorage.getItem("Authorization") === null && <LoginButton />}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
      <section className="products-details container">
        {/* <!-- start product details --> */}
        <div className="container">
          <ToastMessage
            showFunction={toggleStatus}
            status={toastStatus}
            message={toastMessage}
          />
          <div style={{ paddingTop: "15px" }}>
            <div className="row bg-light" style={{ borderRadius: "3%" }}>
              {/* <!-- image of produce --> */}
              <div
                className="col-4"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                <img
                  src={productDetails && productDetails.image}
                  // width="100%"
                  // height="100%"
                  style={{ height: "300px", width: "350px" }}
                  alt=""
                />
              </div>
              <div className="col-8">
                <div className="row">
                  <h3>
                    <strong
                      className="pl-3"
                      style={{
                        borderLeft: "3px solid red",
                        height: "100%",
                        fontSize: "30px",
                      }}
                    >
                      Product Information
                    </strong>
                  </h3>
                </div>
                <div className="row">
                  <div className="col-6">
                    <h2>
                      {productDetails && productDetails.name}
                      <br /> By:{" "}
                      <Link
                        style={{
                          color: "rgb(21, 34, 214)",
                          textDecoration: "underline ",
                        }}
                        to={`/VendorProfileUser/${
                          productDetails
                            ? productDetails.person
                              ? productDetails.person._id
                              : null
                            : null
                        }`}
                      >
                        {productDetails
                          ? productDetails.person
                            ? productDetails.person.firstName
                            : "(LOADING)"
                          : "LOADING"}
                      </Link>
                    </h2>

                    <div className="mt-3">
                      <span className="" style={{ fontSize: "40px" }}>
                        <li className="fas fa-coins pr-2 text-warning">
                          {productDetails && productDetails.price} LE
                        </li>
                      </span>
                      {localStorage.getItem("UserID") !== null && (
                        <span
                          className="fa-lg button fill fa-pull-right"
                          style={{ padding: "10px", marginTop: "80px" }}
                          title="Add to favorate"
                          onClick={handleAddFavourite}
                        >
                          <i
                            className="far fa-heart"
                            style={{ fontSize: "30px", cursor: "pointer" }}
                          ></i>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <p style={{ fontSize: "1.5rem" }}>
                      <b style={{ fontSize: "1.5rem" }}>Brand: </b>{" "}
                      {productDetails
                        ? productDetails.carBrand
                          ? productDetails.carBrand
                          : "Loading"
                        : "Loading"}
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      <b style={{ fontSize: "1.5rem" }}>Model: </b>
                      {productDetails
                        ? productDetails.carModel
                          ? productDetails.carModel
                          : "Loading"
                        : "Loading"}
                    </p>
                    <br />
                    {/* <p>
                  <b style={{fontSize:"20px"}}>Manufacturer: </b>{" "}
                  {productDetails
                    ? productDetails.case
                      ? productDetails.case
                      : "Loading"
                    : "Loading"}
                </p> */}

                    {/* <!-- avalible or not --> */}
                    {/* {productDetails &&
                  (productDetails.available ? (
                    <span className="badge badge-pill badge-success">
                      Avalible
                    </span>
                  ) : (
                    <span
                      className="badge badge-pill badge-danger"
                      style={{ fontSize: "15px" }}
                    >
                      Not Avalible
                    </span>
                  ))} */}

                    {/* <!-- number of stars --> */}

                    {/* <div className="mt-3 star" style={{ fontSize: "20px" }}>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"> No review</span>
                </div> */}
                    {/* <!-- description --> */}
                    {/* <div className="mt-3" style={{ fontSize: "30px" }}>
                    {productDetails && productDetails.description}
                  </div> */}
                    {/* <!-- Add to favorate and compare product --> */}
                    {/* <!-- price --> */}

                    {/* <span
                    className="fa-lg"
                    data-toggle="tooltip"
                    title="compare product"
                    data-placement="bottom"
                  >
                    <i className="fas fa-sliders-h  text-primary"></i>
                  </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end product details --> */}

        {/* <!-- start Location ,reviews,PRODUCT INFORMATION --> */}
        <div className="container mt-3">
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              classes={{indicator:classes.indicator,text:classes.text}}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<InfoTwoToneIcon />} label="Description" />
              <Tab icon={<CommentIcon />} label="Reviews" />
              <Tab icon={<RoomIcon />} label="Location" />
            </Tabs>
            <div className="p-5">
              {value === 0 && (
                <TabContainer>
                  <div className="mt-3" style={{ fontSize: "30px" }}>
                    {productDetails && productDetails.description}
                  </div>
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <div className="row">
                    <div className="col-4">
                      {localStorage.getItem("UserID") ? (
                        <>
                          {" "}
                          <h3>
                            <span
                              className="pl-3"
                              style={{
                                height: "100%",
                              }}
                            ></span>
                            Write your Feedback
                          </h3>
                          <br />
                          <Review />
                        </>
                      ) : (
                        <div
                          style={{
                            height: "600px",
                            width: "300px",
                            position: "absolute",
                            left: "0%",
                            top: "0%",
                          }}
                        >
                          <h2
                            style={{
                              position: "relative",
                              top: "40%",
                              left: "0%",
                              textAlign: "center",
                            }}
                          >
                            Only registered car owners can submit a review
                          </h2>
                        </div>
                      )}
                    </div>
                    <div className="col-8">
                      <div className="text-center">
                        {" "}
                        {productDetails ? (
                          productDetails.feedback.length === 0 ? (
                            <div>be the first to rate this item</div>
                          ) : (
                            <div
                              className="text-center"
                              style={{
                                maxHeight: "400px",
                                overflowX: "hidden",
                                overflowY: "scroll",
                              }}
                            >
                              {productDetails
                                ? productDetails.feedback
                                  ? productDetails.feedback.map((item) => {
                                      let postTime = item.createdAt.split("T");
                                      return (
                                        <>
                                          <p
                                            className="text-left"
                                            style={{
                                              fontWeight: "700",
                                              fontSize: "20px",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            User: {item.user.firstName}
                                          </p>
                                          <p
                                            className="text-left"
                                            style={{
                                              fontWeight: "700",
                                              fontSize: "20px",
                                            }}
                                          >
                                            Posted at: {postTime[0]}
                                          </p>
                                          <hr
                                            style={{
                                              border: "0.1px solid grey",
                                              marginBottom: "5px",
                                              marginTop: "0px",
                                            }}
                                          />
                                          <p
                                            style={{
                                              fontWeight: "700",
                                              fontSize: "20px",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {item.comment}
                                          </p>
                                          <hr
                                            style={{
                                              border: "2px solid",
                                              marginBottom: "0px",
                                            }}
                                          />
                                        </>
                                      );
                                    })
                                  : "loading"
                                : "loading"}
                            </div>
                          )
                        ) : (
                          "Loading"
                        )}
                      </div>
                    </div>
                  </div>
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  {localStorage.getItem("UserID") !== null ? (
                    <div className="row">
                      <div className="d-flex flex-wrap">
                        <iframe
                          title="Product Map"
                          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                          width="1010px"
                          height="350px"
                          frameborder="0"
                          style={{
                            border: "1px solid black",
                            borderRadius: "2%",
                          }}
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="col-4 shadow-sm p-2 mb-4 rounded-lg"
                      style={{
                        height: "300px",
                        width: "300px",
                        border: "solid white 3px",
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
                        Only registered car owners can view this Item's Location
                      </h3>
                    </div>
                  )}
                </TabContainer>
              )}
            </div>
          </Paper>
          <div className="row">
            <div className="col-8 content">
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">{/* </div> */}</div>
              </div>
              <div className="row"></div>
            </div>

            {/* </div> */}

            {/* <div [hidden]="tab == 1 || tab == 3"> */}

            {/* </div> */}

            {/* {localStorage.getItem("Authorization") !== null ? (
              <div className="col-4 text-center">
                <div className=" star" style={{ fontSize: "30px" }}>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"> No review</span>
                </div>
              </div>
            ) : (

              <div
                className="col-4 shadow-sm p-2 mb-4 rounded-lg"
                style={{
                  height: "300px",
                  width: "300px",
                  border: "solid white 3px",
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
                  Please Sign in to view this Item's Rating
                </h3>
              </div>
            )} */}

            {/* <div className="pl-3">
                <img
                  src="https://docs.mapbox.com/ios/assets/maps-examples-user-location-annotation-960-52e38dd2f7dc18e02b816fffb4fded73.webp"
                  width="70px"
                  height="70px"
                  alt=""
                />
                <p>location two </p>
              </div> */}
          </div>
        </div>
        {/* <!-- end Location ,reviews,PRODUCT INFORMATION --> */}
      </section>
    </motion.div>
  );
}
