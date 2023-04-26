import '../Shared/Header.css'
import { Link } from 'react-router-dom';
const Header = () =>{
    return(
     <header className="main-header">
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                {/* <li>
                    <a>Login</a>
                </li> */}
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
                
            </ul>
        </nav>

        
      </header>
    );
};
export default Header