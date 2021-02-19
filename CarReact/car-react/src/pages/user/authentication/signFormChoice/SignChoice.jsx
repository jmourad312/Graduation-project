import React from "react";
import vendorImage from "../../../../assets/Images/car-vendor.jpg";
import ownerImage from "../../../../assets/Images/car-owner.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {useTranslation} from "react-i18next";

export default function SignChoice() {
  const {t, i18n} = useTranslation();
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
      className="signChoice"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      <h1 className="text-center" style={{fontWeight:"700",paddingTop:"50px",fontSize:"60px",color:"transparent",WebkitBackgroundClip:"text"}}>{t("SignChoice.Register")}</h1>
      <div className="container" style={{height:"650px"}}>
        <div className="row">
          <Link className="col-6" to="/VendorSignForm">
            <div className="card">
              <div className="card__image-container">
                <img
                  className="card__image"
                  src={vendorImage}
                  alt=""
                  height="350px"
                />
              </div>

              <svg className="card__svg" viewBox="0 0 800 500">
                <path
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                  stroke="transparent"
                  fill="#333"
                />
                <path
                  className="card__line"
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                  stroke="pink"
                  stroke-width="3"
                  fill="transparent"
                />
              </svg>
              <div className="card__content">
                <h4 className="card__title" style={{fontSize:"60px",backgroundImage: "linear-gradient(to top,#ffffff 50%,#dfdda3 60%)", color: "transparent", WebkitBackgroundClip: "text" }} >{t("SignChoice.Vendor")}</h4>
                {/* <h3 >Vendor</h3> */}
              </div>
            </div>
          </Link>

          <Link className="col-6" to="/SignForm">
            <div className="card">
              <div className="card__image-container">
                <img
                  className="card__image"
                  src={ownerImage}
                  alt=""
                  height="350px"
                />
              </div>

              <svg className="card__svg" viewBox="0 0 800 500">
                <path
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                  stroke="transparent"
                  fill="#333"
                />
                <path
                  className="card__line"
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                  stroke="pink"
                  stroke-width="3"
                  fill="transparent"
                />
              </svg>

              <div className="card__content">
                <h4 className="card__title" style={{fontSize:"60px",backgroundImage: "linear-gradient(to top,#ffffff 50%,#dfdda3 60%)", color: "transparent", WebkitBackgroundClip: "text" }} >{t("SignChoice.CarOwner")}</h4>
                {/* <h3 >Car Owner</h3> */}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
