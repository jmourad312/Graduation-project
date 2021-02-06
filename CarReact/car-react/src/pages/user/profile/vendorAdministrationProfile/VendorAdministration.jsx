import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Image from '../../../../components/Image'
import profilePic from "../../../../assets/Images/pexels-photo-220453.jpeg";
import VendorProfileRight from './VendorProfileRight';
// import ProfileRight from '../../../../components/ProfileRight';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function VendorAdministration() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "../../../../assets/js/additem.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    return (
        <div className="vendorAdmin">
            <section className="container">
                <div className="vendorleft" style={{ height: "900px" }}>
                    <div className="row m-auto ">
                        <p className="mt-3 button raise">
                            <Link to={`/VendorAdministration/VendorDetails`}>Basic details</Link>
                        </p>
                        <p className="mt-3 button raise">
                            <Link to="/VendorAdministration/MyItems">My Items</Link>
                        </p>
                        <p className="mt-3 button up">
                            <Link to="/VendorAdministration/VendorSettings">Settings</Link>
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-3" >
                            <Image
                                src={profilePic}
                                alt="profile picture"
                                height="100%"
                                width="100%"
                            />
                        </div>
                        <div className="col-9 mt-5  ">
                            <VendorProfileRight />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


{/* <div className="container-lg">
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
                    </div> */}
{/* <ProfileRight classNameName="col-9 profileright" /> */ }
