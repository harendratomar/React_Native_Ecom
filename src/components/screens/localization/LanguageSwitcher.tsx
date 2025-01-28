import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../Redux/Slices/languageSlice";
import { useTheme } from "@react-navigation/native";

const LanguageSwitcher: React.FC = () => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("select_language")}
      </Text>
      <View style={styles.btn}>
        <Button title="English" onPress={() => changeLanguage("en")} />
        <Button title="हिन्दी" onPress={() => changeLanguage("hi")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
  btn: { margin: 10, flexDirection: "row", gap: 10 },
});

export default LanguageSwitcher;
