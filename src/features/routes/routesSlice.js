import routesService from './routesService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  routes:[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAll = createAsyncThunk("routes/getAll", async () => {
    try {
      return await routesService.getAll();
    } catch (error) {
      console.error(error);
    }
  });

export const getById = createAsyncThunk(
  "routes/getById",
  async (_id) => {
    try {
      return await routesService.getById(_id);
    } catch (error) {
      console.error(error)
    }
  });

  export const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getAll.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.routes = action.payload;
        state.isLoading = false
      })
        .addCase(getAll.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getById.fulfilled, (state, action) => {
          state.post = action.payload
        })
    }})

    export const { reset } = routesSlice.actions;

export default routesSlice.reducer;