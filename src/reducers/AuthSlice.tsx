import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
    isRehydrated: boolean;
}

const getInitialAuthState = (): AuthState => {
    const token = localStorage.getItem("token_cms");
    return {
        isAuthenticated: !!token,
        error: null,
        isRehydrated: false,
    };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        rehydrateAuthState: (state) => {
            const token = localStorage.getItem("token_cms");
            state.isAuthenticated = !!token;
            state.isRehydrated = true; // Mark rehydration as complete
        },
        signInUser: (
            state,
            action: PayloadAction<{ username: string; password: string }>
        ) => {
            if (validatePayload(action.payload)) {
                // Handle sign-in logic here (API call)
                // For now, just a mock login
                if (
                    action.payload.username === "user" &&
                    action.payload.password === "password"
                ) {
                    localStorage.setItem("token_cms", "mock_token");
                    state.isAuthenticated = true;
                    state.error = null;
                } else {
                    state.error = "Invalid credentials";
                }
            }
        },
        signUpUser: (
            state,
            action: PayloadAction<{
                name: string;
                mobile: string;
                username: string;
                password: string;
                cpassword: string;
            }>
        ) => {
            if (validatePayload(action.payload)) {
                // Handle sign-in logic here (API call)
                // For now, just a mock login
                if (
                    validatePassword(action.payload.password, action.payload.cpassword)
                ) {
                    state.error = null;
                } else {
                    state.error = "Invalid Passwords";
                }
            } else {
                state.error = "All fields are required";
            }
        },
        logOut: (state) => {
            localStorage.removeItem("token_cms");
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const validatePayload = (object: object | any) => {
    let valid = true;
    for (const key in object) {
        const value = object[key];
        if (value === "" || value === null) {
            valid = false;
        }
    }
    return valid;
};

const validatePassword = (password: string, cpassword: string) => {
    return password.length >= 8 && password === cpassword;
};

export const { signInUser, signUpUser, logOut, rehydrateAuthState } =
    authSlice.actions;

export default authSlice.reducer;