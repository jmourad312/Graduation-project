import { Navbar } from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { instance } from "../network/axiosConfig";
import { Button2 } from "../components/Button";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { InputField } from "../components/InputField";

export default function AddPartCar(props) {
  const [state, setState] = useState({
    Brand: "",
    Model: "",
    Collection: "",
    brandForModel: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (name, id, edit) => {
    setShow(true);
    setEdit({
      name: name,
      id: id,
      whatEdit: edit,
    });
  };

  const [edit, setEdit] = useState({
    name: "",
    id: 0,
    whatEdit: "",
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

  const handleEdit = (event) => {
    setEdit({
      ...edit,
      name: event.target.value,
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
    getModel(state.brandForModel);

  };

  const getCollection = async () => {
    try {
      const res = await instance.get(`admin/getCollection`);
      console.log(res);
      setStateAxios({
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

  const handelClickEditModel = async () => {
    setShow(false);

    try {
      const res = await instance.put(`admin/updateModel/${edit.id}`, { model: edit.name }, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getModel(state.brandForModel);
  };
  const handelClickDeleteModel = async (parameter) => {
    try {
      const res = await instance.delete(`admin/deleteModel/${parameter._id}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getModel(state.brandForModel);
  };

  const handelClickEditBrand = async () => {
    setShow(false);
    try {
      const res = await instance.put(
        `admin/updateBrand/${edit.id}`,
        { name: edit.name },
        {
          headers: { Authorization: localStorage.getItem("Authorization") },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getBrand();
  };
  const handelClickDeleteBrand = async (parameter) => {
    try {
      const res = await instance.delete(`admin/deleteBrand/${parameter._id}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    getBrand();
  };

  const Edit = () => {
    if (edit.whatEdit == "Model") {
      handelClickEditModel();
    }
    if (edit.whatEdit == "Brand") {
      handelClickEditBrand();
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  const searchTabel = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const searchTabel2 = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable2");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const searchTabel3 = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput3");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable3");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="container-for-admin mb-5">
          <Navbar />
          {/* BRAND  */}
          <div className="container tabel mt-5 pt-5">
            <h3>Brand In Database</h3>
            <input
              type="text"
              className="form-control mb-2"
              value={state.Brand}
              name="Brand"
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => {
                if (e.which == 13) setBrandData();
              }}
              placeholder="Write a Brand and click enter to save it in the database"
            />
            <input
              type="text"
              id="myInput"
              onKeyUp={searchTabel}
              placeholder="Search for Brand"
            />

            <table id="myTable" className="table table-hover">
              <thead >
                <tr >
                  <th className="text-center">Index</th>
                  <th className="text-center">Brand</th>
                  <th className="pl-5">Edit</th>
                  <th className="pl-5">Delete</th>
                </tr>
              </thead>
              <tbody >
                {stateAxios.Brand.map((item, index) => {
                  return (
                    <tr key={index + 1} >
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center w-50">{item.name}</td>
                      <td>
                        <Button
                          className="page-link"
                          style={{ width: "70%", height: "40px" }}
                          onClick={() => {
                            handleShow(item.name, item._id, "Brand");
                          }}
                        >
                          <i
                            style={{ fontSize: "20px" }}
                            className="fas fa-pen"
                          ></i>
                        </Button>
                      </td>

                      <td>
                        <Button
                          className="page-link"
                          style={{ width: "65%" }}
                          key={index + 1}
                          onClick={() => handelClickDeleteBrand(item)}>
                          <i style={{ fontSize: "20px" }} className="fas fa-trash "></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <hr style={{ border: "1px solid" }} />
          </div>


          {/* Model */}
          <div className="container tabel mt-5 pt-5">
            <h3>Model In Database</h3>
            <select
              value={state.brandForModel}
              name="brandForModel"
              onChange={handleChange}
              className="custom-select custom-select-md mb-3"
            >
              <option value="" key="no-value">
                Choose a brand to see its models
              </option>
              {stateAxios.Brand.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <div hidden={!state.brandForModel}>
              <input
                type="text"
                className="form-control mb-2"
                value={state.Model}
                name="Model"
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.which == 13) sentModelData();
                }}
                placeholder="Write a model and click enter to save it in the database"
              />

              <input
                type="text"
                id="myInput2"
                onKeyUp={searchTabel2}
                placeholder="Search for Brand.."
              />

              <table id="myTable2" className="table table-hover">
                <thead>
                  <tr >
                    <th className="text-center">Index</th>
                    <th className="text-center">Model</th>
                    <th className="pl-5">Edit</th>
                    <th className="pl-5">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {stateAxios.Model.length != 0 &&
                    stateAxios.Model.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center w-50">{item.model}</td>
                          <td>
                            <Button
                              className="page-link"
                              style={{ width: "75%" }}
                              onClick={() => {
                                handleShow(item.model, item._id, "Model");
                              }}
                            >
                              <i
                                style={{ fontSize: "20px" }}
                                className="fas fa-pen"
                              ></i>
                            </Button>
                          </td>

                          <td>
                            <Button
                              className="page-link"
                              style={{ width: "65%" }}
                              key={index + 1}
                              onClick={() => handelClickDeleteModel(item)}>
                              <i style={{ fontSize: "20px" }} className="fas fa-trash "></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collection */}
          {/* <div className="container tabel mt-5">
            <button className="btn btn-success" onClick={getCollection}>
              Get Collection
            </button>
            <div hidden={stateAxios.Collection.length == 0}>
              <input
                type="text"
                class="form-control"
                value={state.Collection}
                name="Collection"
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (e.which == 13) sentCollectionData();
                }}
                placeholder="Add Collection"
              />
              <input
                type="text"
                id="myInput3"
                onKeyUp={searchTabel3}
                placeholder="Search for names.."
              />

              <table id="myTable3" className="table table-hover">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Collection</th>
                  </tr>
                </thead>
                <tbody>
                  {stateAxios.Collection.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td contenteditable="true">{item.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField
            value={edit.name}
            type="text"
            handleChange={(e) => handleEdit(e)}
            className="form-control"
            name="name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Edit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
