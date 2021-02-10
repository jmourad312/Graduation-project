import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../../components/Image'
import profilePic from "../../../../assets/Images/pexels-photo-220453.jpeg";
import VendorProfilePicture from "../../../../components/VendorProfilePicture";
import VendorProfileRight from './VendorProfileRight';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorsAction, setVendorIdAction } from '../../../../store/actions';
import { motion } from 'framer-motion';
// import ProfileRight from '../../../../components/ProfileRight';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function VendorAdministration() {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.Data);

  dispatch(setVendorIdAction(localStorage.getItem("VendorID")));
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
                {/* <Image
                    src={
                      vendor
                        ? vendor.person
                          ? vendor.person.image
                          : null
                        : null
                    }
                    alt="profile picture"
                    height="100%"
                    width="100%"
                  /> */}
              </div>
              <div className="col-8">
                <div className="row mt-4">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <p className="mt-3 button raise">
                      <Link to={`/VendorAdministration/VendorDetails`} onClick={handleClick}>
                        Basic details
                      </Link>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="mt-3 button raise">
                      <Link to="/VendorAdministration/MyItems" onClick={handleClick}>My Items</Link>
                    </p>
                  </div>
                </div>
                <div className="col-2"></div>

                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <p className="mt-3 button up">
                      <Link to="/VendorAdministration/VendorSettings" onClick={handleClick}>
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


{/* <div className="container-lg">
                        <div className="table-responsive">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                                        <div className="col-sm-4">
                                            <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                            <td>Administration</td>
                                            <td>(171) 555-2222</td>
                                            <td>
                                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Peter Parker</td>
                                            <td>Customer Service</td>
                                            <td>(313) 555-5735</td>
                                            <td>
                                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fran Wilson</td>
                                            <td>Human Resources</td>
                                            <td>(503) 555-9931</td>
                                            <td>
                                                <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}
{/* <ProfileRight classNameName="col-9 profileright" /> */ }
