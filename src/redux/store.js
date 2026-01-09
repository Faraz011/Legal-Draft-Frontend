import { configureStore } from "@reduxjs/toolkit";
import leasesReducer from "./PropertySlices/LeaseSlice";  

export const store = configureStore({
  reducer: {
    leases: leasesReducer,
  },
});
