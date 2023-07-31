import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { DraggableFoodItem } from "../draggable/DraggableFoodItem";
import "./lists_styles.scss";

// this example implements react-dnd vertical drag and drop
export const replace = (
  object: FoodItem,
  list: FoodItem[]
  // id: number
): FoodItem[] => {
  let newList: FoodItem[] = [];
  list.forEach(function (item: FoodItem) {
    console.log(
      item.food_id,
      "item.food_id ",
      object.food_id,
      "object.food_id"
    );
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
export interface FoodItem {
  food_value: string;
  food_id: number;
  food_category: string;
}

export const SelectedfoodHorizontalDrag = ({
  foodList,
  id,
}: {
  foodList: FoodItem[];
  id: string;
}) => {
  // const dispatch = useDispatch();
  const [startDragging, setStartDragging] = useState(false);
  const {
    openFoodChoiceModal,
    storedItems,
    setStoredItems,
    newFoodItems,
    setSingleFoodItem,
    singleFoodItem,
  } = useContext(FoodInfosContext);

  // const [storedItems, setStoredItems] = useState<FoodItem[]>(
  //   foodList && foodList
  // );

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

  const { newFoodItem, setNewFoodItem } = useContext(FoodInfosContext);

  let newFoodList: FoodItem[] = replace(newFoodItem, storedItems);

  // useEffect(() => {
  //   if (!openFoodChoiceModal) {
  //     if (newFoodItem) {
  //       // setStoredItems(newFoodList);
  //     }
  //   }
  // }, [newFoodItem, openFoodChoiceModal]);

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
  // let newFoodList: FoodItem[] = replace([...foodList,newFoodItem], foodList);

  // the problem I am facing now is that when I add 2 food items that has filter sub-items, when I change one and closes the modal,
  // if I want to change the other one to a new food option, the 1st one becomes again equal to its first value
  // example , chicken tacos ---> tacos
  //one possible solution would be to store this item's value in an array , using useContext or LocalStorage, once the 1st element's value is changed into an option
  //and then maybe delete this item from the UI, hence keeping only the 2nd one
  //the stored value can then be retrieved in FoodListModalContent component and mapped over.

  if (storedItems.length) {
    return (
      <>
        <div className="selected-food-container">
          <div className="selected-food-list">
            <DragDropContext
              onDragEnd={handleOnDragEnd}
              onDragStart={() => {
                // console.log("onDragStart");
                setStartDragging(true);
              }}
              // onBeforeDragStart={() => console.log("onBeforeDragStart")}
            >
              <StrictModeDroppable
                // mode="standard"
                // type=""
                direction="horizontal"
                droppableId="droppable-1"
              >
                {(provided) => (
                  <div
                    className="selected-food-list-card-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Card
                      // style={{ border: startDragging ? "1px solid red":'' }}
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
                              // console.log(foodItem, "foodItem");
                              if (foodItem && foodItem.food_value !== "") {
                                setSingleFoodItem(foodItem);
                                console.log(singleFoodItem, "singleFoodItem");
                                return (
                                  <DraggableFoodItem
                                    key={foodItem?.food_id}
                                    {...{ index, id, foodItem }}
                                  />
                                );
                              }
                            }
                          )
                        : null}
                      <>
                        {/* <NewFoodItem>
                      {newfoodItems.map ...}
                      </NewFoodItem> */}
                      </>
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
