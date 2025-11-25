import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listingApi } from "../../api/listingApi";
import { propertyApi } from "../../api/propertyApi";
import type { Property } from "../../types/property";
import type { PopularListings } from "../../types/listings";
import type { RootState } from "../../store/store";

interface PropertyState {
  popular: PopularListings | null;
  details: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  popular: null,
  details: null,
  loading: false,
  error: null,
};

export const fetchPopularListings = createAsyncThunk<
  PopularListings,
  void,
  { rejectValue: string }
>("properties/fetchPopular", async (_, thunkAPI) => {
  try {
    return await listingApi.getPopular();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load popular listings");
  }
});

export const fetchPropertyDetails = createAsyncThunk<
  Property,
  number,
  { rejectValue: string }
>("properties/fetchDetails", async (id, thunkAPI) => {
  try {
    return await propertyApi.getProperty(id);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load property details");
  }
});

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularListings.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error loading listings";
      })
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error loading property";
      });
  },
});

export const selectProperties = (state: RootState) => state.properties;

export default propertySlice.reducer;
