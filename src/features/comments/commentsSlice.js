import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comments: [],
    newComment:{},
    eraseComment:{},
    commentUpdated:{},
    commentToEdit:{},
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
  async()=>{
    try {
      return await commentsService.getAll();
    } catch (error) {
      console.error(error)
    }
  }
);

export const destroyComment = createAsyncThunk(
  "comments/destroyComment",
  async(_id)=>{
    try {
      return await commentsService.destroyComment(_id);
    } catch (error) {
      console.error(error)
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async(data, commentId)=>{
    try {
      return await commentsService.updateComment(data, commentId);
    } catch (error) {
      console.error(error)
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
    setCommentToEdit: (state, action) =>{
      state.commentToEdit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
        state.newComment = action.payload.comment
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getAll.fulfilled,(state, action)=>{
        state.comments = action.payload.comments
      })
      .addCase(destroyComment.fulfilled,(state,action)=>{
        state.eraseComment = action.payload.comment
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateComment.fulfilled, (state, action) =>{
        state.commentUpdated = action.payload;
        state.message = action.payload.message;
      })
    },
});

export const { resetC, setCommentToEdit } = commentsSlice.actions;
export default commentsSlice.reducer;
