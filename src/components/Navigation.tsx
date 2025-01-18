import {Link} from "react-router";
import "../assets/styles/Navigation.css";
import "../assets/styles/Dashboard.css"
import {useEffect, useState} from "react";
import profilePic from "../assets/images/manager-profile-pic.jpeg";
import logo from "../assets/images/crop_logo.png"

export function Navigation() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="items-center space-x-4">
                        <div className="items-center px-20">
                            <img src={logo} alt="crop_logo"
                                 className=" w-50 h-50 rounded-full border my-2 mt-1 border-white object-cover "
                            />
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link to='/' className="custom-link">
                                <i className="fas fa-tachometer-alt"></i> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/crop' className="custom-link">
                                <i className="fas fa-seedling"></i> Crop
                            </Link>
                        </li>
                        <li>
                            <Link to='/field' className="custom-link">
                                <i className="fas fa-map"></i> Field</Link>
                        </li>
                        <li>
                            <Link to='/equipment' className="custom-link">
                                <i className="fas fa-tools"></i> Equipment
                            </Link>
                        </li>
                        <li>
                            <Link to='/monitoringLog' className="custom-link">
                                <i className="fas fa-file-alt"></i> Monitoring Log
                            </Link>
                        </li>
                        <li>
                            <Link to='/staff' className="custom-link">
                                <i className="fas fa-users"></i> Staff
                            </Link>
                        </li>
                        <li>
                            <Link to='/user' className="custom-link">
                                <i className="fas fa-user"></i> User
                            </Link>
                        </li>
                        <li>
                            <Link to='/vehicle' className="custom-link">
                                <i className="fas fa-truck"></i> Vehicle
                            </Link>
                        </li>
                        <li>
                            <Link to='/signout' className="custom-link">
                                    <i className="fas fa-sign-out-alt"></i>Sign Out
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="topbar">
                    <h2 className="text-[#299863] text-[20px] font-bold">Green Shadow</h2>

                    <div className="relative flex items-center justify-center text-gray-500">
                        {/* Notification Icon */}
                        <div className="flex justify-end items-center p-2">
                            <i className="fas fa-bell notification-icon w-5 h-5"></i>
                        </div>
                        {/* Profile Section */}
                        <div className="flex items-center space-x-2 ">
                            <img
                                src={profilePic}
                                alt="User Profile"
                                className="w-7 h-7 rounded-full border border-white"
                            />
                            <div className="text-gray-700 text-sm p-x-13">
                                {/* Display Current Date and Time */}
                                <p className="p-3">
                                    {currentTime.toLocaleDateString()}
                                    <span className="p-3">
                                        {currentTime.toLocaleTimeString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}