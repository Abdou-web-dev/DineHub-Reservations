import { Button, Card, Modal } from "antd";
import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import delete_stop from "../../assets/img/delete_stop.svg";
import options from "../../assets/img/options.svg";
import {
  breakfastMealMenuItems,
  dessertBreakfastMenuItems,
  dessertDinnerMenuItems,
  dessertLunchMenuItems,
  dinnerMealMenuItems,
  lunchMealMenuItems,
} from "../../components/context/menusContextProvider"; // Adjust the import path
import { deleteFoodFromCustomer } from "../../feature/customerSlice";
import { setActiveFoodItem } from "../../feature/updateModalSlice";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { CloseXIconBtn } from "../icons/Icons";
import FoodChoiceModalContentAI from "../modals/FoodChoiceModalContentAI";

const gridStyle: React.CSSProperties = {
  textAlign: "center",
};

interface DraggableFoodItemProps {
  index: number;
  foodItem: {
    food_value: string;
    food_id?: number | any;
  };
  id: string;
  // isDisabled: boolean;
}
export const DraggableFoodItem = ({
  index: food_item_index,
  foodItem,
  id: customer_id, //the customer's id
}: // isDisabled: isMenuItemDisabled,
DraggableFoodItemProps) => {
  const dispatch = useDispatch();
  const {
    selectedCategory,
    is_breakfast_time,
    is_dinner_time,
    is_lunch_time,
    openFoodChoiceModal,
    setOpenFoodChoiceModal,
  } = useContext(FoodInfosContext);

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  // let is_lunch_time: boolean =
  //   is_time_between_01_and_06 && meridiumType === "PM";

  let lunch_time_meals: boolean =
    foodItem?.food_value === "tacos" ||
    foodItem?.food_value === "pizza" ||
    foodItem?.food_value === "tajine" ||
    foodItem?.food_value === "Shawarma" ||
    foodItem?.food_value === "salad" ||
    foodItem?.food_value === "sandwich" ||
    foodItem?.food_value === "rice";

  let showOptionsButton: boolean = is_lunch_time && lunch_time_meals;

  // Define your sub-options data here
  const subOptionsData: Record<string, string[]> = {
    pizza: ["Tuna Pizza", "Beef Pizza", "Chicken Pizza", "Shrimp Pizza"],
    tacos: ["Tacos de Pescado", "Tacos Opt2", "Tacos Opt3", "tacos opt4"],
    tajine: ["tajine1", " tajine2", "tajine3 ", "tajine4 "],

    // Add more sub-options for other food items
  };

  const activeFoodItem = useSelector(
    (state: RootState) => state.updateModalReducer.activeFoodItem
  );

  // let isMenuItemDisabled = false;

  // The line of code const dinnerMenuItems = [...dinnerMealMenuItems, ...dessertDinnerMenuItems]; is used to combine the arrays dinnerMealMenuItems and dessertDinnerMenuItems into a single array called dinnerMenuItems.
  const breakfastMenuItems = [
    ...breakfastMealMenuItems,
    ...dessertBreakfastMenuItems,
  ];
  const lunchMenuItems = [...lunchMealMenuItems, ...dessertLunchMenuItems];
  const dinnerMenuItems = [...dinnerMealMenuItems, ...dessertDinnerMenuItems];

  // ************
  const isMenuItemDisabled =
    (is_breakfast_time &&
      selectedCategory === "Meals" &&
      (lunchMealMenuItems.includes(foodItem.food_value) ||
        dinnerMealMenuItems.includes(foodItem.food_value))) ||
    (is_lunch_time &&
      selectedCategory === "Meals" &&
      (breakfastMealMenuItems.includes(foodItem.food_value) ||
        dinnerMealMenuItems.includes(foodItem.food_value))) ||
    (is_dinner_time &&
      selectedCategory === "Meals" &&
      (breakfastMealMenuItems.includes(foodItem.food_value) ||
        lunchMealMenuItems.includes(foodItem.food_value))) ||
    (is_breakfast_time &&
      selectedCategory === "Desserts" &&
      (dessertLunchMenuItems.includes(foodItem.food_value) ||
        dessertDinnerMenuItems.includes(foodItem.food_value))) ||
    (is_lunch_time &&
      selectedCategory === "Desserts" &&
      (dessertDinnerMenuItems.includes(foodItem.food_value) ||
        dessertBreakfastMenuItems.includes(foodItem.food_value))) ||
    (is_dinner_time &&
      selectedCategory === "Desserts" &&
      (dessertBreakfastMenuItems.includes(foodItem.food_value) ||
        dessertLunchMenuItems.includes(foodItem.food_value)));

  const isNotInMenu =
    !breakfastMealMenuItems.includes(foodItem.food_value) &&
    !lunchMealMenuItems.includes(foodItem.food_value) &&
    !dinnerMealMenuItems.includes(foodItem.food_value) &&
    !dessertBreakfastMenuItems.includes(foodItem.food_value) &&
    !dessertLunchMenuItems.includes(foodItem.food_value) &&
    !dessertDinnerMenuItems.includes(foodItem.food_value);

  return (
    <>
      <div
        style={{
          border: isMenuItemDisabled
            ? "1px solid red"
            : isNotInMenu
            ? "1px solid green"
            : "",
          margin: ".2rem",
        }}
      >
        <Draggable
          draggableId={foodItem?.food_id?.toString()}
          {...{ index: food_item_index }}
          isDragDisabled={isMenuItemDisabled} // Set isDragDisabled based on the isDisabled prop
        >
          {(provided) => (
            <div
              className="selected-food-single-card-grid-wrapper"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={foodItem.food_id}
            >
              <Card.Grid
                className="selected-food-single-card-grid"
                style={gridStyle}
              >
                {showOptionsButton ? (
                  <Button
                    icon={
                      <>
                        <img width={`20px`} src={options} alt="" />
                      </>
                    }
                    onClick={() => {
                      if (!isMenuItemDisabled) {
                        dispatch(setActiveFoodItem(foodItem.food_value));
                        setOpenFoodChoiceModal(true);
                      }
                    }}
                    disabled={isMenuItemDisabled}
                    // onClick={() => {
                    //   dispatch(setActiveFoodItem(foodItem.food_value));
                    //   setOpenFoodChoiceModal(true);
                    // }}
                  ></Button>
                ) : null}
                <p>{foodItem.food_value}</p>
                <Button
                  icon={
                    <>
                      <img width={`17px`} src={delete_stop} alt="" />
                    </>
                  }
                  onClick={() =>
                    dispatch(
                      deleteFoodFromCustomer({
                        id: customer_id,
                        index: food_item_index,
                      })
                    )
                  }
                >
                  {/* {"delete"} */}
                </Button>
              </Card.Grid>
            </div>
          )}
        </Draggable>
        <>
          <Modal
            destroyOnClose={true}
            className="food-item-options-modal"
            open={openFoodChoiceModal}
            maskClosable={true}
            closable={false}
            keyboard={true}
            mask={true}
            onOk={() => setOpenFoodChoiceModal(false)}
            onCancel={() => setOpenFoodChoiceModal(false)}
            width={"80%"}
            footer={null}
            title={
              <div className="food-item-options-modal-header">
                <span>Which {foodItem?.food_value} do you want exactly ? </span>
                <div className="food-item-options-header-close-icon">
                  <CloseXIconBtn
                    handleCloseClick={() => setOpenFoodChoiceModal(false)}
                  />
                </div>
              </div>
            }
          >
            {is_lunch_time ? (
              <FoodChoiceModalContentAI
                activeFoodItem={activeFoodItem}
                subOptionsData={subOptionsData}
                {...{
                  setOpenFoodChoiceModal,
                  customer_id,
                  food_item_index,
                  foodItem,
                }}
              />
            ) : null}
          </Modal>
        </>
      </div>
    </>
  );
};

// if (
//   is_breakfast_time &&
//   selectedCategory === "Meals" &&
//   !breakfastMenuItems.includes(foodItem.food_value)
// ) {
//   isMenuItemDisabled = true;
// } else if (
//   is_lunch_time &&
//   selectedCategory === "Meals" &&
//   !lunchMenuItems.includes(foodItem.food_value)
// ) {
//   isMenuItemDisabled = true;
// } else if (
//   is_dinner_time &&
//   selectedCategory === "Meals" &&
//   !dinnerMenuItems.includes(foodItem.food_value)
// ) {
//   isMenuItemDisabled = true;
// } else if (
//   selectedCategory === "Desserts" &&
//   ![
//     ...dessertBreakfastMenuItems,
//     ...dessertLunchMenuItems,
//     ...dessertDinnerMenuItems,
//   ].includes(foodItem.food_value)
// ) {
//   isMenuItemDisabled = true;
// // }
// const breakfastMealMenuItems = ["break1", "break2"];
// const lunchMealMenuItems = ["lunch1", "lunch2"];
// const dinnerMealMenuItems = ["dinner1", "dinner2"];
