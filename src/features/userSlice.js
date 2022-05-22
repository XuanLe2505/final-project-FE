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
    const response = await apiService.get("/users/me");
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
        console.log(action.payload);
        state.userProfile = action.payload;
      })
      .addCase(getCurrentUserProfile.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;

// export const updateUserProfile =
//   ({
//     username,
//     email,
//     password,
//   }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const data = {
//         name,
//         email,
//         password,
//       };
//       const response = await apiService.put(`/users/${userId}`, data);
//       dispatch(slice.actions.updateUserProfileSuccess(response.data));
//       toast.success("Update Profile successfully");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };
