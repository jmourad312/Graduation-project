import React from "react";
import cars2 from "../assets/js/cars2";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";

export default function BlogFilter(props) {
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
        <Dropdown mapItems={cars2} name="brand" />
        <div className="row">
          <div className="col-6">
            <Dropdown2
              id="modelId"
              name="model"
              list="modelList"
              Items={cars2}
              class="w-75 m-0 p-0"
              placeholder="Type your model"
            />
          </div>
          <div className="col-6">
            <Dropdown2
              id="categoryId"
              name="category"
              list="categoryList"
              Items={cars2}
              class="w-75 m-0 p-0"
              placeholder="Choose your category"
            />
          </div>
        </div>
        {/* <Dropdown2
          label="Model"
          id="modelId"
          name="model"
          list="modelList"
          Items={cars2}
          class="w-75"
          placeholder="Type your model"
        /> */}
        {/* <p>
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
          </p> */}
      </div>
      <div>
        <select name="" id="" className="custom-select custom-select-sm mb-3">
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
