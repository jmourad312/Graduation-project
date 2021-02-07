import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setProductId } from "../store/actions";
import { Modal, Button } from "react-bootstrap";

export default function ItemEntry(props) {

  const [isOpen, setIsOpen] = useState(false);
  const openModal=()=>{
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  };
  const dispatch = useDispatch();
  let history = useHistory();
  const handleClick = (params) => {
    dispatch(setProductId(params));
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
  return (
    <div className="col-md-6 col-lg-6 col-xl-4 mb-4">
      <div className="card">
        <img className="card-img-top" src={props.image} alt="Card" />
        <div className="card-body">
          <h4 className="card-title">{props.name}</h4>
          <p className="card-text">{props.description}</p>
          <p className="card-text">{props.price}</p>
          <p className="card-text">{props.carBrand}</p>
          <p className="card-text">{props.carModel}</p>

          <button
            className="btn btn-success"
            onClick={() => handleClick(props.id)}
          >
            Details
          </button>
          <br />
          <br />

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(props.id)}
          >
            Delete item
          </button>
          <button
            type="button"
            className="btn btn-info btn-lg"
            dataToggle="modal"
            dataTarget="#myModal"
          >
            Edit
          </button>
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" dataDismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Modal Header</h4>
                </div>
                <div className="modal-body">
                  <p>Some text in the modal.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
