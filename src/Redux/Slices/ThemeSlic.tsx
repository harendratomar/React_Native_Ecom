import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLighttheme: (state) => {
      state.theme = "light";
    },
    setDarkTheme: (state) => {
      state.theme = "dark";
    },
  },
});
export const { setLighttheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
