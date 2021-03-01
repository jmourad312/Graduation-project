import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogId } from "../store/actions";
import { useHistory } from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function BlogEntry(props) {
  var history = useHistory();
  const blogID = useSelector(state => state.blogID)
  const dispatch = useDispatch();

  const handleClick = (params) => {
    dispatch(setBlogId(params));
    history.push(`/BlogDetails/${props.id}`);
    localStorage.setItem("BlogID",params);
    localStorage.setItem("TEST", 0);

  }

  if (props.date) {
    var blogTime = props.date.split("T");
  }

  const {t, i18n} = useTranslation();
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
      {/* <div class="card-container">
        <div class="card card-4" onClick={() => handleClick(props.id)}>
          <div
            class="card-img"
            style={{ background: `url(${props.imgSrc})`}}
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
      </div> */}

      <section class="cards">
        <article class="card card--1" onClick={() => handleClick(props.id)}>
          <div class="card__info-hover">
          
            <div class="card__clock-info">
              <svg class="card__clock" viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
              </svg><span class="card__time">{blogTime[0]}</span>
            </div>

          </div>
          <div class="card__img" style={{background: `url(${props.images[0]})`}}></div>
          <p class="card_link">
            <div class="card__img--hover" style={{background: `url(${props.images[0]})`}} ></div>
          </p>
          <div class="card__info">
            <h3 class="card__title text-truncate">{props.cardTitle}</h3>
            <span class="card__by"style={{fontWeight:"700"}}>{t("repeated.By")} <span class="card__author" style={{fontWeight:"900",fontSize:"15px"}} title="author">{props.userName}</span></span>
            <br/>
            <strong>
              <i className="badge badge-dark" style={{fontSize:"15px",padding:"5px"}}>{props.cardBrand}</i>{" "}
              <i className="badge badge-dark" style={{fontSize:"15px",padding:"5px"}}>{props.cardModel}</i>
            </strong>
          </div>
        </article>
      </section>
    </div>
  );
}
