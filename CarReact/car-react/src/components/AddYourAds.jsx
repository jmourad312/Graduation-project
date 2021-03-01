import React from 'react'
import { Link } from 'react-router-dom';
import i18next from "i18next";
import { useTranslation } from "react-i18next";


export default function AddYourAds() {
    const { t, i18n } = useTranslation();
    return (
      <>
        <div
          className="text-center"
          style={{
            border: "3px solid grey",
            padding: "30px",
            width: "250px",
            borderRadius: "30px",
            position: "absolute",
            right: "85%",
            bottom: "300px",
            backgroundColor: "rgba(128, 128, 128, 0.397)",
          }}
        >
          <Link
            to="/ContactUs"
            style={{
              // position: "relative",
              // top: "20%",
              // left: "20%",
              // textAlign: "center",
              fontWeight: "700",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            {t("repeated.AddAdsHere")}
            {/* {t("BlogList.NoPosts")} */}
          </Link>
        </div>
      </>
    );
}
