import React, { useEffect, useState } from 'react'
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Tabel } from '../../components/Tabel'
import { Pagination } from '../../components/Pagination'

import { getUserAction, getVendorAction } from '../../store/action'
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

    }, [])

    //console.log(stateRedux.users)
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
        labels: ["Users", "Products", "Blogs"],
        datasets: [{
            label: ["Conclusion Chart"],
            data: [100, 309, 80],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
    const [PieData, setPieData] = useState({
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [{
            data: [300, 50, 100, 40, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
        }]
    });
    const [DoughnutData, setDoughnutData] = useState({
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [{
            data: [300, 50, 100, 40, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
        }]
    })
    return (

        <div className="admin">
            <div className="container-for-admin">


                {/* Main Navigation */}
                <header>

                    {/* Navbar */}
                    <nav className="navbar bg-dark fixed-top navbar-expand-lg scrolling-navbar">
                        <div className="container-fluid">
                            {/* Collapse */}
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"><i className="fa fa-bars white"></i></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {/* Left */}
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link waves-effect" href="#">Home
                                    <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link waves-effect" href="#">Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

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
                                        <span className="badge badge-success badge-pill pull-right">100
                                           {/* <i className="fa fa-arrow-up ml-1"></i> */}
                                                </span>
                                            </a>
                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Products
                                        <span className="badge badge-info badge-pill pull-right">309</span>
                                            </a>
                                            <a className="list-group-item list-group-item-action waves-effect" style={{ fontSize: "20px" }}>No.Blogs
                                        <span className="badge badge-info badge-pill pull-right">80</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doughnut Chart */}
                        <div className="row wow fadeIn">
                            <div className="col-lg-12 col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-header">Doughnut Chart</div>
                                    <div className="card-body">
                                        <Doughnut data={DoughnutData} options={{ title: { display: true, text: 'Average Rainfall per month', fontSize: 20 }, legend: { display: true, labels: { fontSize: 25 } } }} />
                                    </div>

                                </div>


                            </div>

                        </div>




                        {/* User List */}
                        {
                            stateRedux.users.length != 0 &&
                            <>
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
