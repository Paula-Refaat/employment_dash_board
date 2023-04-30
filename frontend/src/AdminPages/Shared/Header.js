import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import '../Shared/Header.css'
const Header = () =>{
    const navigate = useNavigate();
    const auth = getAuthUser();
    const Logout = () => {
      removeAuthUser();
      navigate("/login");
    };
    

    return(
     <header className="main-header">
        <nav>
            <ul>

                <li>
                    <Link to={'/'}>Home</Link>
                </li>

                {/* unAuthenticated Route  */}
                <li>
                {!auth && (
                <>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li>
                    <Link to={'/register'}>Register</Link>
                </li>
              </>
            )}
            </li>

            {/* Admin Routes  */}
            <li>
            {auth && auth.type === 1 && (
              <>
                <li>
                <Link to={'/applicants'}>Manage Applicant</Link>
               
                </li>
                <li>
                <Link to={'/qualifications'}>Manage Qualifications</Link>
                </li>

                <li>
                <Link to={'/jobs'}>Manage Jobs</Link>
                </li>
                <li>
                <Link to={'/requests'}>Manage Requsts</Link>
                </li>
                <li>
                <Link to={'/history-requests'}>Show Requsts</Link>
                </li>

              </>
            )}
            </li>

            <li>
            {auth && auth.type === 0 && (
              <>
                <li>
                <Link to={'/list-jobs'}>List Jobs</Link>
               
                </li>


              </>
            )}
            </li>

            {/* Authenticated Routes  */}
                <li>
                {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
                </li>
                
            </ul>
        </nav>

        
      </header>
    );
};
export default Header