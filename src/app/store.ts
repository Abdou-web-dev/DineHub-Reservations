import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../feature/customerSlice";
import reservationsReducer from "../feature/reservationSlice";
import updateModalReducer from "../feature/updateModalSlice";

export const store = configureStore({
  reducer: {
    reservationsReducer,
    customerReducer,
    updateModalReducer, // Add the new reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
