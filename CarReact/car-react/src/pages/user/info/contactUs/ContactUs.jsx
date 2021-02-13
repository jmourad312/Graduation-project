import axios from "axios";
import React, { useState } from "react";
import ToastMessage from "../../../../components/ToastMessage";

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
    console.log(body);
    const URL = "http://localhost:3000/admin/sendContact";

    axios
      .post(URL, body)
      .then((req) => {
        console.log(body);
        console.log(req);
        if (req.data.Success === true) {
          setToastMessage(
            "Thank you for your message,\nWe will contact you as soon as possible"
          );
          toggleStatus();
          // console.log("Success");
        } else {
          setToastMessage(
            "Sorry an error occured, please try again later"
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

  return (
    <section className="contact-us">
    <div style={{position:"absolute",top:"45%",right:"29%",height:"100px",width:"300px"}}>
      <ToastMessage
        showFunction={toggleStatus}
        status={toastStatus}
        message={toastMessage}
      />
    </div>
      <section className="content-section text-center">
        <div className="contact-section">
          <div className="container">
            <h1
              style={{
                fontWeight: "700",
                fontSize: "45px",
                fontFamily: "cursive",
                backgroundImage:
                  "linear-gradient(to top, #08091d 0%, #a2a5a8 90%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              Contact Us
            </h1>
            <p
              style={{
                fontWeight: "600",
                fontSize: "35px",
                fontFamily: "cursive",
                backgroundImage:
                  "linear-gradient(to top, #08091d 0%, #a2a5a8 90%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              Feel free to contact us anytime
            </p>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <form className="form">
                  <div className="form-group">
                    <label
                      for="Email2"
                      style={{
                        fontWeight: "600",
                        fontSize: "30px",
                        fontFamily: "cursive",
                        backgroundImage:
                          "linear-gradient(to top, #08091d 0%, #a2a5a8 100%)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email2"
                      name="email"
                      onChange={handleChange}
                      value={contactInput.email}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group ">
                    <label
                      for="exampleInputText"
                      style={{
                        fontWeight: "600",
                        fontSize: "25px",
                        fontFamily: "cursive",
                        backgroundImage:
                          "linear-gradient(to top, #08091d 0%, #a2a5a8 90%)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                      }}
                    >
                      Your Message
                    </label>
                    <textarea
                      className="form-control inputheight"
                      placeholder="Description"
                      onChange={handleChange}
                      name="content"
                      value={contactInput.content}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn contrastclass"
                    onClick={handleSubmit}
                    style={{ fontWeight: "600", fontSize: "25px" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <hr />

        <h3
          style={{
            fontWeight: "600",
            fontFamily: "cursive",
            backgroundImage:
              "linear-gradient(to top, #08091d 0%, #a2a5a8 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Our Social Sites
        </h3>
        <div className="list-inline banner-social-buttons">
          <a
            href="#"
            className="btn btn-lg contrastclass mr-2"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-twitter text-dark"> </i>
            <span className="network-name ml-1">Twitter</span>
          </a>

          <a
            href="#"
            className="btn btn-lg contrastclass mr-2"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-facebook text-dark"> </i>
            <span className="network-name ml-1">Facebook</span>
          </a>

          <a
            href="#"
            className="btn btn-lg contrastclass"
            style={{ fontSize: "30px" }}
          >
            <i className="fa fa-youtube-play"> </i>
            <span className="network-name ml-1">Youtube</span>
          </a>
        </div>
      </section>

      <section className="contactinfo">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card contrastclass pb-1">
                <div className="card-body text-center">
                  <i className="fa fa-phone fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                    call us
                  </h4>
                  <p style={{ fontWeight: "700" }}>
                    +8801683615582,+8801750603409
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card contrastclass pb-3">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                    office loaction
                  </h4>
                  <address style={{ fontWeight: "600" }}>
                    Suite 02, Level 12, Sahera Tropical Center
                  </address>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card contrastclass">
                <div className="card-body text-center">
                  <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase" style={{ fontWeight: "700" }}>
                    email
                  </h4>
                  <p style={{ fontWeight: "700" }}>
                    http://al.a.noman1416@gmail.com
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
