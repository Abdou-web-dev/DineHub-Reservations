// import food_4 from "../../assets/img/food_item/food_4.svg"
// import food_1 from "../../assets/img/food_item/food-dish.svg"
// import food_2 from "../../assets/img/food_item/food-menu.svg"
// import food_3 from "../../assets/img/food_item/food-restaurant.svg"

import { useContext } from "react";
import { ComeBackBtn } from "../buttons/ComeBackBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { FoodItem } from "../lists/SelectedfoodHorizontalDrag";

export const FoodListModalContent = ({
  foodList,
  setShowChoosenFoodInfos,
  setShowChoosenFood,
}: {
  // foodList: [{ food_value: string; food_id: number }];
  foodList: FoodItem[];
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { storedItems, setStoredItems, newFoodItems } =
    useContext(FoodInfosContext);
  return (
    <>
      <div className="food-list-modal-content-container">
        <div className="come-back-btn-wrapper">
          <ComeBackBtn {...{ setShowChoosenFood, setShowChoosenFoodInfos }} />
        </div>
        {storedItems?.map((foodItem) => (
          <div key={foodItem.food_id}>{foodItem.food_value}</div>
          // add a group of 2 icons relevant to every food item
          // and icon to delete a food item
          // and a div for the price
        ))}
      </div>
    </>
  );
};
