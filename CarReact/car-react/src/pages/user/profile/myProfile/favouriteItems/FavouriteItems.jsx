import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loading from "../../../../../components/Loading";
import { PaginationReact } from "../../../../../components/PaginationReact";
import { getUsersAction, setProductId } from "../../../../../store/actions";
// import Review from '../../../../../components/Review'


export default function FavouriteItems(props) {
  const user = useSelector((state) => state.user.Data);
  let history = useHistory();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const dispatch = useDispatch();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setItems(user ? user.favouriteItems : []);
  });

  const handleClick = (pageNumber) => setCurrentPage(pageNumber.selected + 1);


  const handleItemClick = (params) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID", params);
    history.push(`/ProductDetails/${params}`);
  };
  return (
    <motion.div
      className="FavouriteItems"
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <div className="container" style={{ fontSize: "1.5rem" }}>
        <div className="row">
          {user ? (
            currentPosts.length === 0 ? (
              <div
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "30px",
                  
                  position: "absolute",
                  left: "30%",
                }}
              >
                No Favourite Items yet
                <div
                  className="text-center"
                  onClick={() => history.push("/ProductsList")}
                  style={{
                    fontSize: "30px",
                    borderRadius: "25px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Go to Products List
                </div>
              </div>
            ) : (
              <>
                {currentPosts.map((item) => {
                  return (
                    <div className="col-4 mb-3 h-25 w-25">
                      {/* <div className="card">
                <img className="card-img-top"src={item.image}alt="Card"style={{ maxHeight: "100px" }}/>
                <div className="card-body">
                  <h3 className="card-title text-truncate">{item.name}</h3>
                  <h4 className="card-text text-truncate">{item.description}</h4>
                  <h5 className="card-text" style={{ color: "yellow" }}>
                    <i class="fas fa-coins"></i> {item.price}
                  </h5>
                  <strong>
                    <i className="badge badge-light">{item.carBrand}</i>{" "}
                    <i className="badge badge-light">{item.carModel}</i>
                  </strong>
                  <button className="btn btn-success"onClick={() => handleClick(item._id)}>Go to product</button>
                </div>
              </div> */}

                      <section class="cards">
                        <article class="card card--1">
                          <div
                            class="card__img"
                            style={{ background: `url(${item.image})` }}
                          ></div>
                          <p class="card_link">
                            <div
                              class="card__img--hover"
                              style={{ background: `url(${item.image})` }}
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
                              style={{ color: "yellow" }}
                            >
                              <i class="fas fa-coins"></i> {item.price}
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
                            onClick={() => handleItemClick(item._id)}
                          >
                            Go to product
                          </button>
                        </article>
                      </section>
                    </div>
                  );
                })}
                <div style={{ position: "absolute", top: "-25px",left:"140px" }}>
                  <PaginationReact
                    NumberOfItemsInDB={items.length}
                    NumberToShow={postsPerPage}
                    handleClick={handleClick}
                  />
                </div>
              </>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </motion.div>
  );
}
