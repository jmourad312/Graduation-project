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
import {useTranslation} from "react-i18next";
import icon from "../../../../assets/Images/icon.png";


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
    axios
      .post("http://localhost:3000/user/auth/signup", userSignUpInfo)
      .then((res) => {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("UserID", res.data.Data);

        if (res.data.Success === true) {
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
    axios
      .post("http://localhost:3000/user/auth/signin", userSignInInfo)
      .then((res) => {
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("UserID", res.data.Data);
        if (res.data.Success === true) {
          dispatch(userSignInAction(true));
          dispatch(vendorSignInAction(false));
          localStorage.removeItem("VendorID");
          props.history.push(`/MyProfile/RecentViews`);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Please double check your username or password');
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
  //--------------------------FORGOT PASSWORD-------------------------
  const [forgotState, setForgotState] = useState({
    email:"",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const newEmail=(event)=>{
    const {value,name} = event.target
    setForgotState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }
  const handleForgetSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/forgetPassword", forgotState)
      .then((res) => {
        // savetoken(res.data.Data.token);
        // console.log(token);
        localStorage.setItem("Authorization2", res.data.Data);
        if (res.data.Success === true) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNewPassSubmit = (event) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization2"),
      },
    };

    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/resetPassword", forgotState)
      .then((res) => {
        // savetoken(res.data.Data.token);
        // console.log(token);
        if (res.data.Success === true) {
          switchBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const {t, i18n} = useTranslation();

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
            <h1>{t('userSign.createAccount')}</h1>
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
              placeholder={t('userSign.Name')}
              name="firstName"
              value={userSignUpInfo.firstName}
              onChange={changeUserSignUpInfo}
            />
            <input
              type="email"
              placeholder={t('userSign.Email')}
              name="email"
              value={userSignUpInfo.email}
              onChange={changeUserSignUpInfo}
            />
            <input
              type="password"
              placeholder={t('userSign.Password')}
              name="password"
              value={userSignUpInfo.password}
              onChange={changeUserSignUpInfo}
            />
            <button
              className="button"
              type="submit"
              style={{ height: "70px", fontSize: "20px" }}
            >
              {t('userSign.SignUp')}
            </button>
            <p style={{ fontWeight: "600" }}>
            {t('userSign.agree')}{" "}
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
                {t('userSign.TERMS')}
              </span>{" "}
              {t('userSign.and')}{" "}
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
                {t('userSign.PP')}
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
            <h1>{t('userSign.SignIn')}</h1>
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
              placeholder={t('userSign.Email')}
              name="email"
              value={userSignInInfo.email}
              onChange={changeUserSignInInfo}
            />
            <br />
            <input
              type="password"
              placeholder={t('userSign.Password')}
              name="password"
              value={userSignInInfo.password}
              onChange={changeUserSignInInfo}
            />
            <br />
            <p
              onClick={switchClass}
              style={{
                color: "#4d8ba8",
                cursor: "pointer",
                textDecoration: "underline",fontWeight:"600"
              }}
            >
              {t('userSign.fypassword')}
            </p>
            <br />
            <button
              className="button"
              style={{ height: "70px", fontSize: "20px" }}
            >
              {t('userSign.SignIn')}
            </button>
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
              <h1>{t('logo')}</h1>
              <Link to="" className="logo">
                  <img
                    src={icon}
                    alt=""
                    style={{ width: "50px", height: "50px",position:"absolute",top:"10px",left:"10px" }}
                  />
                </Link>
              <p style={{ fontSize: "20px" }}>
              {t('userSign.rightPlace')}
              </p>
              <button
                className="button ghost"
                id="signIn"
                onClick={() => {
                  document
                    .getElementById("container")
                    .classList.remove("right-panel-active");
                }}
                style={{ height: "70px", fontSize: "20px" }}
              >
                {t('userSign.SignIn')}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>{t('logo')}</h1>
              <Link to="" className="logo">
                  <img
                    src={icon}
                    alt=""
                    style={{ width: "50px", height: "50px",position:"absolute",top:"10px",right:"10px" }}
                  />
                </Link>
              <p style={{ fontSize: "20px" }}>
              {t('userSign.rightPlace')}
              </p>
              <button
                className="button ghost"
                onClick={() => {
                  document
                    .getElementById("container")
                    .classList.add("right-panel-active");
                }}
                id="signUp"
                style={{ height: "70px", fontSize: "20px" }}
              >
                {t('userSign.SignUp')}
              </button>
            </div>
            {/* <div className="overlay-panel overlay-bottom">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="resetPass">Sign Up</button>
                </div>   */}
          </div>
        </div>
        <div className={changeClass} id="forgotpass" style={{ left: "0px" }}>
          {/* <i
            className="fas fa-arrow-circle-left"
            style={{ fontSize: "50px" }}
            onClick={switchBack}
          ></i> */}
          <i
            class="fas fa-times-circle fa-3x closeIcon"
            style={{
              cursor: "pointer",
              position: "relative",
              left: "92%",
              top: "2%",
            }}
            onClick={switchBack}
          ></i>
          <h2 className="text-center">{t('userSign.reset')}</h2>
          <form className="text-center">
            <input
              type="email"
              className="w-75 text-center"
              placeholder={t('userSign.enterMail')}
              name="email"
              value={forgotState.email}
              onChange={newEmail}
            />
            <br />
            <button
              className="btn buttoncolor text-white"
              style={{
                width: "200px",
                height: "70px",
                fontSize: "25px",
                borderRadius: "20px",
                borderTopWidth:"0px",
                borderRightWidth:"0px",
                borderBottomWidth:"0px",
                borderLeftWidth:"0px",
              }}
              value="Send email"
              onClick={handleForgetSubmit}
              type="button"
            >
              {t('userSign.sendMail')}
            </button>
          </form>
          <br />
          <form className="text-center">
            <input
              type="text"
              className="w-75 text-center"
              name="code"
              value={forgotState.code}
              onChange={newEmail}
              placeholder={t('userSign.code')}
            />
            <input
              type="password"
              name="password"
              value={forgotState.password}
              onChange={newEmail}
              className="w-75 text-center"
              placeholder={t('userSign.newp')}
            />
            <input
              type="password"
              name="confirmPassword"
              value={forgotState.confirmp}
              onChange={newEmail}
              className="w-75 text-center"
              placeholder={t('userSign.confirmp')}
            />
            <div className="text-center">
              <button
                className="btn buttoncolor text-white"
                style={{
                  width: "200px",
                  height: "70px",
                  fontSize: "25px",
                  borderRadius: "20px",
                  borderTopWidth:"0px",
                  borderRightWidth:"0px",
                  borderBottomWidth:"0px",
                  borderLeftWidth:"0px",
                }}
                type="button"
                value="submit"
                onClick={handleNewPassSubmit}
              >
                {t('repeated.Submit')}
              </button>
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
