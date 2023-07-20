import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReservationsState {
  reservations: string[];
}

const initialState: ReservationsState = {
  reservations: [],
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<string>) => {
      state.reservations.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      state.reservations.splice(action.payload, 1);
    },
  },
});

export const { addReservation, removeReservation } = reservationsSlice.actions;

export default reservationsSlice.reducer;
