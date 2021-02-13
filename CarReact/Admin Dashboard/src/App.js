import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from "./Routes/routes";
import { useSelector, useDispatch } from "react-redux";
import { setLoginAction } from "./store/action";
import { useEffect,useState } from "react";
import Admin from './pages/Admin/Admin';

function App() {

  return (
    <div className="App">

      <Router>
        {/* <Admin /> */}
        <Routes />
      </Router>
    </div>
  );
}

export default App;
