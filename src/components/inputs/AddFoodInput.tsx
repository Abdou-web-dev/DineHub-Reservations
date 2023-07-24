import { AutoComplete, Button } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer } from "../../feature/customerSlice";
import "./inputs_styles.scss";

// https://www.npmjs.com/package/turnstone
// Turnstone is a highly customisable, easy-to-use autocomplete search component for React.

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
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[] | any>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const getPanelValue_2 = (searchText: string) =>
    !searchText
      ? []
      : [
          { value: "fish", disabled: true },
          { value: "meat" },
          { value: "milk" },
          { value: "pizza" },
          { value: "tortilla" },
          { value: "hamburger" },
          { value: "tajine" },
          { value: "cheeseburger" },
          { value: "ice cream" },
          { value: "tacos" },
          { value: "kabab" },
        ];
  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };
  // const [value, setValue] = useState("");

  const onChange = (data: string) => {
    console.log("onChange", data);
    setValue(data);
  };

  return (
    <>
      <div className="customer-food-add-input-btn-container">
        <AutoComplete
          className="customer-food-add-input"
          value={customerFoodInput}
          onChange={(value) => {
            // console.log(value, "value");
            setCustomerFoodInput(value);
            if (customerFoodInput) {
              setInputStatus("");
            }
          }}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue_2(text))}
          status={inputStatus}
          placeholder={"Type a food item..."}
          allowClear
        />
        {/* this Input component has been replaced with antd AutoComplete Input */}
        {/* <Input
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
        /> */}
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
                food_element: {
                  food_value: customerFoodInput,
                  food_id: randomInteger(1, 5000),
                },
                // food_id: randomInteger(1, 5000),
              })
              // addFoodToCustomer({
              // id,
              // food: customerFoodInput,
              // })
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
