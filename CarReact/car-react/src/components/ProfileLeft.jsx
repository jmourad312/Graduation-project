import React from "react";
import Image from "./Image";
import profilePic from "../assets/Images/pexels-photo-220453.jpeg";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "../store/actions";

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
      <div className="mt-3">
        <div className="text-light" style={{fontSize:"1.5rem"}}>
          <p>{props.person ? props.person.firstName : "Loading"}</p>
          <p>{props.person ? props.person.email : "Loading"}</p>
        </div>
        {/* <div className="mt-3 button raise">
          <Link to={`/MyProfile/BasicDetails`}>Basic details</Link>
        </div> */}
        <p className="mt-3 button raise">
          <Link to={`/MyProfile/RecentViews`} onClick={handleClick}>Recently viewed</Link>
        </p>
        <p className="mt-3 button raise">
          <Link to={`/MyProfile/BlogPosts`} onClick={handleClick}>My blog posts</Link>
        </p>
        <p className="mt-3 button fill">
          <Link to={`/MyProfile/FavouriteItems`} onClick={handleClick}>Favourite items</Link>
        </p>
        <p className="mt-3 button pulse">
          <Link to={`/MyProfile/BookmarkedPosts`} onClick={handleClick}>Bookmarked posts</Link>
        </p>
        <p className="mt-3 button up">
          <Link to={`/MyProfile/Settings`} onClick={handleClick}>Settings</Link>
        </p>
      </div>
    </div>
  );
}
