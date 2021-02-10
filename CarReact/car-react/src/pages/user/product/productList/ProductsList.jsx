import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import LoginButton from "../../../../components/LoginButton";
import ProductComp from "../../../../components/ProductComp";
import ProductFilter from "../../../../components/ProductFilter";
import UserIcon from "../../../../components/UserIcon";
import { getProductsAction, getUsersAction } from "../../../../store/actions";

export default function ProductsList() {
  const products = useSelector((state) => state.products.Data);
  const isUserLoggedIn = useSelector(state => state.isUserLoggedIn)
  const isVendorLoggedIn = useSelector((state) => state.isVendorLoggedIn);
  console.log(isUserLoggedIn);
  const dispatch = useDispatch();
  
  
  // console.log(products);
  const getProducts = () => {
    dispatch(getProductsAction());
  };
  
  useEffect(() => {
    getProducts();
    dispatch(getUsersAction(localStorage.getItem("UserID")));
  }, []);
  


  const createProducts = (prod) => {
    return (
      <ProductComp
        key={prod._id}
        id={prod._id}
        image={prod.image}
        description={prod.description}
        price={prod.price}
        name={prod.name}
        brand={prod.carBrand}
        model={prod.carModel}
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
          <div className="col-3" style={{ marginTop: "10%" }}>
            <ProductFilter />
          </div>
          <div className="col-9" style={{ marginTop: "2%" }}>
            <div className="row">
              {products ? products.map(createProducts) : <Loading />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
