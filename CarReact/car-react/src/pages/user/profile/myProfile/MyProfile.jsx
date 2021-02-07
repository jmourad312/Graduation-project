import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ads from "../../../../components/Ads";

import ProfileLeft from "../../../../components/ProfileLeft";
import ProfileRight from "../../../../components/ProfileRight";
import { getUsersAction, setUserIdAction } from "../../../../store/actions";

export default function MyProfile() {
  const dispatch = useDispatch();
  // const userID = useSelector((state) => state.userID);
  const user = useSelector((state) => state.user.Data);
  dispatch(setUserIdAction(localStorage.getItem("UserID")));

  useEffect(() => {
    dispatch(getUsersAction(localStorage.getItem("UserID")));
    console.log(user ? user.person : "loading");
    console.log(localStorage.getItem("UserID"));
  }, [localStorage.getItem("UserID")]);

  return (
    <div>
      <Ads
        class="pater"
        imgSrc="../../../../assets/Images/13.jpg"
        hoverImgSrc="../../../../assets/Images/14.jpg"
      />
      <section className="myProfile container">
        <div className="row">
          <ProfileLeft
            class="col-3 profileLeft"
            image={user ? (user.person ? user.person.image : "null") : "null"}
          />
          <ProfileRight
            class="col-9 profileright"
            person={user ? user.person : "null"}
            bookmarkPosts={user ? user.bookmarkPosts : "null"}
            favouriteItems={user ? user.favouriteItems : "null"}
            postsUser={user ? user.postsUser : "null"}
            recentlyViewed={user?user.recentlyViewed:"null"}
          />
        </div>
      </section>
    </div>
  );
}
