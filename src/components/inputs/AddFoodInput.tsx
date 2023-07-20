import { Button, Input } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer } from "../../feature/customerSlice";
import "./inputs_styles.scss";

export const AddFoodInput = ({
  customerFoodInput,
  id,
  setCustomerFoodInput,
}: {
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}) => {
  const dispatch = useDispatch();
  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();
  return (
    <>
      <div className="customer-food-add-input-btn-container">
        <Input
          className="customer-food-add-input"
          value={customerFoodInput}
          onChange={(e) => {
            setCustomerFoodInput(e.target.value);
            if (customerFoodInput) {
              setInputStatus("");
            }
          }}
          type="text"
          status={inputStatus}
          placeholder={"Type a food item..."}
          allowClear
        />
        <Button
          className={
            customerFoodInput
              ? "customer-food-add-btn user_is_typing"
              : "customer-food-add-btn user_is_not_typing"
          }
          onClick={() => {
            dispatch(
              addFoodToCustomer({
                id,
                food: customerFoodInput,
              })
            );
            if (!customerFoodInput) {
              setInputStatus("error");
            }
            setCustomerFoodInput("");
          }}
        >
          <span>Add Food</span>
        </Button>
      </div>
    </>
  );
};
