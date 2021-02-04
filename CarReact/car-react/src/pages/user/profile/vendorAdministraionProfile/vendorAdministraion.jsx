import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../../components/Image'
import profilePic from "../../../../assets/Images/pexels-photo-220453.jpeg";
// import ProfileRight from '../../../../components/ProfileRight';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function VendorAdministraion() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "../../../../assets/js/additem.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
    return (
        <div className="vendorAdmin">

            <section className="myProfile container">
                <div className="row">
                    <div className=" profileLeft">
                        <div className="mt-3 row" >
                            <div className="mt-3 button raise">
                                <Link to={`/MyProfile/BasicDetails`}>Basic details</Link>
                            </div>
                            <p className="mt-3 button raise">
                                <Link to={`/MyProfile/RecentViews`}>Recently viewed</Link>
                            </p>
                            <p className="mt-3 button raise">
                                <Link to="/MyProfile/BlogPosts">My blog posts</Link>
                            </p>
                            <p className="mt-3 button fill">
                                <Link to="/MyProfile/FavouriteItems">Favourite items</Link>
                            </p>
                            <p className="mt-3 button pulse">
                                <Link to="/MyProfile/BookmarkedPosts">Bookmarked posts</Link>
                            </p>
                            <p className="mt-3 button up">
                                <Link to="/MyProfile/Settings">Settings</Link>
                            </p>
                        </div>
                        <div className="col-3" style={{ height: "400px" }}>
                            <Image
                                src={profilePic}
                                alt="profile picture"
                                height="100%"
                                width="100%"
                            />
                        </div>
                        <div className="container-lg">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                                            <div className="col-sm-4">
                                                <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Department</th>
                                                <th>Phone</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>Administration</td>
                                                <td>(171) 555-2222</td>
                                                <td>
                                                    <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                    <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                    <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Peter Parker</td>
                                                <td>Customer Service</td>
                                                <td>(313) 555-5735</td>
                                                <td>
                                                    <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                    <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                    <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Fran Wilson</td>
                                                <td>Human Resources</td>
                                                <td>(503) 555-9931</td>
                                                <td>
                                                    <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                                    <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                                    <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* <ProfileRight classNameName="col-9 profileright" /> */}
                    </div>
                </div>
            </section>
        </div>
    )
}
