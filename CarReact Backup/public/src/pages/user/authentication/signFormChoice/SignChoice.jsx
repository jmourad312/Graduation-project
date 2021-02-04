import React from "react";
import vendorImage from "../../../../assets/Images/car-vendor.jpg";
import ownerImage from "../../../../assets/Images/car-owner.jpg";
import { Link } from "react-router-dom";

export default function SignChoice() {
  return (
    <div className="signChoice">
      <div className="container">
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
                <h4 className="card__title">Login as</h4>
                <h3>Vendor</h3>
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
                <h4 className="card__title">Login as</h4>
                <h3>Owner</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
