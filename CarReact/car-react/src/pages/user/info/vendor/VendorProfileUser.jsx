import axios from "axios";
import React, { useEffect, useState } from "react";
import SlickSlider from "../../../../components/SlickSlider";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts, setProductId } from "../../../../store/actions";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
export default function VendorProfileUser(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  var history = useHistory();
  const [vendor, setVendor] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: 0,
    vendorItems: [],
    location: [],
    workshopName: ""
  });
  // const productDetails = useSelector(state => state.productDetails)
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
        if (res.data.Success === true) {
          setVendor({
            firstName: res.data.Data.person.firstName,
            lastName: res.data.Data.person.lastName,
            image: res.data.Data.person.image,
            phoneNumber: res.data.Data.person.phoneNumber,
            vendorItems: res.data.Data.vendorItems,
            location: res.data.Data.person.location.coordinates,
            workshopName: res.data.Data.person.workshopName
          });
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVendor(location.pathname.split("/",15)[2]);
    // console.log(location.pathname.split("/", 15)[2]);
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

  const handleClick = (params, name, brand, model) => {
    dispatch(setProductId(params));
    dispatch(getRelatedProducts(params, name, brand, model));
    localStorage.setItem("ProductID", params);
    history.push(`/ProductDetails/${params}`);
    axios
      .put(
        `http://localhost:3000/user/recentlyViewed`,
        { id: props.id },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      )
      .then((req) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <section className="vendor-profile">
      <div className="bg">
        <div className="container">
          {/* <!-- vendor info --> */}
          <h2 style={{ fontWeight: "700", fontSize: "50px", backgroundImage: "linear-gradient(to top,#ffffff 10%,#dfdda3 90%)", color: "transparent", WebkitBackgroundClip: "text",paddingBottom:"3.5px" }} className="text-center" >{t("vendor profile.info")}</h2>
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
                    <h2
                      style={{ fontWeight: "700", fontSize: "30px",paddingBottom:"3.5px" , backgroundImage: "linear-gradient(to top,#ffffff 10%,#dfdda3 90%)", color: "transparent", WebkitBackgroundClip: "text" }}>
                      {t("vendor profile.name")}: {vendor.firstName}{" "}
                      {vendor.lastName}
                    </h2>
                    <h2
                      style={{ fontWeight: "700", fontSize: "30px",paddingBottom:"3.5px" , backgroundImage: "linear-gradient(to top,#ffffff 10%,#dfdda3 90%)", color: "transparent", WebkitBackgroundClip: "text" }}>
                      {t("repeated.Shop")} {vendor.workshopName}{" "}
                    </h2>
                    <h4
                      style={{ fontWeight: "700", fontSize: "30px",paddingBottom:"3.5px" , backgroundImage: "linear-gradient(to top,#ffffff 10%,#dfdda3 90%)", color: "transparent", WebkitBackgroundClip: "text" }}>
                      {t("vendor profile.phone")}:{" "}
                      {vendor.phoneNumber ? vendor.phoneNumber : "Not Provided"}
                    </h4>
                    <Button variant="light" onClick={() => setShow(true)}>
                      {t("VendorProfile.AllItems")}
                    </Button>
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
                      style={{ borderRadius: "10px" }}
                    ></iframe>
                  </div>
                ) : (
                  <div className="col-4">{t("vendor profile.Locationnotprovided")}</div>
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
          <h2 className="text-center mb-3" style={{ fontWeight: "700", fontSize: "40px", backgroundImage: "linear-gradient(to top,#ffffff 10%,#dfdda3 90%)", color: "transparent", WebkitBackgroundClip: "text" }}> {t("vendor profile.items")}</h2>
          <div style={{}}>
            <SlickSlider items={vendor.vendorItems} />
          </div>
        </div>
      </div>



      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName={"productList2"}
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {t("VendorProfile.AllItems")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            <Row>
              {vendor.vendorItems.map((item, index) => {
                return (
                  <Col lg="4" key={index}>
                    <section className="cards">
                      <article
                        className="card card--1"
                        onClick={() =>
                          handleClick(
                            item._id,
                            item.name,
                            item.carBrand,
                            item.carMode
                          )
                        }
                        style={{
                          marginRight: "15px",
                          transition:
                            "all 0.4s cubic-bezier(0.175, 0.885, 0, 1)",
                          backgroundColor: "#fff",
                          width: "100%",
                          position: "relative",
                          borderRadius: "12px",
                          overFlow: "hidden",
                          boxShadow: "0px 13px 10px -7px rgba(0, 0, 0, 0.1)",
                          height: "370px",
                          marginBottom: "20px",
                          cursor: "pointer",
                        }}
                        // onClick={() => handleClick(item._id)}
                      >
                        <div
                          className="card__img"
                          style={{
                            background: `url(${item.images[0]})top left 100%`,
                            visibility: "hidden",
                            backgroundSize: "cover",
                            backgroundPosition: "top",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "235px",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        ></div>
                        <p className="card_link">
                          <div
                            className="card__img--hover"
                            style={{
                              background: `url(${item.images[0]})top left 100%`,
                              transition: "0.2s all ease-out",
                              backgroundSize: "cover",
                              backgroundPosition: "top",
                              backgroundRepeat: "no-repeat",
                              width: "100%",
                              position: "absolute",
                              height: "235px",
                              borderTopLeftRadius: "12px",
                              borderTopRightRadius: "12px",
                              top: "0",
                            }}
                          ></div>
                        </p>
                        <div
                          className="card__info"
                          style={{
                            zIndex: "2",
                            backgroundColor: "#fff",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                            padding: "16px 24px 24px 24px",
                          }}
                        >
                          <h4
                            className="card__title text-truncate"
                            style={{
                              marginTop: "5px",
                              marginBottom: "10px",
                            }}
                          >
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
                            {item.price} {t("repeated.LE")}
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
