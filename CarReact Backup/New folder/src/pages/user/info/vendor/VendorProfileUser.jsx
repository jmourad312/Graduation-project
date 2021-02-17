import axios from "axios";
import React, { useEffect, useState } from "react";
import SlickSlider from "../../../../components/SlickSlider";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function VendorProfileUser(props) {
  const [vendor, setVendor] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: 0,
    vendorItems: [],
    location: [],
  });
  const [loc, setLoc] = useState("");
  // const [vendorItems, setVendorItems] = useState([])
  const getVendor = async (params) => {
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
            location: res.data.Data.person.location.coordinates,
          });
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(vendor);
  };

  useEffect(() => {
    console.log(props.match.params.id);
    getVendor(props.match.params.id);
    // console.log(document.getElementById("#myiframe").src());
  }, []);

  useEffect(() => {
    if (vendor) {
      if (vendor.location) {
        if (vendor.location[0] !== undefined) {
          if (vendor.location[1] !== undefined) {
            setLoc(
              `https://maps.google.com/maps?q=${vendor.location[1]},${vendor.location[0]}&hl=en&z=14&amp;&output=embed`
            );
          }
        }
      }
    }
  });

  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <section className="vendor-profile">
      <div className="bg">
        <div className="container">
          {/* <!-- vendor info --> */}
          <h2 className="text-center">{t("vendor profile.info")}</h2>
          <section className="row mt-5">
            <div className="media w-100">
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
                      {t("vendor profile.contact")}
                    </h3>
                    <h2>
                      {t("vendor profile.name")}: {vendor.firstName}{" "}
                      {vendor.lastName}
                    </h2>
                    <h4>
                      {t("vendor profile.phone")}:{" "}
                      {vendor.phoneNumber ? vendor.phoneNumber : "Not Provided"}
                    </h4>
                  </div>
                </div>
              </div>
              {vendor &&
              vendor.location &&
              vendor.location[0] !== undefined &&
              vendor.location[1] !== undefined ? (
                <div className="col-4">
                  <iframe
                    title="map"
                    id="myiframe"
                    src={loc}
                    width="300"
                    height="200"
                  ></iframe>
                </div>
              ) : (
                <div className="col-4">Location not provided</div>
              )}
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
          <h2 className="text-center mb-3"> {t("vendor profile.items")}</h2>
          <SlickSlider items={vendor.vendorItems} />
        </div>
      </div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName={"productList2"}
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {vendor.vendorItems.map((item, index) => {
                return (
                  <Col key={index}>
                    <section className="cards">
                      <article
                        className="card card--1"
                        // onClick={() => handleClick(item._id)}
                      >
                        <div
                          className="card__img"
                          style={{ background: `url(${item.image})` }}
                        ></div>
                        <p className="card_link">
                          <div
                            className="card__img--hover"
                            style={{ background: `url(${item.image})` }}
                          ></div>
                        </p>
                        <div className="card__info">
                          <h4 className="card__title text-truncate">
                            {item.name}
                          </h4>
                          <span
                            className="price"
                            style={{
                              fontWeight: "600",
                              color: "goldenrod",
                              fontSize: "25px",
                            }}
                          >
                            {item.price} LE
                          </span>{" "}
                          <p className="text-truncate">{item.description}</p>
                          <strong>
                            <i className="badge badge-dark">{item.carBrand}</i>
                            {"  "}
                            <i className="badge badge-dark">{item.carModel}</i>
                          </strong>
                        </div>
                      </article>
                    </section>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </section>
  );
}
