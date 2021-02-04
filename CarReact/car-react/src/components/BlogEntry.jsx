import React from "react";

export default function BlogEntry(props) {
  return (
    <div className="col-md-6 col-lg-6 col-xl-4 mb-4">
      <div className="card blog-post">
        <div className="rounded">
          <img
            className="img-fluid card-img-top"
            src={props.imgSrc}
            alt={props.imgAlt}
          />
          <h4 className="mb-0">
            <span className={props.badgeClass}>{props.badgeValue}</span>
          </h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.cardTitle}</h5>
          <p className="small text-muted text-uppercase mb-3">
            by
            <a href="#!" className="text-reset">
              <strong> {props.userName}</strong>
            </a>
            <br/>
            <a href="#!" className="text-reset float-right">
              {props.date}
            </a>
          </p>
          <p className="text-multiline-truncate card-text">
            {props.cardContent}
          </p>
          <hr />
          <div className="d-flex justify-content-between text-uppercase text-muted small">
            <div className="d-flex align-items-center">
              <i className="mr-2"></i>
              <a href="#!" className="text-reset">
                {props.cardBrand}
              </a>
              ,
              <a href="#!" className="text-reset ml-1">
                {props.cardModel}
              </a>
            </div>
            <div className="d-flex align-items-center">
              <a href="#!" className="text-reset">
                <i className=" mr-2"></i>
                {props.replies}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
