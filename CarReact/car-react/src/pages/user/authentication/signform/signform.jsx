import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import $ from "jquery";
// import { useEffect } from 'react';
import Button2 from "../../../../components/Button2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  userSignInAction,
  vendorSignInAction,
} from "../../../../store/actions";
import Modal from "react-bootstrap/Modal";
import VerticalModal from "../../../../components/VerticalModal";
import termsAndPrivacy from "../../../../assets/js/termsAndPrivacy";
import { motion } from "framer-motion";
export default function Signform(props) {
  const [changeClass, setChangeClass] = useState("forgotpass");
  // const [changeClassBack, setChangeClassBack] = useState("forgotpass");
  const [modalShow, setModalShow] = useState(false);
  const [modaleInfo, setModaleInfo] = useState({
    heading: "",
    title: "",
    content: "",
  });
  const [changePayment, setChangePayment] = useState("payment");
  const userID = useSelector((state) => state.userID);
  const dispatch = useDispatch();



  const [userSignUpInfo, setUserSignUpInfo] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const changeUserSignUpInfo = (event) => {
    const { value, name } = event.target;
    setUserSignUpInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userSignUpInfo);
    axios
      .post("http://localhost:3000/user/auth/signup", userSignUpInfo)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("UserID", res.data.Data);

        console.log(localStorage.getItem("Authorization"));
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
          dispatch(userSignInAction(true));
          dispatch(vendorSignInAction(false));
          localStorage.removeItem("VendorID");
          props.history.push(`/MyProfile/${localStorage.getItem("UserID")}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [userSignInInfo, setUserSignInInfo] = useState({
    email: "",
    password: "",
  });
  const changeUserSignInInfo = (event) => {
    const { value, name } = event.target;
    setUserSignInInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSignInSubmit = (event) => {
    event.preventDefault();
    console.log(userSignInInfo);
    axios
      .post("http://localhost:3000/user/auth/signin", userSignInInfo)
      .then((res) => {
        console.log(res);
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("UserID", res.data.Data);
        console.log(localStorage.getItem("Authorization"));
        if (res.data.Success === true) {
          console.log("hhkhkhkhk");
          dispatch(userSignInAction(true));
          dispatch(vendorSignInAction(false));
          localStorage.removeItem("VendorID");
          props.history.push(`/MyProfile/${localStorage.getItem("UserID")}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const switchPayment = () => {
    // e.preventDefault();
    setChangePayment("payment showPayment");
  };
  const switchPaymentBack = () => {
    setChangePayment("payment");
  };
  const switchClass = () => {
    setChangeClass("forgotpass open");
  };
  const switchBack = () => {
    setChangeClass("forgotpass");
  };
  // const userSignUp = useSelector((state) => state.userSignUp);
  // const userSignIn = useSelector((state) => state.userSignIn);

  // const signUP = () => {
  //   dispatch(userSignUpAction());
  // };
  // const signIN = () => {
  //   dispatch(userSignInAction());
  // };

  //  const clickHandler = () => {
  //    axios({
  //      method: "get",
  //      url: "http://localhost:3000/user/auth/google",
  //    });
  //   }

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
  const handlegoogle = () => {
    window.location.replace("http://localhost:3000/user/auth/google");
  };
  const handlefacebook = () => {
    window.location.replace("http://localhost:3000/user/auth/facebook");
  };

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
      className="signform "
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <div className="container " id="container">
        <div className="form-container sign-up-container ">
          <form className="form1" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {/* <div className="social-container">
              <Link onClick={handlefacebook} className="social">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link onClick={handlegoogle} className="social">
                <i className="fab fa-google-plus-g"></i>
              </Link> */}
              {/* <a to="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
            {/* </div> */}
            {/* <span>or use your email for registration</span> */}
            <input
              type="text"
              placeholder="Name"
              name="firstName"
              value={userSignUpInfo.firstName}
              onChange={changeUserSignUpInfo}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userSignUpInfo.email}
              onChange={changeUserSignUpInfo}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userSignUpInfo.password}
              onChange={changeUserSignUpInfo}
            />
            <button className="button" type="submit" style={{height:"70px",fontSize:"20px"}}>
              Sign Up
            </button>
            <p style={{fontWeight:"600"}}>
              By signing up you agree to our{" "}
              <span
                style={{ color: "#4d8ba8", cursor: "pointer",textDecoration:"underline" }}
                onClick={() => {
                  setModalShow(true);
                  setModaleInfo({
                    heading: termsAndPrivacy.terms.heading,
                    title: termsAndPrivacy.terms.title,
                    content: termsAndPrivacy.terms.content,
                  });
                }}
              >
                TERMS
              </span>{" "}
              and{" "}
              <span
                style={{ color: "#4d8ba8", cursor: "pointer",textDecoration:"underline"  }}
                onClick={() => {
                  setModalShow(true);
                  setModaleInfo({
                    heading: termsAndPrivacy.privacy.heading,
                    title: termsAndPrivacy.privacy.title,
                    content: termsAndPrivacy.privacy.content,
                  });
                }}
              >
                Privacy Policy
              </span>
            </p>
            {/* <button className="button" onClick={switchPayment}>
                Sign Up
              </button> */}
          </form>
        </div>
        <VerticalModal
          heading={modaleInfo.heading}
          title={modaleInfo.title}
          content={modaleInfo.content}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <div className="form-container sign-in-container ">
          <form className="form1" onSubmit={handleSignInSubmit}>
            <h1>Sign in</h1>
            {/* <div className="social-container">
              <Link
                to="http://localhost:3000/user/auth/facebook"
                className="social"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                to="http://localhost:3000/user/auth/google"
                className="social"
              >
                <i className="fab fa-google-plus-g"></i>
              </Link> */}
              {/* <a to="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
            {/* </div> */}
            {/* <span>or use your account</span> */}
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userSignInInfo.email}
              onChange={changeUserSignInInfo}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userSignInInfo.password}
              onChange={changeUserSignInInfo}
            />
            <br />
            <p onClick={switchClass} style={{cursor:"pointer",textDecoration:"underline",color:"black"}}>Forgot your password?</p>
            <br />
            <button className="button"style={{height:"70px",fontSize:"20px"}}>Sign In</button>
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
              <p style={{fontSize:"20px"}}>
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
                }}style={{height:"70px",fontSize:"20px"}}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p style={{fontSize:"20px"}}>Enter your personal details and start journey with us</p>
              <button
                className="button ghost"
                onClick={() => {
                  document
                    .getElementById("container")
                    .classList.add("right-panel-active");
                  console.log("hello");
                }}
                id="signUp"style={{height:"70px",fontSize:"20px"}}
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
        <div className={changeClass} id="forgotpass" style={{left:"0px"}} >
          <i className="fas fa-arrow-circle-left" style={{fontSize:"50px"}} onClick={switchBack}></i>
           <h2 className="text-center" >Rest Your Password</h2>
          <form className="text-center">
              <input type="email" className="w-75 text-center" placeholder="Email" />
            <input type="text" className="w-75 text-center" placeholder="Input your code here" />
            <input type="password" className="w-75 text-center" placeholder="New password" />
            <input type="password" className="w-75 text-center" placeholder="Confirm new password" />
            <div className="text-center">
            <button className="btn buttoncolor text-white" style={{width:"200px",height:"70px",fontSize:"25px",borderRadius:"20px"}} value="submit">Submit</button>
            <button className="btn buttoncolor text-white ml-5" style={{width:"200px",height:"70px",fontSize:"25px",borderRadius:"20px"}} value="Send email">Send email</button>
            </div>
            
          </form>
        </div>
        <div className={changePayment}>
          <i
            class="fas fa-times-circle fa-3x closeIcon"
            onClick={switchPaymentBack}
          ></i>
          <section className="section-plans" id="section-plans">
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <div className="card__side card__side--front-1">
                    <div className="card__title card__title--1">
                      <i className="fas fa-paper-plane"></i>
                      <h4 className="card__heading">Basic</h4>
                    </div>

                    <div className="card__details">
                      <ul>
                        <li>Limited Search results</li>
                        <li>Limited Search results</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card__side card__side--back card__side--back-1">
                    <div className="card__cta">
                      <div className="card__price-box">
                        <p className="card__price-only">Only</p>
                        <p className="card__price-value">$2.95/mo*</p>
                      </div>
                      <a href="#popup" className="btn btn--white">
                        Select
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card">
                  <div className="card__side card__side--front-2">
                    <div className="card__title card__title--2">
                      <i className="fas fa-plane"></i>
                      <h4 className="card__heading">Plus</h4>
                    </div>

                    <div className="card__details">
                      <ul>
                        <li>Extended Search results</li>
                        <li>Enjoy Ads free experince</li>
                        <li>Unlimited Parked Domains</li>
                        <li>Unlimited Sub Domains</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card__side card__side--back card__side--back-2">
                    <div className="card__cta">
                      <div className="card__price-box">
                        <p className="card__price-only">Only</p>
                        <p className="card__price-value">$5.45/mo*</p>
                      </div>
                      <a href="#popup" className="btn btn--white">
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
    </motion.div>
  );
}
