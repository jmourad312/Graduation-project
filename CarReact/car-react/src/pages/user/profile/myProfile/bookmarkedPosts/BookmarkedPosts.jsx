import axios from "axios";
import React from "react";
import Button from "../../../../../components/Button";

export default function BookmarkedPosts() {
  const clickHandler = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: "http://localhost:3000/user/auth/google",
    });
  };
  return (
    <div>
      <button onClick={clickHandler}>Click me</button>
    </div>
  );
}
