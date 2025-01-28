import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../Redux/Slices/cartSlice";
import { useTheme } from "@react-navigation/native";
import { RootState } from "../../../Redux/Store";
import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

interface CartScreenProps {
  navigation: NavigationProp<any>;
}

const CartScreen: React.FC<CartScreenProps> = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const renderCartItem = ({ item }: any) => (
    <View
      style={[
        styles.cartItem,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.itemName, { color: colors.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.itemDetails, { color: colors.text }]}>
        {t("price")}: ${item.price.toFixed(2)}
      </Text>
      <Text style={[styles.itemDetails, { color: colors.text }]}>
        {t("quantity")}: {item.quantity}
      </Text>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.id))}
        style={[styles.removeButton]}
      >
        <Text style={styles.removeButtonText}>{t("remove")}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        {t("Your Cart")}
      </Text>
      {cartItems.length === 0 ? (
        <Text style={[styles.emptyMessage, { color: colors.text }]}>
          {t("Your cart is empty")}
        </Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <Text style={[styles.totalText, { color: colors.text }]}>
          {t("Total")}: ${calculateTotal()}
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Your order has been placed successfully.")
          }
          style={styles.placeOrderButton}
        >
          <Text style={styles.placeOrderButtonText}>{t("Place Order")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(clearCart())}
          style={styles.clearCartButton}
        >
          <Text style={styles.clearCartButtonText}>{t("Clear Cart")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  emptyMessage: { fontSize: 18, textAlign: "center", marginTop: 32 },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemDetails: { fontSize: 14 },
  removeButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#ff6b6b",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  removeButtonText: { color: "#fff", fontWeight: "bold" },
  footer: {
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
  },
  totalText: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  placeOrderButton: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#4caf50",
    borderRadius: 4,
    alignItems: "center",
  },
  placeOrderButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  clearCartButton: {
    padding: 12,
    backgroundColor: "#ff6b6b",
    borderRadius: 4,
    alignItems: "center",
  },
  clearCartButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  productImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
  },
});

export default CartScreen;
