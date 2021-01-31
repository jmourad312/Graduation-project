import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';
import BasicDetails from '../pages/user/profile/myProfile/basicDetails/BasicDetails';
import BlogPosts from '../pages/user/profile/myProfile/blogPosts/BlogPosts';
import BookmarkedPosts from '../pages/user/profile/myProfile/bookmarkedPosts/BookmarkedPosts';
import FavouriteItems from '../pages/user/profile/myProfile/favouriteItems/FavouriteItems';
import RecentViews from '../pages/user/profile/myProfile/recentViews/RecentViews';
import Settings from '../pages/user/profile/myProfile/settings/Settings';

export default function ProfileRight(props) {
  return (
    <div className={props.class}>
      <Suspense fallback={"Loading"}>
        <Switch>
          <Route path={`/MyProfile/BasicDetails`}>
            <BasicDetails />
          </Route>
          <Route path={`/MyProfile/RecentViews`}>
            <RecentViews />
          </Route>
          <Route path={`/MyProfile/BlogPosts`}>
            <BlogPosts />
          </Route>
          <Route path={`/MyProfile/FavouriteItems`}>
            <FavouriteItems />
          </Route>
          <Route path={`/MyProfile/BookmarkedPosts`}>
            <BookmarkedPosts />
          </Route>
          <Route path={`/MyProfile/Settings`}>
            <Settings />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
