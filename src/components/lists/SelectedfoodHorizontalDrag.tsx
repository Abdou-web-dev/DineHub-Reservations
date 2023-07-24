import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import delete_stop from "../../assets/img/delete_stop.svg";
import { deleteFoodFromCustomer } from "../../feature/customerSlice";
import { StrictModeDroppable } from "../StrictModeDroppable";
import "./lists_styles.scss";

// this example implements react-dnd vertical drag and drop

const gridStyle: React.CSSProperties = {
  // width: "25%",
  textAlign: "center",
};

export const SelectedfoodHorizontalDrag = ({
  foodList,
  id,
}: // index,
{
  // index: number;
  foodList: {
    food_value: string;
    food_id: number;
  }[];
  id: string;
}) => {
  const dispatch = useDispatch();
  const [startDragging, setStartDragging] = useState(false);
  const [storedItems, setStoredItems] = useState(foodList && foodList);

  function handleOnDragEnd(result: DropResult): void {
    if (result.destination) {
      // with this if check, if we drag items outside the draoppable area, no issue will arise
      // console.log("handleOnDragEnd called");
      const items: {
        food_value: string;
        food_id: number;
      }[] = Array.from(storedItems);
      if (items) {
        const [reorderedItem] = items?.splice(result.source.index, 1);
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

  if (storedItems.length)
    return (
      <>
        <div className="selected-food-container">
          <div className="selected-food-list">
            <DragDropContext
              onDragEnd={handleOnDragEnd}
              // onDragStart={() => {}}
              onDragStart={() => {
                console.log("onDragStart");
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
                        ? storedItems?.map((foodItem, index: number) => {
                            // console.log(foodItem, "foodItem");
                            if (foodItem && foodItem.food_value !== "") {
                              return (
                                <Draggable
                                  key={foodItem?.food_id}
                                  draggableId={foodItem?.food_id?.toString()}
                                  index={index}
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
                                        // itemRef=""
                                      >
                                        <p>{foodItem.food_value}</p>
                                        <Button
                                          icon={
                                            <>
                                              <img
                                                width={`17px`}
                                                src={delete_stop}
                                                alt=""
                                              />
                                            </>
                                          }
                                          onClick={() =>
                                            dispatch(
                                              deleteFoodFromCustomer({
                                                id: id,
                                                index: index,
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
                              );
                            }
                          })
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
  else {
    return (
      <>
        <div>You have not yet added any food to your order !</div>
      </>
    );
  }
};
