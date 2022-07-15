import authService from "./authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
 
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isSuccess = true;
            state.message = action.payload.message;
          })
          .addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload;
          })
        },
    })
    
    export const { reset } = authSlice.actions;
    
    export default authSlice.reducer;