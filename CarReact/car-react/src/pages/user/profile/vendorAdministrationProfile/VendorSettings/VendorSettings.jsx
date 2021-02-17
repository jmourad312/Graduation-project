import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import Button2 from '../../../../../components/Button2';
import Input from '../../../../../components/Input';
import Label from '../../../../../components/Label';
import {useTranslation} from "react-i18next";

export default function VendorSettings(props) {


    const [vendorInfo, setUserInfo] = useState({
      firstName: "",
      middleName: "",
      lastName: "",
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
      console.log(vendorInfo);
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
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={props.variants}
          transition={props.transition}
        >
          <form className="ml-5" style={{fontSize:"1.5rem"}}>
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
                  value={vendorInfo.firstName}
                  name="firstName"
                  onChange={handleChange}
                  placeHolder={t("ProfileSettings.FirstNameHolder")}
                  type="text"
                />
              </div>
              <div className="form-group col-4">
                <Label
                  id="lastName"
                  class="text-light"
                  value={t("ProfileSettings.ShopName")}
                />
                <Input
                  id="lastName"
                  class="form-control w-75"
                  value={vendorInfo.lastName}
                  name="lastName"
                  onChange={handleChange}
                  placeHolder={t("ProfileSettings.ShopNameHolder")}
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
                value={vendorInfo.phoneNumber}
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
                    value={vendorInfo.password}
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
                    value={vendorInfo.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    placeHolder={t("ProfileSettings.ConfirmPlaceHolder")}
                    type="password"
                  />
                </div>
             
           
            <Button2
              onClick={handleSubmit}
              //   type="submit"
              class="btn btn-dark"
              value={t("repeated.Submit")}
            />
          </form>
        </motion.div>
      </AnimatePresence>
    );
}
