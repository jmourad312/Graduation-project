import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  filterCarModel,
  filterCarBrand,
  resultFromFilter,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Modal } from "react-bootstrap";
import cars3 from "../assets/js/cars3";
import cars2 from "../assets/js/cars2";
import { Pagination } from "./Pagination";
import { PaginationReact } from "./PaginationReact";
import {useTranslation} from "react-i18next";

import Loading from "./Loading";

export default function BlogFilter(props) {
  const {t, i18n} = useTranslation();
  const history = useHistory();
  const [filterState, setFilterState] = useState({
    model: "",
    brand: "",
    search: "",
  });
  const [itemsInDB, setItemsInDB] = useState(0);
  const blogs = useSelector((state) => state.blogs.TotalItem);
  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(filterCarBrand());
    // dispatch(resultFromFilter({}, 0));
  }, []);

  useEffect(() => {
    localStorage.setItem("TotalBlogs", blogs);
    setItemsInDB(localStorage.getItem("TotalBlogs"));
  }, [blogs]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      dispatch(filterCarModel(value));
      setFilterState((previous) => {
        return {
          ...previous,
          model: "",
        };
      });
    }
    setFilterState((previous) => {
      return {
        ...previous,
        [name]: value,
      };

    });
    handleSearchClick();
  };
    //   switch (event.target.name) {
    //     case "brand":
    //       setState({
    //         ...state,
    //         brand: event.target.value,
    //       });
    //       // dispatch(resultFromFilter({ brand: event.target.value }));
    //       // dispatch(filterCarModel(event.target.value));
    //       console.log(state);

    //       break;
    //     case "model":
    //       setState({
    //         ...state,
    //         model: event.target.value,
    //       });
    //       // dispatch(
    //       //   resultFromFilter({ brand: state.brand, model: event.target.value })
    //       // );
    //       console.log(state);

    //       break;
    //   }
  const handleClick = (params) => {
    console.log(params);
    dispatch(resultFromFilter(filterState, params.selected*6));
    localStorage.setItem("TEST", params.selected*6);
    // dispatch(filterCarModel(event.target.value));
  };
  const handleSearchClick = () => {
    dispatch(resultFromFilter(filterState, 0));
  };
  const functionGdeda = (e) => {
    console.log(filterState);
    handleChange(e);
    console.log(filterState);
    // handleSearchClick();
  };
  const handleClear = () => {
    setFilterState({
      model: "",
      brand: "",
      search: "",
    });
    dispatch(resultFromFilter({}, 0));
  };

  const handleClear2 = () => {
    setFilterState({
      search: "",
    });
    dispatch(resultFromFilter({}, 0));

  };

  //-------------ADD BLOG ----------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [stateDisabled, setStateDisabled] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    images: [],
    brand: "",
    model: "",
  });
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

  
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      setStateDisabled(true);
    }
    setInputValue((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  
  const handleFocus = () => {
    document.getElementById("focus").focus();
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    const formData = new FormData();
    for (var x = 0; x < inputValue.images.length; x++) {
      formData.append("images", inputValue.images[x]);
    }
    // formData.append("images", inputValue.images);
    formData.append("title", inputValue.title);
    formData.append("body", inputValue.body);
    formData.append("brand", inputValue.brand);
    formData.append("model", inputValue.model);
    const config = {
      headers: {
        "content-type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    axios
      .post("http://localhost:3000/user/addPost", formData, config)
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
      console.log(inputValue);
      closeModal();
      setInputValue("");
      setTimeout(() => {dispatch(resultFromFilter({},localStorage.getItem("TEST")))}, 3000);
    
  };
  return (
    <div className={props.class}>

      <div class="search">
        <input type="checkbox" id="trigger" onClick={handleFocus} class="search__checkbox" />
        <label class="search__label-init" for="trigger"></label>
        <label class="search__label-active" onClick={handleClear2} for="trigger"></label>
        <div class="search__border"></div>
        <input type="text" class="search__input" id="focus" name="search" onChange={handleChange} value={filterState.search} />
        <div class="search__close" ></div>
      </div>
      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3 text-center">{t("Filter.FilterOptions")}</h4>
      </div>
      <hr style={{ borderColor: "grey", border: "1px solid" }} />
      <div className="mb-5 mt-5">
        {/* <div className="input-group mb-3">
          <input
            type="text"
            name="search"
            onChange={handleChange}
            value={filterState.search}
            className="form-control"
            placeholder="Search"
          />
          <div className="input-group-append mb-5">
            <button
              className="btn"
              style={{
                background:
                  "linear-gradient(to right,  rgb(197, 191, 191),  rgb(88, 84, 84) )",
                  
              }}
              onClick={handleSearchClick}
              type="button"
            >
              Search
            </button>
          </div>
        </div> */}


        <select
          style={{ marginTop: "70px", fontWeight: "700" }}
          value={filterState.brand}
          name="brand"
          onChange={handleChange}
          // onSelect={handleChange}
          className="custom-select custom-select-lg mb-3"
        >
          <option value="" key="no-value" style={{ fontWeight: "700" }}>
            {t("Filter.ChooseBrand")}
          </option>
          {stateRedux.brand.map((item, index) => (
            <option value={item.name} key={index} style={{ fontWeight: "700" }}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <select
          value={filterState.model}
          disabled={!filterState.brand}
          name="model"
          onChange={handleChange}
          // onSelect={handleChange}
          className="custom-select custom-select-lg mb-3" style={{ fontWeight: "700" }}
        >
          <option value="" key="no-value" style={{ fontWeight: "700" }}>
          {t("Filter.ChooseModel")}
          </option>
          {stateRedux.model.map((item, index) => (
            <option value={item.model} key={index} style={{ fontWeight: "700" }}>
              {item.model}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button variant="dark" onClick={handleSearchClick} style={{ fontWeight: "700", height: "60px" }}>
        {t("Filter.ApplyFilter")}
        </Button>
        <button
          type="button"
          className="btn btn-danger ml-2"
          style={{ fontWeight: "700", height: "60px" }}
          // style={{
          //   background:
          //     "linear-gradient(to right, rgb(197, 191, 191),  red )",
          // }}
          onClick={handleClear}
        >
          {t("Filter.ClearFilter")}
        </button>
      </div>

      <div style={{ position: "relative", top: "80px", right: "10px", textAlign: "center" }}>
        {localStorage.getItem("UserID") !== null ? (
          <div>
            <label for="add" style={{ fontSize: "35px", fontWeight: "700"}}>{t("Filter.AddPost")}</label>
            <p onClick={openModal} id="add" style={{ cursor: "pointer" }}>
              <i class="fas fa-4x fa-plus-circle"></i>
            </p>
          </div>
        ) : (<div style={{ fontSize: "1.7rem", fontWeight: "700", color: "black", backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: "25px", border: "3px solid gray" ,paddingTop: "10px",paddingBottom:"25px",marginRight:"-30px"}} >{t("Filter.only")}<div onClick={() => history.push("/SignForm")} style={{ fontSize: "1.8rem", cursor: "pointer", borderRadius: "15px", textDecoration: "underline" }}>{t("Filter.RegHere")}</div></div>)}
      </div>
      <div className="pagination" style={{
        zIndex: "100", position: "absolute", left: "350px",
        bottom: "-56%",
        height: "50px"
      }}
      >
        {blogs && itemsInDB > 6 && (
          <PaginationReact
            NumberOfItemsInDB={itemsInDB}
            NumberToShow={6}
            handleClick={handleClick}
          />
        )}
      </div>
      <Modal show={isOpen} onHide={!isOpen}>
        <Modal.Header>
          <Modal.Title>{t("Filter.AddPost")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t("AddBlogModal.BlogTitle")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("AddBlogModal.EnterTitle")}
                name="title"
                id="title"
                value={inputValue.title}
                onChange={handleInputChange}
                required
                maxLength="50"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("AddBlogModal.BlogImage")}</Form.Label>
              <Form.Control
                type="file"
                name="images"
                id="images"
                onChange={handleImageChange}
                multiple
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("AddBlogModal.BlogContent")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={t("AddBlogModal.BlogDescription")}
                name="body"
                id="body"
                value={inputValue.body}
                onChange={handleInputChange}
                required
                maxLength="150"
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>{t("repeated.Brand")}</Form.Label>
                <Form.Control
                  defaultValue="Choose..."
                  as="select"
                  name="brand"
                  id="brand"
                  value={inputValue.brand}
                  onChange={handleInputChange}
                  required
                >
                  {cars2.map((item, index) => {
                    return (
                      <option key={index} value={item.make}>
                        {item.make}
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
                  name="model"
                  id="model"
                  value={inputValue.model}
                  onChange={handleInputChange}
                  disabled={!stateDisabled}
                  required
                >
                  {cars3.map((item, index) => {
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
    </div>
  );
}
