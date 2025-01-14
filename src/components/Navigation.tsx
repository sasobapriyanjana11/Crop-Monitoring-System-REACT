import {Link} from "react-router";
import "../assets/styles/Navigation.css";
import {useEffect, useState} from "react";

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
                    <div className=" items-center space-x-4">
                        <div className=" items-center px-20">
                            <img src="../assets/images/profile_pic.jpeg" alt="User Profile"
                                 className="w-10 h-10 rounded-full border border-white"/>
                        </div>
                        <div className="text-white">
                            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                        </div>
                        {/*<button className="bg-gray-200 text-yellow-700 px-3 py-1 rounded-full hover:bg-gray-500">*/}
                        {/*    Sign In*/}
                        {/*</button>*/}
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
                            <Link to='/login' className="custom-link">
                                <i className="fas fa-user"></i> login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}