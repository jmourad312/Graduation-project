import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { setVendorIdAction, userSignInAction, vendorSignInAction } from "../../../../store/actions";
import axios from "axios";

export default function VendorSignForm(props) {

  const dispatch = useDispatch();
  const setVendorID = (params) => {
    dispatch(setVendorIdAction(params))
  }

  const [vendorSignUpInfo, setVendorSignUpInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
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
        setVendorID(res.data.Data);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        console.log(localStorage.getItem("Authorization"));
        console.log(res.data);
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
          dispatch(userSignInAction(false));
          dispatch(vendorSignInAction(true));
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
    console.log(vendorSignInInfo);
    axios
      .post("http://localhost:3000/vendor/auth/signin", vendorSignInInfo)
      .then((res) => {
        console.log(res);
        setVendorID(res.data.Data);
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("VendorID", res.data.Data);
        console.log(localStorage.getItem("Authorization"));
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
          dispatch(userSignInAction(false));
          dispatch(vendorSignInAction(true));
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
          } else if ($(this).val().length > 1 && $(this).val().length <= 6) {
            $(this)
              .siblings("span.error")
              .text("Please type at least 6 characters")
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
          if ($(this).val().length == "") {
            $(this)
              .siblings("span.error")
              .text("Please type your email address")
              .fadeIn()
              .parent(".form-group")
              .addClass("hasError");
            emailError = true;
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

  return (
    <div className="vendorSignForm">
      <div className="container">
        <div className="adjust">
          <section id="formHolder">
            <div className="row" style={{ marginTop: "10%" }}>
              {/* <!-- Brand Box --> */}
              <div className="col-sm-6 brand">
                <Link to="" className="logo">
                  LOGO
                </Link>

                <div className="heading">
                  <h2>DREKSYONY</h2>
                  <p>Your Right Choice</p>
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
                      <label for="email" style={{ fontWeight: "600", fontSize: "15px" }}>Email Adderss</label>
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
                      <label for="password" style={{ fontWeight: "600", fontSize: "15px" }}>Password</label>
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
                      <input type="submit" style={{ fontWeight: "600", fontSize: "15px" }} value="Login" />
                      <a href="#" className="switch">
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
                          <label for="firstName" style={{ fontWeight: "600", fontSize: "15px" }}>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="name"
                            value={vendorSignUpInfo.firstName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label for="middleName" style={{ fontWeight: "600", fontSize: "15px" }}>Middle Name</label>
                          <input
                            type="text"
                            name="middleName"
                            id="middleName"
                            className="name"
                            value={vendorSignUpInfo.middleName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label for="lastName" style={{ fontWeight: "600", fontSize: "15px" }}>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="name"
                            value={vendorSignUpInfo.lastName}
                            onChange={changeVendorSignUpInfo}
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="email" style={{ fontWeight: "600", fontSize: "15px" }}>Email Adderss</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="email"
                        value={vendorSignUpInfo.email}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error"></span>
                    </div>

                    <div className="form-group">
                      <label for="phone" style={{ fontWeight: "600", fontSize: "15px" }}>
                        Phone Number - <small style={{ fontSize: "15px" }}>Optional</small>
                      </label>
                      <input type="text" name="phone" id="phone" />
                    </div>

                    <div className="form-group">
                      <label for="password" style={{ fontWeight: "600", fontSize: "15px" }}>Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="pass"
                        value={vendorSignUpInfo.password}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error"></span>
                    </div>

                    <div className="form-group">
                      <label for="confirmPassword" style={{ fontWeight: "600", fontSize: "15px" }}>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="passConfirm"
                        value={vendorSignUpInfo.confirmPassword}
                        onChange={changeVendorSignUpInfo}
                      />
                      <span className="error"></span>
                    </div>

                    <div className="CTA">
                      <input style={{ fontWeight: "600", fontSize: "15px" }} type="submit" value="Signup Now" id="submit" />
                      <br />
                      <a href="#" className="switch" >I have an account</a>
                    </div>
                  </form>
                </div>
                {/* <!-- End Signup Form --> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
