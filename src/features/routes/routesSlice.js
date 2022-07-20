import routesService from './routesService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  routes:[],
  route: {},
  numberRoutes: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAll = createAsyncThunk("routes/getAll", async (page) => {
    try {
      return await routesService.getAll(page);
    } catch (error) {
      console.error(error);
    }
  });

export const getById = createAsyncThunk("routes/getById", async (_id) => {
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
        state.numberRoutes = action.payload.numberRoutes;
        state.isSuccess = true;
        state.routes = action.payload.routes;
        state.isLoading = false
      })
        .addCase(getAll.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getById.fulfilled, (state, action) => {
          console.log("action",action.payload)
          state.route = action.payload
        })
    }})

    export const { reset } = routesSlice.actions;

export default routesSlice.reducer;