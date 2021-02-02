import Navbar from "./layout/navbar/Navbar.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import Homepage from "./layout/Homepage/Homepage";
import Homepage2 from "./layout/Homepage/Homepage2";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";
import Footer from "./layout/footer/Footer.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <MagdyNavbar/>
        {/* <Homepage2/> */}
          <Routes/>
        <div className="container">
        </div>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
