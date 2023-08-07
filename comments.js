// console.log(foodList, newFoodItem, replace(newFoodItem, foodList), "heere");

// foodList.map(obj => arr2.find(o => o.id === obj.food_id) || obj);
// var index_tacos = storedItems?.indexOf({ food_value: "tacos" });
// includes and indexOf array methods work only when we are searching for a number or a string in an array, not an object
//   Array.includes(element, 0),

// let array_items = [
//   { key: "pirannha", value: 44 },
//   { key: "maccadamedia", value: 88 },
//   { key: "booy", value: 412 },
// ];

// let array = ["pirannha", "booy", "maccadamedia"];
// let obj = { key: "booy", value: 412 };
// console.log(
// array_items.some((person) => person.key === "maccadamedia"),
// "here"
// );

// const replace_with_new_food_items = (objects: FoodItem[], list: FoodItem[]) => {
//   let newList: FoodItem[] = [];
//   list.forEach(function (item: FoodItem) {
//     if (
//       item.food_category === `tacos_category` ||
//       item.food_category === `pizza_category`
//     ) {
//       for (let index = 0; index < objects?.length; index++) {
//         const element = objects[index];
//         newList.push(element);
//       }
//     } else {
//       newList.push(item);
//     }
//   });
//   return newList;
// };

// const handleAutoCompleteChange = (data: string) => {
//   setCustomerFoodInput(data);
//   if (customerFoodInput) {
//     setInputStatus("");
//   }
//   // Check if the input matches any available option
//   const matchedOptions = optionsProp.map((option) => {
//     if (
//       is_serving_time &&
//       selectedCategory &&
//       option.value.toLowerCase().includes(data.toLowerCase())
//     ) {
//       return {
//         ...option,
//         value: (
//           <span style={{ backgroundColor: 'lightgray' }}>
//             {option.value}
//           </span>
//         ),
//       };
//     } else {
//       return option;
//     }
//   });

//   if (matchedOptions.length > 0) {
//     setOptionsData(matchedOptions);
//   } else {
//     // If no matches found, display the "unavailable" message
//     setOptionsData([
//       {
//         value:
//           "The menu item you're looking for is not available at our restaurant. Check back again later!",
//         disabled: true,
//       },
//     ]);
//   }
// };

// const handleAutoCompleteSearch = (text: string) => {
//   if (is_serving_time && selectedCategory) {
//     const matchedOptions = optionsProp.map((option) => {
//       if (option.value.toLowerCase().includes(text.toLowerCase())) {
//         return {
//           ...option,
//           value: (
//             <span style={{ backgroundColor: 'lightgray' }}>
//               {option.value}
//             </span>
//           ),
//         };
//       } else {
//         return option;
//       }
//     });

//     if (matchedOptions.length > 0) {
//       setOptionsData(matchedOptions);
//     } else if (text.trim() !== "") {
//       setOptionsData([
//         {
//           value:
//             "The menu item you're looking for is not available at our restaurant. Check back again later!",
//           disabled: true,
//         },
//       ]);
//     } else {
//       // When the input field is empty, show the appropriate options based on selected time and category
//       let newOptionsData: {
//         value: string;
//         disabled: boolean;
//       }[] = [];
//       if (is_lunch_time) {
//         newOptionsData = selectedCategory === "Meals" ? lunchMealMenu : [];
//       } else if (is_dinner_time) {
//         newOptionsData = selectedCategory === "Meals" ? [] : [];
//       }
//       setOptionsData(newOptionsData);
//     }
//   } else {
//     setOptionsData([]);
//   }
// };
// *******************
//   // dynamic menus
//   const generateLunchMenu = (
//     selectedCategory: string,
//     storedItems: FoodItem[]
//   ) => {
//     const menu: { value: string; disabled?: boolean }[] = [];
//     const mealItems = storedItems.filter(
//       (item) => item.food_category === "meal"
//     );

//     if (selectedCategory === "Meals") {
//       menu.push(
//         {
//           value: "tacos",
//           disabled: isListContainsObject({ food_value: "tacos" }, storedItems),
//         },
//         {
//           value: "pizza",
//           disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
//         }
//         // ... add other meal items
//       );
//     } else if (selectedCategory === "Desserts") {
//       menu.push(
//         {
//           value: "ice cream",
//           disabled: isListContainsObject(
//             { food_value: "ice cream" },
//             storedItems
//           ),
//         },
//         {
//           value: "cake",
//           disabled: isListContainsObject({ food_value: "cake" }, storedItems),
//         }
//         // ... add other dessert items
//       );
//     } else {
//       // Show all options for "All" category
//       menu.push(
//         {
//           value: "tacos",
//           disabled: isListContainsObject({ food_value: "tacos" }, storedItems),
//         },
//         {
//           value: "pizza",
//           disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
//         },
//         // ... add other meal items
//         {
//           value: "ice cream",
//           disabled: isListContainsObject(
//             { food_value: "ice cream" },
//             storedItems
//           ),
//         },
//         {
//           value: "cake_all",
//           disabled: isListContainsObject({ food_value: "cake" }, storedItems),
//         }
//         // ... add other dessert items
//       );
//     }

//     return menu;
//   };
//   // dynamic menus
//   const generateLunchMenu_2 = (
//     selectedCategory: string,
//     storedItems: FoodItem[]
//   ) => {
//     const menu: { value: string; disabled?: boolean }[] = [];

//     if (selectedCategory === "Meals") {
//       const mealItems = storedItems.filter(
//         (item) => item.food_category === "meal"
//       );
//       mealItems.forEach((item) => {
//         menu.push({
//           value: item.food_value,
//           disabled: isListContainsObject(
//             { food_value: item.food_value },
//             storedItems
//           ),
//         });
//       });
//     } else if (selectedCategory === "Desserts") {
//       const dessertItems = storedItems.filter(
//         (item) => item.food_category === "dessert"
//       );
//       dessertItems.forEach((item) => {
//         menu.push({
//           value: item.food_value,
//           disabled: isListContainsObject(
//             { food_value: item.food_value },
//             storedItems
//           ),
//         });
//       });
//     }

//     return menu;
//   };
