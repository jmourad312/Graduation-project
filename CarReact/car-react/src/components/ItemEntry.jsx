import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductDetails, setProductId,  filterCarModel,filterCarBrand } from "../store/actions";
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
  useEffect(() => {
    dispatch(filterCarBrand());
  }, []);
  return (
    <div className="col-3">
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

        <section class="cards" >
          <article class="card card--1" >
            <div class="card__img" style={{ background: `url(${props.images[0]})` }} ></div>
            <p class="card_link">
              <div class="card__img--hover" style={{ background: `url(${props.images[0]})` }} onClick={() => handleClick(props.id)} ></div>
            </p>
            <div class="card__info">
              <h4 class="card__title text-truncate">{props.name}</h4>
              <h6 className="card-text text-truncate">
              {props.description}
              </h6>
              <h5 className="card-text" style={{ color: "yellow" }}>
                <i class="fas fa-coins"></i> {props.price}
              </h5>
              {/* <span class="card__by">by <span class="card__author" title="author">{props.userName}</span></span>
                        <br /> */}
              <small>
                <i className="badge badge-dark">{props.carBrand}</i>
                <i className="badge badge-dark">{props.carModel}</i>
              </small>
            </div>
            <div className="row">
              <div className="col-6">
          <button className="btn btn-danger" style={{padding:"2px",width:"90%",height:"45px",marginLeft:"5px",marginBottom:"5px"}} onClick={() => handleDelete(props.id)}>
            <i class="fas fa-trash-alt"></i>
          </button>
              </div>
              <div className="col-6">
          <Button 
          variant="dark" 
          style={{padding:"2px",width:"90%",height:"45px",marginLeft:"5px"}} onClick={openModal}>
            <i class="fas fa-pen"></i>
          </Button>

              </div>
          </div>
          </article>
        </section>
     



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
                name="images"
                id="image"
                onChange={handleImageChange}
                multiple
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
  );
}
