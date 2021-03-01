import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginButton from "../../../../components/LoginButton";
import Review from "../../../../components/Review";
import ToastMessage from "../../../../components/ToastMessage";
import UserIcon from "../../../../components/UserIcon";
import {
  getProductDetails,
  getUsersBookAndFavo,
} from "../../../../store/actions";
import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { Carousel, TabContainer } from "react-bootstrap";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import CommentIcon from "@material-ui/icons/Comment";
import RoomIcon from "@material-ui/icons/Room";
import ShowRating from "../../../../components/ShowRating";
import Loading from "../../../../components/Loading";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { useTranslation } from "react-i18next";
import ProductComp from "../../../../components/ProductComp";

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
  const productRate = useSelector((state) => state.productDetails.stars);
  const userDetails = useSelector((state) => state.UserBookAndFavo.Data);
  const relatedProducts = useSelector(state => state.relatedProducts.Data)

  const dispatch = useDispatch();
  const getProducts = (params) => {
    dispatch(getProductDetails(params));
  };

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
      id: productDetails._id,
    };
    const URL = "http://localhost:3000/user/removeFavouriteItems";
    axios
      .put(URL, body, config)
      .then((req) => { })
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
      id: productDetails._id,
    };

    const URL = "http://localhost:3000/user/addFavouriteItems";

    axios
      .put(URL, body, config)
      .then((req) => {
        if (req.data.Success === true) {
          setToastMessage(t("ToastMessages.Itemaddedtofavourite"));
          toggleStatus();
          // props.history.push("/MyProfile");
        } else {
          handleRemoveFavourite();
          toggleStatus();
          setToastMessage(t("ToastMessages.Itemremovedfromfavourites"));
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
      .then((req) => { })
      .catch((error) => {
        console.log(error);
      });
  };
  const [loc, setLoc] = useState("");

  useEffect(() => {
    getProducts(localStorage.getItem("ProductID"));
    dispatch(getUsersBookAndFavo(localStorage.getItem("UserID")));
  }, [productDetails]);

  useEffect(() => {
    if (productDetails) {
      if (productDetails.person) {
        if (productDetails.person.location) {
          setLoc(
            `https://maps.google.com/maps?q=${productDetails.person.location.coordinates[1]},${productDetails.person.location.coordinates[0]}&hl=en&z=14&amp;&output=embed`
          );
        }
      }
    }
  });

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

  const { t, i18n } = useTranslation();
  const createProducts = (prod) => {
    return (
      <ProductComp
        key={prod._id}
        id={prod._id}
        images={prod.images}
        description={prod.description}
        price={prod.price}
        name={prod.person.firstName}
        title={prod.name}
        brand={prod.carBrand}
        model={prod.carModel}
        rating={prod}
        avgRate={prod.avgRate}
      // category={prod.category}
      />
    );
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      {localStorage.getItem("Authorization") === null && <LoginButton />}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
      <section className="products-details container">
        {/* <!-- start product details --> */}
        <div className="container">
          <div
            style={{
              position: "absolute",
              top: "4.5%",
              left: "24%",
              width: "300px",
            }}
          >
            <ToastMessage
              showFunction={toggleStatus}
              status={toastStatus}
              message={toastMessage}
            />
          </div>
          <div style={{ paddingTop: "15px" }}>
            <div
              className="row bg-light"
              style={{ borderRadius: "0 25px 25px 0" }}
            >
              {/* <!-- image of produce --> */}
              <div
                className="col-4"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                {productDetails ? (
                  productDetails.images &&
                    (productDetails.images.length === 1 ||
                      productDetails.images.length === 0) ? (
                      <img
                        className=""
                        style={{
                          width: "350px",
                          height: "250px",
                          // maxHeight:"350px"
                          // borderRadius: "10%",
                        }}
                        src={productDetails.images[0]}
                        alt=""
                      />
                    ) : (
                      productDetails.images && (
                        <div>
                          <Carousel interval={1000}>
                            {productDetails.images.map((img, index) => {
                              return (
                                <Carousel.Item>
                                  <img
                                    key={index}
                                    className="d-block"
                                    style={{ height: "300px", width: "350px" }}
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
                {/* <img
                  src={productDetails && productDetails.image}
                  // width="100%"
                  // height="100%"
                  style={{ height: "300px", width: "350px" }}
                  alt=""
                /> */}
              </div>
              <div className="col-8">
                <div className="row">
                  <h3>
                    <strong
                      // className="pl-3"
                      style={{
                        // borderLeft: "3px solid red",
                        height: "100%",
                        fontSize: "35px",
                        marginLeft: "170px",
                      }}
                    >
                      {t("product.products Details.info")}
                    </strong>
                  </h3>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <h2 dir="rtl">
                      {productDetails && productDetails.name}
                      <br /> {t("repeated.By")}{" "}
                      <Link
                        style={{
                          color: "rgb(21, 34, 214)",
                          // textDecoration: "underline ",
                        }}
                        to={`/VendorProfileUser/${productDetails
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
                    {/* -------------------------------------SHOP NAME------------------------------------- */}
                    <h2 dir="rtl">
                      {t("repeated.Shop")}{" "}
                      {productDetails &&
                        productDetails.person &&
                        productDetails.person.workshopName}
                    </h2>
                    {/* ---------------------------------------AVG RATE----------------------------------- */}
                    {/* <span style={{ fontWeight: "700", fontSize: "20px" }}>
                        {t("product.products Details.Rating")}
                      </span> */}
                    {productRate && productRate[0] !== undefined ? (
                      <>
                        <span  style={{ fontWeight: "700", fontSize: "20px" }}>
                          {t("product.products Details.Rating")}
                        </span>
                        <ShowRating
                          rating={productRate && productRate[0].avgRate}
                        />
                      </>
                    ) : (
                        <span style={{ fontWeight: "700", fontSize: "20px" }}>
                          {t("product.products Details.Not Rated")}
                        </span>
                      )}
                  </div>
                  {/* ----------------------------------------PRODUCT INFO RIGHT--------------------- */}
                  <div className="col-6">
                    <p dir="rtl" style={{ fontSize: "1.4rem" }}>
                      <b style={{ fontSize: "1.4rem" }}>
                        {" "}
                        {t("repeated.Brand")}:{" "}
                      </b>{" "}
                      {productDetails
                        ? productDetails.carBrand
                          ? productDetails.carBrand
                          : "Loading"
                        : "Loading"}
                    </p>
                    <p dir="rtl" style={{ fontSize: "1.4rem" }}>
                      <b style={{ fontSize: "1.4rem" }}>
                        {t("repeated.Model")}:{" "}
                      </b>
                      {productDetails
                        ? productDetails.carModel
                          ? productDetails.carModel
                          : "Loading"
                        : "Loading"}
                    </p>
                    {/* ----------------------------------------PRICE--------------------- */}
                    <div className="mt-3">
                      <span className="" style={{ fontSize: "40px" }}>
                        <li className="fas fa-coins pr-2 text-warning">
                          {" "}
                          {productDetails && productDetails.price}{" "}
                          {t("repeated.LE")}
                        </li>
                      </span>
                    </div>

                    {/* --------------------------------------------FAVOURITE ICON--------------------- */}
                    {localStorage.getItem("UserID") !== null && (
                      <span
                        className="fa-lg button fill fa-pull-right"
                        style={{
                          padding: "10px",
                          position: "absolute",
                          top: "90px",
                          left: "290px",
                        }}
                        title="Add to favorate"
                        onClick={handleAddFavourite}
                      >
                        {userDetails &&
                          productDetails &&
                          userDetails.favouriteItems.includes(
                            productDetails._id
                          ) ? (
                            <i
                              className="fa fa-heart"
                              style={{ fontSize: "30px", cursor: "pointer" }}
                            ></i>
                          ) : (
                            <i
                              className="far fa-heart"
                              style={{ fontSize: "30px", cursor: "pointer" }}
                            ></i>
                          )}
                      </span>
                    )}
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
              classes={{ indicator: classes.indicator, text: classes.text }}
              variant="fullWidth"
              indicatorColor="primary"
              aria-label="icon label tabs example"
            >
              <Tab
                icon={
                  <InfoTwoToneIcon
                    style={{ fontSize: "30px", paddingLeft: "5px" }}
                  />
                }
                label={t("product.products Details.Description")}
                style={{ fontSize: "20px", fontWeight: "600", color: "black" }}
              />
              <Tab
                icon={
                  <CommentIcon
                    style={{ fontSize: "30px", paddingLeft: "5px" }}
                  />
                }
                label={t("product.products Details.Reviews")}
                style={{ fontSize: "20px", fontWeight: "600", color: "black" }}
              />
              <Tab
                icon={
                  <RoomIcon style={{ fontSize: "30px", paddingLeft: "5px" }} />
                }
                label={t("product.products Details.Location")}
                style={{ fontSize: "20px", fontWeight: "600", color: "black" }}
              />
              <Tab
                icon={
                  <ViewModuleIcon
                    style={{ fontSize: "30px", paddingLeft: "5px" }}
                  />
                }
                label={t("product.products Details.RelatedProducts")}
                style={{ fontSize: "20px", fontWeight: "600", color: "black" }}
              />
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
                            {t("repeated.feedback")}
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
                                top: "10%",
                                left: "0%",
                                textAlign: "center",
                                border: "1px solid black",
                                borderRadius: "2%",
                                paddingTop: "5px",
                                paddingBottom: "15px",
                                paddingLeft: "3px",
                                paddingRight: "3px",
                              }}
                            >
                              {t("product.products Details.limitation1")}
                            </h2>
                          </div>
                        )}
                    </div>
                    <div className="col-8">
                      <div className="text-center">
                        {" "}
                        {productDetails ? (
                          productDetails.feedback.length === 0 ? (
                            <div
                              style={{ fontSize: "30px", fontWeight: "500" }}
                            >
                              {t("product.products Details.rate")}
                            </div>
                          ) : (
                              <div
                                className="text-center"
                                style={{
                                  maxHeight: "400px",
                                  overflowX: "hidden",
                                  overflowY: "auto",
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
                                            {t("product.products Details.User")}
                                            : {item.user.firstName}
                                          </p>
                                          <ShowRating rating={item.rating} />

                                          <p
                                            className="text-left"
                                            style={{
                                              fontWeight: "700",
                                              fontSize: "20px",
                                            }}
                                          >
                                            {t("repeated.Date")} {postTime[0]}
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
                  {localStorage.getItem("Authorization") !== null ? (
                    <div className="row">
                      <div className="d-flex flex-wrap">
                        {productDetails &&
                          productDetails.person &&
                          productDetails.person.location && (
                            <iframe
                              title="map"
                              id="myiframe"
                              src={loc}
                              width="1010px"
                              height="350px"
                              frameborder="0"
                              style={{
                                border: "1px solid black",
                                borderRadius: "15px",
                              }}
                              allowfullscreen
                            ></iframe>
                          )}
                        {/* <iframe
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
                        ></iframe> */}
                      </div>
                    </div>
                  ) : (
                      <div
                        className="shadow-sm p-2 mb-4 rounded-lg"
                        style={{
                          height: "300px",
                          width: "1010px",
                          border: "1px solid black",
                          borderRadius: "2%",
                        }}
                      >
                        <h3
                          style={{
                            position: "relative",
                            top: "35%",
                            textAlign: "center",
                          }}
                        >
                          {t("product.products Details.limitation2")}
                        </h3>
                      </div>
                    )}
                </TabContainer>
              )}
              {value === 3 && (
                <TabContainer>
                  {localStorage.getItem("Authorization") !== null &&
                    relatedProducts &&
                    (
                      <div className="d-flex flex-wrap">
                        {relatedProducts.map(createProducts)}

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
