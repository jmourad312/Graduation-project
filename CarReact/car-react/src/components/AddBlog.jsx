import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AddBlogsAction } from "../store/actions";
// import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import $ from "jquery";
// import Dropdown2 from "./Dropdown2";
import cars2 from "../assets/js/cars2";
// import 'bootstrap';
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
    body: "",
    image: "",
    brand: "",
    model: "",
    disabled: false,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      setInputValue({
        disabled:true
      })
    }
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
                req={true}
              />
            </div>
            <div className="mb-3">
              <label for="formFileMultiple" className="form-label">
                Multiple files input example
              </label>
              <input
                className="form-control"
                type="file"
                name="image"
                id="formFileMultiple"
                multiple
              />
            </div>
            <div class="form-group">
              <label for="content">Blog Content</label>
              <textarea
                class="form-control"
                name="body"
                id="content"
                rows="3"
                placeHolder="Type the blog information"
                value={inputValue.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* --------------------------------BRAND---------------------------- */}

            {/* <label for="brand">Choose a brand:</label>
            <input
              list="brandList"
              id="brand"
<<<<<<< HEAD
              value={inputValue.brand}
              onChange={()=> handleChange}
=======
              name="brand"
              onChange={handleChange}
>>>>>>> b593bc64e38044dd3636dfcb4d73d1ad0d254551
            />
            <datalist id="brandList">
              {cars2.map((item, index) => {
                return <option key={index} value={item.make} />;
              })}
            </datalist> */}
            <div className="row">
              <div className="col-6">
                <select
                  className="custom-select"
                  name="brand"
                  onChange={handleChange}
                  required
                >
                  {/* <option selected>Open this select menu</option> */}
                  {cars2.map((item, index) => {
                    return (
                      <option key={index} value={item.make}>
                        {item.make}
                      </option>
                    );
                  })}
                  {/* <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> */}
                </select>
              </div>

              <div className="col-6">
                <select
                  className="custom-select"
                  name="brand"
                  onChange={handleChange}
                  disabled={!inputValue.disabled}
                  required
                >
                  {/* <option selected>Open this select menu</option> */}
                  {cars2.map((item, index) => {
                    return (
                      <option key={index} value={item.make}>
                        {item.make}
                      </option>
                    );
                  })}
                  {/* <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> */}
                </select>
              </div>
            </div>
            {/* <select
              className="custom-select"
              name="brand"
              onChange={handleChange}
            >
              <option selected>Open this select menu</option>
              {cars2.map((item, index) => {
                return (
                  <option key={index} value={item.make}>
                    {item.make}
                  </option>
                );
              })}
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select> */}

            {/* --------------------------------MODEL---------------------------- */}

            {/* <label for="model">Choose a model:</label>
            <input
              list="modelList"
              id="model"
              name="model"
              onChange={handleChange}
            />
            <datalist id="modelList">
              {cars2.map((item, index) => {
                return <option key={index} value={item.make} />;
              })}
            </datalist> */}
            <hr />
            <button type="submit" for="modal" className="btn btn-success">
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
