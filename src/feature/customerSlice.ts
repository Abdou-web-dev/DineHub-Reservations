import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  food: string[];
  //the new 4 props
  guestsNumber: number | string;
  restauLocation: string;
  orderDate: string;
  orderTime: string;
}

interface AddFoodToCustomerPayload {
  food: string;
  id: string;
}

export interface CustomerState {
  value: Customer[];
  // age: number;
}

const initialState: CustomerState = {
  value: [],
  // age: 0,
};
// https://www.softkraft.co/how-to-setup-slices-with-redux-toolkit/#data-displaying
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/65901775/partial-reset-of-state-with-createslice
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    addFoodToCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>
    ) => {
      state.value.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.push(action.payload.food);
        }
      });
    },
  },
});

export const { addCustomer, addFoodToCustomer } = customerSlice.actions;

export default customerSlice.reducer;
