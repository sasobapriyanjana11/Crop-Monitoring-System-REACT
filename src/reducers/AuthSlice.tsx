import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<{ username: string; password: string }>) => {
            // Handle sign-in logic here (API call)
            // For now, just a mock login
            if (action.payload.username === "user" && action.payload.password === "password") {
                state.isAuthenticated = true;
                state.error = null;
            } else {
                state.error = "Invalid credentials";
            }
        },
    },
});

export const { signInUser } = authSlice.actions;

export default authSlice.reducer;
