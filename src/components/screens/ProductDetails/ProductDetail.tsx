import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Slices/cartSlice";
import ImageViewer from "react-native-image-zoom-viewer";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

const ProductDetails = ({ route, navigation }: any) => {
  const { product } = route.params || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme(); // Get theme colors

  const [modalVisible, setModalVisible] = React.useState(false);

  const images = [
    {
      url: product?.image || "",
    },
  ];

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorMessage, { color: colors.text }]}>
          {t("Product details not available")}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={[styles.cartButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.cartButtonText, { color: colors.card }]}>
            {t("Go to Cart")}
          </Text>
        </TouchableOpacity>

        {/* Product Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          {product.title}
        </Text>

        {/* Product Image */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </TouchableOpacity>

        {/* Image Viewer Modal */}
        <Modal visible={modalVisible} transparent={true}>
          <ImageViewer
            imageUrls={images}
            onCancel={() => setModalVisible(false)}
            enableSwipeDown
          />
        </Modal>

        {/* Product Description */}
        <Text style={[styles.description, { color: colors.text }]}>
          {product.description}
        </Text>

        {/* Product Price */}
        <Text style={[styles.price, { color: colors.text }]}>
          {t("price")}: ${product.price}
        </Text>
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={() => {
          dispatch(addToCart(product));
          Alert.alert(t("Success"), t("Product added to cart successfully!"));
        }}
        style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.addToCartButtonText, { color: colors.card }]}>
          {t("Add to Cart")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: Dimensions.get("window").width - 40,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addToCartButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 5,
    right: 5,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  cartButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetails;
