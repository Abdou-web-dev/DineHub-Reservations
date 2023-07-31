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
