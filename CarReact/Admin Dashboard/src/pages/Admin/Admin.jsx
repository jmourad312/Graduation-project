import React, { useEffect, useState } from 'react'
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Tabel } from '../../components/Tabel'
import { Pagination } from '../../components/Pagination'
import { Navbar } from '../../components/Navbar'
import { instance } from "../../network/axiosConfig";

import { getUserAction, getVendorAction,getCountDataAction} from '../../store/action'
import { useSelector, useDispatch } from "react-redux";

export default function Admin() {


    const numberItemPerPage = 5;

    const [state, setState] = useState({
        user: [],
        vendor: [],
        blogs: [],
        products: []
    })

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAction)
        dispatch(getVendorAction)
        dispatch(getCountDataAction)
        getCountData()
    },[])

     const getCountData = async () => {

        try {
            const res = await instance.get("admin/countAll",
            {headers: { Authorization: localStorage.getItem("Authorization")}});
            console.log(res);
            setData(res.data)

        } catch (error) {
            console.log(error);
        }
      }

    const setData = (countData)=>{
        setBarData({
            ...BarData,
            datasets:[{
                data:[countData.Data.user,
                    countData.Data.vendor
                    ,countData.Data.product
                    ,countData.Data.blogs]
            }]
        })
        setPieData({
            ...BarData,
            datasets:[{
                data:[countData.Data.user,
                    countData.Data.vendor
                    ,countData.Data.product
                    ,countData.Data.blogs]
            }]
        })
    }

    //console.log(stateRedux.countData.Data)
    //console.log(stateRedux.vendors)
    const getPartUser = (skip) => {
        setState({
            ...state,
            user: stateRedux.users.Data.slice(skip, skip + numberItemPerPage)
        })
    }
    const getPartVendor = (skip) => {
        setState({
            ...state,
            vendor: stateRedux.vendors.Data.slice(skip, skip + numberItemPerPage)
        })
    }

    const getPartBlog = (skip) => {
        setState({
            ...state,
            blogs: stateRedux.users.Data.slice(skip, skip + numberItemPerPage)
        })
    }

    const getPartProduct = (skip) => {
        setState({
            ...state,
            products: stateRedux.vendors.Data.slice(skip, skip + numberItemPerPage)
        })
    }
    const [BarData, setBarData] = useState({
        labels: ["Users","Vendors", "Products", "Blogs"],
        datasets: [{
            label: ["Conclusion Chart"],
            data: [0,0, 0, 0],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"],
            borderWidth: 1
        }]
    })


    const [PieData, setPieData] = useState({
        labels: ["Users","Vendors", "Products", "Blogs"],
        datasets: [{
            data: [0, 0, 0, 0],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
        }]
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
                            <a href="#Dashboard" className="list-group-item active waves-effect">
                                <i className="fa fa-pie-chart mr-3"></i>Dashboard
                            </a>
                            <a href="#userTabel" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-user mr-3"></i>User Details
                            </a>
                            <a href="#vendorTabel" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-user mr-3"></i>Vendor Details
                            </a>
                            <a href="#blogTabel" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-user mr-3"></i>Blog
                            </a>
                            <a href="#productTabel" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-user mr-3"></i>Product
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
                                        <Bar data={BarData} options={{ title: { display: true, text: 'Average Rainfall per month', fontSize: 20 }, legend: { display: true, labels: { fontSize: 30 } } }} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 mb-4">
                                <div className="card mb-4">
                                    <div className="card-header text-center">Pie chart</div>
                                    <div className="card-body">
                                        <Pie data={PieData} options={{ title: { display: true, text: 'Average Rainfall per month', fontSize: 20 }, legend: { display: true, position: 'right', labels: { fontSize: 15 } } }} />
                                    </div>
                                </div>

                                {/* Card */}
                                <div className="card mb-4">
                                    <div className="card-body">
                                        {/*List group links*/}
                                        <div className="list-group list-group-flush">

                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Users
                                        <span className="badge badge-success badge-pill pull-right">
                                            {stateRedux.countData.Success == true && stateRedux.countData.Data.user}</span>
                                            </a>

                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Vendors
                                        <span className="badge badge-info badge-pill pull-right">
                                        {stateRedux.countData.Success == true && stateRedux.countData.Data.vendor}</span>
                                            </a>

                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Products
                                        <span className="badge badge-info badge-pill pull-right">
                                        {stateRedux.countData.Success == true && stateRedux.countData.Data.product}</span>
                                            </a>

                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Blogs
                                        <span className="badge badge-info badge-pill pull-right">
                                        {stateRedux.countData.Success == true && stateRedux.countData.Data.blogs}</span>
                                            </a>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User List */}
                        {
                            stateRedux.users.length != 0 &&

                            <>
                                <div onLoad={() => getPartUser(0)}></div>

                                <Pagination NumberOfItemsInDB={stateRedux.users.Data.length} NumberToShow={numberItemPerPage} handelClick={getPartUser} />
                                <Tabel id="userTabel" data={state.user}  ></Tabel>

                            </>
                        }

                        {/* Vendor List */}
                        {

                            stateRedux.vendors.length != 0 &&
                            <>
                                <Pagination NumberOfItemsInDB={stateRedux.vendors.Data.length} NumberToShow={numberItemPerPage} handelClick={getPartVendor} />

                                <Tabel id="vendorTabel" data={state.vendor}  ></Tabel>
                            </>
                        }

                        {/* Blog List */}
                        {stateRedux.users.length != 0 &&

                            <div className=" row wow fadeIn" id="blogTabel">

                                <div className="col-md-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <Pagination NumberOfItemsInDB={stateRedux.users.Data.length} NumberToShow={numberItemPerPage} handelClick={getPartBlog} />

                                            <table className="table table-hover">
                                                <thead className="blue-grey lighten-4">

                                                    <tr>
                                                        <th>Index</th>
                                                        <th>User ID</th>
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
                                                                <td>{item.person._id}</td>
                                                                <td>{item.person.firstName}</td>
                                                                <td>{item.postsUser.length}</td>
                                                                <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>

                                            </table>


                                        </div>

                                    </div>


                                </div>
                            </div>
                        }
                        {/* product List */}
                        {stateRedux.vendors.length != 0 &&
                            <div className="row wow fadeIn" id="productTabel">
                                <div className="col-md-12 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <Pagination NumberOfItemsInDB={stateRedux.vendors.Data.length} NumberToShow={numberItemPerPage} handelClick={getPartProduct} />
                                            <table className="table table-hover">
                                                <thead className="blue-grey lighten-4">
                                                    <tr>
                                                        <th>Index</th>
                                                        <th>Vendor ID</th>
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
                                                                <td>{item.person._id}</td>
                                                                <td>{item.person.firstName}</td>
                                                                <td>{item.vendorItems.length}</td>
                                                                <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                    </div>
                </main>
            </div>
        </div>
    )
}
