import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductDetails, setProductId } from "../store/actions";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import cars2 from "../assets/js/cars2";
import cars3 from "../assets/js/cars3";

export default function ItemEntry(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const productDetails = useSelector((state) => state.productDetails.Data);

  // const getProduct = async (params) => {
  //   await dispatch(getProductDetails(params));
  //   // console.log(productDetails);
  //   openModal()
  //   setNewValue()
  // };
  // const setNewValue = () =>{
  //   setEditValue({
  //     name : productDetails.name
  //   });
  // }

  const [stateDisabled, setStateDisabled] = useState(false);
  const [editValue, setEditValue] = useState({
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
      setStateDisabled(true);
    }
    setEditValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleImageChange = (event) => {
    setEditValue((previous) => {
      return {
        ...previous,
        image: event.target.files[0],
      };
    });
  };

  const dispatch = useDispatch();
  let history = useHistory();
  const handleClick = (params) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID", params);
    history.push(`/ProductDetails/${props.id}`);
  };

  const handleDelete = (params) => {
    axios
      .delete(`http://localhost:3000/vendor/deleteItem/${params}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("success");
        } else {
          console.log("fail");
          console.log(req.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (params) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("image", editValue.image);
    formData.append("name", editValue.name);
    formData.append("description", editValue.description);
    formData.append("carBrand", editValue.carBrand);
    formData.append("carModel", editValue.carModel);
    formData.append("price", editValue.price);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .put(
        `http://localhost:3000/vendor/updateItem/${params}`,
        formData,
        config
      )
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          // props.history.push("/MyProfile");
          closeModal();
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="col-3">
      <div className="card" style={{ width: "150px" }}>
        <img
          className="card-img-top"
          src={props.image}
          alt="Card"
          style={{ height: "150px", width: "146px" }}
        />
        <div className="card-body">
          <h4 className="card-title text-truncate">{props.name}</h4>
          <p className="card-text text-truncate">{props.description}</p>
          <p className="card-text text-truncate">{props.price}</p>
          <strong>
            <i className="badge badge-light text-truncate">{props.carBrand}</i>{" "}
            <i className="badge badge-light text-truncate">{props.carModel}</i>
          </strong>
          <br/>
          <button
            className="btn btn-success"
            onClick={() => handleClick(props.id)}
          >
            <i class="fas fa-info-circle"></i>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(props.id)}
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <Button variant="info" onClick={openModal}>
            <i class="fas fa-edit"></i>
          </Button>

          <Modal show={isOpen} onHide={!isOpen}>
            <Modal.Header>
              <Modal.Title>Edit your product</Modal.Title>
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
                    value={editValue.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    name="description"
                    id="description"
                    value={editValue.description}
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
                      value={editValue.price}
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
                      value={editValue.carBrand}
                      onChange={handleChange}
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
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      defaultValue="Choose..."
                      as="select"
                      name="carModel"
                      id="carModel"
                      value={editValue.carModel}
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
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

              </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => handleSubmit(props.id)}
                >
                  Submit
                </Button>
              <Button variant="danger" onClick={closeModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
