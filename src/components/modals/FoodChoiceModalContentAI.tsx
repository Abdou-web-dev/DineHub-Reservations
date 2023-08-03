// updateFoodItemName({ foodValue: activeFoodItem, newName: subOption });
import { useDispatch } from "react-redux";
import { updateFoodItemName } from "../../feature/customerSlice";
import { FoodChoiceItemBtn } from "../buttons/FoodChoiceItemBtn";

const FoodChoiceModalContentAI = ({
  subOptionsData,
  activeFoodItem,
  setOpenFoodChoiceModal,
  customer_id,
  food_item_index,
  foodItem,
}: {
  subOptionsData: Record<string, string[]>;
  activeFoodItem: string;
  setOpenFoodChoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  customer_id: string;
  food_item_index: number;
  foodItem: {
    food_value: string;
    food_id?: number | any;
  };
}) => {
  const subOptions: string[] = subOptionsData[activeFoodItem || ""] || [];
  const dispatch = useDispatch();

  const handleSubOptionClick = (
    //the order of the args is important, here and where the handler is called
    customerId: string,
    foodId: number,
    foodValue: string,
    foodItemSubOption: string
  ) => {
    // Update the food item's name
    dispatch(
      updateFoodItemName({
        customerId, // writing customerId: customer_id here would cause the handler not to function correctly, thus the update won't happen,
        foodId, //this arg must be used here as it is
        newName: foodItemSubOption, //foodItemSubOption is an initiliazer argument
        activeFoodItemParam: foodValue, // Naming it differently for clarity
        // activeFoodItem: foodValue, //same for foodValue,This refers to the foodValue parameter of this function
      })
    );

    // Close the modal
    // You might need to replace this with the appropriate method to close the modal in your code
    setOpenFoodChoiceModal(false);
  };

  return (
    <div>
      <h3>Update {activeFoodItem}</h3>

      {subOptions.map((subOption: string, index) => (
        <FoodChoiceItemBtn
          key={index}
          itemName={subOption}
          handleFoodChoiceClick={() => {
            handleSubOptionClick(
              customer_id,
              foodItem.food_id,
              activeFoodItem, // Using the outer scope's activeFoodItem
              subOption
            );
          }}
        />
      ))}
    </div>
  );
};

export default FoodChoiceModalContentAI;
