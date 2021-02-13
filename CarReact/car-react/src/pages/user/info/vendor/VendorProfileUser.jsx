import axios from "axios";
import React, { useEffect, useState } from "react";
import SlickSlider from "../../../../components/SlickSlider";

export default function VendorProfileUser(props) {

  const [vendor, setVendor] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: 0,
    vendorItems:[],
  });

  // const [vendorItems, setVendorItems] = useState([])
  
  const getVendor = async (params) =>{

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const URL = `http://localhost:3000/user/showVendorProfile/${params}`;

    axios
      .get(URL, config)
      .then((res) => {
        console.log(res);
        if (res.data.Success === true) {
          console.log("Success");
          // console.log(res.data.Data.person);
          setVendor({
            firstName: res.data.Data.person.firstName,
            lastName: res.data.Data.person.lastName,
            image: res.data.Data.person.image,
            phoneNumber: res.data.Data.person.phoneNumber,
            vendorItems: res.data.Data.vendorItems,
          });
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(vendor);
  }
  
  useEffect(() => {
    console.log(props.match.params.id);
    getVendor(props.match.params.id);
  }, []);
  

  return (
    <section className="vendor-profile">
      <div className="bg">
        <div className="container">
          {/* <!-- vendor info --> */}
          <h2 className="text-center">Vendor Info</h2>
          <section className="row mt-5">
            <div className="media">
              <div className="col-3">
                <img
                  className="rounded-circle"
                  style={{ width: "250px", height: "230px" }}
                  src={vendor.image}
                  alt="Generic placeholder"
                />
              </div>
              <div className="col-5">
                <div className="media-body">
                  <div className="">
                    <h3>
                      <i
                        className="fa fa-envelope fa-1x mr-2"
                        aria-hidden="true"
                      ></i>
                      Don't hesitate to contact us
                    </h3>
                Name: {vendor.firstName}{" "}{vendor.lastName}
                    <h5>Phone: {vendor.phoneNumber?vendor.phoneNumber:"Not Provided"}</h5>
                  </div>
                </div>
              </div>
              <div className="col-4">
                    <iframe
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                      width="300"
                      height="200"
                      style={{
                        border: "rgb(0, 0, 0) solid",
                        borderRadius: "5%",
                      }}
                      allowfullscreen
                    ></iframe>
              </div>
            </div>
          </section>
          {/* <hr className="hr " /> */}
          {/* <!-- map & address --> */}
          {/* <h1 className="text-center">Vendor's Location</h1>
          <div className="row">
          <div className="centercontent">
              <iframe 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+fayuim"
                width="300"
                height="200"
                style={{ border: "rgb(0, 0, 0) solid", borderRadius: "5%" }}
                allowfullscreen
              ></iframe>
          </div>
          </div> */}
          <hr className="hr " />

          {/* <!-- items --> */}
          <h2 className="text-center mb-3">Available Items</h2>
          <SlickSlider items={vendor.vendorItems} />
          
        </div>
      </div>
    </section>
  );
}
