import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import Button2 from '../../../../../components/Button2';
import Input from '../../../../../components/Input';
import Label from '../../../../../components/Label';
import { useTranslation } from "react-i18next";

export default function VendorSettings(props) {


  const [vendorInfo, setUserInfo] = useState({
    firstName: "",
    workshopName: "",
    phoneNumber: 0,
    password: "",
    confirmPassword: "",
  });
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
    if (vendorInfo.password === vendorInfo.confirmPassword) {
      axios
        .put(
          `http://localhost:3000/vendor/updateProfile/${localStorage.getItem(
            "VendorID"
          )}`,
          vendorInfo,
          {
            headers: { Authorization: localStorage.getItem("Authorization") },
          }
        )
        .then((req) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please check your password");
    }
  };
  const { t, i18n } = useTranslation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <form
          className="ml-5"
          style={{ fontSize: "1.5rem" }}
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="form-group col-4" style={{ color: "black" }}>
              <Label id="firstName" value={t("ProfileSettings.FirstName")} />
              <Input
                id="firstName"
                class="form-control w-75"
                value={vendorInfo.firstName}
                name="firstName"
                req={true}
                onChange={handleChange}
                placeHolder={t("ProfileSettings.FirstNameHolder")}
                type="text"
              />
            </div>
            <div className="form-group col-4" style={{ color: "black" }}>
              <Label id="workshopName" value={t("ProfileSettings.ShopName")} />
              <Input
                id="workshopName"
                class="form-control w-75"
                value={vendorInfo.workshopName}
                req={true}
                name="workshopName"
                onChange={handleChange}
                placeHolder={t("ProfileSettings.ShopNameHolder")}
                type="text"
              />
            </div>
          </div>

          <div className="form-group" style={{ color: "black" }}>
            <Label id="phoneNumber" value={t("ProfileSettings.PhoneNumber")} />
            <Input
              id="phoneNumber"
              req={true}
              class="form-control w-25"
              value={vendorInfo.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              placeHolder={t("ProfileSettings.PhoneHolder")}
              type=""
            />
          </div>

          <div className="form-group" style={{ color: "black" }}>
            <Label id="password" value={t("ProfileSettings.NewPassword")} />
            <Input
              id="password"
              req={true}
              class="form-control w-50"
              value={vendorInfo.password}
              name="password"
              onChange={handleChange}
              placeHolder={t("ProfileSettings.PassPlaceHolder")}
              type="password"
            />
          </div>

          <div className="form-group" style={{ color: "black" }}>
            <Label
              id="confirmPassword"
              value={t("ProfileSettings.ConfirmPassword")}
            />
            <Input
              id="confirmPassword"
              req={true}
              class="form-control w-50"
              value={vendorInfo.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeHolder={t("ProfileSettings.ConfirmPlaceHolder")}
              type="password"
            />
          </div>

          <button type="submit" class="btn btn-dark">
            {t("repeated.Submit")}
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
