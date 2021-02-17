import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import $, { event } from "jquery";
import cars2 from "../assets/js/cars2";
import cars3 from "../assets/js/cars3";

import { useDispatch, useSelector } from "react-redux";

export default function AddBlog() {
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
  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const [stateDisabled, setStateDisabled] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    image: "",
    brand: "",
    model: "",
  });

  const [inputFilter, setInputFilter] = useState({
    brand: "",
    model: "",
  });

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setInputValue((previous) => {
      return {
        ...previous,
        image: event.target.files[0],
        // loaded: 0,
      };
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      setStateDisabled(true);
    }
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  // const handleFilterChange = (event) => {
  //   const { value, name } = event.target;
  //   if (name === "brand") {
  //     setStateDisabled(true);
  //     // dispatch(resultFromFilter({ brand: value }));
  //     dispatch(filterCarModel(value));
  //   } else if (name === "model") {
  //     // dispatch(resultFromFilter({ brand: inputFilter.brand, model: value }));
  //   }
  //   setInputFilter((previous) => {
  //     return {
  //       ...previous,
  //       [name]: value,
  //     };
  //   });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    const formData = new FormData();
    formData.append("image", inputValue.image);
    formData.append("title", inputValue.title);
    formData.append("body", inputValue.body);
    formData.append("brand", inputValue.brand);
    formData.append("model", inputValue.model);
    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    axios
      .post("http://localhost:3000/user/addPost", formData, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          // props.history.push("/MyProfile");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(inputValue);
    // setInputValue("");
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
                req={false}
              />
            </div>
            <div className="mb-3">
              <label for="formFileMultiple" className="form-label">
                Multiple files input example
              </label>
              <input
                type="file"
                name="image"
                // value={inputValue.image}
                onChange={handleImageChange}
              ></input>
              {/* <Input
                class="form-control"
                type="file"
                name="images"
                id="formFileMultiple"
                // value={inputValue.image}
                onChange={handleImageChange}
              /> */}
            </div>
            <div class="form-group">
              <label for="content">Blog Content</label>
              <textarea
                class="form-control"
                name="body"
                id="content"
                rows="3"
                placeHolder="Type the blog information"
                value={inputValue.body}
                onChange={handleChange}
                // required
              ></textarea>
            </div>

            {/* --------------------------------BRAND---------------------------- */}

            {/* <label for="brand">Choose a brand:</label>
            <input
              list="brandList"
              id="brand"
              value={inputValue.brand}
              onChange={()=> handleChange}
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
                  // required
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

              {/* --------------------------------MODEL---------------------------- */}
              <div className="col-6">
                <select
                  className="custom-select"
                  name="model"
                  onChange={handleChange}
                  disabled={!stateDisabled}
                >
                  {/* <option selected>Open this select menu</option> */}
                  {cars3.map((item, index) => {
                    return (
                      <option key={index} value={item.model}>
                        {item.model}
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
