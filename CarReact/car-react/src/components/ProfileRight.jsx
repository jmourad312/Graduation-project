import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation, withRouter, __RouterContext } from "react-router";

import BasicDetails from "../pages/user/profile/myProfile/basicDetails/BasicDetails";
import BlogPosts from "../pages/user/profile/myProfile/blogPosts/BlogPosts";
import BookmarkedPosts from "../pages/user/profile/myProfile/bookmarkedPosts/BookmarkedPosts";
import FavouriteItems from "../pages/user/profile/myProfile/favouriteItems/FavouriteItems";
import RecentViews from "../pages/user/profile/myProfile/recentViews/RecentViews";
import Settings from "../pages/user/profile/myProfile/settings/Settings";
import Loading from "./Loading";
import "../styles.scss";
// import {AnimatePresence}
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "../store/actions";
// import { useTransition, animated } from "react-spring";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function ProfileRight(props) {
  
  
  const location = useLocation();
  const pageVariants = {

    in: {
      opacity: 1,
      x: "0vw",
      scale: 1,
    },
    out: {
      opacity: -1,
      x: "-20vw",
      scale: 0.1,
    },
  };
  const pageTransitions ={
    duration:1.3,
    type: 'tween',
    ease:"easeIn"
  }
  return (
    <div className={props.class}>
      <Suspense fallback={<Loading />}>
        {/* {transitions.map(({ item, props, key }) => ( */}
        {/* <animated.div key={key} style={props}> */}
        {/* <AnimatedSwitch/> */}
        {/* <TransitionGroup>
            <CSSTransition> */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <div className="profileRightContent position-absolute w-100">
              <Route exact path={`/MyProfile/BasicDetails/`}>
                <BasicDetails
                  person={props.person}
                  variants={pageVariants} transition={pageTransitions}
                />
              </Route>
              <Route exact path={`/MyProfile/RecentViews/`}>
                <RecentViews
                  recentlyViewed={props.recentlyViewed}
                  variants={pageVariants} transition={pageTransitions}
                />
              </Route>
              <Route exact path={`/MyProfile/BlogPosts/`}>
                <BlogPosts
                  postsUser={props.postsUser}
                  variants={pageVariants} transition={pageTransitions}
                />
              </Route>
              <Route exact path={`/MyProfile/FavouriteItems/`}>
                <FavouriteItems
                  favouriteItems={props.favouriteItems}
                  variants={pageVariants} transition={pageTransitions}
                />
              </Route>
              <Route exact path={`/MyProfile/BookmarkedPosts/`}>
                <BookmarkedPosts
                  bookmarkPosts={props.bookmarkPosts}
                  variants={pageVariants} transition={pageTransitions}
                />
              </Route>
              <Route exact path={`/MyProfile/Settings/`}>
                <Settings person={props.person} variants={pageVariants} transition={pageTransitions} />
              </Route>
            </div>
          </Switch>
        </AnimatePresence>
        {/* </CSSTransition>
          </TransitionGroup> */}
        {/* </animated.div> */}
        {/* ))} */}
      </Suspense>
    </div>
  );
}
