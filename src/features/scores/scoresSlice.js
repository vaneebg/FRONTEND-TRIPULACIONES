import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scoresService from "./scoresService";

const initialState = {
    scores: [],
    newScore:{},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const createScore = createAsyncThunk("scores/createScore", async (data) => {
    try {
      return await scoresService.createScore(data);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllScores = createAsyncThunk("scores/getAllScores", async()=>{
    try {
      return await scoresService.getAllScores();
    } catch (error) {
      console.error(error)
    }
  }
)
export const deleteScore= createAsyncThunk("scores/deleteScore", async (_id) => {
  try {
    return await scoresService.deleteScore(_id)
  } catch (error) {
    console.error(error);
   
  }
});

export const scoresSlice = createSlice({
  name: "scores",
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
    builder.addCase(createScore.fulfilled, (state, action) => {
        state.newScore = action.payload.score
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getAllScores.fulfilled,(state, action)=>{
        state.scores = action.payload
      })
      .addCase(deleteScore.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.newScore = action.payload.score;
        state.message = action.payload.message;
      })
    },
});

export const { reset } = scoresSlice.actions;
export default scoresSlice.reducer;
