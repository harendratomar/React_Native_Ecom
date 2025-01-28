import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import themeReducer from "./Slices/ThemeSlic";
import languageReducer from "./Slices/languageSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
