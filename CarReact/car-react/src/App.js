import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Ads from "./components/Ads";
import image1 from "./assets/Images/logo.svg";
import image2 from "./assets/Images/sencha.png";
import i18next from "i18next";
import { useState } from "react";
import LangToggle from "./components/LangToggle";
import ChatBotComp from "./components/ChatBotComp";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import 'styled-components';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <Router>
        <MagdyNavbar />
        <div className="backgroundImage"></div>
        <Routes />
        <div style={{ position: "absolute", right: "40px", bottom: "50px" }}>
          <ChatBotComp />
        </div>

        <div style={{ position: "absolute", left: "140px", top: "10px" }}>
          <LangToggle />
        </div>

        <div style={{ position: "absolute", left: "310px", bottom: "150px" }}>
          <Ads
            class="pater"
            link="http://go.thoughtleaders.io/SenchaCodrops141117"
            imgSrc={image1}
            hoverImgSrc={image2}
          />
        </div>
        {/* <>
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
          <Link to="/ContactUs"
            style={{

              fontWeight: "700",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            {t("repeated.AddAdsHere")}
          </Link>
        </div>
        </> */}
      </Router>
    </div>
  );
}

export default App;
