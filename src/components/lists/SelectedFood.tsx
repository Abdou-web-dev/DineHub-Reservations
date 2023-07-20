import { Button, Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteFoodFromCustomer } from "../../feature/customerSlice";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

export const Selectedfood = ({
  foodList,
  id,
}: // index,
{
  // index: number;
  foodList: string[];
  id: string;
}) => {
  const dispatch = useDispatch();

  if (foodList?.length)
    return (
      <>
        <div className="customer-food-container">
          <div className="customer-food-list">
            <Card title="You choosed these items :">
              {foodList.map((foodItem, index: number) => {
                return (
                  <Card.Grid key={foodItem} style={gridStyle}>
                    <p>{foodItem}</p>
                    <Button
                      onClick={() =>
                        dispatch(
                          deleteFoodFromCustomer({
                            id: id,
                            index: index,
                          })
                        )
                      }
                    >
                      {"delete"}
                    </Button>
                  </Card.Grid>
                );
              })}
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
