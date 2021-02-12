import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import cars2 from "../assets/js/cars2";
import cars from "../assets/js/cars";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCarBrand,
  filterCarModel,
  resultFromFilterProduct,
} from "../store/actions";
import SimpleSearch from "./SimpleSearch";
import { Pagination } from "./Pagination";
import $ from "jquery";

export default function ProductFilter(props) {
  const products = useSelector((state) => state.products.TotalItem);
  const [itemsInDB, setItemsInDB] = useState(0);

  const [state, setState] = useState({
    model: "",
    brand: "",
    search: "",
    priceMoreThan: 0,
    priceLessThan: 0,
  });


  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCarBrand());
    dispatch(resultFromFilterProduct({}, 0));
  }, []);

  useEffect(() => {
    localStorage.setItem("TotalProducts", products);
    setItemsInDB(localStorage.getItem("TotalProducts"));
  }, [products]);

  // const actionToFilterOption = () => {
  //   dispatch(resultFromFilterProduct(state));
  // };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "brand") {
      dispatch(filterCarModel(value));
      setState((previous) => {
        return {
          ...previous,
          model: "",
        };
      });
    }
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
    handleSearchClick();
  }
  const handlePriceChange = (event) => {

    switch (event.target.name) {
      case "priceLess":
        setState({
          ...state,
          priceLessThan: +event.target.value,
        });
        break;
      case "priceMore":
        setState({
          ...state,
          priceMoreThan: +event.target.value,
        });
        break;
      default:
        break;
    }
  }

  const handleFocus=()=>{
    document.getElementById("focus").focus();
  }

  const handleClick = (params) => {
    console.log(params);
    dispatch(resultFromFilterProduct(state, params));
    // dispatch(filterCarModel(event.target.value));
  };
  const handleSearchClick = () => {
    dispatch(resultFromFilterProduct(state, 0));
  };

  const handleClear = () => {
    setState({
      model: "",
      brand: "",
      search: "",
      priceLessThan: 0,
      priceMoreThan: 0,
    });
    
    dispatch(resultFromFilterProduct({}, 0));

    // handleSearchClick();
    // setTimeout(() => {
    //   handleSearchClick();
    // }, 5000);
  }
  const handleClear2 = () => {
    setState({
      search: "",
    });
    dispatch(resultFromFilterProduct({}, 0));

  };

  return (
    <div className={props.className}>
      {/* <SimpleSearch /> */}
      {/* <div className="input-group mb-3">
        <input
          type="text"
          name="search"
          onChange={handleChange}
          value={state.search}
          className="form-control"
          placeholder="Search"
        />
        <div className="input-group-append">
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

      <div class="search">
        <input type="checkbox" id="trigger" onClick={handleFocus} class="search__checkbox" />
        <label class="search__label-init" for="trigger"></label>
        <label class="search__label-active" onClick={handleClear2} for="trigger"></label>
        <div class="search__border"></div>
        <input type="text" class="search__input" id="focus" name="search" onChange={handleChange} value={state.search}/>
        <div class="search__close"></div>
      </div>

      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3 text-center">Filter Options</h4>
      </div>

      <div className="mb-5" style={{marginTop:"120px"}}>
        <input
          type="range"
          name="priceLess"
          onChange={handlePriceChange}
          value={state.priceLessThan}
          className="form-range"
          min="0"
          max="999"
          step="10"
        />
        <label htmlFor="customRange" className="form-label ml-2">
          Form: {state.priceLessThan}
        </label>
      </div>

      <div className="mb-5">
        <input
          type="range"
          name="priceMore"
          onChange={handlePriceChange}
          value={state.priceMoreThan}
          className="form-range"
          min="1000"
          max="5000"
          step="10"
        />
        <label htmlFor="customRange" className="form-label ml-2">
          To: {state.priceMoreThan}{" "}
        </label>
      </div>

      <div className="mb-5">
        <select
          value={state.brand}
          name="brand"
          onChange={handleChange}
          className="custom-select custom-select-md mb-3"
        >
          <option value="" key="no-value">
            choose Brand
          </option>
          {stateRedux.brand.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <select
          value={state.model}
          disabled={!state.brand}
          name="model"
          onChange={handleChange}
          className="custom-select custom-select-sm mb-3"
        >
          <option value="" key="no-value">
            choose Model
          </option>

          {stateRedux.model.map((item, index) => (
            <option value={item.model} key={index}>
              {item.model}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSearchClick}
        className="btn btn-dark mr-4"
      // style={{
      //   background:
      //     "linear-gradient(to right, rgb(197, 191, 191),  green )",
      // }}
      >
        ApplyFilter
      </button>
      <button
        type="button"
        className="btn btn-danger "
        // style={{
        //   background:
        //     "linear-gradient(to right, rgb(197, 191, 191),  red )",
        // }}
        onClick={handleClear}
      >
        Clear filter
      </button>
      <div
        className="pagination"
        style={{
          zIndex: "100",
          position: "fixed",
          right: "300px",
          bottom: "-5%",
        }}
      >
        {products && (
          <Pagination
            NumberOfItemsInDB={itemsInDB}
            NumberToShow={6}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}
