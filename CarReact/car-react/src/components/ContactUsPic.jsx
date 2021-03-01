import React from 'react'

export default function ContactUsPic({name,prof,bkImage,prImage}) {
    return (
      <div className="contactUsPic">
        <div className="background"></div>

        <div className="outer-div">
          <div className="inner-div">
            <div className="front">
              <div
                className="front__bkg-photo"
              ></div>
              <div
                className="front__face-photo"
              ></div>
              <div className="front__text">
                <h3 className="front__text-header">{name}</h3>
                <p className="front__text-para">{prof}</p>
                <span className="front__text-hover" style={{fontSize:"15px"}}>Hover to Find Me</span>
              </div>
            </div>
            <div className="back">
              <p className="" style={{ maxWidth: "200px" }}></p>
              <div className="social-media-wrapper">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-square"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter-square"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-github-square"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
