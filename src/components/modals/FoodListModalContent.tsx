import { useContext } from "react";
import { ComeBackBtn } from "../buttons/ComeBackBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { FoodItem } from "../lists/DraggableFoodItems";

export const FoodListModalContent = ({
  foodList,
  setShowChoosenFoodInfos,
  setShowChoosenFood,
}: {
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
