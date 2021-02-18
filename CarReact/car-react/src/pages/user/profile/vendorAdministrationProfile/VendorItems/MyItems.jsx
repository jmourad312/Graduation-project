import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemEntry from "../../../../../components/ItemEntry";
import Loading from "../../../../../components/Loading";
import ProductFilterVendor from "../../../../../components/productFilterVendor";
import {
  getVendorsItemsAction,
  filterCarModel,
  filterCarBrand,
} from "../../../../../store/actions";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import {useTranslation} from "react-i18next";

export default function MyItems(props) {
  const vendorItems = useSelector((state) => state.vendorItems.Data);
  const stateRedux = useSelector((state) => state);

  const dispatch = useDispatch();
  const getItems = () => {
    // console.log(vendorItems);
    dispatch(getVendorsItemsAction());
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [stateDisabled, setStateDisabled] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    images: [],
    carBrand: "",
    carModel: "",
    price: 0,

  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "carBrand") {
      if (value === "") {
        setStateDisabled(false);
      }
      else {
        setStateDisabled(true);
        dispatch(filterCarModel(value));
      }
    }
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleImageChange = (event) => {
    console.log(event.target.files);
    setInputValue((previous) => {
      return {
        ...previous,
        images: event.target.files,
        // loaded: 0,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    const formData = new FormData();
    if (inputValue.images) {
      for (var x = 0; x < inputValue.images.length; x++) {
        formData.append("images", inputValue.images[x]);
      }
    }
    formData.append("name", inputValue.name);
    formData.append("description", inputValue.description);
    formData.append("carBrand", inputValue.carBrand);
    formData.append("carModel", inputValue.carModel);
    formData.append("price", inputValue.price);

    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .post("http://localhost:3000/vendor/add", formData, config)
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
    setInputValue("");
    closeModal();
  };

  useEffect(() => {
    dispatch(filterCarBrand());
    dispatch(getVendorsItemsAction({}, localStorage.getItem("TEST2")));
  }, [vendorItems]);

  const createItem = (item) => {
    return (
      <ItemEntry
        key={item._id}
        id={item._id}
        images={item.images}
        name={item.name}
        description={item.description}
        price={item.price}
        carBrand={item.carBrand}
        carModel={item.carModel}
      />
    );
  };
  const {t, i18n} = useTranslation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="FavouriteItems"
        initial="out"
        animate="in"
        exit="out"
        variants={props.variants}
        transition={props.transition}
      >
        <div className="container">
          {/* <AddItem /> */}
          <div className="row">
            <ProductFilterVendor className="ProductFilter" />
            <Button
              variant="dark"
              style={{
                height: "50px",
                position: "absolute",
                top: "85%",
                right: "80.5%",
                background: "linear-gradient(-45deg, #110f11, #424c53)",
              }}
              onClick={() => openModal()}
            >
              <i class="far fa-plus-square"></i>
              {" "}{t("repeated.Add")}
            </Button>
            {vendorItems ? (
              vendorItems.map(createItem)
            ) : (
              <div
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "30px",
                  position: "absolute",
                  left: "50%",
                  top:"30%"
                }}
              >
                {t("VendorMyItems.NoItems")}{" "}
                <p
                  className="text-center"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {t("VendorMyItems.ToAddProduct")}{" "}
                </p>
                <div
                  className="text-center"
                  onClick={() => openModal()}
                  style={{
                    fontSize: "30px",
                    borderRadius: "25px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {t("VendorMyItems.ClickHere")}
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal show={isOpen} onHide={!isOpen}>
          <Modal.Header>
            <Modal.Title>{t("VendorAddItemModal.Addproduct")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>{t("VendorAddItemModal.ProductName")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("VendorAddItemModal.ProductNameHolder")}
                  name="name"
                  id="name"
                  value={inputValue.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t("VendorAddItemModal.EnterImage")}</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  multiple
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t("VendorAddItemModal.ProductDescription")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("VendorAddItemModal.DescriptionHolder")}
                  name="description"
                  id="description"
                  value={inputValue.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>{t("VendorAddItemModal.ItemPrice")}</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    id="price"
                    value={inputValue.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>{t("repeated.Brand")}</Form.Label>
                  <Form.Control
                    defaultValue="Choose..."
                    as="select"
                    name="carBrand"
                    id="carBrand"
                    value={inputValue.carBrand}
                    onChange={handleChange}
                  >
                    <option key={"no-value"} value="">
                    {t("Filter.ChooseBrand")}
                    </option>
                    ;
                    {stateRedux.brand.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>{t("repeated.Model")}</Form.Label>
                  <Form.Control
                    defaultValue="Choose..."
                    as="select"
                    name="carModel"
                    id="carModel"
                    value={inputValue.carModel}
                    onChange={handleChange}
                    disabled={!stateDisabled}
                  >
                    <option key={"no-value"} value="">
                    {t("Filter.ChooseModel")}
                    </option>
                    {stateRedux.model.map((item, index) => {
                      return (
                        <option key={index} value={item.model}>
                          {item.model}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" type="button" onClick={handleSubmit}>
              {t("repeated.Submit")}
            </Button>
            <Button variant="danger" onClick={closeModal}>
              {t("repeated.Cancel")}
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
}
