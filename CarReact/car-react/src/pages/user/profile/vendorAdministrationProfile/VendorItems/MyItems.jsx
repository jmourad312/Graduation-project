import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemEntry from "../../../../../components/ItemEntry";
import Loading from "../../../../../components/Loading";
import ProductFilterVendor from "../../../../../components/productFilterVendor";

import {
  getVendorsItemsAction,
  filterCarModel,
  filterCarBrand,
} from "../../../../../store/actions";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import cars2 from "../../../../../assets/js/cars2";
import cars3 from "../../../../../assets/js/cars3";

export default function MyItems(props) {
  const vendorItems = useSelector((state) => state.vendorItems.Data);
  const stateRedux = useSelector((state) => state);

  const dispatch = useDispatch();
  const getItems = () => {
    // console.log(vendorItems);
    dispatch(getVendorsItemsAction());
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [stateDisabled, setStateDisabled] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    image: "",
    carBrand: "",
    carModel: "",
    price: 0,
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "carBrand") {
      if (value === "") {
        setStateDisabled(false);
      }
      else{
        setStateDisabled(true);
        dispatch(filterCarModel(value));
      }
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
    closeModal();
  };

  useEffect(() => {
    dispatch(filterCarBrand());
  }, []);

  const createItem = (item) => {
    return (
      <ItemEntry
        key={item._id}
        id={item._id}
        image={item.image}
        name={item.name}
        description={item.description}
        price={item.price}
        carBrand={item.carBrand}
        carModel={item.carModel}
      />
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <ProductFilterVendor className="ProductFilter"/>
      <motion.div
        className="FavouriteItems"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div className="container">
          <Button
            variant="dark"
            style={{ margin: "10px" }}
            onClick={() => openModal()}
          >
            <i class="far fa-plus-square"></i>
            {" Add"}
          </Button>
          {/* <AddItem /> */}
          <div className="row">
            {vendorItems ? vendorItems.map(createItem) : <Loading />}
          </div>
        </div>

        <Modal show={isOpen} onHide={!isOpen}>
          <Modal.Header>
            <Modal.Title>Add your product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product Name"
                  name="name"
                  id="name"
                  value={inputValue.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter Product Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  name="description"
                  id="description"
                  value={inputValue.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    id="price"
                    value={inputValue.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    defaultValue="Choose..."
                    as="select"
                    name="carBrand"
                    id="carBrand"
                    value={inputValue.carBrand}
                    onChange={handleChange}
                  >
                    <option key={"no-value"} value="">
                      Choose brand
                    </option>
                    ;
                    {stateRedux.brand.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
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
                    name="carModel"
                    id="carModel"
                    value={inputValue.carModel}
                    onChange={handleChange}
                    disabled={!stateDisabled}
                  >
                    <option key={"no-value"} value="">
                      Choose model
                    </option>
                    {stateRedux.model.map((item, index) => {
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
            <Button variant="dark" type="button" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="danger" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
}
