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
      <h1 className="text-center" style={{fontWeight:"700",paddingTop:"50px",fontSize:"60px",backgroundImage:
              "linear-gradient(to top, #08091d 50%, #a2a5a8 50%)",
            color: "transparent",
            WebkitBackgroundClip: "text",}}>{t("SignChoice.Register")}</h1>
      <div className="container" style={{height:"650px"}}>
        <div className="row">
          <Link className="col-6" to="/VendorSignForm">
            <div className="card">
              <div className="card__image-container">
                <img
                  className="card__image"
                  // src={vendorImage}
                  src={"https://res.cloudinary.com/sonax-gmbh/image/fetch/c_fill,h_823,q_auto:best,w_1920/c_crop,h_823,q_auto:best,w_1646,x_232,y_0/ar_2:1,c_scale,h_280,q_auto:eco,w_560/dpr_2,f_auto/https://sonax.de/var/site/storage/images/5/6/9/1/41965-3-eng-ROW/Image20191104143740.png"}
                  alt=""
                  height="350px"
                />
              </div>

              {/* <svg className="card__svg" viewBox="0 0 800 500">
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
              </svg> */}
              <div className="card__content">
                <h4 className="card__title" style={{fontSize:"60px",backgroundImage:
              "linear-gradient(to top, #08091d 50%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text", }} >{t("SignChoice.Vendor")}</h4>
                {/* <h3 >Vendor</h3> */}
              </div>
            </div>
          </Link>

          <Link className="col-6" to="/SignForm">
            <div className="card">
              <div className="card__image-container">
                <img
                  className="card__image"
                  // src={ownerImage}
                  src={"https://media.gettyimages.com/photos/confident-businessman-driving-his-car-picture-id510502761?k=6&m=510502761&s=612x612&w=0&h=i-AGd-9O-FMtnjXva2WLmyq1-Srr-60QjmOa8bH_MHw="}
                  alt=""
                  height="350px"
                />
              </div>

              {/* <svg className="card__svg" viewBox="0 0 800 500">
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
              </svg> */}

              <div className="card__content">
                <h4 className="card__title" style={{fontSize:"60px",backgroundImage:
              "linear-gradient(to top, #08091d 50%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",}} >{t("SignChoice.CarOwner")}</h4>
                {/* <h3 >Car Owner</h3> */}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
