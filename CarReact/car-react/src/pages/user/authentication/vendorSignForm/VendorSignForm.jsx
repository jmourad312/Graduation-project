import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import axios from "axios";
import icon from '../../../../assets/Images/icon.png'
import { motion } from "framer-motion";

export default function VendorSignForm(props) {

  const dispatch = useDispatch();
  


  const [vendorSignUpInfo, setVendorSignUpInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    console.log(vendorSignUpInfo);
    axios
      .post("http://localhost:3000/vendor/auth/signup", vendorSignUpInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        console.log(localStorage.getItem("Authorization"));
        console.log(res.data);
        console.log(vendorSignUpInfo);
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
          console.log(vendorSignUpInfo);
          localStorage.removeItem("UserID");

          // dispatch(userSignInAction(false));
          // dispatch(vendorSignInAction(true));
          props.history.push(
            `/VendorAdministration/${localStorage.getItem("VendorID")}`
          );
        }
      })
      .catch((error) => {
        console.log(vendorSignUpInfo);

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
    console.log(vendorSignInInfo);
    axios
      .post("http://localhost:3000/vendor/auth/signin", vendorSignInInfo)
      .then((res) => {
        console.log(res);
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        console.log(localStorage.getItem("Authorization"));
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
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
          }  else if (!email_regex.test($(this).val())){
            $(this)
              .siblings("span.error")
              .text("Please type a valid email address")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
          }else {
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
          usernameError == true ||
          emailError == true ||
          passwordError == true ||
          passConfirm == true
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
                  <h2>DREKSYONY</h2>
                  <p style={{fontWeight:"700",fontSize:"20px"}}>Your Right Choice</p>
                </div>

                <div className="success-msg">
                  <p>Great! You are one of our members now</p>
                  <Link to="" className="profile">
                    Your Profile
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
                        Email Adderss
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
                        Password
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
                        value="Login"
                      />
                      <a href="#" className="switch" style={{fontSize:"20px"}}>
                        I'm New
                      </a>
                    </div>
                  </form>
                </div>
                {/* <!-- End Login Form --> */}

                {/* <!-- Signup Form --> */}
                <div className="signup form-peice">
                  <form className="signup-form" onSubmit={handleVendorSignUp}>
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label
                            for="firstName"
                            style={{ fontWeight: "600", fontSize: "20px" }}
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="name"
                            value={vendorSignUpInfo.firstName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error" style={{fontSize: "15px" }}></span>
                        </div>
                      </div>
                      <div className="col-4">
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
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label
                            for="lastName"
                            style={{ fontWeight: "600", fontSize: "15px" }}
                          >
                            Last Name{" "}
                            <small style={{fontWeight: "700",fontSize:"8px"}}>-optional</small>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className=""
                            value={vendorSignUpInfo.lastName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error" style={{fontSize: "15px" }}></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        for="email"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        Email Adderss
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="email"
                        value={vendorSignUpInfo.email}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error" style={{fontSize: "15px" }}></span>
                    </div>

                    <div className="form-group">
                      <label
                        for="phoneNumber"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        Phone Number -{" "}
                        <small style={{ fontSize: "20px" }}>Optional</small>
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
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="pass"
                        value={vendorSignUpInfo.password}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error" style={{fontSize: "15px" }}></span>
                    </div>

                    <div className="form-group">
                      <label
                        for="confirmPassword"
                        style={{ fontWeight: "600", fontSize: "20px" }}
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="passConfirm"
                        value={vendorSignUpInfo.confirmPassword}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error" style={{fontSize: "15px" }}></span>
                    </div>

                    <div className="CTA">
                      <input
                        style={{ fontWeight: "600", fontSize: "15px" }}
                        type="submit"
                        value="Signup Now"
                        id="submit"
                      />
                      <br />
                      <a href="#" className="switch" style={{fontSize:"20px"}}>
                        I have an account
                      </a>
                    </div>
                  </form>
                </div>
                {/* <!-- End Signup Form --> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
