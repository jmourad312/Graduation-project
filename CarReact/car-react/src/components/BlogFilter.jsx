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

export default function BlogFilter(props) {
  const [state, setState] = useState({
    model: "",
    brand: "",
  });

  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCarBrand());
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "brand":
        setState({
          ...state,
          brand: event.target.value,
        });
        dispatch(resultFromFilter({ brand: event.target.value }));
        dispatch(filterCarModel(event.target.value));

        break;
      case "model":
        setState({
          ...state,
          model: event.target.value,
        });
        dispatch(
          resultFromFilter({ brand: state.brand, model: event.target.value })
        );

        break;
    }
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
    console.log(event.target.files[0]);
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
        <select
          value={state.brand}
          name="brand"
          onChange={handleChange}
          className="custom-select custom-select-lg mb-3"
        >
          {stateRedux.brand.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={state.model}
          disabled={!state.brand}
          name="model"
          onChange={handleChange}
          className="custom-select custom-select-sm mb-3"
        >
          {stateRedux.model.map((item, index) => (
            <option value={item.model} key={index}>
              {item.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button variant="info" onClick={openModal}>
          Add new Blog
        </Button>
      </div>
      <Modal show={isOpen} onHide={!isOpen}>
        <Modal.Header>
          <Modal.Title>Add a blog post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blog Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
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

            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
