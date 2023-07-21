import { Button, Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import delete_stop from "../../assets/img/delete_stop.svg";
import { deleteFoodFromCustomer } from "../../feature/customerSlice";
import "./lists_styles.scss";

// this example implements react-dnd vertical drag and drop

const gridStyle: React.CSSProperties = {
  // width: "25%",
  textAlign: "center",
};

export const SelectedFoodOriginal = ({
  foodList,
  id,
}: {
  foodList: {
    food_value: string;
    food_id: number;
  }[];
  id: string;
}) => {
  const dispatch = useDispatch();

  if (foodList.length)
    return (
      <>
        <div className="selected-food-container">
          <div className="selected-food-list">
            <Card
              className="selected-food-card"
              title="You choosed these items :"
              // title={null}
            >
              {Array.isArray(foodList)
                ? foodList?.map((foodItem, index: number) => {
                    if (foodItem) {
                      return (
                        <div className="selected-food-single-card-grid-wrapper">
                          <Card.Grid
                            className="selected-food-single-card-grid"
                            key={foodItem.food_id}
                            style={gridStyle}
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
                      );
                    }
                  })
                : null}
            </Card>
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
