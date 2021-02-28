import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {setLoginAction} from '../store/action'

export function Navbar(props) {

    const stateRedux = useSelector( (state) => state)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setLoginAction(stateRedux.login = false))
        localStorage.removeItem('Authorization');
    }

    return (
        <div className="adminnav">
        <nav className = "navbar bg-dark fixed-top navbar-expand-lg scrolling-navbar" >
            <div className="container-fluid">
                {/* Collapse */}
                <button className="navbar-toggler " type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa fa-bars white"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left */}
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                        <Link className="nav-link waves-effect text-light" style={{fontSize:"20px"}} to={'Admin'}>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect text-light" style={{fontSize:"20px"}} to={'AddPerson'}>Create-Account</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect text-light" style={{fontSize:"20px"}} to={'AddPartCar'}>Customize-Data</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect text-light" style={{fontSize:"20px"}} to={'AddAds'}>Create-Ads</Link>
                        </li>
                        <li className="nav-item ml-auto"  >
                        <Link className="nav-link waves-effect text-light" style={{fontSize:"20px", background:"#1687a7",borderRadius:"10px",paddingBottom:"10px"}} to={'LoginIn'} onClick={logout}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
         </div>
    );
}