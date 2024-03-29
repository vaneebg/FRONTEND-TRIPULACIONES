import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quiz: {},
  isError: false,
  isSuccess: false,
  message: '',
  userId:{},
  routeRecommended:{}
};

export const createQuiz = createAsyncThunk("quiz/createQuiz", async (data) => {
  try {
    return await quizService.createQuiz(data);
  } catch (error) {
    console.error(error);
  }
}
);

export const createQuizData = createAsyncThunk("quiz/createQuizData", async (data, thunkAPI) => {
  try {
    return await quizService.createQuizData(data);
  } catch (error) {
    console.error(error)
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
}
);

export const getRecommended=createAsyncThunk("quiz/getRecommended", async(userId,thunkAPI)=>{
  try {
    return await quizService.getRecommended(userId)
  } catch (error) {
    console.error(error)
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
})


export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload.quiz
      state.isSuccess=true
      state.message=action.payload.message
    })
      .addCase(createQuizData.fulfilled, (state, action) => {
        state.isSuccess=true
        state.userId=action.payload.user_id
      })
      .addCase(createQuizData.rejected, (state, action) => {
        state.isError=true
      })
      .addCase(getRecommended.fulfilled, (state,action) =>{
        state.routeRecommended=action.payload
      })
      .addCase(getRecommended.rejected, (state,action) =>{
        state.isError=true
      })
  },
});
export const { reset} = quizSlice.actions;


export default quizSlice.reducer;
