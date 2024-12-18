import { createSlice } from "@reduxjs/toolkit";

// Initial state structure
const initialState = {
  isLoggedIn: false,
  token: null,
  user: {
    username: "",
    phone: "",
    profileImg: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Set access token and update logged-in status
    setAccessToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    // Log out and reset to initial state
    logout: () => initialState,
    // Optionally, you can reset the user data without logging out
    resetUser: (state) => {
      state.user = initialState.user;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const { logout, setAccessToken, setUser, resetUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
