// Redux slice for managing the active food item
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFoodItem: "",
};
const updateModalSlice = createSlice({
  name: "updateModal",
  initialState: initialState,
  reducers: {
    setActiveFoodItem: (state, action) => {
      state.activeFoodItem = action.payload;
    },
  },
});

export const { setActiveFoodItem } = updateModalSlice.actions;
export default updateModalSlice.reducer;
