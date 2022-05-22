import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import headerReducer from "../features/headerSlice";
import cartReducer from "../features/cartSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    header: headerReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
