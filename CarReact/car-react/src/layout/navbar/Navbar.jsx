import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="newNav">
      <article>
        <div className="menu">
          <input id="menu--toggle" type="checkbox" />
          {/* <!-- /#menu--toggle --> */}
          <label className="menu--toggle__trigger" htmlFor="menu--toggle"></label>
          {/* <!-- /.menu--toggle__trigger --> */}
          <label className="menu--toggle__burger" htmlFor="menu--toggle"></label>
          {/* <!-- /.menu--toggle__burger --> */}

          <ul className="menu__body">
            <li className="menu__body-element ">
              <Link className="menu__body-link " to="/login">
                Auth
              </Link>
            </li>
            {/* <!-- /.menu__body-element --> */}
            <li className="menu__body-element ">
              <Link className="menu__body-link " to="/SignUp">
                SignUp
              </Link>
              {/* <!-- /.menu__body-link --> */}
            </li>
            {/* <!-- /.menu__body-element --> */}
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/ResetPassword">
                ResetPassword
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/SignForm">
                SignForm
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/AddBlog">
                AddBlog
              </Link>
            </li>

            <li className="menu__body-element">
              <Link className="menu__body-link " to="/BlogDetails">
                BlogDetails
              </Link>
            </li>

            <li className="menu__body-element">
              <Link className="menu__body-link " to="/BlogList">
                BlogList
              </Link>
            </li>

            <li className="menu__body-element">
              <Link className="menu__body-link " to="/AboutUs">
                AboutUs
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/ContactUs">
                ContactUs
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/Privacy">
                Privacy
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/TermsOfService">
                TermsOfService
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/VendorProfileUser">
                VendorProfileUser
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/ProductDetails">
                ProductDetails
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/ProductsList">
                ProductsList
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/MyProfile">
                MyProfile
              </Link>
            </li>
            <li className="menu__body-element">
              <Link className="menu__body-link " to="/DisplayUserProfile">
                DisplayUserProfile
              </Link>
            </li>
          </ul>
          {/* <!-- /.menu__body --> */}
        </div>
        {/* <!-- /.menu --> */}
      </article>
      {/* <!-- <article>
      <div class="promotion">
      </div> --> */}
      {/* <!-- /.promotion --> */}
      {/* <!-- </article> --> */}
    </section>
  );
}
