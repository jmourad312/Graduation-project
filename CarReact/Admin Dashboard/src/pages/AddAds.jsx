import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { instance } from "../network/axiosConfig";
import { Button2 } from "../components/Button";
import { InputField } from "../components/InputField";

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
    ownerPhone: "",
    ownerEmail: "",
  });

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
    console.log(event.target.files[0]);
    setState((previous) => {
      return {
        ...previous,
        images: event.target.files,
        // loaded: 0,
      };
    });
  };

  const sendAds = () => {
    const formData = new FormData();
    formData.append("images", state.images);
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
        } else {
          console.log("fail");
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
          <div className="container pt-3 mt-5">
            <Navbar />
            <InputField
              value={state.title}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="title"
            />
            <InputField
              value={state.description}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="description"
            />
            <InputField
              value={state.images}
              type="file"
              handleChange={(e) => handleImageChange(e)}
              className="form-control"
              name="images"
              multiple={true}
            />
            <InputField
              value={state.price}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="price"
            />
            <InputField
              value={state.createdAT}
              type="date"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="createdAT"
            />
            <InputField
              value={state.expired}
              type="date"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="expired"
            />
            <InputField
              value={state.ownerName}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="ownerName"
            />
            <InputField
              value={state.ownerPhone}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="ownerPhone"
            />
            <InputField
              value={state.owneEmail}
              type="text"
              handleChange={(e) => tiggreValue(e)}
              className="form-control"
              name="owneEmail"
            />
            <Button2
              className="btn  btn-success"
              handelClick={sendAds}
              name="Add Ads"
            />
          </div>
        </div>
      </div>
    </>
  );
}
