import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
// import { useEffect } from 'react';
import Button from '../../../../components/Button';

export default function Signform() {

    const [changeClass, setChangeClass] = useState("forgotpass");
    // const [changeClassBack, setChangeClassBack] = useState("forgotpass")
    const [changePayment, setChangePayment] = useState("payment");
    const switchPayment = () => {
        setChangePayment("payment showPayment");
    }
    const switchClass = () =>{
        setChangeClass("forgotpass open");
    }
    const switchBack = () =>{
        setChangeClass("forgotpass");
    }
    
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
            <div className="form1">
              <h1>Create Account</h1>
              <div className="social-container">
                <Link to="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </Link>
                {/* <a to="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button className="button" onClick={switchPayment}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="form-container sign-in-container ">
            <form action="#" className="form1">
              <h1>Sign in</h1>
              <div className="social-container">
                <Link to="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </Link>
                {/* <a to="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              </div>
              <span>or use your account</span>
              <br />
              <input type="email" placeholder="Email" />
              <br />
              <input type="password" placeholder="Password" />
              <br />
              <p onClick={switchClass}>Forgot your password?</p>
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
          <div className={changeClass} id="forgotpass">
            <i className="fas fa-arrow-circle-left" onClick={switchBack}></i>
            This is the testing div
            <form>
              <div className="row w-100">
                <div className="col-9">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="col-3">
                  <Button class="btn btn-primary" value="Send email" />
                </div>
              </div>
              <input type="text" placeholder="Input your code here" />
              <input type="password" placeholder="New password" />
              <input type="password" placeholder="Confirm new password" />
              <Button value="submit" />
            </form>
          </div>
          <div className={changePayment}>
            <section class="section-plans" id="section-plans">
              <div class="row">
                <div class="col-1-of-2">
                  <div class="card">
                    <div class="card__side card__side--front-1">
                      <div class="card__title card__title--1">
                        <i class="fas fa-paper-plane"></i>
                        <h4 class="card__heading">Basic</h4>
                      </div>

                      <div class="card__details">
                        <ul>
                          <li>1 Website</li>
                          <li>50 GB SSD Storage</li>
                          <li>Unmetered Bandwidth</li>
                          <li>Free SSL Certificate</li>
                          <li>1 Included Domain</li>
                          <li>1 Included Domain</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-1">
                      <div class="card__cta">
                        <div class="card__price-box">
                          <p class="card__price-only">Only</p>
                          <p class="card__price-value">$2.95/mo*</p>
                        </div>
                        <a href="#popup" class="btn btn--white">
                          Select
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-1-of-2">
                  <div class="card">
                    <div class="card__side card__side--front-2">
                      <div class="card__title card__title--2">
                        <i class="fas fa-plane"></i>
                        <h4 class="card__heading">Plus</h4>
                      </div>

                      <div class="card__details">
                        <ul>
                          <li>Includes Basic Package Features</li>
                          <li>Unlimited Websites</li>
                          <li>Unlimited SSD Storage</li>
                          <li>Unlimited Domains</li>
                          <li>Unlimited Parked Domains</li>
                          <li>Unlimited Sub Domains</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-2">
                      <div class="card__cta">
                        <div class="card__price-box">
                          <p class="card__price-only">Only</p>
                          <p class="card__price-value">$5.45/mo*</p>
                        </div>
                        <a href="#popup" class="btn btn--white">
                          Select
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
}
