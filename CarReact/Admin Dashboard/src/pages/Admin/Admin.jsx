import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Tabel } from "../../components/Tabel";
import { Pagination } from "../../components/Pagination";
import { Navbar } from "../../components/Navbar";
import { instance } from "../../network/axiosConfig";
import { PaginationReact } from "../../components/PaginationReact";

import {
  getUserAction,
  getVendorAction,
  getCountDataAction,
  getContactAction,
  getBlogAction,
  getProductAction,
  getAdsAction,
} from "../../store/action";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

export default function Admin(props) {
  const numberItemPerPage = 5;

  const [state, setState] = useState({
    searchUser: "",
    searchVendor: "",
    searchBlog: "",
    searchProduct: "",
    searchContact: "",
    searchAds: "",
  });

  const searchTabel = (event) => {
    const { value, name } = event.target;
    setState((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const countReport = (itemPost) => {
    let counter = 0;

    itemPost.map((item, intex) => {
      counter = counter + item.reportPosts.length;
    });
    return counter;
  };

  const [skipState, setSkipState] = useState({
    user: 0,
    vendor: 0,
    blog: 0,
    product: 0,
    contact: 0,
    ad: 0,
  });

  const stateRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction(0));
    dispatch(getVendorAction(0));
    dispatch(getCountDataAction);
    dispatch(getContactAction(0));
    dispatch(getBlogAction(0));
    dispatch(getProductAction(0));
    dispatch(getAdsAction(0));

    getCountData();
  }, []);

  useEffect(() => {
    getCountData();
    dispatch(getCountDataAction);
  }, [stateRedux]);

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
          { id: parameter._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      } else {
        const res = await instance.post(
          "admin/removeUserBan",
          { id: parameter._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getUserAction(skipState.user, state.searchUser));
  };

  const bannedvendor = async (parameter) => {
    try {
      if (parameter.banned == false) {
        const res = await instance.post(
          "admin/addVendorBan",
          { id: parameter._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      } else {
        const res = await instance.post(
          "admin/removeVendorBan",
          { id: parameter._id },
          { headers: { Authorization: localStorage.getItem("Authorization") } }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getVendorAction(skipState.vendor, state.searchVendor));
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
    dispatch(getUserAction(skipState.user, state.searchUser));
    dispatch(getBlogAction(0, state.searchBlog));
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
    dispatch(getVendorAction(skipState.vendor, state.searchVendor));
    dispatch(getProductAction(0, state.searchProduct));
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

  const getPartUser = (skip) => {
    console.log(skip);
    setSkipState({ ...skipState, user: skip.selected * numberItemPerPage });
    dispatch(
      getUserAction(skip.selected * numberItemPerPage, state.searchUser)
    );
  };

  const getPartVendor = (skip) => {
    setSkipState({ ...skipState, vendor: skip.selected * numberItemPerPage });
    dispatch(
      getVendorAction(skip.selected * numberItemPerPage, state.searchVendor)
    );
  };

  const getPartBlog = (skip) => {
    setSkipState({ ...skipState, blog: skip.selected * numberItemPerPage });
    dispatch(getBlogAction(skip.selected * numberItemPerPage));
  };

  const getPartProduct = (skip) => {
    setSkipState({ ...skipState, product: skip.selected * numberItemPerPage });
    dispatch(getProductAction(skip.selected * numberItemPerPage));
  };

  const getPartContant = (skip) => {
    setSkipState({ ...skipState, contact: skip.selected * numberItemPerPage });
    dispatch(getContactAction(skip.selected * numberItemPerPage));
  };

  const getPartAds = (skip) => {
    setSkipState({ ...skipState, ad: skip.selected * numberItemPerPage });
    dispatch(getAdsAction(skip.selected * numberItemPerPage));
  };

  const deleteAds = async (id) => {
    try {
      const res = await instance.delete(`admin/deleteAds/${id}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    dispatch(getAdsAction(skipState.ad));
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
                style={{ background: "#1687a7" }}
              >
                <i className="fas fa-lg mr-3">Dashboard</i>
              </a>
              <a
                href="#userTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i className="fa fa-lg fa-user mr-4"> User </i>
              </a>
              <a
                href="#vendorTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i class="fas fa-lg fa-hard-hat mr-2"> Vendor</i>
              </a>
              <a
                href="#blogTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i
                  className="fab fa-lg fa-blogger mr-4"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  Blog
                </i>
              </a>
              <a
                href="#productTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i
                  className="fab fa-lg fa-product-hunt mr-1"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  Product
                </i>
              </a>
              <a
                href="#contactTabel"
                className="list-group-item list-group-item-action waves-effect"
              >
                <i
                  className="fa fa-envelope mr-1"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  {" "}
                  Message from contact
                </i>
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
                  <span style={{ color: "#495057" }}>Dashboard</span>
                </h4>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="row wow fadeIn">
              <div className="col-7 mb-4">
                <div className="card mb-4">
                  <div
                    className="card-header text-center"
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#495057",
                    }}
                  >
                    Pie chart
                  </div>
                  <div className="card-body">
                    <Pie
                      data={PieData}
                      options={{
                        title: {
                          display: true,
                          text: "Relations Between Data",
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
              </div>

              <div className="col-5 mb-4">
                <div className="card">
                  <div
                    className="card-body"
                    style={{ paddingTop: "100px", height: "445px" }}
                  >
                    <div className="list-group list-group-flush">
                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px", fontWeight: "700" }}
                      >
                        No.Users
                        <span
                          className="badge badge-info badge-pill pull-right ml-5"
                          style={{ fontSize: "20px" }}
                        >
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.user}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px", fontWeight: "700" }}
                      >
                        No.Vendors
                        <span
                          className="badge badge-info badge-pill pull-right ml-4"
                          style={{ fontSize: "20px" }}
                        >
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.vendor}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px", fontWeight: "700" }}
                      >
                        No.Products
                        <span
                          className="badge badge-info badge-pill pull-right ml-3"
                          style={{ fontSize: "20px" }}
                        >
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.product}
                        </span>
                      </a>

                      <a
                        className="list-group-item list-group-item-action waves-effect"
                        style={{ fontSize: "20px", fontWeight: "700" }}
                      >
                        No.Blogs
                        <span
                          className="badge badge-info badge-pill pull-right ml-5"
                          style={{ fontSize: "20px" }}
                        >
                          {stateRedux.countData.Success == true &&
                            stateRedux.countData.Data.blogs}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ border: "1px solid" }} />
            {/* User List */}
            {stateRedux.users.length != 0 && (
              <>
                <h3>Users</h3>
                <label style={{ fontWeight: "700" }}>
                  Search by user name or email
                </label>
                <br />
                <input
                  type="text"
                  name="searchUser"
                  style={{
                    marginBottom: "10px",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  value={state.searchUser}
                  onChange={searchTabel}
                  onKeyPress={(e) => {
                    if (e.which == 13)
                      dispatch(getUserAction(0, state.searchUser));
                  }}
                />
                <Tabel
                  id="userTabel"
                  data={stateRedux.users.Data}
                  index={skipState.user}
                  handelClick={banneduser}
                  handelClickEdit={goToEditUser}
                  handelClickDelete={goToDeleteUser}
                ></Tabel>
                {stateRedux.users.count.length > 5 && (
                  <PaginationReact
                    NumberOfItemsInDB={stateRedux.users.count.length}
                    NumberToShow={numberItemPerPage}
                    handelClick={getPartUser}
                  />
                )}
                <hr style={{ border: "1px solid" }} />
              </>
            )}

            {/* Vendor List */}
            {stateRedux.vendors.length != 0 && (
              <>
                <h3>Vendors</h3>
                <label style={{ fontWeight: "700" }}>
                  Search by user name or email
                </label>
                <br />
                <input
                  type="text"
                  name="searchVendor"
                  style={{
                    marginBottom: "10px",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  value={state.searchVendor}
                  onChange={searchTabel}
                  onKeyPress={(e) => {
                    if (e.which == 13)
                      dispatch(getVendorAction(0, state.searchVendor));
                  }}
                />
                <Tabel
                  id="vendorTabel"
                  data={stateRedux.vendors.Data}
                  index={skipState.vendor}
                  handelClick={bannedvendor}
                  handelClickEdit={goToEditVendor}
                  handelClickDelete={goToDeleteVendor}
                ></Tabel>

                {stateRedux.vendors.count.length > 5 && (
                  <PaginationReact
                    NumberOfItemsInDB={stateRedux.vendors.count.length}
                    NumberToShow={numberItemPerPage}
                    handelClick={getPartVendor}
                  />
                )}
                <hr style={{ border: "1px solid" }} />
              </>
            )}

            {/* Blog List */}
            {stateRedux.nblog.length != 0 && (
              <div className=" row wow fadeIn" id="blogTabel">
                <div className="col-md-12 mb-4">
                  <h3>Blogs</h3>
                  <label style={{ fontWeight: "700" }}>
                    Search by user name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="searchBlog"
                    style={{
                      marginBottom: "10px",
                      borderRadius: "10px",
                      outline: "none",
                    }}
                    value={state.searchBlog}
                    onChange={searchTabel}
                    onKeyPress={(e) => {
                      if (e.which == 13)
                        dispatch(getBlogAction(0, state.searchBlog));
                    }}
                  />
                  <div className="card mb-4">
                    <div className="card-body">
                      <table className="table table-hover">
                        <thead className="blue-grey lighten-4">
                          <tr>
                            <th>Index</th>
                            <th>User name</th>
                            <th># reports</th>
                            <th>Number of blogs</th>
                            <th>Details</th>
                          </tr>
                        </thead>

                        <tbody>
                          {stateRedux.nblog.Data.map((item, index) => {
                            return (
                              <tr
                                style={{
                                  backgroundColor:
                                    countReport(item.userId.postsUser) >= 3 &&
                                    countReport(item.userId.postsUser) <= 6
                                      ? "#d4d06a"
                                      : countReport(item.userId.postsUser) >= 7
                                      ? "#db6060"
                                      : "",
                                }}
                              >
                                <td style={{ fontWeight: "600" }}>
                                  {skipState.blog + index + 1}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.firstName}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {countReport(item.userId.postsUser)}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.userId.postsUser.length}
                                </td>
                                <td>
                                  <Button
                                    disabled={item.userId.postsUser.length == 0}
                                    className="page-link"
                                    style={{ width: "75%", marginLeft: "30px" }}
                                    key={index + 1}
                                    onClick={() => BlogsUser(item)}
                                  >
                                    <i
                                      style={{ fontSize: "20px" }}
                                      className="fas fa-pen ml-1"
                                    ></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {stateRedux.users.count.length > 5 && (
                    <PaginationReact
                      NumberOfItemsInDB={stateRedux.nblog.count.length}
                      NumberToShow={numberItemPerPage}
                      handelClick={getPartBlog}
                    />
                  )}
                  <hr style={{ border: "1px solid" }} />
                </div>
              </div>
            )}
            {/* product List */}
            {stateRedux.nproduct.length != 0 && (
              <div className="row wow fadeIn" id="productTabel">
                <div className="col-md-12 mb-4">
                  <h3>Products</h3>
                  <label style={{ fontWeight: "700" }}>
                    Search by vendor name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="searchProduct"
                    value={state.searchProduct}
                    style={{
                      marginBottom: "10px",
                      borderRadius: "10px",
                      outline: "none",
                    }}
                    onChange={searchTabel}
                    onKeyPress={(e) => {
                      if (e.which == 13)
                        dispatch(getProductAction(0, state.searchProduct));
                    }}
                  />
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
                          {stateRedux.nproduct.Data.map((item, index) => {
                            return (
                              <tr>
                                <td style={{ fontWeight: "700" }}>
                                  {skipState.product + index + 1}
                                </td>
                                {/* <td>{item.person._id}</td> */}
                                <td style={{ fontWeight: "700" }}>
                                  {item.firstName}
                                </td>
                                <td style={{ fontWeight: "700" }}>
                                  {item.vendorId.vendorItems.length}
                                </td>

                                <td>
                                  <Button
                                    disabled={
                                      item.vendorId.vendorItems.length == 0
                                    }
                                    className="page-link"
                                    style={{ width: "75%", marginLeft: "30px" }}
                                    key={index + 1}
                                    onClick={() => ProductsVendor(item)}
                                  >
                                    <i
                                      style={{ fontSize: "20px" }}
                                      className="fas fa-pen ml-1"
                                    ></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {stateRedux.vendors.count.length > 5 && (
                    <PaginationReact
                      NumberOfItemsInDB={stateRedux.nproduct.count.length}
                      NumberToShow={numberItemPerPage}
                      handelClick={getPartProduct}
                    />
                  )}
                  <hr style={{ border: "1px solid" }} />
                </div>
              </div>
            )}

            {/* ContactUs */}
            {stateRedux.contacts.length != 0 && (
              <div className=" row wow fadeIn" id="contactTabel">
                <div className="col-md-12 mb-4">
                  <h3>Messages from Contact Us</h3>
                  {/* <input
                      type="text"
                      name="searchContact"
                      value={state.searchContact}
                      onChange={searchTabel}
                    /> */}
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
                          {stateRedux.contacts.Data.map((item, index) => {
                            return (
                              <tr>
                                <td style={{ fontWeight: "600" }}>
                                  {skipState.contact + index + 1}
                                </td>
                                {/* <td>{item.person._id}</td> */}
                                <td style={{ fontWeight: "600" }}>
                                  {item.email}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.message}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {stateRedux.contacts.count > 5 && (
                    <PaginationReact
                      NumberOfItemsInDB={stateRedux.contacts.count}
                      NumberToShow={numberItemPerPage}
                      handelClick={getPartContant}
                    />
                  )}
                </div>
              </div>
            )}

            {/* ADS */}
            {stateRedux.ads.length != 0 && (
              <div className=" row wow fadeIn" id="contactTabel">
                <div className="col-md-12 mb-4">
                  <h3>Ads</h3>
                  {/* <input
                      type="text"
                      name="searchAds"
                      value={state.searchAds}
                      onChange={searchTabel}
                    /> */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <table className="table table-hover">
                        <thead className="blue-grey lighten-4">
                          <tr>
                            <th>Index</th>
                            <th>ownerName</th>
                            <th>ownerPhone</th>
                            <th>ownerEmail</th>
                            <th>title</th>
                            <th>createdAT</th>
                            <th>expired</th>
                            <th>price</th>
                            <th>Delete</th>
                          </tr>
                        </thead>

                        <tbody>
                          {stateRedux.ads.Data.map((item, index) => {
                            return (
                              <tr>
                                <td style={{ fontWeight: "600" }}>
                                  {skipState.ad + index + 1}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.ownerName}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.ownerPhone}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.ownerEmail}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.title}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.createdAT.split("T")[0]}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.expired.split("T")[0]}
                                </td>
                                <td style={{ fontWeight: "600" }}>
                                  {item.price} LE
                                </td>
                                <Button
                                  className="btn btn-danger"
                                  style={{ width: "75%", marginTop: "5px" }}
                                  key={item._id}
                                  onClick={() => deleteAds(item._id)}
                                >
                                  <i
                                    style={{ fontSize: "20px" }}
                                    className="fas fa-trash"
                                  ></i>
                                </Button>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {stateRedux.ads.count > 5 && (
                    <PaginationReact
                      NumberOfItemsInDB={stateRedux.ads.count}
                      NumberToShow={numberItemPerPage}
                      handelClick={getPartAds}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
