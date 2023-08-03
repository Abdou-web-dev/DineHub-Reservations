// // foodItemSlice.js

// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const foodItemInitialState = {
//   foodItems: [
//     {
//       food_value: "pizza",
//       food_name: "Pizza",
//       // other properties...
//     },
//     {
//       food_value: "tacos",
//       food_name: "Tacos",
//       // other properties...
//     },
//     // Add more  food items...
//   ],
// };
// interface updateFoodItemNamePayload {
//   foodValue: string;
//   newName: string;
// }
// const foodItemSlice = createSlice({
//   name: "foodItem",
//   initialState: {
//     // Your initial state for food items
//     foodItemInitialState,
//   },
//   reducers: {
//     updateFoodItemName: (
//       state,
//       action: PayloadAction<updateFoodItemNamePayload>
//     ) => {
//       const { foodValue, newName } = action.payload;
//       const foodItemToUpdate = state.foodItemInitialState.foodItems.find(
//         (item) => item.food_value === foodValue
//       );

//       if (foodItemToUpdate) {
//         foodItemToUpdate.food_name = newName;
//       }
//     },
//     // Other reducers...
//   },
// });

// // export const { updateFoodItemName } = foodItemSlice.actions;
// export default foodItemSlice.reducer;
