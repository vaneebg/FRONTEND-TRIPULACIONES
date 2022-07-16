import authService from './authService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  userUpdated: {},
  isError: false,
  isSuccess: false,
  messageDelete: '',
  message: '',
  messageLogout: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (userReg, thunkAPI) => {
    try {
      return await authService.register(userReg);
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const myInfo = createAsyncThunk("auth/myInfo", async (thunkAPI) => {
  try {
    return await authService.myInfo(user);
  } catch (error) {
    console.error(error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (thunkAPI) => {
  try {
    return await authService.deleteUser();
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk("auth/updateUser", async (data, thunkAPI) => {
  try {
    return await authService.updateUser(data);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.messageDelete = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(myInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.messageLogout = action.payload.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null;
        state.messageDelete = action.payload.message;
      })
      .addCase(updateUser.fulfilled, (state, action) =>{
        state.userUpdated = action.payload;
        state.messageUpdated = action.payload.message;
      })
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
