import React from 'react'
import { useState } from "react";
import Dropdown2 from './Dropdown2';
import cars2 from '../assets/js/cars2';

export default function BlogFilter(props) {


  const [state, setState] = useState({
    model: "",
    brand: "",
    classDisabled:"false"
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
    // switch (event.target.name) {
    //   case "model":
    //     setState({
    //       ...state,
    //       model: event.target.value,
    //     });
    //     break;
    //   case "brand":
    //     setState({
    //       ...state,
    //       brand: event.target.value
    //     });
    //     break;
    // }
  }

  return (
    <div className={props.class}>
      <div className="mb-4 ml-2" filter="price">
        <h6 className="font-weight-bold mb-3">Sort Options</h6>

        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="New" />
          <label className="custom-control-label text-primary mb-2" for="New">
            New
          </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="Hot" />
          <label className="custom-control-label text-danger mb-2" for="Hot">
            Hot
          </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="Answered"
          />
          <label
            className="custom-control-label text-success mb-2"
            for="Answered"
          >
            Answered
          </label>
        </div>
      </div>
      <div className="mb-5">
        <select
          value={state.model}
          name="model"
          onChange={handleChange}
          className="custom-select custom-select-lg mb-3"
        >
          <option value="BMW">BMW</option>
          <option value="RENAULT">RENAULT</option>
          <option value="MERCEDES">MERCEDES</option>
          <option value="JEEP">JEEP</option>
        </select>
        <p>
          <span className="badge badge-secondary">
            Mercedes <span className="badge badge-danger">X</span>
          </span>
          <span className="badge badge-secondary">
            BMW <span className="badge badge-danger">X</span>
          </span>
          <span className="badge badge-secondary">
            RENAULT <span className="badge badge-danger">X</span>
          </span>
          <span className="badge badge-secondary">
            JEEP <span className="badge badge-danger">X</span>
          </span>
        </p>
      </div>
      <Dropdown2
        // list="MODEL"
        // name="MODEL"
        // placeholder="MODEL"
        Items={cars2}
      />
      <div>
        <select
          value={state.brand}
          disabled={!state.model}
          name="brand"
          onChange={handleChange}
          className="custom-select custom-select-sm mb-3"
        >
          <option value="BMWx3">BMW X3</option>
          <option value="BMWx2">BMW X2</option>
          <option value="MERCEDES">MERCEDES A-className</option>
        </select>
        <p>
          <span className="badge badge-secondary">
            BMW X3 <span className="badge badge-danger">X</span>
          </span>
          <span className="badge badge-secondary">
            BMW X2<span className="badge badge-danger">X</span>
          </span>
          <span className="badge badge-secondary">
            MERCEDES A-className
            <span className="badge badge-danger">X</span>
          </span>
        </p>
      </div>
    </div>
  );
}
