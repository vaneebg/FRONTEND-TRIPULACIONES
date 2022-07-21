import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comments: [],
    numberComments:0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    page: 1,
};

export const createComment = createAsyncThunk(
  "comments/getPostsByName",
  async (data) => {
    try {
      return await commentsService.createComment(data);
    } catch (error) {
      console.error(error);
    }
  }
);

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
        state.comment = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
    },
});

export const { resetC } = commentsSlice.actions;
export default commentsSlice.reducer;
