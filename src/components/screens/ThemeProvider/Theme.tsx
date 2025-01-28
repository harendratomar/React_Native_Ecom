import { Theme } from "@react-navigation/native";

interface CustomTheme extends Theme {
  colors: Theme["colors"] & {
    button: string;
    touchable: string;
    placeholder: string;
  };
}

export const lightTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: "black",
    background: "white",
    card: "white",
    text: "black",
    border: "gray",
    notification: "rgb(255, 69, 58)",
    button: "#007BFF", // Button color for light theme
    touchable: "#E0E0E0", // Touchable item color for light theme
    placeholder: "#CCCCCC", // Placeholder text color for light theme
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "500" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "900" },
  },
};

export const darkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: "white",
    background: "black",
    card: "rgb(18, 18, 20)",
    text: "#FFFFFF",
    border: "#272729",
    notification: "rgb(255, 69, 58)",
    button: "#1E90FF", // Button color for dark theme
    touchable: "#444444", // Touchable item color for dark theme
    placeholder: "#888888", // Placeholder text color for dark theme
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "500" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "900" },
  },
};
