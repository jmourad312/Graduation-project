import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import axios from "axios";
import icon from "../../../../assets/Images/icon.png";
import { motion } from "framer-motion";
import VerticalModal from "../../../../components/VerticalModal";
import termsAndPrivacy from "../../../../assets/js/termsAndPrivacy";
import {useTranslation} from "react-i18next";

export default function VendorSignForm(props) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modaleInfo, setModaleInfo] = useState({
    heading: "",
    title: "",
    content: "",
  });

  const [vendorSignUpInfo, setVendorSignUpInfo] = useState({
    firstName: "",
    workshopName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    longitude: 0,
    latitude: 0,
  });

  const changeVendorSignUpInfo = (event) => {
    const { value, name } = event.target;
    setVendorSignUpInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleVendorSignUp = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/vendor/auth/signup", vendorSignUpInfo)
      .then((res) => {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        if (res.data.Success === true) {
          localStorage.removeItem("UserID");

          // dispatch(userSignInAction(false));
          // dispatch(vendorSignInAction(true));
          props.history.push(
            `/VendorAdministration/${localStorage.getItem("VendorID")}`
          );
        }
      })
      .catch((error) => {

        console.log(error);
      });
  };

  const [vendorSignInInfo, setVendorSignInInfo] = useState({
    email: "",
    password: "",
  });
  const changeVendorSignInInfo = (event) => {
    const { value, name } = event.target;
    setVendorSignInInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleVendorSignIn = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/vendor/auth/signin", vendorSignInInfo)
      .then((res) => {
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        if (res.data.Success === true) {
          // dispatch(userSignInAction(false));
          // dispatch(vendorSignInAction(true));
          localStorage.removeItem("UserID");
          props.history.push(
            `/VendorAdministration/${localStorage.getItem("VendorID")}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    /*global $, document, window, setTimeout, navigator, console, location*/
    $(document).ready(function () {
      "use strict";

      var usernameError = true,
        emailError = true,
        passwordError = true,
        passConfirm = true;

      // Detect browser for css purpose
      if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        $(".form form label").addClass("fontSwitch");
      }

      // Label effect
      $("input").focus(function () {
        $(this).siblings("label").addClass("active");
      });

      // Form validation
      $("input").blur(function () {
        // User Name
        if ($(this).hasClass("name")) {
          if ($(this).val().length === 0) {
            $(this)
              .siblings("span.error")
              .text("Required")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
            usernameError = true;
          } else if ($(this).val().length > 1 && $(this).val().length <= 3) {
            $(this)
              .siblings("span.error")
              .text("Please type at least 3 characters")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
            usernameError = true;
          } else {
            $(this)
              .siblings(".error")
              .text("")
              .fadeOut()
              .parent(".form-group")
              .removeClass("hasError");
            usernameError = false;
          }
        }
        // Email
        if ($(this).hasClass("email")) {
          if ($(this).val().length === 0) {
            $(this)
              .siblings("span.error")
              .text("Please type your email address")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
            emailError = true;
          } else if (!email_regex.test($(this).val())) {
            $(this)
              .siblings("span.error")
              .text("Please type a valid email address")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
          } else {
            $(this)
              .siblings(".error")
              .text("")
              .fadeOut()
              .parent(".form-group")
              .removeClass("hasError");
            emailError = false;
          }
        }

        // PassWord
        if ($(this).hasClass("pass")) {
          if ($(this).val().length < 8) {
            $(this)
              .siblings("span.error")
              .text("Please type at least 8 charcters")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
            passwordError = true;
          } else {
            $(this)
              .siblings(".error")
              .text("")
              .fadeOut()
              .parent(".form-group")
              .removeClass("hasError");
            passwordError = false;
          }
        }

        // PassWord confirmation
        if ($(".pass").val() !== $(".passConfirm").val()) {
          $(".passConfirm")
            .siblings(".error")
            .text("Passwords don't match")
            .fadeIn()
            .parent(".form-group")
            .addClass("hasError");
          passConfirm = false;
        } else {
          $(".passConfirm")
            .siblings(".error")
            .text("")
            .fadeOut()
            .parent(".form-group")
            .removeClass("hasError");
          passConfirm = false;
        }

        // label effect
        if ($(this).val().length > 0) {
          $(this).siblings("label").addClass("active");
        } else {
          $(this).siblings("label").removeClass("active");
        }
      });

      // form switch
      $("a.switch").click(function (e) {
        $(this).toggleClass("active");
        e.preventDefault();

        if ($("a.switch").hasClass("active")) {
          $(this)
            .parents(".form-peice")
            .addClass("switched")
            .siblings(".form-peice")
            .removeClass("switched");
        } else {
          $(this)
            .parents(".form-peice")
            .removeClass("switched")
            .siblings(".form-peice")
            .addClass("switched");
        }
      });

      // Form submit
      $("form.signup-form").submit(function (event) {
        event.preventDefault();

        if (
          usernameError === true ||
          emailError === true ||
          passwordError === true ||
          passConfirm === true
        ) {
          $(".name, .email, .pass, .passConfirm").blur();
        } else {
          $(".signup, .login").addClass("switched");

          setTimeout(function () {
            $(".signup, .login").hide();
          }, 700);
          setTimeout(function () {
            $(".brand").addClass("active");
          }, 300);
          setTimeout(function () {
            $(".heading").addClass("active");
          }, 600);
          setTimeout(function () {
            $(".success-msg p").addClass("active");
          }, 900);
          setTimeout(function () {
            $(".success-msg a").addClass("active");
          }, 1050);
          setTimeout(function () {
            $(".form").hide();
          }, 700);
        }
      });

      // Reload page
      $("a.profile").on("click", function () {
        window.location.reload(true);
      });
    });
    // var x = document.getElementById("demo");
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } 
    }
    function showPosition(position) {
      setVendorSignUpInfo({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    }
    getLocation();
  }, []);
  const pageVariants = {
    in: {
      opacity: 10,
      // y: "0vh",
      scale: 1,
    },
    out: {
      opacity: 0,
      // y: "-100vh",
      scale: 0.01,
    },
  };
  const pageTransitions = {
    duration: 1.5,
    type: "tween",
    ease: "anticipate",
  };

    const {t, i18n} = useTranslation();
  return (
    <motion.div
      className="vendorSignForm"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <div className="container">
        <div className="adjust">
          <section id="formHolder">
            <div className="row" style={{ marginTop: "10%" }}>
              {/* <!-- Brand Box --> */}
              <div className="col-sm-6 brand">
                <Link to="" className="logo">
                  <img
                    src={icon}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </Link>
                <div className="heading">
                  <h2>{t("VendorSign.DREKSYONY")}</h2>
                  <p style={{ fontWeight: "700", fontSize: "20px" }}>
                  {t("VendorSign.YourChoice")}
                  </p>
                </div>

                <div className="success-msg">
                  <p>{t("VendorSign.Great")}</p>
                  <Link to="" className="profile">
                  {t("VendorSign.YourProfile")}
                  </Link>
                </div>
              </div>

              {/* <!-- Form Box --> */}
              <div className="col-sm-6 form">
                {/* <!-- Login Form --> */}
                <div className="login form-peice switched">
                  <form className="login-form" onSubmit={handleVendorSignIn}>
                    <div className="form-group">
                      <label
                        for="email"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.Email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={vendorSignInInfo.email}
                        onChange={changeVendorSignInInfo}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label
                        for="password"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.Password")}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={vendorSignInInfo.password}
                        onChange={changeVendorSignInInfo}
                        required
                      />
                    </div>

                    <div className="CTA">
                      <input
                        type="submit"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                        value={t("VendorSign.Login")}
                      />
                      <a
                        href="#"
                        className="switch"
                        style={{ fontSize: "20px" }}
                      >
                        {t("VendorSign.New")}
                      </a>
                    </div>
                  </form>
                </div>
                {/* <!-- End Login Form --> */}

                {/* <!-- Signup Form --> */}
                <div className="signup form-peice">
                  <form className="signup-form" onSubmit={handleVendorSignUp}>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            for="firstName"
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          >
                            {t("VendorSign.FirstName")}
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="name"
                            value={vendorSignUpInfo.firstName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span
                            className="error"
                            style={{ fontSize: "15px" }}
                          ></span>
                        </div>
                      </div>
                      {/* <input
                        type="hidden"
                        name="latitude"
                        id="latitude"
                        value={vendorSignUpInfo.latitude}
                        onChange={changeVendorSignUpInfo}
                      />
                      <input
                        type="hidden"
                        name="longitude"
                        id="longitude"
                        value={vendorSignUpInfo.longitude}
                        onChange={changeVendorSignUpInfo}
                      /> */}
                      {/* <div className="col-4">
                        <div className="form-group">
                          <label
                            for="middleName"
                            style={{ fontWeight: "600", fontSize: "15px" }}
                          >
                            Middle Name{" "}
                            <small style={{fontWeight: "700",fontSize:"8px"}}>-optional</small>
                          </label>
                          <input
                            type="text"
                            name="middleName"
                            id="middleName"
                            className=""
                            value={vendorSignUpInfo.middleName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error" style={{fontSize: "15px" }}></span>
                        </div>
                      </div> */}
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            for="workshopName"
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          >
                            {t("VendorSign.ShopName")}{" "}
                            <small
                              style={{ fontWeight: "500", fontSize: "15px" }}
                            >
                              {t("VendorSign.Optional")}
                            </small>
                          </label>
                          <input
                            type="text"
                            name="workshopName"
                            id="workshopName"
                            className=""
                            value={vendorSignUpInfo.workshopName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span
                            className="error"
                            style={{ fontSize: "15px" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        for="email"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.Email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="email"
                        value={vendorSignUpInfo.email}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span
                        className="error"
                        style={{ fontSize: "15px" }}
                      ></span>
                    </div>

                    <div className="form-group">
                      <label
                        for="phoneNumber"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.PhoneNumber")} -{" "}
                        <small style={{ fontSize: "15px" }}>{t("VendorSign.Optional")}</small>
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={vendorSignUpInfo.phoneNumber}
                        onChange={changeVendorSignUpInfo}
                      />
                    </div>

                    <div className="form-group">
                      <label
                        for="password"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.Password")}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="pass"
                        value={vendorSignUpInfo.password}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span
                        className="error"
                        style={{ fontSize: "15px" }}
                      ></span>
                    </div>

                    <div className="form-group">
                      <label
                        for="confirmPassword"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        {t("VendorSign.ConfirmPassword")}
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="passConfirm"
                        value={vendorSignUpInfo.confirmPassword}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span
                        className="error"
                        style={{ fontSize: "15px" }}
                      ></span>
                    </div>
                   <div className="CTA" style={{paddingLeft:"0px"}}>
                      <div className="row">
                      
                        <div className="col-8" style={{paddingRight:"0px",paddingLeft:"160px"}}>
                          <input
                            style={{fontWeight: "600", fontSize: "20px"}}
                            type="submit"
                            value={t("VendorSign.SignUp")}
                            id="submit"
                          />
                        </div>
                        <div className="col-4" style={{paddingRight:"0px",paddingLeft:"0px"}}>
                          <a
                            href="#"
                            className="switch text-center"
                            style={{ fontSize: "20px",paddingTop:"12px",width:"100%",paddingRight:"0px",paddingLeft:"0px",paddingBottom:"40px" }}
                          >
                            {t("VendorSign.Already")}
                          </a>
                        </div>
                      </div>
                    </div>


                    <p style={{ fontWeight: "600",marginLeft:"70px",marginTop:"0px"  }}>
                    {t("VendorSign.BySigning")}{" "}
                      <span
                        style={{
                          color: "#4d8ba8",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          setModalShow(true);
                          setModaleInfo({
                            heading: termsAndPrivacy.terms.heading,
                            title: termsAndPrivacy.terms.title,
                            content: termsAndPrivacy.terms.content,
                          });
                        }}
                      >
                        {t("VendorSign.TERMS")}
                      </span>{" "}
                      {t("VendorSign.and")}{" "}
                      <span
                        style={{
                          color: "#4d8ba8",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          setModalShow(true);
                          setModaleInfo({
                            heading: termsAndPrivacy.privacy.heading,
                            title: termsAndPrivacy.privacy.title,
                            content: termsAndPrivacy.privacy.content,
                          });
                        }}
                      >
                        {t("VendorSign.Privacy")}
                      </span>
                    </p>
                    
                  </form>
                </div>
                <VerticalModal
                  heading={modaleInfo.heading}
                  title={modaleInfo.title}
                  content={modaleInfo.content}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                {/* <!-- End Signup Form --> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
