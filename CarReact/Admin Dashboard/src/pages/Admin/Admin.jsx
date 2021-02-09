import React, { useEffect, useState } from 'react'
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Tabel } from '../../components/Tabel'
import { getUserAction, getVendorAction } from '../../store/action'
import { useSelector, useDispatch } from "react-redux";



export default function Admin() {

    const stateRedux = useSelector((state) => state)
    const dispatch = useDispatch();


    useEffect(() => {
         dispatch(getUserAction)
         dispatch(getVendorAction)

      }, []) 
      ;
    const getUsers = () => {
        dispatch(getUserAction)
    }

    const getVendors = () => {
        dispatch(getVendorAction)
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
                                        <a className="nav-link waves-effect" href="#">About Us</a>
                                    </li>
                                </ul>

                                {/* Right */}
                                <ul className="navbar-nav nav-flex-icons">
                                    <li className="nav-item">
                                        <a href="" className="nav-link waves-effect"
                                            target="_blank">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="" className="nav-link waves-effect" target="_blank">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Sidebar */}
                    <div className="sidebar-fixed bg-dark position-fixed">
                        <div className="list-group list-group-flush mt-5">
                            <a href="#" className="list-group-item active waves-effect">
                                <i className="fa fa-pie-chart mr-3"></i>Dashboard
                    </a>
                            <a href="#" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-user mr-3"></i>Profile</a>
                            <a href="#" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-table mr-3"></i>Tables</a>
                            <a href="#" className="list-group-item list-group-item-action waves-effect">
                                <i className="fa fa-map mr-3"></i>Maps</a>
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
                                    <span>Home Page / Dashboard</span>
                                </h4>

                                <form className="d-flex justify-content-center">
                                    {/* Default input  */}
                                    <input type="search" placeholder="Type your query" aria-label="Search" className="form-control" />
                                    <button className="btn btn-primary btn-sm my-0 p" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </form>
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


                        {/* User List */}

                        <Tabel data={stateRedux.users.Data}  ></Tabel>
                        {/* Vendor List */}
                        <Tabel data={stateRedux.vendors.Data}  ></Tabel>


                        {/* Blog List */}
                        <div className="row wow fadeIn">
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-hover">
                                            <thead className="blue-grey lighten-4">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Blog ID</th>
                                                    <th>Email</th>
                                                    <th>Dolor</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                    <th>Ban</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Cell 1</td>
                                                    <td>Cell 2</td>
                                                    <td>Cell 3</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Cell 4</td>
                                                    <td>Cell 5</td>
                                                    <td>Cell 6</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Cell 7</td>
                                                    <td>Cell 8</td>
                                                    <td>Cell 9</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                            </tbody>

                                        </table>


                                    </div>

                                </div>


                            </div>
                        </div>

                        {/* product List */}
                        <div className="row wow fadeIn">
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-hover">
                                            <thead className="blue-grey lighten-4">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product ID</th>
                                                    <th>Owner</th>
                                                    <th>Dolor</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                    <th>Ban</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Cell 1</td>
                                                    <td>Cell 2</td>
                                                    <td>Cell 3</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Cell 4</td>
                                                    <td>Cell 5</td>
                                                    <td>Cell 6</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Cell 7</td>
                                                    <td>Cell 8</td>
                                                    <td>Cell 9</td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-pen ml-1'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className='fas fa-trash ml-3'></i></td>
                                                    <td><i style={{ fontSize: '20px' }} className="fas fa-ban"></i></td>
                                                </tr>
                                            </tbody>

                                        </table>


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


                        {/* Map */}
                        <div className="row wow fadeIn">
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <div className="card-header">Google map</div>
                                    <div className="card-body">
                                        <div id="map-container" className="map-container" style={{ height: "500px" }}>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13916.823277035688!2d30.8606271!3d29.305637700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb77971253ebcb45f!2z2KfZhNmF2LPZhNmH2IwgUWVzbSBBbCBGYXlvdW0sIEZhaXl1bSwgRmFpeXVtIEdvdmVybm9yYXRl!5e0!3m2!1sen!2seg!4v1612708610475!5m2!1sen!2seg" width="600" height="450" frameBorder="0" style={{ border: "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </div>
    )
}
