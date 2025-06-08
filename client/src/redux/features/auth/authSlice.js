import { createSlice } from "@reduxjs/toolkit";

// --- Helper: Check if token cookie exists ---
const checkCookieToken = () => {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("token="));
};

const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? { user: JSON.parse(user) } : { user: null };
  } catch (e) {
    console.log("Error loading user from localStorage:", e);
    return { user: null }; // Ensures proper default state
  }
};
const initialState = loadUserFromLocalStorage() || { user: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    checkTokenFromCookie: (state) => {
      const hasToken = checkCookieToken();
      if (!hasToken) {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      }
    },
  },
});
export const { setUser, logoutUser, checkTokenFromCookie } = authSlice.actions;
export default authSlice.reducer;
