import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  userProfile: "",
  loading: false,
  status: "idle",
  errorMessage: "",
};

export const getCurrentUserProfile = createAsyncThunk(
  "user/getCurrentUserProfile",
  async () => {
    const response = await apiService.get("user/me");
    return response.data;
  }
);
export const activationEmail = createAsyncThunk(
  "user/activation",
  async (activationToken) => {
    const response = await apiService.post("/user/activation", {
      activationToken,
    });
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ username, email, phone, address, avatarUrl }) => {
    if (typeof avatarUrl === "object") {
      let formData = new FormData();
      formData.append("image", avatarUrl);
      const result = await apiService.post("/user/uploadImage", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      avatarUrl = result.data;
      const response = await apiService.put(`/user/updateProfile`, {
        username,
        email,
        phone,
        address,
        avatarUrl,
      });
      return response.data;
    }
    const response = await apiService.put(`/user/updateProfile`, {
      username,
      email,
      phone,
      address,
      avatarUrl,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserProfile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getCurrentUserProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getCurrentUserProfile.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(activationEmail.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(activationEmail.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(activationEmail.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
