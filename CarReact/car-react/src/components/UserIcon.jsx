import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function UserIcon() {
  const user = useSelector((state) => state.user.Data);
    const [classState, setClassState] = useState("userIconMenu");
    const [imageState, setImageState] = useState("userImage");

    const handleHoverEnter = () =>{
        setClassState("userIconMenu userIconMenu2");
        setImageState("userImage userImageHover");
    }
    const handleHoverLeave = () => {
      setClassState("userIconMenu");
        setImageState("userImage");

    };
  return (
    <div className="userIcon" onMouseLeave={handleHoverLeave}>
      <div className={imageState} onMouseEnter={handleHoverEnter}>
        <img
          src={user ? (user.person ? user.person.image : null) : null}
          alt="user profile"
        />
      </div>
      <div className={classState}>
        <p>My profile</p>
        <p>Sign out</p>
      </div>
    </div>
  );
}
