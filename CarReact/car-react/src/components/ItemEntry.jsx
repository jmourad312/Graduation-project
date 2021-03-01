import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductDetails, setProductId,  filterCarModel,filterCarBrand, getVendorsItemsAction, getRelatedProducts } from "../store/actions";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import cars2 from "../assets/js/cars2";
import cars3 from "../assets/js/cars3";
import {useTranslation} from "react-i18next";

export default function ItemEntry(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const productDetails = useSelector((state) => state.productDetails.Data);
  const stateRedux = useSelector((state) => state);

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
    name: props.name,
    description: props.description,
    images: props.images,
    carBrand: props.carBrand,
    carModel: props.carModel,
    price: props.price,
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
        images: event.target.files,
      };
    });
  };

  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (params, name, brand, model) => {
    dispatch(setProductId(params));
    localStorage.setItem("ProductID", params);
    dispatch(getRelatedProducts(params, name, brand, model));
    history.push(`/ProductDetails/${params}`);
  };

  const handleDelete = (params) => {
    axios
      .delete(`http://localhost:3000/vendor/deleteItem/${params}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      })
      .then((req) => {
       
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {dispatch(getVendorsItemsAction({},0))}, 1000);
  };

  const handleSubmit = (params) => {
    // event.preventDefault();
    const formData = new FormData();
    for (var x = 0; x < editValue.images.length; x++) {
      formData.append("images", editValue.images[x]);
    }
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
        
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {dispatch(getVendorsItemsAction({},0))}, 1000);

  };
  useEffect(() => {
    dispatch(filterCarBrand());
  }, []);
  const {t, i18n} = useTranslation();
  return (
    <div className="col-4" style={{ marginBottom: "60px" }}>
      <div className="itemEntry">
        {/* <div className="card" style={{ width: "150px" }}>
        <img className="card-img-top" src={props.image} alt="Card" style={{ height: "100px", width: "146px" }}/>
        <div className="card-body">
          <h4 className="card-title text-truncate">{props.name}</h4>
          <p className="card-text text-truncate">{props.description}</p>
          <p className="card-text text-truncate">{props.price}</p>
          <strong>
            <i className="badge badge-light text-truncate">{props.carBrand}</i>{" "}
            <i className="badge badge-light text-truncate">{props.carModel}</i>
          </strong>
          <br/>
          <div className="row centerbtn">
          <button className="btn btn-info" style={{padding:"2px",width:"30px",height:"30px",marginLeft:"5px"}} onClick={() => handleClick(props.id)}
          >
            <i class="fas fa-info-circle"></i>
          </button>
          <button className="btn btn-danger" style={{padding:"2px",width:"30px",height:"30px",marginLeft:"5px"}} onClick={() => handleDelete(props.id)}>
            <i class="fas fa-trash-alt"></i>
          </button>
          <Button 
          variant="success" 
          style={{padding:"2px",width:"30px",height:"30px",marginLeft:"5px"}} onClick={openModal}>
            <i class="fas fa-pen"></i>
          </Button>
          </div> */}

        <section class="cards">
          <article class="card card--1">
            <div
              class="card__img"
              style={{ background: `url(${props.images[0]})` }}
            ></div>
            <p class="card_link">
              <div
                class="card__img--hover"
                style={{ background: `url(${props.images[0]})` }}
                onClick={() =>
                  handleClick(props.id, props.title, props.brand, props.model)
                }
              ></div>
            </p>
            <div class="card__info">
              <h4 class="card__title text-truncate">{props.name}</h4>
              <h6 className="card-text text-truncate">{props.description}</h6>
              <h5 className="card-text" style={{ color: "#e6ac00" }}>
                <i class="fas fa-coins"></i> {props.price} {t("repeated.LE")}
              </h5>
              {/* <span class="card__by">by <span class="card__author" title="author">{props.userName}</span></span>
                        <br /> */}
              <small>
                <i className="badge badge-dark mr-1">{props.carBrand}</i>
                <i className="badge badge-dark">{props.carModel}</i>
              </small>
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-danger"
                  style={{
                    padding: "2px",
                    width: "90%",
                    height: "40px",
                    marginLeft: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => handleDelete(props.id)}
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <div className="col-6">
                <Button
                  variant="dark"
                  style={{
                    padding: "2px",
                    width: "90%",
                    height: "40px",
                    marginLeft: "5px",
                  }}
                  onClick={openModal}
                >
                  <i class="fas fa-pen"></i>
                </Button>
              </div>
            </div>
          </article>
        </section>

        <Modal show={isOpen} onHide={!isOpen}>
          <Modal.Header>
            <Modal.Title style={{ fontWeight: "700", fontSize: "25px" }}>
              {t("EditProductModal.EditTitle")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                  {t("VendorAddItemModal.ProductName")}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("VendorAddItemModal.ProductNameHolder")}
                  name="name"
                  id="name"
                  value={editValue.name}
                  onChange={handleChange}
                  style={{ fontWeight: "500" }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                  {t("VendorAddItemModal.EnterImage")}
                </Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  id="image"
                  onChange={handleImageChange}
                  multiple
                  style={{ fontWeight: "500" }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                  {t("VendorAddItemModal.ProductDescription")}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("VendorAddItemModal.DescriptionHolder")}
                  name="description"
                  id="description"
                  value={editValue.description}
                  onChange={handleChange}
                  style={{ fontWeight: "500" }}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                    {t("VendorAddItemModal.ItemPrice")}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    id="price"
                    value={editValue.price}
                    onChange={handleChange}
                    style={{ fontWeight: "500" }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                    {t("repeated.Brand")}
                  </Form.Label>
                  <Form.Control
                    defaultValue="Choose..."
                    as="select"
                    name="carBrand"
                    id="carBrand"
                    value={editValue.carBrand}
                    onChange={handleChange}
                    style={{ fontWeight: "500" }}
                  >
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
                  <Form.Label style={{ fontWeight: "700", fontSize: "25px" }}>
                    {t("repeated.Model")}
                  </Form.Label>
                  <Form.Control
                    defaultValue="Choose..."
                    as="select"
                    name="carModel"
                    id="carModel"
                    value={editValue.carModel}
                    onChange={handleChange}
                    disabled={!stateDisabled}
                    style={{ fontWeight: "500" }}
                  >
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
            <Button
              variant="dark"
              type="button"
              onClick={() => handleSubmit(props.id)}
              style={{ fontWeight: "700", fontSize: "20px" }}
            >
              {t("repeated.Submit")}
            </Button>
            <Button
              style={{ fontWeight: "700", fontSize: "20px" }}
              variant="danger"
              onClick={closeModal}
            >
              {t("repeated.Cancel")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
