import { Button } from "antd";

export const FoodChoiceItemBtn = ({
  //   foodItem,
  handleFoodChoiceClick,
  itemName,
}: {
  foodItem?: {
    food_value: string;
    food_id: number;
  };
  handleFoodChoiceClick: () => void;
  itemName: string;
}) => {
  return (
    <>
      <div>
        <Button
          disabled={false}
          className="meal-option-btn"
          onClick={() => handleFoodChoiceClick()}
        >
          <span>{itemName}</span>
        </Button>
      </div>
    </>
  );
};
