import "./App.css";
import Navbar from "./layout/navbar/Navbar.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
