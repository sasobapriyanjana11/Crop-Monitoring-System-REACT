import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store.ts";
import FormField from "../components/form/FormField.tsx";
import { signUpUser } from "../reducers/AuthSlice.tsx";

export function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (authState.isAuthenticated) {
            navigate("/login");
        }
    }, [authState.isAuthenticated, navigate]);

    const navigateToSignIn = () => {
        navigate("/login");
    };

    const [credentials, setCredentials] = useState({
        name: "",
        mobile: "",
        username: "",
        password: "",
        cpassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signUpUser(credentials));
        if (!authState.error) {
            navigate("/login");
        }
    };

    return (
        <div className="w-screen min-h-dvh flex justify-center items-center flex-col text-gray-800">
            <div className="w-full max-w-[35rem] px-6 py-10 border-2 rounded-2xl bg-[#f5f5f5]/70 -mt-8">
                <h1 className="text-4xl font-bold text-center mb-4">Sign Up</h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center py-4 gap-3 mb-3"
                >
                    <FormField
                        title="Mobile"
                        name="mobile"
                        value={credentials.mobile}
                        handleInputChange={handleInputChange}
                        error={authState.error}
                    />

                    <FormField
                        title="Name"
                        name="name"
                        value={credentials.name}
                        handleInputChange={handleInputChange}
                        error={authState.error}
                    />

                    <FormField
                        title="Username"
                        name="username"
                        value={credentials.username}
                        handleInputChange={handleInputChange}
                        error={authState.error}
                    />

                    <FormField
                        title="Password"
                        name="password"
                        value={credentials.password}
                        handleInputChange={handleInputChange}
                        error={authState.error}
                    />

                    <FormField
                        title="Confirm Password"
                        name="cpassword"
                        id="cpassword"
                        value={credentials.cpassword}
                        handleInputChange={handleInputChange}
                        error={authState.error}
                    />

                    {authState.error && (
                        <div className="text-red-500 text-center">
                            <p>{authState.error}</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-3 space-x-2 w-1/2 max-w-[20rem]">
                        <button
                            type="submit"
                            className="bg-green-800 w-full text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 text-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="flex justify-center mt-4">
                    <p>
                        Already have an account?{" "}
                        <button className="text-green-600" onClick={navigateToSignIn}>
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}