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
                    <h5>Phone: {vendor.phoneNumber}</h5>
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
          {/* <section className="row">
            <div className="container">
              <div className="row">
                <div className="col-6">
                              <h3 className="mb-3">Carousel cards title </h3>
                          </div>
                <div className="m-auto">
                  <a
                    className="btn btn-dark rounded-circle mr-5"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </a>
                  <a
                    className="btn btn-dark rounded-circle"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next"
                  >
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-12">
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=42b2d9ae6feb9c4ff98b9133addfb698"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3d2e8a2039c06dd26db977fe6ac6186a"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3f317c1f7a16116dec454fbc267dd8e4"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ebadb044b374504ef8e81bdec4d0e840"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=0754ab085804ae8a3b562548e6b4aa2e"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="card">
                              <img
                                className="img-fluid"
                                alt="100%x280"
                                src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6"
                              />
                              <div className="card-body">
                                <h4 className="card-title">
                                  Special title treatment
                                </h4>
                                <p className="card-text">
                                  With supporting text below as a natural
                                  lead-in to additional content.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </section>
  );
}
