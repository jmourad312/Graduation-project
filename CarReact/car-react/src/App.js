import './App.css';
import Navbar from './layout/navbar/Navbar.jsx';
import Login from './pages/user/authentication/login/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
    </div>
  );
}

export default App;
