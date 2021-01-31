import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="newNav">
      <article>
        <div className="menu">
          <input id="menu--toggle" type="checkbox" />
          {/* <!-- /#menu--toggle --> */}
          <label className="menu--toggle__trigger" for="menu--toggle"></label>
          {/* <!-- /.menu--toggle__trigger --> */}
          <label className="menu--toggle__burger" for="menu--toggle"></label>
          {/* <!-- /.menu--toggle__burger --> */}

          <ul className="menu__body">
            <li className="menu__body-element ">
              {/* <a className="menu__body-link " href="/home">
                Homepage
              </a> */}
              <Link className="menu__body-link " to="/login">Auth</Link>
              {/* <!-- /.menu__body-link --> */}
            </li>
            {/* <!-- /.menu__body-element --> */}
            <li className="menu__body-element ">
              <a className="menu__body-link " href="/user/profile">
                Profile
              </a>
              {/* <!-- /.menu__body-link --> */}
            </li>
            {/* <!-- /.menu__body-element --> */}
            <li className="menu__body-element">
              <a className="menu__body-link " href="/user/blog/list">
                list blog
              </a>
            </li>

            <li className="menu__body-element">
              <a className="menu__body-link " href="/user/blog/add">
                BLOG
              </a>
            </li>

            <li className="menu__body-element">
              <a className="menu__body-link " href="/user/auth/restpassword">
                resetpassword
              </a>
            </li>

            <li className="menu__body-element">
              <a className="menu__body-link" href="/user/auth/login">
                Login
              </a>
            </li>

            <li className="menu__body-element">
              <a className="menu__body-link" href="/info/contactus">
                CONTACT US
              </a>
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
