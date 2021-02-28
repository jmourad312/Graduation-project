import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setProductId } from "../store/actions";
import { useTranslation } from "react-i18next";
import ShowRating from "../components/ShowRating";

export default function ProductComp(props) {
  var history = useHistory();
  const productID = useSelector((state) => state.productID);
  // const productDetails = useSelector(state => state.productDetails);
  const dispatch = useDispatch();

  const handleClick = (params) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID", params);
    history.push(`/ProductDetails/${props.id}`);
    axios
      .put(
        `http://localhost:3000/user/recentlyViewed`,
        { id: props.id },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((req) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { t, i18n } = useTranslation();
  return (
    <div className="col-4 productComp">
      {/* <article className="card" style={{ background: `url(${props.image}) no-repeat`, backgroundSize: "100% 70%"}} */}
      {/* onClick={() => handleClick(props.id)}> */}
      {/* <div className="thumb"></div> */}
      {/* <div className="infos"> */}
      {/* <h2 className="title">{props.name}</h2> */}
      {/* <h3 className="price">{props.price + "$"}</h3> */}
      {/* <p className="desc"> */}
      {/* <h3 className="tags"> */}
      {/* <i className="badge badge-dark">{props.brand}</i> */}
      {/* <i className="badge badge-dark">{props.model}</i> */}
      {/* </h3> */}
      {/* {props.description} */}
      {/* </p> */}
      {/* <h3 className="details">
            <i className="badge badge-dark">{props.brand}</i>
            <i className="badge badge-dark">{props.model}</i>
          </h3> */}
      {/* </div> */}
      {/* </article> */}

      <div className="productList">
        <section className="cards">
          <article
            className="card card--1"
            onClick={() => handleClick(props.id)}
          >
            <div
              className="card__img"
              style={{ background: `url(${props.images[0]}) top left 100%` }}
            ></div>
            <p className="card_link">
              <div
                className="card__img--hover"
                style={{ background: `url(${props.images[0]})top left 100% ` }}
              ></div>
            </p>
            <div className="card__info">
              <h4
                className="card__title text-truncate"
                style={{ fontWeight: "600" }}
              >
                {props.title}
              </h4>
              <span
                className="price"
                style={{
                  fontWeight: "700",
                  color: "goldenrod",
                  fontSize: "25px",
                }}
              >
                {props.price} {t("repeated.LE")}
              </span>{" "}
              <br />
              <p
                className="text-truncate"
                style={{ fontSize: "20px", fontWeight: "700" }}
              >
                {props.description}
              </p>
                <ShowRating rating={props.avgRate} />
                <br/>
              <span className="card__by" style={{ fontWeight: "700" }}>
                {t("repeated.By")}{" "}
                <span
                  className="card__author"
                  style={{ fontWeight: "900", fontSize: "15px" }}
                  title="author"
                >
                  {props.name}
                </span>
              </span>
              <br />
              <small>
                <i className="badge badge-dark" style={{ fontSize: "15px" }}>
                  {props.brand}
                </i>{" "}
                <i className="badge badge-dark" style={{ fontSize: "15px" }}>
                  {props.model}
                </i>
              </small>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
