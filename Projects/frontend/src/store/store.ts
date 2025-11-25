import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    search: searchReducer,
  },
});

// Types for dispatch and selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
