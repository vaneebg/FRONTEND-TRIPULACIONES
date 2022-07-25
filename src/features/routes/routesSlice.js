import routesService from './routesService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  routes:[],
  route: {},
  routeLiked:{},
  routeDisliked:{},
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

export const like = createAsyncThunk("routes/like", async (_id) => {
  try {
    return await routesService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("routes/dislike", async (_id) => {
  try {
    return await routesService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});
export const searchByType =createAsyncThunk("routes/searchByType", async (type)=> {
  try {
    return await routesService.searchByType(type);
  } catch (error) {
    console.error(error);
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
          state.route = action.payload
        })
        .addCase(like.fulfilled, (state, action) =>{
          const routes = state.routes.map((route)=>{
            if (route._id === action.payload._id){
              route = action.payload;
            }
            return route;
          });
          state.routes = routes;
          state.routeLiked = routes;
        })
        .addCase(dislike.fulfilled, (state, action) =>{
          const routes = state.routes.map((route)=>{
            if (route._id === action.payload.route._id){
              route = action.payload.route;
            }
            return route;
          });
          state.routes = routes;
          state.routeDisliked = routes
        })
        .addCase(searchByType.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.routes = action.payload.routes;
          state.isLoading = false
        })
    }})

    export const { reset } = routesSlice.actions;

export default routesSlice.reducer;