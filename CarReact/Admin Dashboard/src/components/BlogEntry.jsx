import React, { useEffect, useState } from "react";
import { Button2 } from "../components/Button";
import { instance } from "../network/axiosConfig";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { InputField } from "../components/InputField";

export default function BlogEntry(props) {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [state, setState] = useState({
    title: props.cardTitle,
    body: props.cardContent,
    brand: props.cardBrand,
    model: props.cardModel,
    images: [],
    message: props.dataItem.reportPosts,
  });

  const [id, setId] = useState({
    idperson: props.idperson,
    idcar: props.id,
  });

  const [stateAxios, setStateAxios] = useState({
    Brand: [],
    Model: [],
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
    formData.append("title", state.title);
    formData.append("body", state.body);
    formData.append("brand", state.brand);
    formData.append("model", state.model);

    const config = {
      headers: { Authorization: localStorage.getItem("Authorization") },
    };
    instance
      .put(`/user/updatePost/${id.idcar}/${id.idperson}`, formData, config)
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

  const handleShowMessage = () => setShowMessage(true);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const tiggreValue = (e) => {
    const { value, name } = e.target;
    if (name == "brand") {
      getModel(value);
    }
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleImageChange = (event) => {
    setState({
      ...state,
      images: event.target.files,
    });
  };

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4 mb-4 blog-post">
        <section className="cards">
          <article className="card card--1">
            <div className="card__info-hover">
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time">{props.date}</span>
              </div>
            </div>
            <div
              className="card__img"
              style={{ background: `url(${props.imgSrc})` }}
            ></div>
            <p className="card_link">
              <div
                className="card__img--hover"
                style={{ background: `url(${props.imgSrc})` }}
              ></div>
            </p>
            <div className="card__info">
              <h3 className="card__title text-truncate">{props.cardTitle}</h3>
              <span className="card__by" style={{ fontSize: "20px" }}>
                by{" "}
                <span className="card__author" title="author">
                  {props.userName}
                </span>
              </span>
              <br />
              <small>
                <i className="badge badge-dark" style={{ fontSize: "15px" }}>
                  {props.cardBrand}
                </i>
                <i
                  className="badge badge-dark ml-1"
                  style={{ fontSize: "15px" }}
                >
                  {props.cardModel}
                </i>
              </small>
              <br />
              {props.dataItem.reportPosts.length > 0 && (
                <Button
                  variant="danger"
                  className="mt-1"
                  style={{ fontSize: "20px" }}
                  onClick={handleShowMessage}
                >
                  {props.dataItem.reportPosts.length} Reports
                </Button>
              )}
            </div>
            <div className="row">
              <div className="col-6">
                <Button
                  variant="primary"
                  className="btn btn-info"
                  style={{
                    zIndex: "100",
                    width: "120px",
                    marginBottom: "5px",
                    marginLeft: "5px",
                  }}
                  onClick={handleShow}
                >
                  <i style={{ fontSize: "20px" }} className="fas fa-pen"></i>
                </Button>
              </div>
              <div className="col-6">
                <Button2
                  className="btn btn-danger"
                  style={{ marginRight: "10px" }}
                  parameter={props.dataItem}
                  key={props.id}
                  handelClick={props.delete}
                  name={
                    <i
                      style={{ fontSize: "20px" }}
                      className="fas fa-trash"
                    ></i>
                  }
                ></Button2>
              </div>
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
            value={state.title}
            type="text"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="title"
          />
          <InputField
            value={state.body}
            type="text"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="body"
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
            value={state.brand}
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="brand"
          />
          <InputField
            disabled={true}
            value={state.model}
            type="textarea"
            handleChange={(e) => tiggreValue(e)}
            className="form-control"
            name="model"
          />

          <h3>Change Brand and Model</h3>
          <select
            value={state.brand}
            name="brand"
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
            value={state.model}
            name="model"
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
          <Button variant="primary" onClick={editProduct}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Reports message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.message.map((item, index) => {
            return (
              <p>
                {index + 1}: {item.message}
              </p>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
