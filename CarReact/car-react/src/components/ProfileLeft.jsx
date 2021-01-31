import React from "react";
import Image from "./Image";
import profilePic from "../assets/Images/pexels-photo-220453.jpeg";
import { Link } from "react-router-dom";

export default function ProfileLeft(props) {

  return (
    <div className={props.class}>
    <div style={{height:"300px"}}>
      <Image
        src={profilePic}
        alt="profile picture"
        height="100%"
        width="100%"
      />
    </div>
      <div className="mt-3" >
        <div className="mt-3 button raise">
          <Link to={`/MyProfile/BasicDetails`}>Basic details</Link>
        </div>
        <p className="mt-3 button raise">
          <Link to={`/MyProfile/RecentViews`}>Recently viewed</Link>
        </p>
        <p className="mt-3 button raise">
          <Link to="/MyProfile/BlogPosts">My blog posts</Link>
        </p>
        <p className="mt-3 button fill">
          <Link to="/MyProfile/FavouriteItems">Favourite items</Link>
        </p>
        <p className="mt-3 button pulse">
          <Link to="/MyProfile/BookmarkedPosts">Bookmarked posts</Link>
        </p>
        <p className="mt-3 button up">
          <Link to="/MyProfile/Settings">Settings</Link>
        </p>
      </div>
    </div>
  );
}
