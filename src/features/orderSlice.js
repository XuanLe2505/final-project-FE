import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  orders: [],
  order: {},
  delivery: {},
  status: "idle",
  errorMessage: "",
  loading: false,
};

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (delivery) => {
    console.log(delivery);
    const response = await apiService.post("/createNewOrder", { delivery });
    return response.data;
  }
);

export const userGetAllOrders = createAsyncThunk(
  "orders/userGetAllOrders",
  async ({ page, limit }) => {
    let url = `/userGetAllOrders?page=${page}&limit=${limit}`;
    const response = await apiService.get(url);
    return response.data;
  }
);

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (orderId) => {
    const response = await apiService.get(`/getOrder/${orderId}`);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setDelivery(state, action) {
      state.delivery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(userGetAllOrders.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(userGetAllOrders.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        console.log(action.payload);
        state.orders = action.payload;
      })
      .addCase(userGetAllOrders.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default orderSlice.reducer;

export const { setDelivery } = orderSlice.actions;
