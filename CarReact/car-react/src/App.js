import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Ads from "./components/Ads";
import image1 from './assets/Images/logo.svg'
import image2 from "./assets/Images/sencha.png";
import i18next from "i18next";
import { useState } from "react";
import LangToggle from "./components/LangToggle";
import ChatBotComp from "./components/ChatBotComp";

// import 'styled-components';

function App() {
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
        <div
          style={{
            height: "200px",
            width: "300px",
            position: "absolute",
            left: "30px",
            bottom: "350px",
            border: "1px solid grey",
            borderRadius:"25px",
            verticalAlign:"middle"
          }}
        >
          <h2
            style={{
              // position: "relative",
              // top: "20%",
              // left: "20%",
              // textAlign: "center",
              fontWeight: "700",
              fontSize: "32px",
            }}
          >
            add ads here
            {/* {t("BlogList.NoPosts")} */}
          </h2>
        </div>
      </Router>
    </div>
  );
}

export default App;
