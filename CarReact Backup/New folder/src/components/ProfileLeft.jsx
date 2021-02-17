import React from "react";
import Image from "./Image";
import profilePic from "../assets/Images/pexels-photo-220453.jpeg";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "../store/actions";
import {useTranslation} from "react-i18next";

export default function ProfileLeft(props) {
  const user = useSelector((state) => state.user.Data);
  const className = useSelector((state) => state.className);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setClass("profileright2"));
    setTimeout(() => {
      dispatch(setClass("profileright"));
    }, 700);
  };
  const {t, i18n} = useTranslation();
  return (
    <div className={props.class}>
      <div style={{ height: "200px" }}>
        {/* <Image
          src={profilePic}
          alt="profile picture"
          height="100%"
          width="100%"
        /> */}
        <ProfilePicture image={props.image} />
      </div>
      <div className="mt-2 mr-2">
        <div className="text-light" style={{fontSize:"1.5rem"}}>
          <p>{props.person ? props.person.firstName : "Loading"}</p>
          <hr style={{borderColor:"grey"}}/>
          <p>{props.person ? props.person.email : "Loading"}</p>
        </div>
        {/* <div className="mt-3 button raise">
          <Link to={`/MyProfile/BasicDetails`}>Basic details</Link>
        </div> */}
        <p className=" button raise" style={{fontSize:"20px",fontWeight:"700",width:"100%"}}>
          <Link to={`/MyProfile/RecentViews`} onClick={handleClick}>{t("ProfileLeft.RecentlyViewed")}</Link>
        </p>
        <p className=" button raise" style={{fontSize:"20px",fontWeight:"700",width:"100%"}}>
          <Link to={`/MyProfile/BlogPosts`} onClick={handleClick}>{t("ProfileLeft.Myblogposts")}</Link>
        </p>
        <p className=" button fill" style={{fontSize:"20px",fontWeight:"700",width:"100%"}}>
          <Link to={`/MyProfile/FavouriteItems`} onClick={handleClick}>{t("ProfileLeft.FavouriteItems")}</Link>
        </p>
        <p className=" button pulse" style={{fontSize:"20px",fontWeight:"700",width:"100%"}}>
          <Link to={`/MyProfile/BookmarkedPosts`} onClick={handleClick}>{t("ProfileLeft.BookmarkedBlogs")}</Link>
        </p>
        <p className=" button up" style={{fontSize:"20px",fontWeight:"700",width:"100%"}}>
          <Link to={`/MyProfile/Settings`} onClick={handleClick}>{t("ProfileLeft.Settings")}</Link>
        </p>
      </div>
    </div>
  );
}
