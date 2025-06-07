import { createSlice } from "@reduxjs/toolkit";

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
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
