import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { signInUser } from "../reducers/AuthSlice.tsx"; // Assuming you have a reducer for user authentication
import "../assets/styles/SignIn.css";

export function SignIn() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth); // Assuming the state has an auth slice

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [isSignIn, setIsSignIn] = useState(true); // State to toggle between Sign In and Sign Up forms

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signInUser(credentials)); // Dispatch the signInUser action with the credentials
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn); // Toggle between Sign In and Sign Up forms
    };


    return (
        <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Conditionally render Sign In or Sign Up form based on isSignIn state */}
                    {isSignIn ? (
                        <form onSubmit={handleSubmit} className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {authState.error && (
                                <div className="text-red-500 text-center">
                                    <p>{authState.error}</p>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                            >
                                Sign In
                            </button>
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="https://www.facebook.com" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.google.com/" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="https://www.x.com" className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.linkedin.com/feed/" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                    ) : (
                        <form className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <select id="jobRole" className="jobRole">
                                <option value="">Select Job Role</option>
                                <option value="manager">MANAGER</option>
                                <option value="scientist">SCIENTIST</option>
                                <option value="administrative">ADMINISTRATIVE</option>
                                <option value="other">OTHER</option>
                            </select>
                            <input
                                type="submit"
                                value="SIGN UP"
                                className="btn solid"
                            />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="https://www.facebook.com/" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.google.com/" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="https://www.x.com/" className="social-icon">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.linkedin.com/feed/" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="panels-container">
                {/* Left Panel */}
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>"Grow with Us: Join the Agriculture Community"</p>
                        <div className="flex justify-center mt-4">
                            <p>
                                Don't have an account?{" "}
                                <button
                                    className="btn transparent"
                                    onClick={toggleForm} // Toggle between Sign In and Sign Up forms
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                    <img
                        src="assets/image/SignIn.png"
                        alt=""
                        className="image"
                    />
                </div>

                {/* Right Panel */}
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <div className="flex justify-center mt-4">
                            <p>
                                Already have an account?{" "}
                                <button
                                    className="btn transparent"
                                    onClick={toggleForm} // Toggle between Sign In and Sign Up forms
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>
                    <img
                        src="assets/image/signup.png"
                        alt=""
                        className="image"
                    />
                </div>
            </div>
        </div>
    );
}
