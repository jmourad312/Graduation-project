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
        < nav className = "navbar bg-dark fixed-top navbar-expand-lg scrolling-navbar" >
            <div className="container-fluid">
                {/* Collapse */}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa fa-bars white"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left */}
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link waves-effect" href="#">Home
                               <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link waves-effect" to={'LoginIn'} onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}