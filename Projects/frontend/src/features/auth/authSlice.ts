import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthResponse, LoginDTO, RegisterDTO, User } from "../../types/user";
import type { RootState } from "../../store/store";
import { authApi } from "../../api/authApi";

interface ApiErrorShape {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  AuthResponse,
  LoginDTO,
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    return await authApi.login(data);
  } catch (err) {
    const error = err as ApiErrorShape;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Login failed"
    );
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterDTO,
  { rejectValue: string }
>("auth/register", async (data, thunkAPI) => {
  try {
    return await authApi.register(data);
  } catch (err) {
    const error = err as ApiErrorShape;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Registration failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
