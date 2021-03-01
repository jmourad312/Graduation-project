import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loading from "../../../../../components/Loading";
import { getRelatedProducts, getUsersAction, setProductId } from "../../../../../store/actions";
import { useTranslation } from "react-i18next";

export default function RecentViews(props) {
  const user = useSelector((state) => state.user.Data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
  }, [localStorage.getItem("UserID")]);
  let history = useHistory();

  const handleClick = (params, name, brand, model) => {
    dispatch(setProductId(params));
    dispatch(getRelatedProducts(params, name, brand, model));
    history.push(`/ProductDetails/${params}`);
  };
  const { t, i18n } = useTranslation();
  return (
    <motion.div
      className="RecentViews"
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <div className="container">
        <div className="row">
          {user ? (
            user.recentlyViewed.length === 0 ? (
              <div className="text-center" style={{ color: "black", fontWeight: "700", fontSize: "30px", position: "absolute", left: "34%",top:"240px" }}
              >{t("RecentViews.NoItems")}
                <div className="text-center" onClick={() => history.push("/ProductsList")} style={{ fontSize: "30px", borderRadius: "25px", textDecoration: "underline", cursor: "pointer" }}>
                  {t("RecentViews.GotoProductsList")}
                </div>
              </div>
            ) : (
                user.recentlyViewed.map((item) => {
                  return (
                    // <div className="col-4 mb-3 h-25 w-25">
                    //   <div className="card">
                    //     <img className="card-img-top" src={item.image} alt="Card" style={{ maxHeight: "100px" }}/>
                    //     <div className="card-body">
                    //       <h3 className="card-title text-truncate">{item.name}</h3>
                    //       <h4 className="card-text text-truncate">
                    //         {item.description}
                    //       </h4>
                    //       <h5 className="card-text" style={{ color: "yellow" }}>
                    //         <i class="fas fa-coins"></i> {item.price}
                    //       </h5>
                    //       <strong>
                    //         <i className="badge badge-light">{item.carBrand}</i>{" "}
                    //         <i className="badge badge-light">{item.carModel}</i>
                    //       </strong>
                    //       <button className="btn btn-success"onClick={() => handleClick(item._id)}>Go to product</button>
                    //     </div>
                    //   </div>
                    // </div>
                    <div
                      className="col-4 mb-3 h-25 w-25"
                      style={{ fontSize: "1.5rem" }}
                    >
                      <section class="cards">
                        <article class="card card--1">
                          <div
                            class="card__img"
                            style={{
                              background: `url(${item.images[0]})top left 100%`,
                            }}
                          ></div>
                          <p class="card_link">
                            <div
                              class="card__img--hover"
                              style={{
                                background: `url(${item.images[0]})top left 100%`,
                              }}
                            ></div>
                          </p>
                          <div class="card__info">
                            <h4 class="card__title text-truncate">
                              {item.name}
                            </h4>
                            <h6 className="card-text text-truncate">
                              {item.description}
                            </h6>
                            <h5
                              className="card-text"
                              style={{ color: "#e6ac00" }}
                            >
                              <i class="fas fa-coins"></i> {item.price}{" "}
                              {t("repeated.LE")}
                            </h5>
                            {/* <span class="card__by">by <span class="card__author" title="author">{props.userName}</span></span>
                        <br /> */}
                            <small>
                              <i className="badge badge-dark">
                                {item.carBrand}
                              </i>
                              <i className="badge badge-dark">
                                {item.carModel}
                              </i>
                            </small>
                          </div>
                          <button
                            className="btn btn-dark"
                            style={{ fontSize: "1.5rem" }}
                            onClick={() =>
                              handleClick(
                                item._id,
                                item.name,
                                item.carBrand,
                                item.carModel
                              )
                            }
                          >
                            {t("repeated.GotoProductDetails")}
                          </button>
                        </article>
                      </section>
                    </div>
                  );
                })
              )
          ) : (
              <Loading />
            )}
        </div>
      </div>
    </motion.div>
  );
}
