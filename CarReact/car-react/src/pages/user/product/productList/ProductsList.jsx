import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Overlay } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import LoginButton from "../../../../components/LoginButton";
import ProductComp from "../../../../components/ProductComp";
import ProductFilter from "../../../../components/ProductFilter";
import UserIcon from "../../../../components/UserIcon";
import { getProductsAction, getUsersAction } from "../../../../store/actions";
import { useTranslation } from "react-i18next";

export default function ProductsList() {
  const products = useSelector((state) => state.products);
  const isUserLoggedIn = useSelector(state => state.isUserLoggedIn)
  const isVendorLoggedIn = useSelector((state) => state.isVendorLoggedIn);
  const dispatch = useDispatch();


  // const getProducts = () => {
  //   dispatch(getProductsAction());
  // };


  useEffect(() => {
    // getProducts();
    dispatch(getUsersAction(localStorage.getItem("UserID")));
  }, []);



  const createProducts = (prod) => {
    return (
      <ProductComp
        key={prod._id}
        id={prod._id}
        images={prod.images}
        description={prod.description}
        price={prod.price}
        name={prod.person.firstName}
        title={prod.name}
        brand={prod.carBrand}
        model={prod.carModel}
        rating={prod}
        avgRate={prod.avgRate}
      // category={prod.category}
      />
    );
  };
  const pageVariants = {
    in: {
      opacity: 10,
      y: "0vh",
      scale: 1,
    },
    out: {
      opacity: 0,
      y: "-100vh",
      scale: 0.1,
    },
  };
  const pageTransitions = {
    duration: 1.5,
    type: "tween",
    ease: "anticipate",
  };
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      className="productList"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      {localStorage.getItem("Authorization") === null && <LoginButton />}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}

      <div className="container">
        <div className="row">
          <div className="col-3" style={{ marginTop: "5%" }}>
            <ProductFilter className="ProductFilter" />
          </div>

          <div className="col-9" style={{ marginTop: "2%" }}>
            <div className="row">
              {products ? (
                products.Success ? (
                  products.Data.map(createProducts)
                ) : (
                    <div
                      style={{
                        height: "600px",
                        width: "600px",
                        position: "absolute",
                        left: "15%",
                        top: "25%",
                      }}
                    >
                      <h2
                        style={{
                          position: "relative",
                          top: "20%",
                          left: "20%",
                          textAlign: "center",
                          fontWeight:"700",
                          fontSize:"32px"
                        }}
                      >
                        {t("product.products list.search")}
                      </h2>
                    </div>
                  )
              ) : (
                  <Loading />
                )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
