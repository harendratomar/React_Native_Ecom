import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../components/screens/Login/LoginScreen";
import HomeScreen from "../components/screens/Home/HomeScreen";
import ProofOfDelivery from "../components/screens/ProofDelivery/ProofOfDeliveryScreen";
import FiltersScreen from "../components/screens/FilterScreen/Filter";
import ProductDetails from "../components/screens/ProductDetails/ProductDetail";
import CartScreen from "../components/screens/Cart/CartScreen";
import {
  darkTheme,
  lightTheme,
} from "../components/screens/ThemeProvider/Theme";
import { useSelector } from "react-redux";
import LanguageSwitcher from "../components/screens/localization/LanguageSwitcher";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const appTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Language" component={LanguageSwitcher} />

        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ProofOfDelivery" component={ProofOfDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
