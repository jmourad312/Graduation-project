import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogId } from "../store/actions";
import { useHistory } from "react-router-dom";

export default function BlogEntry(props) {
  var history = useHistory();
  const blogID = useSelector(state => state.blogID)
  const dispatch = useDispatch();

  const handleClick = (params) =>{
    dispatch(setBlogId(params));
    history.push(`/BlogDetails/${props.id}`);
  }


  return (
    <div className="col-md-6 col-lg-6 col-xl-4 mb-4 blog-post">
      {/* <div className="card blog-post" onClick={() => handleClick(props.id)}>
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
            <br />
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
      </div> */}
      <div class="card-container">
        <div class="card card-4">
          <div
            class="card-img"
            style={{ background: `url(${props.imgSrc})`,backgroundSize: "10% 10%", }}
          ></div>
          <a href="" class="card-link">
            <div
              class="card-img-hovered"
              style={{ background: `url(${props.imgSrc})` }}
            ></div>
          </a>
          <div class="card-info">
            <div class="card-about">
              <a class="card-tag tag-news">NEWS</a>
              <div class="card-time">{props.date}</div>
            </div>
            <h1 class="card-title">{props.cardTitle}</h1>
            <div class="card-creator">
              by <a href="">{props.userName}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
