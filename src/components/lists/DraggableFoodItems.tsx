import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FoodItem } from "../../types/Types";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { DraggableFoodItem } from "../draggable/DraggableFoodItem";
import "./lists_styles.scss";

// this example implements react-dnd vertical drag and drop

export const DraggableFoodItems = ({
  foodList,
  id,
}: // menuItems,
{
  foodList: FoodItem[];
  id: string;
  // menuItems: MenuItem[];
}) => {
  const [startDragging, setStartDragging] = useState(false);
  const { storedItems, setStoredItems } = useContext(FoodInfosContext);

  function handleOnDragEnd(result: DropResult): void {
    if (result.destination) {
      // with this if check, if we drag items outside the draoppable area, no issue will arise
      // console.log("handleOnDragEnd called");
      const items: FoodItem[] = Array.from(storedItems);
      if (items) {
        const [reorderedItem]: FoodItem[] = items?.splice(
          result.source.index,
          1
        );
        if (reorderedItem) {
          items?.splice(result.destination.index, 0, reorderedItem);
          setStoredItems(items);
        }
      }
    }
    setStartDragging(false);
  }
  useEffect(() => {
    // the food items were not visible in the droppable area, that is because the stored items array is empty at first render, do
    // and after 3 hours of struggle, this simple line of code solved my problem !!
    setStoredItems(foodList);
  }, [foodList]);

  const { newFoodItem } = useContext(FoodInfosContext);

  // the problem I am facing now is that when I add 2 food items that has filter sub-items, when I change one and closes the modal,
  // if I want to change the other one to a new food option, the 1st one becomes again equal to its first value
  // example , chicken tacos ---> tacos
  //one possible solution would be to store this item's value in an array , using useContext or LocalStorage, once the 1st element's value is changed into an option
  //and then maybe delete this item from the UI, hence keeping only the 2nd one
  //the stored value can then be retrieved in FoodListModalContent component and mapped over.

  // const FoodItemContext = React.createContext();

  if (storedItems.length) {
    return (
      <>
        <div className="selected-food-container">
          <div className="selected-food-list">
            <DragDropContext
              onDragEnd={handleOnDragEnd}
              onDragStart={() => {
                setStartDragging(true);
              }}
              // console.log("onDragStart");
              // onBeforeDragStart={() => console.log("onBeforeDragStart")}
            >
              <StrictModeDroppable
                // mode="standard"
                // type=""
                direction="vertical"
                droppableId="droppable-1"
              >
                {(provided) => (
                  <div
                    className="selected-food-list-card-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Card
                      className={
                        startDragging
                          ? "selected-food-card start__dragging"
                          : "selected-food-card"
                      }
                      // title="You choosed these items :"
                      title={null}
                    >
                      {Array.isArray(storedItems)
                        ? storedItems?.map(
                            (foodItem: FoodItem, index: number) => {
                              if (foodItem && foodItem.food_value !== "") {
                                // const menuItem = menuItems.find(
                                //   (item) => item.value === foodItem.food_value
                                // );
                                // const isDisabled: boolean =
                                //   menuItem?.disabled || false;

                                return (
                                  <DraggableFoodItem
                                    key={foodItem?.food_id}
                                    {...{ index, id, foodItem }}
                                  />
                                );
                                // const updatedFoodItem =
                                //   updateFoodCategory(foodItem);
                                // return (
                                //   <>
                                //     <span>
                                //       {updatedFoodItem.food_category ||
                                //         "no category"}
                                //     </span>
                                //     <DraggableFoodItem
                                //       key={updatedFoodItem?.food_id}
                                //       {...{
                                //         index,
                                //         id,
                                //         foodItem: updatedFoodItem,
                                //       }}
                                //     />
                                //   </>
                                // );
                              }
                            }
                          )
                        : null}
                    </Card>
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>You have not yet added any food to your order !</div>
      </>
    );
  }
};
