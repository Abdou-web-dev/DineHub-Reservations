import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  food: [
    {
      food_value: string;
      food_id: number;
      food_category: string;
    }
  ];
  //the new 4 props
  guestsNumber?: number | string;
  restauLocation?: string;
  orderDate?: string;
  orderTime?: string;
}

interface AddFoodToCustomerPayload {
  food_element: {
    food_value: string;
    food_id: number;
    food_category: string;
  };
  id: string;
}
interface RemoveFoodFromCustomerPayload {
  // food: string;
  id: string;
  index: number;
}
interface UpdateFoodItemPayload {
  // food: string;
  id: string;
  index: number;
  new_food_item: {
    food_id?: number;
    food_value: string;
  };
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
    deleteCustomer: (state, action: PayloadAction<number>) => {
      state.customers.splice(action.payload, 1);
    },
    addFoodToCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>
    ) => {
      state.customers.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.push({
            food_value: action.payload.food_element.food_value,
            food_id: action.payload.food_element.food_id,
            food_category: action.payload.food_element.food_category,
          });
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
    updateSpecificFoodItem: (
      state,
      action: PayloadAction<UpdateFoodItemPayload>
    ) => {
      state.customers.forEach((customer) => {
        if (customer.id === action.payload.id) {
          //the id is relevant to a given customer
          customer.food.forEach((singleFood) => {
            if (singleFood.food_id === action.payload.new_food_item.food_id) {
              //the index is relevant to a given food item
              singleFood.food_value = action.payload.new_food_item?.food_value;
              singleFood.food_id = action.payload.new_food_item.food_id;
              // singleFood.food_category = "categ";
              // singleFood.food_value = newFoodItem.food_value;
            }
          });
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
  updateSpecificFoodItem,
  deleteCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
