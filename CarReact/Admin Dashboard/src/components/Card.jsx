import React, { useEffect, useState } from 'react'
import { Button2 } from "../components/Button";
import { instance } from "../network/axiosConfig";
import { Button, Col, Form, Modal } from "react-bootstrap";

export function Card(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <div className="col-4 productComp mb-2 blog-post">
        <section className="cards">
          <article className="card card--1">
            <div
              className="card__img"
              style={{ background: `url(${props.image})` }}
            ></div>
            <p className="card_link">
              <div
                className="card__img--hover"
                style={{ background: `url(${props.image})` }}
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
              <button
                className="btn btn-info mx-auto m-2"
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={props}
                style={{ zIndex: "100", width: "100%" }}
              >
                <i style={{ fontSize: "20px" }} className="fas fa-pen"></i>
              </button>

              <Button variant="primary"                 style={{ zIndex: "100", width: "100%" }}
 onClick={handleShow}>
                Launch demo modal
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
