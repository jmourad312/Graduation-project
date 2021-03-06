import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button2 from "../../../../../components/Button2";
import Input from "../../../../../components/Input";
import Label from "../../../../../components/Label";
import {useTranslation} from "react-i18next";

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
  const {t, i18n} = useTranslation();
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
              value={t("ProfileSettings.FirstName")}
            />
            <Input
              id="firstName"
              class="form-control w-75"
              value={userInfo.firstName}
              name="firstName"
              onChange={handleChange}
              placeHolder={t("ProfileSettings.FirstNameHolder")}
              type="text"
            />
          </div>
          <div className="form-group col-4">
            <Label
              id="middleName"
              class="text-light"
              value={t("ProfileSettings.FamilyName")}
            />
            <Input
              id="middleName"
              class="form-control w-75"
              value={userInfo.middleName}
              name="middleName"
              onChange={handleChange}
              placeHolder={t("ProfileSettings.FamilyNameHolder")}
              type="text"
            />
          </div>

        </div>

        <div className="form-group">
          <Label
            id="phoneNumber"
            class="text-light"
            value={t("ProfileSettings.PhoneNumber")}
          />
          <Input
            id="phoneNumber"
            class="form-control w-25"
            value={userInfo.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            placeHolder={t("ProfileSettings.PhoneHolder")}
            type=""
          />
        </div>
        <div className="form-group">
          <Label
            id="password"
            class="text-light"
            value={t("ProfileSettings.NewPassword")}
          />
          <Input
            id="password"
            class="form-control w-50"
            value={userInfo.password}
            name="password"
            onChange={handleChange}
            placeHolder={t("ProfileSettings.PassPlaceHolder")}
            type="password"
          />
        </div>
        <div className="form-group">
          <Label
            id="confirmPassword"
            class="text-light"
            value={t("ProfileSettings.ConfirmPassword")}
          />
          <Input
            id="confirmPassword"
            class="form-control w-50"
            value={userInfo.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeHolder={t("ProfileSettings.ConfirmPlaceHolder")}
            type="password"
          />
        </div>

      </form>
        <button
          onClick={handleSubmit}class="btn btn-dark"
          value="Submit"style={{fontSize:"25px",left:"47px",position:"absolute"}}
        >{t("repeated.Submit")}</button>
    </motion.div>
  );
}
