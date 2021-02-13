import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Tabel } from "../../components/Tabel";
import { Button2 } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Navbar } from "../../components/Navbar";
import { instance } from "../../network/axiosConfig";

import {
  getUserAction,
  getVendorAction,
  getCountDataAction,
  getContactAction,
} from "../../store/action";
import { useSelector, useDispatch } from "react-redux";

export default function Admin(props) {
  const numberItemPerPage = 5;

  const [state, setState] = useState({
    user: [],
    vendor: [],
    blogs: [],
    products: [],
    contacts: [],
  });

  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction);
    dispatch(getVendorAction);
    dispatch(getCountDataAction);
    dispatch(getContactAction);
    getCountData();
  }, []);

  const getCountData = async () => {
    try {
      const res = await instance.get("admin/countAll", {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setData = (countData) => {
    setBarData({
      ...BarData,
      datasets: [
        {
          data: [
            countData.Data.user,
            countData.Data.vendor,
            countData.Data.product,
            countData.Data.blogs,
          ],
        },
      ],
    });
    setPieData({
      ...BarData,
      datasets: [
        {
          data: [
            countData.Data.user,
            countData.Data.vendor,
            countData.Data.product,
            countData.Data.blogs,
          ],
        },
      ],
    });
  };

  const banneduser = async (parameter) => {
    try {
      if (parameter.banned == false) {
        const res = await instance.post(
          "admin/addUserBan",
          { id: parameter.person._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      } else {
        const res = await instance.post(
          "admin/removeUserBan",
          { id: parameter.person._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bannedvendor = async (parameter) => {
    try {
      if (parameter.banned == false) {
        const res = await instance.post(
          "admin/addVendorBan",
          { id: parameter.person._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      } else {
        const res = await instance.post(
          "admin/removeVendorBan",
          { id: parameter.person._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToEditUser = async (parameter) => {
    props.history.push({
      pathname: "/EditUser",
      state: { data: parameter },
    });
  };

  const goToEditVendor = async (parameter) => {
    props.history.push({
      pathname: "/EditVendor",
      state: { data: parameter },
    });
  };

  const goToDeleteUser = async (parameter) => {
    try {
      const res = await instance.delete(`admin/deleteUser/${parameter}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const goToDeleteVendor = async (parameter) => {
    try {
      const res = await instance.delete(`admin/deleteVendor/${parameter}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const ProductsVendor = (parameter) => {
    props.history.push({
      pathname: "/Items",
      state: { data: parameter },
    });
  };

  const BlogsUser = (parameter) => {
    props.history.push({
      pathname: "/Blogs",
      state: { data: parameter },
    });
  };

  //console.log(stateRedux.countData.Data)
  //console.log(stateRedux.vendors)
  const getPartUser = (skip) => {
    setState({
      ...state,
      user: stateRedux.users.Data.slice(skip, skip + numberItemPerPage),
    });
  };
  const getPartVendor = (skip) => {
    setState({
      ...state,
      vendor: stateRedux.vendors.Data.slice(skip, skip + numberItemPerPage),
    });
  };

  const getPartBlog = (skip) => {
    setState({
      ...state,
      blogs: stateRedux.users.Data.slice(skip, skip + numberItemPerPage),
    });
  };

  const getPartProduct = (skip) => {
    setState({
      ...state,
      products: stateRedux.vendors.Data.slice(skip, skip + numberItemPerPage),
    });
  };

  const getPartContant = (skip) => {
    setState({
      ...state,
      contacts: stateRedux.contacts.Data.slice(skip, skip + numberItemPerPage),
    });
  };

  const [BarData, setBarData] = useState({
    labels: ["Users", "Vendors", "Products", "Blogs"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"],
        borderWidth: 1,
      },
    ],
    plotOptions: {
      series: {
        colorByPoint: true,
        dataLabels: {
          allowOverlap: true,
        },
      },
      /* ... */
    },
  });

  const [PieData, setPieData] = useState({
    labels: ["Users", "Vendors", "Products", "Blogs"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"],
      },
    ],
  });

  return (
    <div className="admin">
      <div className="container-for-admin">
        {/* Main Navigation */}
        <header>
          {/* Navbar */}

          <Navbar />
          {/* Sidebar */}
          <div className="sidebar-fixed bg-dark position-fixed">
            <div className="list-group list-group-flush mt-5">
              <a
                href="#Dashboard"
                className="list-group-item active waves-effect"
              >
                <i className="fas fa-lg mr-3">Dashboard</i>
              </a>
              <a
                href="#userTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fa fa-lg fa-user mr-4">User </i>
              </a>
              <a
                href="#vendorTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i class="fas fa-lg fa-hard-hat mr-2">Vendor</i>
              </a>
              <a
                href="#blogTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fab fa-lg fa-blogger mr-4">Blog</i>
              </a>
              <a
                href="#productTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fab fa-lg fa-product-hunt mr-1">Product</i>
              </a>
              <a
                href="#contactTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fab fa-lg fa-product-hunt mr-1">message from contact</i>
              </a>



            </div>
          </div>
        </header>
        {/* Main Navigation */}

        {/* Main layout */}
        <main className="pt-5 mx-lg-5">
          <div className="container-fluid mt-5">
            {/* Heading */}
            <div className="card mb-4 wow fadeIn">
              <div className="card-body d-sm-flex justify-content-between">
                <h4 className="mb-2 mb-sm-0 pt-1">
                  <span>Dashboard</span>
                </h4>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="row wow fadeIn">
              <div className="col-md-7 mb-4">
                <div className="card">
                  <div className="card-body">
                    <Bar
                      data={BarData}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20,
                        },
                        legend: { display: true, labels: { fontSize: 30 } },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-5 mb-4">
                <div className="card mb-4">
                  <div className="card-header text-center">Pie chart</div>
                  <div className="card-body">
                    <Pie
                      data={PieData}
                      options={{
                        title: {
                          display: true,
                          text: "Average Rainfall per month",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "right",
                          labels: { fontSize: 15 },
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="card mb-4">
                  <div className="card-body">
                    {/*List group links*/}
                    <div className="list-group list-group-flush">
                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px" }}
                      >
                        No.Users
                        <span className="badge badge-info badge-pill pull-right ml-2">
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.user}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px" }}
                      >
                        No.Vendors
                        <span className="badge badge-info badge-pill pull-right ml-2">
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.vendor}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px" }}
                      >
                        No.Products
                        <span className="badge badge-info badge-pill pull-right ml-2">
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.product}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px" }}
                      >
                        No.Blogs
                        <span className="badge badge-info badge-pill pull-right ml-2">
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.blogs}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User List */}
            {stateRedux.users.length != 0 && (
              <>
                <h3>Users</h3>
                <div onLoad={() => getPartUser(0)}></div>
                <Tabel
                  id="userTabel"
                  data={state.user}
                  handelClick={banneduser}
                  handelClickEdit={goToEditUser}
                  handelClickDelete={goToDeleteUser}
                ></Tabel>
                <Pagination
                  NumberOfItemsInDB={stateRedux.users.Data.length}
                  NumberToShow={numberItemPerPage}
                  handelClick={getPartUser}
                />
                <hr style={{ border: "1px solid" }} />
              </>
            )}

            {/* Vendor List */}
            {stateRedux.vendors.length != 0 && (
              <>
                <h3>Vendors</h3>
                <Tabel
                  id="vendorTabel"
                  data={state.vendor}
                  handelClick={bannedvendor}
                  handelClickEdit={goToEditVendor}
                  handelClickDelete={goToDeleteVendor}
                ></Tabel>
                <Pagination
                  NumberOfItemsInDB={stateRedux.vendors.Data.length}
                  NumberToShow={numberItemPerPage}
                  handelClick={getPartVendor}
                />
                <hr style={{ border: "1px solid" }} />
              </>
            )}

            {/* Blog List */}
            {stateRedux.users.length != 0 && (
              <div className=" row wow fadeIn" id="blogTabel">
                <div className="col-md-12 mb-4">
                  <h3>Blogs</h3>
                  <div className="card mb-4">
                    <div className="card-body">
                      <table className="table table-hover">
                        <thead className="blue-grey lighten-4">
                          <tr>
                            <th>Index</th>
                            {/* <th>User ID</th> */}
                            <th>User name</th>
                            <th>Number of blogs</th>
                            <th>Details</th>
                          </tr>
                        </thead>

                        <tbody>
                          {state.blogs.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                {/* <td>{item.person._id}</td> */}
                                <td>{item.person.firstName}</td>
                                <td>{item.postsUser.length}</td>
                                <td>
                                  <Button2
                                    disabled={item.postsUser.length == 0}
                                    className="page-link"
                                    parameter={item.person}
                                    key={index + 1}
                                    handelClick={BlogsUser}
                                    name={
                                      <i
                                        style={{ fontSize: "20px" }}
                                        className="fas fa-pen ml-1"
                                      ></i>
                                    }
                                  ></Button2>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination
                    NumberOfItemsInDB={stateRedux.users.Data.length}
                    NumberToShow={numberItemPerPage}
                    handelClick={getPartBlog}
                  />
                  <hr style={{ border: "1px solid" }} />
                </div>
              </div>
            )}
            {/* product List */}
            {stateRedux.vendors.length != 0 && (
              <div className="row wow fadeIn" id="productTabel">
                <div className="col-md-12 mb-4">
                  <h3>Products</h3>
                  <div className="card mb-4">
                    <div className="card-body">
                      <table className="table table-hover">
                        <thead className="blue-grey lighten-4">
                          <tr>
                            <th>Index</th>
                            {/* <th>Vendor ID</th> */}
                            <th>Vendor name</th>
                            <th>Number of product</th>
                            <th>Details</th>
                          </tr>
                        </thead>

                        <tbody>
                          {state.products.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                {/* <td>{item.person._id}</td> */}
                                <td>{item.person.firstName}</td>
                                <td>{item.vendorItems.length}</td>

                                <td>
                                  <Button2
                                    disabled={item.vendorItems.length == 0}
                                    className="page-link"
                                    parameter={item.person}
                                    key={index + 1}
                                    handelClick={ProductsVendor}
                                    name={
                                      <i
                                        style={{ fontSize: "20px" }}
                                        className="fas fa-pen ml-1"
                                      ></i>
                                    }
                                  ></Button2>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination
                    NumberOfItemsInDB={stateRedux.vendors.Data.length}
                    NumberToShow={numberItemPerPage}
                    handelClick={getPartProduct}
                  />
                  <hr style={{ border: "1px solid" }} />
                </div>
              </div>
            )}

            {/* ContactUs */}
            {stateRedux.users.length != 0 && (
              <div className=" row wow fadeIn" id="contactTabel">
                <div className="col-md-12 mb-4">
                  <h3>Messages from ContactUs</h3>
                  <div className="card mb-4">
                    <div className="card-body">
                      <table className="table table-hover">
                        <thead className="blue-grey lighten-4">
                          <tr>
                            <th>Index</th>
                            {/* <th>User ID</th> */}
                            <th>Email</th>
                            <th>Message</th>
                          </tr>
                        </thead>

                        <tbody>
                          {state.contacts.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                {/* <td>{item.person._id}</td> */}
                                <td>{item.email}</td>
                                <td>{item.message}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination
                    NumberOfItemsInDB={stateRedux.contacts.Data.length}
                    NumberToShow={numberItemPerPage}
                    handelClick={getPartContant}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
