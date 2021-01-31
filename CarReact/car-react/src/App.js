import Navbar from "./layout/navbar/Navbar.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import Homepage from "./layout/Homepage/Homepage";
import Homepage2 from "./layout/Homepage/Homepage2";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <Homepage2/> */}
          <Routes/>
        <div className="container">
        </div>
      </Router>
    </div>
  );
}

export default App;
