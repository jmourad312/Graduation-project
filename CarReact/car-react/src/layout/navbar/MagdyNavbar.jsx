import React, { useState } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
// import GaussianBlur from "react-gaussian-blur";
// import ColorMatrix from "react-color-matrix";
import {useTranslation} from "react-i18next";


export default function MagdyNavbar() {
  const [checked, setchecked] = useState(false);
  const handleClick = () => {
    setchecked(!checked);
  };

  const logout = () => {
    localStorage.removeItem("UserID");
    localStorage.removeItem("VendorID");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("ProfileImage");
    handleClick();
  };

  // const changeLanguage = (ln) => {
  //   return () => {
  //     i18n.changeLanguage(ln);
  //     handleClick();
  //   };
  // };
  

  const {t, i18n} = useTranslation();
  return (
    <div className="magdyNav">
      <nav className="menu" id="anything">
        <input
          className="menu__toggle"
          checked={checked}
          onClick={handleClick}
          id="menu-toggle"
          type="checkbox"
        />
        <label className="menu__toggle-label" for="menu-toggle"></label>
        <label
          className="menu__toggle-label menu__toggle-label--closer"
          for="menu-toggle"
        >
          <svg
            className="menu__icon"
            preserveAspectRatio="xMinYMin"
            viewBox="0 0 24 24"
          >
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
          </svg>
          <svg
            className="menu__icon"
            preserveAspectRatio="xMinYMin"
            viewBox="0 0 24 24"
          >
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
          </svg>
        </label>
        <ul className="menu__content">
              <li className="menu__item" id="item5" style={{ visibility: localStorage.getItem("Authorization")?"":"hidden" }}>
                <Link
                  className="menu__link"
                  
                  onClick={handleClick}
                  to="/ProductsList"
                >
                  {t("Navbar.product list")}
                </Link>
              </li>
          {localStorage.getItem("Authorization") ? (
            <>
              <li className="menu__item" id="item1">
                <Link className="menu__link" onClick={logout} to="/">
                  {t("Navbar.Logout")}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="menu__item" id="item1">
                <Link
                  className="menu__link"
                  onClick={handleClick}
                  to="/SignChoice"
                >
                  {t("Navbar.sign")}
                </Link>
              </li>
            </>
          )}
          <li className="menu__item" id="item4">
            <Link className="menu__link" onClick={handleClick} to="/BlogList">
              {t("Navbar.Blog List")}
            </Link>
          </li>
          <li className="menu__item" id="item8">
            <Link className="menu__link" onClick={handleClick} to="/AboutUs">
              {t("Navbar.About Us")}
            </Link>
          </li>
          <li className="menu__item" id="item9">
            <Link className="menu__link" onClick={handleClick} to="/ContactUs">
              {t("Navbar.Contact Us")}
            </Link>
          </li>
          <li className="menu__item" id="item12">
            <Link className="menu__link" onClick={handleClick} to="/">
              {t("Navbar.Homepage")}
            </Link>
          </li>

          {/* /will removed from navbar */}

          {/* <li className="menu__item" id="item13">
            <Link className="menu__link" onClick={changeLanguage("en")}>
              LanguageEn
            </Link>
          </li>
          <li className="menu__item" id="item14">
            <Link className="menu__link" onClick={changeLanguage("ar")}>
              LanguageAr
            </Link>
          </li> */}

          {/* <li className="menu__item" id="item12"><Link className="menu__link" onClick={handleClick} to="/VendorProfileUser">VendorProfileUser</Link></li> */}
          {/* <li className="menu__item" id="item14"><Link className="menu__link" onClick={handleClick} to="/MyProfile">My Profile</Link></li> */}
          {/* <li className="menu__item" id="item17"><Link className="menu__link" onClick={handleClick} to="/VendorAdministration">VendorAdmin</Link></li> */}
          {/* <li className="menu__item" id="item2"><Link className="menu__link" onClick={handleClick} to="/SignUp">SignUp</Link></li> */}
          {/* <li className="menu__item" id="item3"><Link className="menu__link" onClick={handleClick} to="/SignForm">SignForm</Link></li> */}
          {/* <li className="menu__item" id="item6"><Link className="menu__link" onClick={handleClick} to="/AddBlog">AddBlog</Link></li>
                    <li className="menu__item" id="item7"><Link className="menu__link" onClick={handleClick} to="/BlogDetails">BlogDetails</Link></li> */}
          {/* <li className="menu__item" id="item10"><Link className="menu__link" onClick={handleClick} to="/Privacy">Privacy</Link></li>
                    <li className="menu__item" id="item11"><Link className="menu__link" onClick={handleClick} to="/TermsOfService">TermsOfService</Link></li> */}
          {/* <li className="menu__item" id="item13"><Link className="menu__link" onClick={handleClick} to="/ProductDetails">ProductDetails</Link></li> */}
          {/* <li className="menu__item" id="item15"><Link className="menu__link" onClick={handleClick} to="/DisplayUserProfile">DisplayUserProfile</Link></li> */}
        </ul>
      </nav>
      <svg id="item16">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="15"
              result="BLUR"
            ></feGaussianBlur>
            <feColorMatrix
              in="BLUR"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="GOO"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
