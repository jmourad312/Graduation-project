import axios from "axios";
import React, { useState } from "react";
import LoginButton from "../../../../components/LoginButton";
import ToastMessage from "../../../../components/ToastMessage";
import UserIcon from "../../../../components/UserIcon";
import {useTranslation} from "react-i18next";


export default function ContactUs() {
  
  const [contactInput, setContactInput] = useState({
    email:"",
    content:""
  })

  const handleChange =(event)=>{
    const { value, name } = event.target;
    setContactInput((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }
  
  const [toastStatus, setToastStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toggleStatus = () => {
    setToastStatus(true);
    setTimeout(() => {
      setToastStatus(false);
    }, 2000);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const config = {
    //   headers: {
    //     Authorization: localStorage.getItem("Authorization"),
    //   },
    // };

    const body = {
      email:contactInput.email,
      message:contactInput.content,
    };
    const URL = "http://localhost:3000/admin/sendContact";

    axios
      .post(URL, body)
      .then((req) => {
        if (req.data.Success === true) {
          setToastMessage(
            t("Contact Us.ThankForMessage")
          );
          toggleStatus();
        } else {
          setToastMessage(
            t("Contact Us.SorryErrorOccured")
          );
          toggleStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setContactInput({
        email:"",
        content:""
      })
  };


  const {t, i18n} = useTranslation();

  return (
    <section className="contact-us">
      {localStorage.getItem("Authorization") === null && <LoginButton />}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
      <div
        style={{
          position: "absolute",
          top: "80%",
          right: "42.5%",
          height: "100px",
          width: "300px",
        }}
      >
        <ToastMessage
          showFunction={toggleStatus}
          status={toastStatus}
          message={toastMessage}
        />
      </div>
     
      <div className="container2 container pt-3">
      <section className="content-section text-center">
        <div className="contact-section">
          <div className="container">
            <h1
              style={{
                fontWeight: "700",
                fontSize: "45px",
                paddingBottom:"3px"
              }}
            >
             {t("Contact Us.ContactUs")}
            </h1>
            <p
              style={{
                fontWeight: "700",
                fontSize: "36px",
              }}
            >
              {t("Contact Us.Feel Free")}
            </p>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <form className="form">
                  <div className="form-group">
                    <label
                      for="Email2"
                      style={{
                        fontWeight: "800",
                        fontSize: "30px",
                      }}
                    >
                      {t("Contact Us.Email")}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email2"
                      name="email"
                      onChange={handleChange}
                      value={contactInput.email}
                      placeholder={t("Contact Us.Email")}
                    />
                  </div>
                  <div className="form-group ">
                    <label
                      for="exampleInputText"
                      style={{
                        fontWeight: "800",
                        fontSize: "30px",
                      }}
                    >
                      {t("Contact Us.Message")}
                    </label>
                    <textarea
                      className="form-control inputheight"
                      style={{height:"80px"}}
                      placeholder="..."
                      onChange={handleChange}
                      name="content"
                      value={contactInput.content}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn contrastclass"
                    onClick={handleSubmit}
                    style={{ fontWeight: "700", fontSize: "25px" }}
                  >
                    {t("Contact Us.SendMessage")}
                  </button>
                </form>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        {/* <hr />

        <h3
          style={{
            fontWeight: "800",
            backgroundImage:
              "linear-gradient(to top,#C6FFDD,#FBD786,#f64f59)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          {t("Contact Us.SocialSites")}
        </h3>
        <div className="list-inline banner-social-buttons">
          <a
            href="#"
            className="btn btn-lg contrastclass mr-2"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-twitter text-dark"> </i>
            <span className="network-name ml-1">{t("Contact Us.Twitter")}</span>
          </a>

          <a
            href="#"
            className="btn btn-lg contrastclass mr-2"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-facebook text-dark"> </i>
            <span className="network-name ml-1">{t("Contact Us.Facebook")}</span>
          </a>

          <a
            href="#"
            className="btn btn-lg contrastclass"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-youtube-play"> </i>
            <span className="network-name ml-1">{t("Contact Us.Youtube")}</span>
          </a>
        </div> */}
      </section>
      </div>
      <section className="contactinfo">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card contrastclass pb-1">
                <div className="card-body text-center">
                  <i className="fa fa-phone fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                  {t("Contact Us.CallUs")}
                  </h4>
                  <p style={{ fontWeight: "700",fontSize:"25px" }}>
                    +20 101 828 6018 / +20 101 907 7144
                    +20 100 246 1335 / +20 106 614 8699
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-4">
              <div className="card contrastclass pb-3">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                  {t("Contact Us.OfficeLocation")}
                  </h4>
                  <address style={{ fontWeight: "600" }}>
                    Suite 02, Level 12, Sahera Tropical Center
                  </address>
                </div>
              </div>
            </div> */}
            <div className="col-6">
              <div className="card contrastclass">
                <div className="card-body text-center">
                  <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                  {t("Contact Us.OurEmail")}
                  </h4>
                  <p style={{ fontWeight: "700",fontSize:"25px",marginBottom:"50px",paddingTop:"20px" }}>
                    www.dreksyonyteam@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
