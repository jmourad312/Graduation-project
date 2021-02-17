import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { instance } from "../network/axiosConfig";

export default function AddPartCar(props) {
  const [state, setState] = useState({
    Brand: "",
    Model: "",
    Collection: "",
    brandForModel: "",
  });

  const [stateAxios, setStateAxios] = useState({
    Brand: [],
    Model: [],
    Collection: [],
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name == "brandForModel") {
      getModel(value);
    }
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const getBrand = async () => {
    try {
      const res = await instance.get(`admin/getBrand`);
      console.log(res);
      await setStateAxios({
        ...stateAxios,
        Brand: res.data.Data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setBrandData = async () => {
    try {
      console.log(state.Brand);
      const res = await instance.post(
        `admin/addBrand`,
        { name: state.Brand },
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getBrand();
  };

  const getModel = async (parameter) => {
    console.log(state);
    try {
      const res = await instance.get(`admin/getModel/${parameter}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      setStateAxios({
        ...stateAxios,
        Model: res.data.Data[0].carModel,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sentModelData = async (parameter) => {
    try {
      const res = await instance.post(
        `admin/addModel/${state.brandForModel}`,
        { model: state.Model },
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getModel();
  };

  const getCollection = async (parameter) => {
    try {
      const res = await instance.get(`admin/getCollection`);
      console.log(res);
     await setStateAxios({
        ...stateAxios,
        Collection: res.data.Data,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const sentCollectionData = async () => {
    try {
      const res = await instance.post(
        `admin/addCollection`,
        { type: state.Collection },
        { headers: { Authorization: localStorage.getItem("Authorization") } }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
    getCollection();
  }, []);

  return (
    <>
      <div className="admin">
        <div className="container-for-admin">
          <Navbar />

          {/* ADD */}
          <div className="container m-5">
            {/* ADD BRAND */}
            <div class="input-group mt-3 pt-5 mt-5">
              <div class="input-group-prepend">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Show Brand
                </button>
                <div class="dropdown-menu">
                  {stateAxios.Brand.map((item, index) => {
                    return <a class="dropdown-item">{item.name}</a>;
                  })}
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                value={state.Brand}
                name="Brand"
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.which == 13) setBrandData();
                }}
                placeholder="Add Brand"
              />
            </div>



            {/* ADD Model */}
            <div class="input-group mt-3 pt-5 mt-5">
              <div class="input-group-prepend">
                <select
                  value={state.brandForModel}
                  name="brandForModel"
                  onChange={handleChange}
                  className="custom-select custom-select-md mb-3"
                >
                  <option value="" key="no-value">
                    choose Brand
                  </option>
                  {stateAxios.Brand.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  disabled={!stateAxios.Brand}
                >
                  Show Model
                </button>
                <div class="dropdown-menu">
                  {stateAxios.Model.length != 0 &&
                    stateAxios.Model.map((item, index) => {
                      return <a class="dropdown-item">{item.model}</a>;
                    })}
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                value={state.Model}
                name="Model"
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.which == 13) sentModelData();
                }}
                placeholder="Add Model"
              />
            </div>



            {/* ADD Collection */}
            <div class="input-group mt-3 pt-5 mt-5">
              <div class="input-group-prepend">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Show Collection
                </button>
                <div class="dropdown-menu">
                  {stateAxios.Collection.length !=0 && stateAxios.Collection.map((item, index) => {
                    return <a class="dropdown-item">{item.type}</a>;
                  })}
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                value={state.Collection}
                name="Collection"
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.which == 13) senstCollectionData();
                }}
                placeholder="Add Collection"
              />
            </div>
          
          
          </div>
        </div>
      </div>
    </>
  );
}
