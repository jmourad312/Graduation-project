import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import MagdyNavbar from "./layout/navbar/MagdyNavbar.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <MagdyNavbar/>
          <Routes/>
        <div className="container">
        </div>
      </Router>
    </div>
  );
}

export default App;
