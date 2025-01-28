import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setLighttheme } from "../../../Redux/Slices/ThemeSlic";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const { t } = useTranslation();
  const toggleTheme = () => {
    if (theme === "light") {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLighttheme());
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        <Text style={styles.text}>
          {t(
            theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});

export default ThemeSwitcher;
