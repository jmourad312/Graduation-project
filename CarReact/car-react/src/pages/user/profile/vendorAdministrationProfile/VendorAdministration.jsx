import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VendorProfilePicture from "../../../../components/VendorProfilePicture";
import VendorProfileRight from './VendorProfileRight';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorsAction } from '../../../../store/actions';
import { motion } from 'framer-motion';
import UserIcon from '../../../../components/UserIcon';

export default function VendorAdministration() {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.Data);

  const [classChange, setClassChange] = useState("vendorBot2");
  
  const handleClick = () => {
    setClassChange("vendorBot2");
    setTimeout(() => {
      setClassChange("vendorBot");
    }, 700);
  };
  
  useEffect(() => {
    dispatch(getVendorsAction(localStorage.getItem("VendorID")));
    // console.log(vendor ? vendor.person : "loading");
    // console.log(localStorage.getItem("VendorID"));
  }, [vendor]);



const pageVariants = {
  in: {
    opacity: 10,
    x: "0vw",
    y: "0vh",
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "-100vw",
    y: "-100vh",
    scale: 0.1,
  },
};
const pageTransitions = {
  duration: 1.5,
  type: "tween",
  ease: "anticipate",
};
  return (
    <motion.div
      className="vendorAdmin"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransitions}
    >

      <section className="container">
      {localStorage.getItem("Authorization") !== null && <UserIcon />}
        <div className="vendorTop">
          <div style={{ marginTop: "10%" }}>
            <div className="row newCont">
              <div className="col-3 ml-5">
                <VendorProfilePicture
                  image={
                    vendor
                      ? vendor.person
                        ? vendor.person.image
                        : "null"
                      : "null"
                  }
                />
              </div>
              <div className="col-8">
                <div className="row mt-4">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <p className="mt-3 button raise">
                      <Link
                        to={`/VendorAdministration/VendorDetails`}
                        onClick={handleClick}
                      >
                        Basic details
                      </Link>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="mt-3 button raise">
                      <Link
                        to="/VendorAdministration/MyItems"
                        onClick={handleClick}
                      >
                        My Items
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-2"></div>

                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <p className="mt-3 button up">
                      <Link
                        to="/VendorAdministration/VendorSettings"
                        onClick={handleClick}
                      >
                        Settings
                      </Link>
                    </p>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classChange}>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <VendorProfileRight vendor={vendor ? vendor.person : "null"} />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

