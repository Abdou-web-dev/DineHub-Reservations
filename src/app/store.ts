import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../feature/customerSlice";
import reservationsReducer from "../feature/reservationSlice";

export const store = configureStore({
  reducer: {
    reservationsReducer,
    customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
