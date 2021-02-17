import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ads from "../../../../components/Ads";

import ProfileLeft from "../../../../components/ProfileLeft";
import ProfileRight from "../../../../components/ProfileRight";
import UserIcon from "../../../../components/UserIcon";
import { getUsersAction } from "../../../../store/actions";


export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.Data);
  const classNAME = useSelector(state => state.classNAME)

  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    // console.log(user ? user.person : "loading");
    // console.log(localStorage.getItem("UserID"));
  }, [user]);

  const pageVariants = {
    in: {
      opacity: 10,
      x: "0vw",
      y: "0vh",
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "-100vw",
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
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >
      {/* <Ads
        class="pater"
        imgSrc="../../../../assets/Images/13.jpg"
        hoverImgSrc="../../../../assets/Images/14.jpg"
      /> */}
      {localStorage.getItem("Authorization") !== null && <UserIcon />}

      <section className="myProfile container">
        <div className="row">
          <ProfileLeft
            class="col-3 profileLeft"
            image={user ? (user.person ? user.person.image : "null") : "null"}
            person={user ? user.person : "null"}
          />
          <ProfileRight
            class={"col-9 " + classNAME}
            person={user ? user.person : "null"}
            bookmarkPosts={user ? user.bookmarkPosts : "null"}
            favouriteItems={user ? user.favouriteItems : "null"}
            postsUser={user ? user.postsUser : "null"}
            // recentlyViewed={user ? user.recentlyViewed : "null"}
          />
        </div>
      </section>
    </motion.div>
  );
}
