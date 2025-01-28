import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Slider from "@react-native-community/slider";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

interface FiltersScreenProps {
  route: {
    params: {
      categories: string[];
      applyFilters: (filters: {
        categories: string[];
        priceRange: number[];
        rating: number;
      }) => void;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const FiltersScreen: React.FC<FiltersScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { categories, applyFilters } = route.params;
  const { t } = useTranslation();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [rating, setRating] = useState<number>(0);

  const handleApplyFilters = () => {
    applyFilters({
      categories: selectedCategories,
      priceRange,
      rating,
    });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t("filters")}</Text>

      <Text style={[styles.label, { color: colors.text }]}>
        {t("categories")}:
      </Text>
      <MultiSelect
        items={categories.map((category) => ({ id: category, name: category }))}
        uniqueKey="id"
        onSelectedItemsChange={(selected) => setSelectedCategories(selected)}
        selectedItems={selectedCategories}
        selectText={t("select_categories")}
        searchInputPlaceholderText={t("search_categories")}
        tagRemoveIconColor={colors.text}
        tagBorderColor={colors.border}
        tagTextColor={colors.text}
        selectedItemTextColor={colors.text}
        selectedItemIconColor={colors.primary}
        itemTextColor={colors.text}
        displayKey="name"
        searchInputStyle={{ color: colors.text }}
        styleDropdownMenuSubsection={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        styleListContainer={{
          backgroundColor: colors.card,
        }}
        styleInputGroup={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
        submitButtonColor={colors.card}
        submitButtonText={t("apply")}
      />

      <Text style={[styles.label, { color: colors.text }]}>
        {t("price_range")}: ${priceRange[0]} - ${priceRange[1]}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={500}
        step={10}
        value={priceRange[1]}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primary}
        onValueChange={(value) =>
          setPriceRange([priceRange[0], Math.round(value)])
        }
      />

      <Text style={[styles.label, { color: colors.text }]}>
        {t("minimum_rating")}: {rating} {t("stars")}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={rating}
        minimumTrackTintColor={colors.primary}
        thumbTintColor={colors.primary}
        onValueChange={(value) => setRating(value)}
      />

      <TouchableOpacity
        style={[styles.applyButton, { backgroundColor: colors.primary }]}
        onPress={handleApplyFilters}
      >
        <Text style={[styles.applyButtonText, { color: colors.card }]}>
          {t("apply_filters")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  applyButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default FiltersScreen;
