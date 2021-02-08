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

import { useTransition, animated } from "react-spring";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function ProfileRight(props) {
  const location = useLocation();
  // const { location2 } = useContext(__RouterContext);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translate(-125px,0)",
      // transitionDuration: "0.5s",
    },
    enter: {
      opacity: 1,
      transform: "translate(0,0)",
      // transitionDuration: "0.5s",
    },
    leave: {
      opacity: 0,
      transform: "translate(150px,-0)",
      // transitionDuration: "0.5s",
    },
  });
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
  ));

  return (
    <div className={props.class}>
      <Suspense fallback={<Loading />}>
        {/* {transitions.map(({ item, props, key }) => ( */}
          {/* <animated.div key={key} style={props}> */}
          {/* <AnimatedSwitch/> */}
          {/* <TransitionGroup>
            <CSSTransition> */}

            <Switch >
              <div className="profileRightContent position-absolute w-100">
                <Route exact path={`/MyProfile/BasicDetails/`}>
                  <BasicDetails person={props.person} />
                </Route>
                <Route exact path={`/MyProfile/RecentViews/`}>
                  <RecentViews recentlyViewed={props.recentlyViewed} />
                </Route>
                <Route exact path={`/MyProfile/BlogPosts/`}>
                  <BlogPosts postsUser={props.postsUser} />
                </Route>
                <Route exact path={`/MyProfile/FavouriteItems/`}>
                  <FavouriteItems favouriteItems={props.favouriteItems} />
                </Route>
                <Route exact path={`/MyProfile/BookmarkedPosts/`}>
                  <BookmarkedPosts bookmarkPosts={props.bookmarkPosts} />
                </Route>
                <Route exact path={`/MyProfile/Settings/`}>
                  <Settings />
                </Route>
              </div>
            </Switch>
            {/* </CSSTransition>
          </TransitionGroup> */}
          {/* </animated.div> */}
        {/* ))} */}
      </Suspense>
    </div>
  );
}
