import React from "react";

export default function ContactUs() {
  return (
    <section className="contact-us">
      <section id="contact" className="content-section text-center">
        <div className="contact-section">
          <div className="container">
            <h2>Contact Us</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
              adipisci consectetur id molestiae ab nemo iste fugit sapiente
              iusto ut, distinctio nesciunt veritatis libero cupiditate.
              Voluptas, asperiores quam? Asperiores, dolorem.
            </p>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <form className="form">
                  <div className="form-group ">
                    <label for="Name2">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Name2"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="Email2">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="Email2"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputText">Your Message</label>
                    <textarea
                      className="form-control inputheight"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn ">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <h3>Our Social Sites</h3>
        <ul className="list-inline banner-social-buttons color">
          <li>
            <a href="#" className="btn btn-lg">
              <i className="fa fa-twitter">
                {" "}
                <span className="network-name">Twitter</span>
              </i>
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-lg">
              <i className="fa fa-facebook">
                {" "}
                <span className="network-name">Facebook</span>
              </i>
            </a>
          </li>
          <li>
            <a href="#" className="btn  btn-lg">
              <i className="fa fa-youtube-play">
                {" "}
                <span className="network-name">Youtube</span>
              </i>
            </a>
          </li>
        </ul>
      </section>

      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-phone fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">call us</h4>
                  <p>+8801683615582,+8801750603409</p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-map-marker fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">office loaction</h4>
                  <address>Suite 02, Level 12, Sahera Tropical Center </address>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 my-5">
              <div className="card border-0">
                <div className="card-body text-center">
                  <i className="fa fa-globe fa-5x mb-3" aria-hidden="true"></i>
                  <h4 className="text-uppercase mb-5">email</h4>
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
