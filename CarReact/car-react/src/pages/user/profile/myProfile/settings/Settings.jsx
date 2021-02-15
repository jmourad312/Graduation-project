import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button2 from "../../../../../components/Button2";
import Input from "../../../../../components/Input";
import Label from "../../../../../components/Label";

export default function Settings(props) {
  console.log(props.person.firstName);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    middleName:"",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setUserInfo({
      firstName: props.person.firstName,
      middleName: props.person.middleName,
      phoneNumber: props.person.phoneNumber,
    });
  }, [])
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserInfo((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInfo);
    if (userInfo.password === userInfo.confirmPassword) {
      axios
        .put(
          `http://localhost:3000/user/updateUserProfile/${localStorage.getItem(
            "UserID"
          )}`,
          userInfo,
          {
            headers: { Authorization: localStorage.getItem("Authorization") },
          }
        )
        .then((req) => {
          console.log(req);
          if (req.data.Success === true) {
            console.log("Success");
            // props.history.push("/MyProfile");
          } else {
            console.log("fail");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please check your password");
    }
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={props.variants}
      transition={props.transition}
    >
      <form className="ml-5" style={{ fontSize: "1.5rem" }}>
        <div className="row">
          <div className="form-group col-4">
            <Label
              id="firstName"
              class="text-light"
              value="First Name"
            />
            <Input
              id="firstName"
              class="form-control w-75"
              value={userInfo.firstName}
              name="firstName"
              onChange={handleChange}
              placeHolder="First Name"
              type="text"
            />
          </div>
          <div className="form-group col-4">
            <Label
              id="middleName"
              class="text-light"
              value="Middle Name"
            />
            <Input
              id="middleName"
              class="form-control w-75"
              value={userInfo.middleName}
              name="middleName"
              onChange={handleChange}
              placeHolder="Middle Name"
              type="text"
            />
          </div>

        </div>

        <div className="form-group">
          <Label
            id="phoneNumber"
            class="text-light"
            value="Phone Number"
          />
          <Input
            id="phoneNumber"
            class="form-control w-25"
            value={userInfo.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            placeHolder="Phone number"
            type=""
          />
        </div>
        <div className="form-group">
          <Label
            id="password"
            class="text-light"
            value="New Password"
          />
          <Input
            id="password"
            class="form-control w-50"
            value={userInfo.password}
            name="password"
            onChange={handleChange}
            placeHolder="Password"
            type="password"
          />
        </div>
        <div className="form-group">
          <Label
            id="confirmPassword"
            class="text-light"
            value="Confirm New Password"
          />
          <Input
            id="confirmPassword"
            class="form-control w-50"
            value={userInfo.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeHolder="Confirm New Password"
            type="password"
          />
        </div>

      </form>
        <button
          onClick={handleSubmit}class="btn btn-dark"
          value="Submit"style={{fontSize:"25px",left:"47px",position:"absolute"}}
        >Submit</button>
    </motion.div>
  );
}
