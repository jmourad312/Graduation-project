import { instance } from "../../network/axiosConfig";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";

export default function Model(props) {
  const data = props.location.state.data;

  const [editValue, setEditValue] = useState({
    firstName: "",
    middleName: "",
    password: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    setEditValue({
      firstName: data.firstName,
      middleName: data.middleName,
      password: "",
      email: data.email,
      image: "",
    });
  }, []);

  const handleEditChange = (event) => {
    const { value, name } = event.target;

    setEditValue({
      ...editValue,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setEditValue({
      ...editValue,
      image: event.target.files[0],
    });
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    editValue.image != "" && formData.append("image", editValue.image);
    formData.append("firstName", editValue.firstName);
    formData.append("middleName", editValue.middleName);
    formData.append("email", editValue.email);
    editValue.password.length != 0 &&
      formData.append("password", editValue.password);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    try {
      const res = await instance.put(
        `user/updateUserProfile/${data._id}`,
        formData,
        config
      );
      console.log(res);
      if (res.data.Success == true) {
        alert("Done");
      } else alert("Try Again");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin">
      <div className="container-for-admin">
        <div className="container mt-4 pt-1 w-50">
          <Navbar />
          <h2 className="mt-5">Edit your Profile</h2>
          <div className="form-group">
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              value={editValue.firstName}
              name="firstName"
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Middle Name
            </label>
            <input
              type="text"
              className="form-control"
              value={editValue.middleName}
              name="middleName"
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "25px", fontWeight: "500" }}>Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={editValue.email}
              name="email"
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "25px", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={editValue.password}
              name="password"
              onChange={handleEditChange}
            />
          </div>
          <button
            type="sumbit"
            className="btn btn-primary"
            onClick={handleEditSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
