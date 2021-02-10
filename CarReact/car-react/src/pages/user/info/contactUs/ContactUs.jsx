import React from "react";

export default function ContactUs() {
  return (
    <section className="contact-us">
      <section  className="content-section text-center">
        <div className="contact-section">
          <div className="container" >
            <h2 style={{ fontWeight: "700" }}>Contact Us</h2>
            <p style={{ fontWeight: "600",fontSize:"30px" }}>
              Feel free to contact us anytime
            </p>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <form className="form">
                  <div className="form-group">
                    <label for="Email2" style={{ fontWeight: "600", fontSize: "25px" }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email2"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputText" style={{ fontWeight: "600", fontSize: "25px" }}>Your Message</label>
                    <textarea
                      className="form-control inputheight"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn contrastclass">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <hr />

        <h3>Our Social Sites</h3>
        <div className="list-inline banner-social-buttons">
          
            <a href="#" className="btn btn-lg contrastclass mr-2">
              <i className="fa fa-twitter text-dark">
                {" "}
              </i>
                <span className="network-name ml-1">Twitter</span>
            </a>
          
            <a href="#" className="btn btn-lg contrastclass mr-2">
              <i className="fa fa-facebook text-dark">
                {" "}
              </i>
                <span className="network-name ml-1">Facebook</span>
            </a>
          
            <a href="#" className="btn btn-lg contrastclass">
              <i className="fa fa-youtube-play">
                {" "}
              </i>
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
                  <h4 className="text-uppercase">call us</h4>
                  <p>+8801683615582,+8801750603409</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card contrastclass pb-3">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase">office loaction</h4>
                  <address>Suite 02, Level 12, Sahera Tropical Center</address>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card contrastclass">
                <div className="card-body text-center">
                  <i className="fa fa-globe fa-2x" aria-hidden="true"></i>
                  <h4 className="text-uppercase">email</h4>
                  <p>http://al.a.noman1416@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
