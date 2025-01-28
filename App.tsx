import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, AppDispatch } from "./src/Redux/Store";
import { LogBox } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import {
  lightTheme,
  darkTheme,
} from "./src/components/screens/ThemeProvider/Theme";
import "./src/components/screens/localization/i18n";
import { loadLanguage } from "./src/Redux/Slices/languageSlice";
import "./src/components/screens/localization/i18n";

LogBox.ignoreAllLogs();

const AppContent = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const appTheme = theme === "light" ? lightTheme : darkTheme;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadLanguage());
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: appTheme.colors.background },
      ]}
    >
      <ThemeProvider value={appTheme}>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
