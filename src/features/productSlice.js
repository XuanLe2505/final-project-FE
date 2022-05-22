import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import apiService from "../app/apiService";

const initialState = {
  totalPage: "",
  products: [],
  status: "idle",
  errorMessage: "",
  loading: false,
  product: {},
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page, limit, categoryName }) => {
    let url = `/products?page=${page}&limit=${limit}&category=${categoryName}`;
    const response = await apiService.get(url);
    return response.data;
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async ({ productId }) => {
    const response = await apiService.get(`/products/${productId}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.products = action.payload.productsList;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default productSlice.reducer;
