import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  NativeModules,
  TouchableOpacity,
} from "react-native";

const { CameraModule } = NativeModules;

const ProofOfDeliveryScreen: React.FC = ({ navigation }: any) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [condition, setCondition] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { t } = useTranslation();
  const { colors } = useTheme(); // Get theme colors

  const capturePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(t("Camera permission denied"));
      return;
    }

    try {
      const uri = await CameraModule.openCamera();
      setImageUri(uri);
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert(t("Failed to open the camera or capture image."));
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: t("Camera Permission"),
          message: t("App needs access to your camera to take pictures"),
          buttonNeutral: t("Ask Me Later"),
          buttonNegative: t("Cancel"),
          buttonPositive: t("OK"),
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleSubmit = () => {
    const proofOfDeliveryData = { imageUri, condition, comments, rating };
    console.log("Submitted Data:", proofOfDeliveryData);
    Alert.alert(t("Data Submitted Successfully"));
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("Proof of Delivery")}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={capturePhoto}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          {t("Capture Photo")}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <View>
          <Text style={{ color: colors.text }}>
            {t("Image Path")}: {imageUri}
          </Text>
          <Image source={{ uri: `file://${imageUri}` }} style={styles.image} />
        </View>
      )}

      <Text style={{ color: colors.text }}>{t("Condition")}:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        placeholder={t("Enter condition (e.g., Good, Damaged)")}
        value={condition}
        onChangeText={setCondition}
      />

      <Text style={{ color: colors.text }}>{t("Comments")}:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        placeholder={t("Enter comments")}
        value={comments}
        onChangeText={setComments}
      />

      <Text style={{ color: colors.text }}>{t("Rating")}:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        placeholder={t("Enter rating (1-5)")}
        value={rating.toString()}
        onChangeText={(text) => setRating(Number(text))}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              condition && imageUri ? colors.primary : colors.border, // Disable style when condition/imageUri is empty
          },
        ]}
        onPress={handleSubmit}
        disabled={!condition || !imageUri}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: condition && imageUri ? colors.background : colors.text,
            },
          ]}
        >
          {t("Submit")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProofOfDeliveryScreen;
