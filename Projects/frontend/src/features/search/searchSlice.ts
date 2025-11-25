import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../api/searchApi";
import type { Property } from "../../types/property";
import type { RootState } from "../../store/store";

interface ApiSearchError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface SearchState {
  query: string;
  results: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

export const runSearch = createAsyncThunk<
  Property[],
  string,
  { rejectValue: string }
>("search/run", async (keyword, thunkAPI) => {
  try {
    const res = await searchApi.search({ keyword });
    return res.results;
  } catch (err) {
    const error = err as ApiSearchError;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Search failed"
    );
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runSearch.pending, (state) => {
        state.loading = true;
        state.results = [];
      })
      .addCase(runSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(runSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Search error";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
