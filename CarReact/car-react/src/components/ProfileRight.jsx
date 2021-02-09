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
// import { useTransition, animated } from "react-spring";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function ProfileRight(props) {
  // const { location2 } = useContext(__RouterContext);

  // const transitions = useTransition(location, (location) => location.pathname, {
  //   from: {
  //     opacity: 0,
  //     transform: "translate(-125px,0)",
  //     // transitionDuration: "0.5s",
  //   },
  //   enter: {
  //     opacity: 1,
  //     transform: "translate(0,0)",
  //     // transitionDuration: "0.5s",
  //   },
  //   leave: {
  //     opacity: 0,
  //     transform: "translate(150px,-0)",
  //     // transitionDuration: "0.5s",
  //   },
  // });
  // const AnimatedSwitch = withRouter(({ location }) => (
  //   <TransitionGroup>
  //     <CSSTransition key={location.key} classNames="slide" timeout={1000}>
  //       <Switch>
  //         <div className="profileRightContent">
  //           <Route exact path={`/MyProfile/BasicDetails/`}>
  //             <BasicDetails person={props.person} />
  //           </Route>
  //           <Route path={`/MyProfile/RecentViews/`}>
  //             <RecentViews recentlyViewed={props.recentlyViewed} />
  //           </Route>
  //           <Route path={`/MyProfile/BlogPosts/`}>
  //             <BlogPosts postsUser={props.postsUser} />
  //           </Route>
  //           <Route path={`/MyProfile/FavouriteItems/`}>
  //             <FavouriteItems favouriteItems={props.favouriteItems} />
  //           </Route>
  //           <Route path={`/MyProfile/BookmarkedPosts/`}>
  //             <BookmarkedPosts bookmarkPosts={props.bookmarkPosts} />
  //           </Route>
  //           <Route path={`/MyProfile/Settings/`}>
  //             <Settings />
  //           </Route>
  //         </div>
  //       </Switch>
  //     </CSSTransition>
  //   </TransitionGroup>
  // ));
  const location = useLocation();
  const pageVariants = {

    in: {
      opacity: 1,
      x: "0vw",
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "-20vw",
      scale: 0.1,
    },
  };
  const pageTransitions ={
    duration:0.6,
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
                <Settings variants={pageVariants} transition={pageTransitions} />
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
