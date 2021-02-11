import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  filterCarModel,
  filterCarBrand,
  resultFromFilter,
} from "../store/actions";
import { Button, Col, Form, Modal } from "react-bootstrap";
import cars3 from "../assets/js/cars3";
import cars2 from "../assets/js/cars2";
import { Pagination } from "./Pagination";
import Loading from "./Loading";

export default function BlogFilter(props) {
  const [filterState, setFilterState] = useState({
    model: "",
    brand: "",
    search: "",
  });
  const [itemsInDB, setItemsInDB] = useState(0);
  const blogs = useSelector((state) => state.blogs.TotalItem);
  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCarBrand());
    dispatch(resultFromFilter({}, 0));
  }, []);

  useEffect(() => {
    localStorage.setItem("TotalBlogs", blogs);
    setItemsInDB(localStorage.getItem("TotalBlogs"));
  }, [blogs]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      dispatch(filterCarModel(value));
      setFilterState((previous) => {
        return {
          ...previous,
          model: "",
        };
      });
    }
    setFilterState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });

    //   switch (event.target.name) {
    //     case "brand":
    //       setState({
    //         ...state,
    //         brand: event.target.value,
    //       });
    //       // dispatch(resultFromFilter({ brand: event.target.value }));
    //       // dispatch(filterCarModel(event.target.value));
    //       console.log(state);

    //       break;
    //     case "model":
    //       setState({
    //         ...state,
    //         model: event.target.value,
    //       });
    //       // dispatch(
    //       //   resultFromFilter({ brand: state.brand, model: event.target.value })
    //       // );
    //       console.log(state);

    //       break;
    //   }
  };
  const handleClick = (params) => {
    console.log(params);
    dispatch(resultFromFilter(filterState, params));
    // dispatch(filterCarModel(event.target.value));
  };
  const handleSearchClick = () => {
    dispatch(resultFromFilter(filterState, 0));
  };
  const functionGdeda = (e) => {
    console.log(filterState);
    handleChange(e);
    console.log(filterState);
    // handleSearchClick();
  };

  //-------------ADD BLOG ----------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [stateDisabled, setStateDisabled] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    image: "",
    brand: "",
    model: "",
  });
  const handleImageChange = (event) => {
    console.log(event.target.files);
    setInputValue((previous) => {
      return {
        ...previous,
        image: event.target.files[0],
        // loaded: 0,
      };
    });
  };

  const handleInputChange = (event) => {
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
    closeModal();
    setInputValue("");
  };
  return (
    <div className={props.class}>
      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3">Filter Options</h4>
      </div>

      <div className="mb-5">
        <div className="input-group mb-3">
          <input
            type="text"
            name="search"
            onChange={handleChange}
            value={filterState.search}
            className="form-control"
            placeholder="Search"
          />
          <div className="input-group-append">
            <button
              className="btn"
              style={{
                background:
                  "linear-gradient(to right,  rgb(197, 191, 191),  rgb(88, 84, 84) )",
              }}
              onClick={handleSearchClick}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        <select
          value={filterState.brand}
          name="brand"
          onChange={handleChange}
          // onSelect={handleChange}
          className="custom-select custom-select-md mb-3"
        >
          <option value="" key="no-value">
            choose Brand
          </option>
          {stateRedux.brand.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={filterState.model}
          disabled={!filterState.brand}
          name="model"
          onChange={handleChange}
          // onSelect={handleChange}
          className="custom-select custom-select-sm mb-3"
        >
          <option value="" key="no-value">
            choose Model
          </option>
          {stateRedux.model.map((item, index) => (
            <option value={item.model} key={index}>
              {item.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button variant="dark" onClick={handleSearchClick}>
          Filter
        </Button>
      </div>
      <div>
        {localStorage.getItem("UserID") !== null && (
          <Button variant="info" onClick={openModal}>
            Add new Blog
          </Button>
        )}
      </div>
      <div
        className="pagination"
        style={{
          zIndex: "100",
          position: "fixed",
          right: "300px",
          bottom: "-5%",
        }}
      >
        {blogs && (
          <Pagination
            NumberOfItemsInDB={itemsInDB}
            NumberToShow={6}
            handleClick={handleClick}
          />
        )}
      </div>
      <Modal show={isOpen} onHide={!isOpen}>
        <Modal.Header>
          <Modal.Title>Add a blog post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Blog title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                id="title"
                value={inputValue.title}
                onChange={handleInputChange}
                required
                maxLength="50"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blog Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                multiple
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blog Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Blog description"
                name="body"
                id="body"
                value={inputValue.body}
                onChange={handleInputChange}
                required
                maxLength="150"
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="brand"
                  id="brand"
                  value={inputValue.brand}
                  onChange={handleInputChange}
                  required
                >
                  {cars2.map((item, index) => {
                    return (
                      <option key={index} value={item.make}>
                        {item.make}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Model</Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="model"
                  id="model"
                  value={inputValue.model}
                  onChange={handleInputChange}
                  disabled={!stateDisabled}
                  required
                >
                  {cars3.map((item, index) => {
                    return (
                      <option key={index} value={item.model}>
                        {item.model}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Submit
          </Button>

          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
