import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import apiService from "../app/apiService";

const initialState = {
  cartProducts: [],
  status: "idle",
  errorMessage: "",
  loading: false,
};

export const confirm = createAsyncThunk(
  "cart/confirm",
  async ({ cartProducts }) => {
    const response = await apiService.post("/cart", { cartProducts });
    return response.data.products;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
    addToCart(state, action) {
      let currentCart = state.cartProducts;
      const product = action.payload;

      const found = currentCart.find(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (found) {
        currentCart = currentCart.map((cartProduct) => {
          if (cartProduct.product._id === product._id) {
            return cartProduct.quantity++;
          } else {
            return cartProduct;
          }
        });
      } else {
        currentCart.push({ product: product, quantity: 1 });
      }
    },

    incrementToCart(state, action) {
      const cloneCart = state.cartProducts.map((el) => {
        return { ...el };
      });
      state.cartProducts = cloneCart.map((cartProduct) => {
        if (cartProduct.product._id === action.payload.productId) {
          cartProduct.quantity++;
        }
        return cartProduct;
      });
    },
    decrementToCart(state, action) {
      const cloneCart = state.cartProducts.map((el) => {
        return { ...el };
      });
      state.cartProducts = cloneCart
        .map((cartProduct) => {
          if (cartProduct.product._id === action.payload.productId) {
            cartProduct.quantity--;
          }
          return cartProduct;
        })
        .filter((product) => product.quantity > 0);
    },
    deleteFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter(
        (cartProduct) => cartProduct.product._id !== action.payload
      );
    },
    clearCart(state) {
      state.cartProducts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(confirm.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(confirm.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        // console.log(action.payload);
        state.cartProducts = action.payload;
      })
      .addCase(confirm.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const {
  addToCart,
  incrementToCart,
  decrementToCart,
  deleteFromCart,
  clearCart,
  setCartProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
