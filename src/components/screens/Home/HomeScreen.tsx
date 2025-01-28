import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { NavigationProp } from "@react-navigation/native";
import { fetchProducts } from "../../../services/api"; // Adjust the import path as needed
import ThemeSwitcher from "../ThemeProvider/index";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: { rate: number };
}

interface Filters {
  categories?: string[];
  priceRange?: [number, number];
  minRating?: number;
}

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const theme = useSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const applyFilters = (filters: Filters) => {
    console.log("Filters applied:", filters);
    const { categories, priceRange, minRating } = filters;

    let filtered = products;

    if (categories?.length) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    if (minRating) {
      filtered = filtered.filter(
        (product) => product.rating && product.rating.rate >= minRating
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          theme === "dark" && styles.darkBackground,
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme === "dark" ? "#ffffff" : "#0000ff"}
        />
        <Text style={[styles.loadingText, theme === "dark" && styles.darkText]}>
          Loading Products...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === "dark" && styles.darkBackground]}>
      <ThemeSwitcher />
      <TouchableOpacity
        style={[
          styles.dynamicButton,
          theme === "dark" ? styles.darkButton : styles.lightButton,
        ]}
        onPress={() => navigation.navigate("ProofOfDelivery")}
      >
        <Text
          style={[
            styles.dynamicButtonText,
            theme === "dark" && styles.darkButtonText,
          ]}
        >
          {t("Proof of Delivery")}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          { fontSize: 22 },
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {t("welcome")}
      </Text>

      <TouchableOpacity
        style={[
          styles.dynamicButton,
          theme === "dark" ? styles.darkButton : styles.lightButton,
        ]}
        onPress={() => navigation.navigate("Language")}
      >
        <Text
          style={[
            styles.dynamicButtonText,
            theme === "dark" && styles.darkButtonText,
          ]}
        >
          {t("Change Language")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={[
          styles.dynamicButton,
          theme === "dark" ? styles.darkButton : styles.lightButton,
        ]}
      >
        <Text
          style={[
            styles.dynamicButtonText,
            theme === "dark" && styles.darkButtonText,
          ]}
        >
          {t("Go to Cart")}
        </Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={[styles.title, theme === "dark" && styles.darkText]}>
          {t("Product Catalog")}
        </Text>
        <TouchableOpacity
          style={[
            styles.dynamicButton,
            theme === "dark" ? styles.darkButton : styles.lightButton,
          ]}
          onPress={() =>
            navigation.navigate("Filters", {
              categories: [
                "electronics",
                "jewelery",
                "men's clothing",
                "women's clothing",
              ],
              applyFilters: applyFilters,
            })
          }
        >
          <Text
            style={[
              styles.dynamicButtonText,
              theme === "dark" && styles.darkButtonText,
            ]}
          >
            {t("Filters")}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.productCard, theme === "dark" && styles.darkCard]}
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text
                style={[
                  styles.productName,
                  theme === "dark" && styles.darkText,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.productPrice,
                  theme === "dark" && styles.darkText,
                ]}
              >
                ${item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#ffffff" },
  darkBackground: { backgroundColor: "#1e1e1e" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
  darkText: { color: "#ffffff" },
  lightText: { color: "#000000" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#000" },
  productCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  darkCard: { backgroundColor: "#333", borderColor: "#555" },
  productImage: { width: 100, height: 100, resizeMode: "contain" },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  productPrice: { fontSize: 14, color: "#888" },
  dynamicButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  lightButton: { backgroundColor: "#007BFF" },
  darkButton: { backgroundColor: "#444" },
  dynamicButtonText: { fontSize: 16 },
  darkButtonText: { color: "#fff" },
});

export default HomeScreen;
