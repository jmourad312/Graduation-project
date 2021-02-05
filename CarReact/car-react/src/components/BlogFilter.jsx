import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {filterCarModel, filterCarBrand, resultFromFilter} from '../store/actions'


export default function BlogFilter(props) {
  const [state, setState] = useState({
    model: "",
    brand: "",
  });

  const stateRedux = useSelector((state) => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCarBrand())
  }, [])

  const handleChange =  (event) => {

    switch (event.target.name) {
      case "brand":
        setState({
          ...state,
          brand: event.target.value,
        });
        dispatch(resultFromFilter({brand:event.target.value}))
        dispatch(filterCarModel(event.target.value))

        break;
      case "model":
        setState({
          ...state,
          model: event.target.value
        });
        dispatch(resultFromFilter({brand:state.brand,model:event.target.value}))

        break;
    }
  };

  return (
    <div className={props.class}>
      <div className="mb-4 ml-2" filter="price">
        <h4 className="font-weight-bold mb-3">Filter Options</h4>
      </div>

      <div className="mb-5">
        <select value={state.brand} name="brand" onChange={handleChange} className="custom-select custom-select-lg mb-3">
          {
            stateRedux.brand.map((item, index) => 
              <option value={item.name} key={index}>{item.name}</option>
            )
          }
        </select>
      </div>

      <div>
        <select value={state.model} disabled={!state.brand} name="model" onChange={handleChange} className="custom-select custom-select-sm mb-3">
          {
            stateRedux.model.map((item, index) => 
              <option value={item.model} key={index}>{item.model}</option>
            )
          }
        </select>
      </div>

    </div>
  );
}
