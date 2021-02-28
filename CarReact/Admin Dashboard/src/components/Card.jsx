import React, { useEffect, useState } from "react";
import { Button2 } from "../components/Button";
import { instance } from "../network/axiosConfig";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { InputField } from "../components/InputField";

export function Card(props) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    name: props.title,
    description: props.description,
    price: Number(props.price),
    carBrand: props.brand,
    carModel: props.model,
    images: [],
  });
  const [id, setId] = useState({
    idperson: props.idperson,
    idcar: props.id,
  });
  const [stateAxios, setStateAxios] = useState({
    Brand: [],
    Model: [],
    Collection: [],
  });

  const getBrand = async () => {
    try {
      const res = await instance.get(`admin/getBrand`);
      console.log(res);
      await setStateAxios({
        ...stateAxios,
        Brand: res.data.Data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getModel = async (parameter) => {
    console.log(state);
    try {
      const res = await instance.get(`admin/getModel/${parameter}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      setStateAxios({
        ...stateAxios,
        Model: res.data.Data[0].carModel,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const editProduct = () => {
    setShow(false);

    const formData = new FormData();
    for (var x = 0; x < state.images.length; x++) {
      formData.append("images", state.images[x]);
    }
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("carBrand", state.carBrand);
    formData.append("carModel", state.carModel);
    formData.append("price", state.price);

    const config = {
      headers: { Authorization: localStorage.getItem("Authorization") },
    };
    instance
      .put(`/vendor/updateItem/${id.idcar}/${id.idperson}`, formData, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = () => setShow(true);

  const tiggreValue = (e) => {
    const { value, name } = e.target;
    if (name == "carBrand") {
      getModel(value);
    }
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
    if (name == "price") {
      setState({ ...state, price: +e.target.value });
    }
  };

  const handleImageChange = (event) => {
    setState({
      ...state,
      images: event.target.files,
    });
  };

  return (
    <>
      <div className="col-3 productComp mb-2 blog-post">
        <section className="cards">
          <article className="card card--1">
            <div
              className="card__img"
              style={{ background: `url(${props.images})` }}
            ></div>
            <p className="card_link">
              <div
                className="card__img--hover"
                style={{ background: `url(${props.images})` }}
              ></div>
            </p>
            <div className="card__info">
              <h4 className="card__title text-truncate">{props.title}</h4>
              <span
                className="price"
                style={{
                  fontWeight: "600",
                  color: "goldenrod",
                  fontSize: "25px",
                }}
              >
                {props.price} LE
              </span>{" "}
              <br />
              <p className="text-truncate">{props.description}</p>
              <span className="card__by">
                by{" "}
                <span className="card__author" title="author">
                  {props.name}
                </span>
              </span>
              <br />
              <small>
                <i className="badge badge-dark">{props.brand}</i>
                <i className="badge badge-dark">{props.model}</i>
              </small>
            </div>

            <div className="d-flex">
              <Button
                variant="primary"
                className="btn btn-info mx-auto m-2"
                style={{ zIndex: "100", width: "40%" }}
                onClick={handleShow}
              >
                <i style={{ fontSize: "20px" }} className="fas fa-pen"></i>
              </Button>

              <Button2
                className="btn btn-danger mx-auto m-2"
                parameter={props.dataItem}
                key={props.id}
                handelClick={props.delete}
                name={
                  <i style={{ fontSize: "20px" }} className="fas fa-trash"></i>
                }
              ></Button2>
            </div>
          </article>
        </section>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField
            value={state.name}
            type="text"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="name"
          />
          <InputField
            value={state.price}
            type="text"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="price"
          />
          <InputField
            value={state.description}
            type="textarea"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="description"
          />
          <input
            type="file"
            name="images"
            id="image"
            className="form-control"
            onChange={(e) => handleImageChange(e)}
            multiple
          />
          <InputField
            disabled={true}
            value={state.carBrand}
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="Brand"
          />
          <InputField
            disabled={true}
            value={state.carModel}
            type="textarea"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="Model"
          />

          <h3>Change Brand and Model</h3>
          <select
            value={state.carBrand}
            name="carBrand"
            onChange={(e) => tiggreValue(e)}
            className="custom-select custom-select-md mb-3"
          >
            <option value="" key="no-value">
              choose Brand
            </option>
            {stateAxios.Brand.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={state.carModel}
            name="carModel"
            onChange={(e) => tiggreValue(e)}
            className="custom-select custom-select-md mb-3"
          >
            <option value="" key="no-value">
              choose Model
            </option>
            {stateAxios.Model.map((item, index) => (
              <option value={item.model} key={index}>
                {item.model}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
