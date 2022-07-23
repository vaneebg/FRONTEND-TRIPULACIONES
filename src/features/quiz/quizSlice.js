import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quiz: [],
};

export const createQuiz = createAsyncThunk("quiz/createQuiz", async (data) => {
  try {
    return await quizService.createQuiz(data);
  } catch (error) {
    console.error(error);
  }
}
);

export const getQuiz = createAsyncThunk("quiz/getQuiz", async () => {
  try {
    return await quizService.getQuiz();
  } catch (error) {
    console.error(error)
  }
}
)


export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload
    })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload
      })
  },
});

export default quizSlice.reducer;
