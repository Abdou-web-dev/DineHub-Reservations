import { Button, Card, Modal } from "antd";
// import React, { useEffect, useState } from "react";
import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import delete_stop from "../../assets/img/delete_stop.svg";
import options from "../../assets/img/options.svg";
import { deleteFoodFromCustomer } from "../../feature/customerSlice";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { CloseXIconBtn } from "../icons/Icons";
import { FoodChoiceModalContent } from "../modals/FoodChoiceModalContent";

const gridStyle: React.CSSProperties = {
  textAlign: "center",
};

interface DraggableFoodItemProps {
  index: number;
  foodItem: {
    food_value: string;
    food_id: number;
  };
  id: string;
}
export const DraggableFoodItem = ({
  index,
  foodItem,
  id,
}: DraggableFoodItemProps) => {
  const dispatch = useDispatch();
  const {
    selectedTime,
    meridiumType,
    is_breakfast_time,
    is_dinner_time,
    is_lunch_time,
    newFoodItem,
  } = useContext(FoodInfosContext);

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  let lunch_time_meals: boolean =
    foodItem?.food_value === "tacos" ||
    foodItem?.food_value === "pizza" ||
    foodItem?.food_value === "tajine" ||
    foodItem?.food_value === "Shawarma";

  let showOptionsButton: boolean = is_lunch_time && lunch_time_meals;
  // is_serving_time && newFoodItem.food_value !== "";

  const [openFoodChoiceModal, setOpenFoodChoiceModal] = useState(false);

  return (
    <>
      <Draggable draggableId={foodItem?.food_id?.toString()} {...{ index }}>
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
                  onClick={() => setOpenFoodChoiceModal(true)}
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
      <>
        <Modal
          destroyOnClose
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
          {is_lunch_time ? <FoodChoiceModalContent {...{ foodItem }} /> : null}
        </Modal>
      </>
    </>
  );
};
