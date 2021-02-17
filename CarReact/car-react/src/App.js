import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Ads from "./components/Ads";
import image1 from './assets/Images/logo.svg'
import image2 from "./assets/Images/sencha.png";
import i18next from "i18next";
import { useState } from "react";
import LangToggle from "./components/LangToggle";


function App() {

  

  return (
    <div className="App">
      <Router>
        <MagdyNavbar />
        <Routes />
        <div style={{ position: "absolute", right: "180px", top: "10px" }}>
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
      </Router>
    </div>
  );
}

export default App;
