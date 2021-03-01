import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Ads from "./components/Ads";
import image1 from "./assets/Images/logo.svg";
import image2 from "./assets/Images/sencha.png";
import LangToggle from "./components/LangToggle";
import ChatBotComp from "./components/ChatBotComp";
import { useTranslation } from "react-i18next";

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
            imgAlt="ads logo"
            hoverImgAlt="ads description"
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
