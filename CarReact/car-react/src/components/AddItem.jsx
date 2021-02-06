import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import $ from "jquery";
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
    name: "",
    description: "",
    image: "",
    carBrand: "",
    carModel: "",
    price:0,
  });
  const [inputFilter, setInputFilter] = useState({
    brand: "",
    model: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "carBrand") {
      setStateDisabled(true);
    }
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
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
    formData.append("name", inputValue.name);
    formData.append("description", inputValue.description);
    formData.append("carBrand", inputValue.carBrand);
    formData.append("carModel", inputValue.carModel);
    formData.append("price", inputValue.price);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .post("http://localhost:3000/vendor/add", formData, config)
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
    setInputValue("");
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
          <h3 className="text-dark">Add new Item</h3>
        </header>
        <article class="content">
          <form method="post" onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="name" className="form-label text-dark">
                Product Name
              </label>
              <Input
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeHolder="Type the subject of your blog here"
                value={inputValue.name}
                onChange={handleChange}
                req={true}
              />
            </div>
            <div className="form-group mb-3">
              <label for="formFileMultiple" className="form-label text-dark">
                Multiple files input example
              </label>
              <input
                className="form-control"
                type="file"
                name="image"
                id="formFileMultiple"
                onChange={handleImageChange}
              />
            </div>
            <div class="form-group">
              <label className="form-label text-dark" for="description">
                Product Description
              </label>
              <textarea
                class="form-control"
                name="description"
                id="description"
                rows="3"
                placeHolder="Type the blog information"
                value={inputValue.description}
                onChange={handleChange}
                required
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
              <div className="col-4">
                <div class="form-group">
                  <label for="price" className="form-label text-dark">
                    Product Price
                  </label>
                  <Input
                    type="number"
                    class="form-control"
                    name="price"
                    id="price"
                    placeHolder="Price"
                    value={inputValue.price}
                    onChange={handleChange}
                    req={true}
                  />
                </div>
              </div>
              <div className="col-4">
                <label for="carBrand" className="form-label text-dark">
                  Brand
                </label>
                <select
                  className="custom-select"
                  id="carBrand"
                  name="carBrand"
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

              {/* --------------------------------MODEL---------------------------- */}
              <div className="col-4">
                <label for="carModel" className="form-label text-dark">
                  Model
                </label>
                <select
                  className="custom-select"
                  id="carModel"
                  name="carModel"
                  onChange={handleChange}
                  disabled={!stateDisabled}
                >
                  {cars3.map((item, index) => {
                    return (
                      <option key={index} value={item.model}>
                        {item.model}
                      </option>
                    );
                  })}
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
