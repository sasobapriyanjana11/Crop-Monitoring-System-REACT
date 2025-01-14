import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { signInUser } from "../reducers/AuthSlice.tsx"; // Assuming you have a reducer for user authentication

export function SignIn() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth); // Assuming the state has an auth slice

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signInUser(credentials)); // Dispatch the signInUser action with the credentials
    };

    return (
        <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
            <h1 className="text-2xl font-bold text-center my-4">Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter Username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {authState.error && (
                    <div className="text-red-500 text-center">
                        <p>{authState.error}</p>
                    </div>
                )}

                <div className="flex justify-center space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                    >
                        Sign In
                    </button>
                </div>
            </form>

            <div className="flex justify-center mt-4">
                <p>
                    Don't have an account?{" "}
                    <button
                        className="text-blue-600"
                        onClick={() => alert("Redirect to Sign Up page")} // Change to actual navigation logic
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}
