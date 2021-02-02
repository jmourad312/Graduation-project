import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export default function VendorSignForm() {
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
                  <form
                    className="login-form"
                    action="localhost:3000/vendor/auth/signin"
                    method="post"
                  >
                    <div className="form-group">
                      <label for="loginemail">Email Adderss</label>
                      <input
                        type="email"
                        name="loginemail"
                        id="loginemail"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label for="loginPassword">Password</label>
                      <input
                        type="password"
                        name="loginPassword"
                        id="loginPassword"
                        required
                      />
                    </div>

                    <div className="CTA">
                      <input type="submit" value="Login" />
                      <a href="#" className="switch">
                        I'm New
                      </a>
                    </div>
                  </form>
                </div>
                {/* <!-- End Login Form --> */}

                {/* <!-- Signup Form --> */}
                <div className="signup form-peice">
                  <form
                    className="signup-form"
                    action="localhost:3000/vendor/auth/signup"
                    method="post"
                  >
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label for="firstName">First Name</label>
                          <input
                            type="text"
                            name="username"
                            id="firstName"
                            className="name"
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label for="middleName">Middle Name</label>
                          <input
                            type="text"
                            name="username"
                            id="middleName"
                            className="name"
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label for="lastName">Last Name</label>
                          <input
                            type="text"
                            name="username"
                            id="lastName"
                            className="name"
                          />
                          <span className="error"></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="email">Email Adderss</label>
                      <input
                        type="email"
                        name="emailAdress"
                        id="email"
                        className="email"
                      />
                      <span className="error"></span>
                    </div>

                    <div className="form-group">
                      <label for="phone">
                        Phone Number - <small>Optional</small>
                      </label>
                      <input type="text" name="phone" id="phone" />
                    </div>

                    <div className="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="pass"
                      />
                      <span className="error"></span>
                    </div>

                    <div className="form-group">
                      <label for="passwordCon">Confirm Password</label>
                      <input
                        type="password"
                        name="passwordCon"
                        id="passwordCon"
                        className="passConfirm"
                      />
                      <span className="error"></span>
                    </div>

                    <div className="CTA">
                      <input type="submit" value="Signup Now" id="submit" />
                      <a href="#" className="switch">
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
    </div>
  );
}
