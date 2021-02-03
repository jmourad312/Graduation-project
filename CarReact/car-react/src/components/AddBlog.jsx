import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBlogsAction } from "../store/actions";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import $ from "jquery";
export default function AddBlog() {
  // const blogs = useSelector((state) => state.blogs);
  // const dispatch = useDispatch();
  // const addBlog = (params) => {
  //   dispatch(AddBlogsAction(params));
  // };
  $("form").on("change", ".file-upload-field", function () {
    $(this)
      .parent(".file-upload-wrapper")
      .attr(
        "data-text",
        $(this)
          .val()
          .replace(/.*(\/|\\)/, "")
      );
  });

  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    axios
      .post("http://localhost:3000/user/addPost", inputValue, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("hhkhkhkhk");
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="addBlog">
      <input type="checkbox" id="modal" />
      <p class="blurp">Add new post</p>
      <label for="modal" class="modal-btn">
        <i class="fas fa-plus-circle fa-1x"></i>
      </label>
      {/* <div class="modal-bg"></div> */}
      <label for="modal" class="modal-bg"></label>
      <div class="modal-content">
        <header>
          <h3>Add new post</h3>
        </header>
        <article class="content">
          <form method="post" onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="title">Blog Subject</label>
              <Input
                type="text"
                class="form-control"
                name="title"
                id="title"
                placeHolder="Type the subject of your blog here"
                value={inputValue.title}
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="image">Add image URL</label>
              <Input
                type="file"
                class="form-control"
                name="image"
                id="image"
                value={inputValue.image}
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="content">Blog Content</label>
              <textarea
                class="form-control"
                name="content"
                id="content"
                rows="3"
                placeHolder="Type the blog information"
                value={inputValue.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              ADD
            </button>
            <label for="modal" className="btn btn-danger mt-2">
              Cancel
            </label>
          </form>
        </article>

        <footer>
          {/* <Button type="submit" value="Accept" class="button success" /> */}
          {/* <label for="modal" className="button danger">
            Decline
          </label> */}
        </footer>
      </div>
    </div>
  );
}
