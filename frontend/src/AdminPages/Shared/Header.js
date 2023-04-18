import React from 'react';
import { Link } from "react-router-dom";
import '../Shared/Header.css';
const Header = () => {
    return (
        <header className='main-header'>
            <div className='logo'>
                {/* <img  alt="logo"></img> */}
            </div>
            <nav>
                <ul>
                <li> 
                    {/* link --> عشان ميعملش refresh للصفحة */}
                    <Link to={'/'}> Home </Link> 
                </li>

                <li>
                    <Link to={'/applicants'}> Manage Applicants </Link>
                </li>

                <li>
                    <Link to={'/qualifications'}> Manage Qualifications </Link>
                </li>

                <li>
                    <Link to={'/jobs'}> Manage Jobs </Link>
                </li>

                <li>
                    <Link to={'/requests'}> Manage Requests </Link>
                </li>

                
                <li>
                    <Link to={'/history-requests'}> Show History </Link>
                </li>

                <li>
                    <a>LogOut</a>
                </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;