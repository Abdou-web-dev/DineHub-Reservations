import { FoodItem } from "../components/lists/DraggableFoodItems";

const replace = (
  object: FoodItem,
  list: FoodItem[]
  // id: number
): FoodItem[] => {
  let newList: FoodItem[] = [];
  list.forEach(function (item: FoodItem) {
    if (item.food_id === object.food_id) {
      // only do the replacement if the old and the new food items' id's are the same,
      newList.push(object);
    } else {
      //else, keep the array of old items as it is
      newList.push(item);
    }
  });
  return newList;
};
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// let newFoodList: FoodItem[] = replace(newFoodItem, storedItems);

const replace_items = (
  objects: FoodItem[],
  list: FoodItem[]
  // id: number
): FoodItem[] => {
  let newList: FoodItem[] = [];
  list.forEach(function (item: FoodItem) {
    for (let index = 0; index < objects?.length; index++) {
      if (item.food_id === objects[index].food_id) {
        // only do the replacement if the old and the new food items' id's are the same,
        const element = objects[index];
        newList.push(element);
      } else {
        //else, keep the array of old items as it is
        newList.push(item);
      }
    }
  });
  return newList;
};
function isListContainsObject(obj: FoodItem, list: FoodItem[]) {
  // var i;
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].food_value === obj.food_value ||
      list[i].food_value.includes(obj.food_value)
    ) {
      return true;
    }
  }

  return false;
}

const updateFoodCategory = (foodItem: FoodItem): FoodItem => {
  if (foodItem.food_value.includes("meal")) {
    return { ...foodItem, food_category: "meal" };
  } else if (foodItem.food_value.includes("dessert")) {
    return { ...foodItem, food_category: "dessert" };
  } else {
    return { ...foodItem, food_category: "" };
  }
};

export {
  isListContainsObject,
  randomInteger,
  replace as replaceObjectWithAnotherOne,
  updateFoodCategory,
};
