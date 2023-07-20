import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  food: string[];
  //the new 4 props
  guestsNumber?: number | string;
  restauLocation?: string;
  orderDate?: string;
  orderTime?: string;
}

interface AddFoodToCustomerPayload {
  food: string;
  id: string;
}
interface RemoveFoodFromCustomerPayload {
  // food: string;
  id: string;
  index: number;
}
interface AddLocationToCustomerPayload {
  location: string;
  id: string;
}

export interface CustomerState {
  customers: Customer[];
}

const initialState: CustomerState = {
  customers: [],
};
// https://www.softkraft.co/how-to-setup-slices-with-redux-toolkit/#data-displaying
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // https://stackoverflow.com/questions/65901775/partial-reset-of-state-with-createslice
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    addFoodToCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>
    ) => {
      state.customers.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.push(action.payload.food);
          // customer.food.push(action.payload.food + "string");
        }
      });
    },
    // addFoodToCustomer_version2: (
    //   state,
    //   action: PayloadAction<AddFoodToCustomerPayload>
    // ) => {
    //   const { id, food } = action.payload;
    //   const customer = state.customers.find((customer) => customer.id === id);
    //   if (customer) {
    //     customer.food.push(food);
    //   }
    // },
    addLocationToCustomer: (
      state,
      action: PayloadAction<AddLocationToCustomerPayload>
    ) => {
      const { id, location } = action.payload;
      // const { id, guestNumber, location, ...etc... } = action.payload;

      const customer = state.customers.find((customer) => customer.id === id);

      if (customer) {
        customer.restauLocation = location;
        // customer.guestsNumber = guestsNumber;
      }
    },
    deleteFoodFromCustomer: (
      state,
      action: PayloadAction<RemoveFoodFromCustomerPayload>
    ) => {
      state.customers.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.splice(action.payload.index, 1);
        }
      });
    },
  },
});

export const {
  addCustomer,
  addFoodToCustomer,
  addLocationToCustomer,
  deleteFoodFromCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
