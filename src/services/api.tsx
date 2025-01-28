import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await fakeStoreApi.get("/products");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch products";
    throw new Error(errorMessage);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    console.log("API_BASE_URL: ", API_BASE_URL);

    console.log("credentials data: ", { username, password });

    const response = await api.post("/auth/login", { username, password });
    console.log("Response", response.data);

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
};
