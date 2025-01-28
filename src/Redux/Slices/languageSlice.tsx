// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Define the initial state
// const loadInitialLanguage = async () => {
//   const savedLanguage = await AsyncStorage.getItem("language");
//   return savedLanguage || "en"; // Default to 'en' if no language is stored
// };

// const initialState = {
//   language: "en", // Temporarily set to 'en', will be updated on slice initialization
// };

// // Define the language slice
// const languageSlice = createSlice({
//   name: "language",
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<string>) => {
//       state.language = action.payload; // Update the language in state
//       AsyncStorage.setItem("language", action.payload); // Persist the language change
//     },
//     initializeLanguage: (state, action: PayloadAction<string>) => {
//       state.language = action.payload; // Initialize the state with persisted language
//     },
//   },
// });

// export const { setLanguage, initializeLanguage } = languageSlice.actions;
// export default languageSlice.reducer;

// // Thunk for initializing language on app load
// export const initializeLanguageState = () => async (dispatch: any) => {
//   const savedLanguage = await loadInitialLanguage();
//   dispatch(initializeLanguage(savedLanguage));
// };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  language: "en", // Default to English
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      AsyncStorage.setItem("language", action.payload);
    },
    initializeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

// Async action to load language from storage
export const loadLanguage = () => async (dispatch: any) => {
  const savedLanguage = await AsyncStorage.getItem("language");
  if (savedLanguage) {
    dispatch(initializeLanguage(savedLanguage));
  }
};

export const { setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
