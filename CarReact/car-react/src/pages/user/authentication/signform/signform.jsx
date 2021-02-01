import React from 'react';
// import { useEffect } from 'react';
export default function Signform() {

    // const signUpButton = document.querySelector('#signUp');
    // const signInButton = document.getElementById('signIn');
    // const forgetpassword = document.getElementById('resetPass');
    // const confirmButton = document.getElementById('confirmPass');
    // const container = document.getElementById('container');


    // signUpButton.addEventListener('click', () => {
    //     container.classList.add("right-panel-active");
    // });


    // signInButton.addEventListener('click', () => {
    //     container.classList.remove("right-panel-active");
    // });

    // forgetpassword.addEventListener('click', () => {
    //     container.classList.add("bottom-panel-active");
    // });

    // confirmButton.addEventListener('click', () => {
    //     container.classList.remove("bottom-panel-active");
    // });

    return (
      <div className="signform ">
        <div className="container " id="container">
          <div className="form-container sign-up-container ">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="button">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container ">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i class="gg-google-tasks"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <br />
              <input type="email" placeholder="Email" />
              <br />
              <input type="password" placeholder="Password" />
              <br />
              <a href="#">Forgot your password?</a>
              <br />
              <button className="button">Sign In</button>
            </form>
          </div>
          {/* <div className="form-container forget-password-container">
                    <form action="#">
                        <h1>Reset Password</h1>
                        <span>or use your email for registration</span>
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <button>Confirm</button>
                    </form>
                </div> */}
          <div className="overlay-container ">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="button ghost"
                  id="signIn"
                  onClick={() => {
                    document
                      .getElementById("container")
                      .classList.remove("right-panel-active");
                    console.log("hello");
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="button ghost"
                  onClick={() => {
                    document
                      .getElementById("container")
                      .classList.add("right-panel-active");
                    console.log("hello");
                  }}
                  id="signUp"
                >
                  Sign Up
                </button>
              </div>
              {/* <div className="overlay-panel overlay-bottom">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="resetPass">Sign Up</button>
                </div>   */}
            </div>
          </div>
        </div>
      </div>
    );
}
