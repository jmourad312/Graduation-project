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
import { PaginationReact } from "./PaginationReact";
import {useTranslation} from "react-i18next";
import { Slider, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider ,makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 210,
    marginTop: "150px",
    marginLeft: "10px",
    marginBottom: "60px",
    fontSize: "20px",
    fontWeight:"700"
  },
});

function valuetext(value) {
  return `${value}`;
}
export default function ProductFilter(props) {

  const classes = useStyles();


  const [value, setValue] = useState([0, 5000]);

  const handlePriceChange1 = (event, newValue) => {
    setValue(newValue);
  };



  const products = useSelector((state) => state.products.TotalItem);
  const [itemsInDB, setItemsInDB] = useState(0);

  const [state, setState] = useState({
    model: "",
    brand: "",
    search: "",
    priceMoreThan: 0,
    priceLessThan: 0,
    price: [0,5000],
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
    // handleSearchClick();
  }
  const handleSearchChange = (event) => {
    const { value, name } = event.target;
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
    handleSearchClick();
  };
  const handlePriceChange = (event,newValue) => {
    setState((previous) => {
      return {
        ...previous,
        price: newValue,
      };
    });
    // switch (event.target.name) {
    //   case "priceLess":
    //     setState({
    //       ...state,
    //       priceLessThan: +event.target.value,
    //     });
    //     break;
    //   case "priceMore":
    //     setState({
    //       ...state,
    //       priceMoreThan: +event.target.value,
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }

  const handleFocus=()=>{
    document.getElementById("focus").focus();
  }

  const handleClick = (params) => {
    dispatch(resultFromFilterProduct(state, params.selected*6));
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
      price:[0,5000],
    });
    
    dispatch(resultFromFilterProduct({}, 0));

    // handleSearchClick();
    // setTimeout(() => {
    //   handleSearchClick();
    // }, 5000);
  }
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      Slider: {
        // Name of the rule
       text:{
        color:"secondary"

       }
        },
      
    },
  });
  
  const {t, i18n} = useTranslation();
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
        <input
          type="checkbox"
          id="trigger"
          onClick={handleFocus}
          class="search__checkbox"
        />
        <label class="search__label-init" for="trigger"></label>
        <label
          class="search__label-active"
          onClick={handleClear}
          for="trigger"
        ></label>
        <div class="search__border"></div>
        <input
          type="text"
          class="search__input"
          id="focus"
          name="search"
          onChange={handleSearchChange}
          value={state.search}
        />
        <div class="search__close"></div>
      </div>

      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3 text-center">
          {t("Filter.FilterOptions")}
        </h4>
      </div>
      <hr style={{ borderColor: "grey", border: "1px solid" }} />
      {/* <div className="mb-5" style={{ marginTop: "120px" }}>
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
        <label
          htmlFor="customRange"
          className="form-label ml-2"
          style={{ fontSize: "20px", fontWeight: "700" }}
        >
          {t("repeated.From")} {state.priceLessThan}
        </label>
      </div> */}
      <div className={classes.root}>
        <Typography id="range-slider" className="text-center" gutterBottom style={{ fontSize:"25px",fontWeight:"600" }}>
          {t("Filter.PriceRange")}
        </Typography>
        <ThemeProvider theme={theme}>
        <Slider
          value={state.price}
          max={5000}
          min={0}
          name="price"
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          style={{color:"black",fontWeight:"600"}}
        />
       </ThemeProvider>
      </div>
      {/* <div className="mb-5">
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
        <label
          htmlFor="customRange"
          className="form-label ml-2"
          style={{ fontSize: "20px", fontWeight: "700" }}
        >
          {t("repeated.To")} {state.priceMoreThan}{" "}
        </label>
      </div> */}

      <div className="mb-5">
        <select
          value={state.brand}
          name="brand"
          onChange={handleChange}
          className="custom-select custom-select-lg mb-3"
          style={{ fontWeight: "700" }}
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
          value={state.model}
          disabled={!state.brand}
          name="model"
          onChange={handleChange}
          className="custom-select custom-select-lg mb-3"
          style={{ fontWeight: "700" }}
        >
          <option value="" key="no-value" style={{ fontWeight: "700" }}>
            {t("Filter.ChooseModel")}
          </option>

          {stateRedux.model.map((item, index) => (
            <option
              value={item.model}
              key={index}
              style={{ fontWeight: "700" }}
            >
              {item.model}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSearchClick}
        className="btn btn-dark mr-2"
        style={{ fontWeight: "700", height: "60px" }}
        // style={{
        //   background:
        //     "linear-gradient(to right, rgb(197, 191, 191),  green )",
        // }}
      >
        {t("Filter.ApplyFilter")}
      </button>
      <button
        type="button"
        className="btn btn-danger "
        style={{ fontWeight: "700", height: "60px" }}
        // style={{
        //   background:
        //     "linear-gradient(to right, rgb(197, 191, 191),  red )",
        // }}
        onClick={handleClear}
      >
        {t("Filter.ClearFilter")}
      </button>
      <div
        className="pagination"
        style={{
          zIndex: "100",
          position: "absolute",
          left: "420px",
          bottom: "-11.5%",
          height: "50px",
        }}
      >
        {products && itemsInDB > 6 && (
          <PaginationReact
            NumberOfItemsInDB={itemsInDB}
            NumberToShow={6}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}
