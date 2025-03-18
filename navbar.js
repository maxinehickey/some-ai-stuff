import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdOutlineKeyboardArrowDown, MdOutlineTrendingUp, MdDarkMode, MdLightMode, MdBuild, MdScience, MdOutlineSummarize } from "react-icons/md";
import { useAuth } from './AuthContext';

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(props.collpaseNavbar);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
        props.toggleNavbarDiv(!isOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
            <nav className="navbar">
                <div className="left-section">
                    <div className="hamburger" onClick={toggleNavbar}>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                    </div>
                    <div className="logo">Performance Test Automation Framework</div>
                </div>

                <div className="logout">
                    {isLoggedIn ? (
                        <div className="user-info">
                            <span onClick={toggleDropdown}>John Doe <MdOutlineKeyboardArrowDown /></span>
                            {isDropdownOpen && (
                                <div className="dropdown">
                                    <p>john.doe@example.com</p>
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-button">Login</Link>
                    )}
                    <button onClick={toggleDarkMode} className="mode-toggle">
                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>

                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <hr />
                    <li><Link to="/homePage"><MdHome /> Home</Link></li>
                    <li><Link to="/config"><MdScience /> Configuration</Link></li>
                    <li><Link to="/testManagement"><MdBuild /> Test Management</Link></li>
                    <li><Link to="/testSummary"><MdOutlineSummarize /> Test Summary</Link></li>
                    <li><Link to="/testTrendsPage"><MdOutlineTrendingUp /> Test Trends</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
