import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Ads from "./components/Ads";
import image1 from './assets/Images/logo.svg'
import image2 from "./assets/Images/sencha.png";
import Ads2 from "./components/Ads2";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



function App() {
  const [loc, setLoc] = useState("/")

  useEffect(() => {
    setLoc(window.location.pathname)
  });

  return (
    <div className="App">
      <Router>
        <MagdyNavbar />
        <Routes />
       
          <div className="container">
            <Ads
              class="pater"
              link="http://go.thoughtleaders.io/SenchaCodrops141117"
              imgSrc={image1}
              hoverImgSrc={image2}
            />
            <div
              style={{ position: "absolute", right: "310px", bottom: "150px" }}
            >
              <Ads2 />
            </div>
          </div>

      </Router>
    </div>
  );
}

export default App;
