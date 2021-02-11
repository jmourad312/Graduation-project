import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import cars2 from '../assets/js/cars2';
import cars from "../assets/js/cars";
import { useDispatch, useSelector } from 'react-redux';
import { filterCarBrand, filterCarModel, resultFromFilterProduct } from '../store/actions';
import SimpleSearch from './SimpleSearch';


export default function ProductFilter(props) {
  const [state, setState] = useState({
    model: "",
    brand: "",
    search: "",
    priceMoreThan: 0,
    priceLessThan: 0
  });

  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCarBrand());
  }, []);

  const actionToFilterOption = () => {

    dispatch(resultFromFilterProduct(state))

  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case "brand":
        setState({
          ...state,
          brand: event.target.value,
        });
        dispatch(filterCarModel(event.target.value))
        break;
      case "model":
        setState({
          ...state,
          model: event.target.value,
        });
        break;
      case "search":
        setState({
          ...state,
          search: event.target.value,
        });
        break;
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
    }
  };

  return (
  
    <div className={props.className}>
      {/* <SimpleSearch /> */}
      <div className="input-group mb-3">
        <input type="text" name="search" onChange={handleChange} value={state.search} className="form-control" placeholder="Search" />
        <div className="input-group-append">
          <button className="btn" style={{background: "linear-gradient(to right,  rgb(197, 191, 191),  rgb(88, 84, 84) )"}} onClick={actionToFilterOption} type="button">Go</button>
        </div>
      </div>

      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3">Filter Options</h4>
      </div>

      <div className="mb-5">
        <input type="range" name="priceLess" onChange={handleChange} value={state.priceLessThan} className="form-range" min="0" max="100" step="10" />
        <label htmlFor="customRange" className="form-label ml-2">Form: {state.priceLessThan}</label>
      </div>

      <div className="mb-5">
        <input type="range" name="priceMore" onChange={handleChange} value={state.priceMoreThan} className="form-range" min="100" max="500" step="10" />
        <label htmlFor="customRange" className="form-label ml-2">To: {state.priceMoreThan} </label>
      </div>

      <div className="mb-5">
        <select
          value={state.brand}
          name="brand"
          onChange={handleChange}
          className="custom-select custom-select-md mb-3"
        >
          <option value="" key="no-value">choose Brand</option>
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
          <option value="" key="no-value">choose Model</option>

          {stateRedux.model.map((item, index) => (
            <option value={item.model} key={index}>
              {item.model}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={actionToFilterOption} className="btn btncenter" style={{background: "linear-gradient(to right, rgb(197, 191, 191),  rgb(88, 84, 84) )"}}>Confirm Filter</button>

    </div>
    
  );
}
