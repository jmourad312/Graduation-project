import React, { Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation, __RouterContext } from "react-router";

import BasicDetails from "../pages/user/profile/myProfile/basicDetails/BasicDetails";
import BlogPosts from "../pages/user/profile/myProfile/blogPosts/BlogPosts";
import BookmarkedPosts from "../pages/user/profile/myProfile/bookmarkedPosts/BookmarkedPosts";
import FavouriteItems from "../pages/user/profile/myProfile/favouriteItems/FavouriteItems";
import RecentViews from "../pages/user/profile/myProfile/recentViews/RecentViews";
import Settings from "../pages/user/profile/myProfile/settings/Settings";
import Loading from "./Loading";
import { useTransition, animated } from "react-spring";

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

  return (
    <div className={props.class}>
      <Suspense fallback={<Loading />}>
        {/* {transitions.map(({ item, props, key }) => ( */}
<<<<<<< HEAD
         {/* <animated.div key={key} style={props}> */}
         {/* location={item} */}
             <Switch >
=======
          {/* <animated.div key={key} style={props}> */}
            <Switch >
>>>>>>> ad90ffd534b0eab6e3212f7c78cf1ca51d9f931b
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
<<<<<<< HEAD
           {/* </animated.div> */}
=======
          {/* </animated.div> */}
>>>>>>> ad90ffd534b0eab6e3212f7c78cf1ca51d9f931b
        {/* ))} */}
      </Suspense>
    </div>
  );
}
