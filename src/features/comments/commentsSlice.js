import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comments: [],
    newComment:{},
    numberComments:0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    page: 1,
};

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data) => {
    try {
      return await commentsService.createComment(data);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAll = createAsyncThunk(
  "comments/getComments",
  async(page)=>{
    try {
      return await commentsService.getAll(page);
    } catch (error) {
      console.error(error)
    }
  }
)

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetC: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    choosePage: (state) => {
        state.page = false;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
        state.newComment = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getAll.fulfilled,(state, action)=>{
        console.log(action.payload.comments)
        state.numberComments = action.payload.numberComments
        state.comments = action.payload.comments
      })
    },
});

export const { resetC } = commentsSlice.actions;
export default commentsSlice.reducer;
