import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  categories: [],
  status: "idle",
  errorMessage: "",
  loading: false,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await apiService.get(`/categories`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default categorySlice.reducer;
