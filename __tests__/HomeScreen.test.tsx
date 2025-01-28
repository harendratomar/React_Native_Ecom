// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react-native";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import HomeScreen from "../src/components/screens/Home/HomeScreen";
// import { fetchProducts } from "../src/services/api";

// jest.mock("../../../services/api", () => ({
//   fetchProducts: jest.fn(),
// }));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

// const mockNavigate = jest.fn();

// const createTestProps = (props: object) => ({
//   navigation: { navigate: mockNavigate },
//   ...props,
// });

// describe("HomeScreen Component", () => {
//   const initialState = {
//     theme: { theme: "light" },
//   };
//   const mockStore = configureStore();
//   let store = mockStore(initialState);

//   beforeEach(() => {
//     jest.clearAllMocks();
//     store = mockStore(initialState);
//   });

//   it("should render loading state initially", () => {
//     const props = createTestProps({});
//     const { getByText, getByTestId } = render(
//       <Provider store={store}>
//         <HomeScreen {...props} />
//       </Provider>
//     );

//     expect(getByTestId("loading-indicator")).toBeTruthy();
//     expect(getByText("Loading Products...")).toBeTruthy();
//   });

//   it("should fetch and display products", async () => {
//     const mockProducts = [
//       { id: 1, title: "Product 1", price: 10, image: "image1", category: "A" },
//       { id: 2, title: "Product 2", price: 20, image: "image2", category: "B" },
//     ];
//     (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

//     const props = createTestProps({});
//     const { getByText, findByText } = render(
//       <Provider store={store}>
//         <HomeScreen {...props} />
//       </Provider>
//     );

//     await waitFor(() => expect(fetchProducts).toHaveBeenCalled());
//     expect(await findByText("Product 1")).toBeTruthy();
//     expect(await findByText("Product 2")).toBeTruthy();
//   });

//   it("should navigate to ProofOfDelivery screen when button is pressed", () => {
//     const props = createTestProps({});
//     const { getByText } = render(
//       <Provider store={store}>
//         <HomeScreen {...props} />
//       </Provider>
//     );

//     fireEvent.press(getByText("Proof of Delivery"));
//     expect(mockNavigate).toHaveBeenCalledWith("ProofOfDelivery");
//   });

//   it("should apply filters correctly", async () => {
//     const mockProducts = [
//       {
//         id: 1,
//         title: "Product 1",
//         price: 10,
//         image: "image1",
//         category: "electronics",
//         rating: { rate: 4 },
//       },
//       {
//         id: 2,
//         title: "Product 2",
//         price: 50,
//         image: "image2",
//         category: "jewelery",
//         rating: { rate: 5 },
//       },
//     ];
//     (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

//     const props = createTestProps({});
//     const { getByText, findByText, getByTestId } = render(
//       <Provider store={store}>
//         <HomeScreen {...props} />
//       </Provider>
//     );

//     await waitFor(() => expect(fetchProducts).toHaveBeenCalled());

//     fireEvent.press(getByText("Filters"));
//     const applyFilters = mockNavigate.mock.calls[0][1]?.applyFilters;
//     applyFilters({ categories: ["electronics"], priceRange: [0, 20] });

//     expect(await findByText("Product 1")).toBeTruthy();
//     expect(getByTestId("flatlist").props.data).toHaveLength(1);
//   });

//   it("should display dark mode correctly", () => {
//     const darkState = {
//       theme: { theme: "dark" },
//     };
//     const darkStore = mockStore(darkState);
//     const props = createTestProps({});

//     const { getByText, getByTestId } = render(
//       <Provider store={darkStore}>
//         <HomeScreen {...props} />
//       </Provider>
//     );

//     expect(getByTestId("container").props.style).toContainEqual({
//       backgroundColor: "#1e1e1e",
//     });
//     expect(getByText("Product Catalog").props.style).toContainEqual({
//       color: "#ffffff",
//     });
//   });
// });
