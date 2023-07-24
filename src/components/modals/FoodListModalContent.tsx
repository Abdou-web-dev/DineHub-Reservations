// import food_4 from "../../assets/img/food_item/food_4.svg"
// import food_1 from "../../assets/img/food_item/food-dish.svg"
// import food_2 from "../../assets/img/food_item/food-menu.svg"
// import food_3 from "../../assets/img/food_item/food-restaurant.svg"
import come_back from "../../assets/img/back-arrow.svg";

import { Button } from "antd";

export const FoodListModalContent = ({
  foodList,
  setShowChoosenFoodInfos,
  setShowChoosenFood,
}: {
  foodList: [{ food_value: string; food_id: number }];
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div>
        <div>
          <Button
            onClick={() => {
              setShowChoosenFood(false);
              setShowChoosenFoodInfos(false);
            }}
            icon={
              <>
                <img width={`40px`} src={come_back} alt="" />
              </>
            }
          ></Button>
        </div>
        {foodList?.map((foodItem) => (
          <div key={foodItem.food_id}>{foodItem.food_value}</div>
        ))}
      </div>
    </>
  );
};
