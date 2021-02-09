import React from "react";
import Image from "./Image";
import profilePic from "../assets/Images/pexels-photo-220453.jpeg";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useSelector } from "react-redux";

export default function ProfileLeft(props) {
  const user = useSelector((state) => state.user.Data);

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
        <div className="text-light" style={{fontSize:"2rem"}}>
          <p>{props.person ? props.person.firstName : "Loading"}</p>
          <p>{props.person ? props.person.email : "Loading"}</p>
        </div>
        {/* <div className="mt-3 button raise">
          <Link to={`/MyProfile/BasicDetails`}>Basic details</Link>
        </div> */}
        <p className="mt-3 button raise">
          <Link to={`/MyProfile/RecentViews`}>Recently viewed</Link>
        </p>
        <p className="mt-3 button raise">
          <Link to={`/MyProfile/BlogPosts`}>My blog posts</Link>
        </p>
        <p className="mt-3 button fill">
          <Link to={`/MyProfile/FavouriteItems`}>Favourite items</Link>
        </p>
        <p className="mt-3 button pulse">
          <Link to={`/MyProfile/BookmarkedPosts`}>Bookmarked posts</Link>
        </p>
        <p className="mt-3 button up">
          <Link to={`/MyProfile/Settings`}>Settings</Link>
        </p>
      </div>
    </div>
  );
}
