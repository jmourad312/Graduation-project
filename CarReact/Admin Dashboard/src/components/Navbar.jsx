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
                    <ul className="navbar-nav mr-auto w-100">
                        <li className="nav-item">
                        <Link className="nav-link waves-effect" to={'Admin'}>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect" to={'AddPerson'}>AddPerson</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect" to={'AddPartCar'}>AddPartCar</Link>
                        </li>
                        <li className="nav-item ml-auto"  >
                        <Link className="nav-link waves-effect" to={'LoginIn'} onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
         </div>
    );
}