import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { instance } from "../network/axiosConfig";
import { Button2 } from "../components/Button";
import { InputField } from "../components/InputField";
import { Button } from "react-bootstrap";

export default function AddAds(props) {
  const [state, setState] = useState({
    title: "",
    description: "",
    images: [],
    createdAT: "",
    expired: "",
    duration: 10,
    price: 0,
    ownerName: "",
    ownerPhone: 0,
    ownerEmail: "",
  });

  const ClearValue = () => {
    setState({
      title: "",
      description: "",
      images: [],
      createdAT: "",
      expired: "",
      duration: 10,
      price: 0,
      ownerName: "",
      ownerPhone: 0,
      ownerEmail: "",
    });
  };

  const tiggreValue = (e) => {
    const { value, name } = e.target;
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

  const sendAds = () => {
    const formData = new FormData();
    for (var x = 0; x < state.images.length; x++) {
      formData.append("images", state.images[x]);
    }
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("createdAT", state.createdAT);
    formData.append("expired", state.expired);
    formData.append("duration", state.duration);
    formData.append("price", state.price);
    formData.append("ownerName", state.ownerName);
    formData.append("ownerPhone", state.ownerPhone);
    formData.append("ownerEmail", state.ownerEmail);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    instance
      .post(`/admin/addAds`, formData, config)
      .then((req) => {
        console.log(req);
        if (req.data.Success === true) {
          console.log("Success");
          alert("Done");
          ClearValue();
        } else {
          console.log("fail");
          alert("Try again");
          ClearValue();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="">
        <div className="container-for-admin mb-5">
          <div className="container pt-3 mt-5 w-50">
            <Navbar />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>Title</label>
            <input
              value={state.title}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="title"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Description
            </label>
            <input
              value={state.description}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="description"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>Image</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e)}
              className="form-control w-100"
              name="images"
              multiple
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>Price</label>
            <input
              value={state.price}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="price"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Create AT
            </label>
            <input
              value={state.createdAT}
              type="date"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="createdAT"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Expired
            </label>
            <input
              value={state.expired}
              type="date"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="expired"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Owner Name
            </label>
            <input
              value={state.ownerName}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="ownerName"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Owner Phone
            </label>
            <input
              value={state.ownerPhone}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="ownerPhone"
            />
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Owner Email
            </label>
            <input
              value={state.owneEmail}
              type="text"
              onChange={(e) => tiggreValue(e)}
              className="form-control"
              name="ownerEmail"
            />
            <Button
              className="btn  btn-success mt-3"
              onClick={sendAds}
              name="Add Ads"
              style={{ fontSize: "25px" }}
            >
              Add Ads
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
