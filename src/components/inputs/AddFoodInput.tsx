import { AutoComplete, Button, Tooltip } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import info from "../../assets/img/info.svg";
import breakfast from "../../assets/img/meals/breakfast.png";
import dinner from "../../assets/img/meals/dinner.png";
import lunch from "../../assets/img/meals/lunch.png";
import {
  breakfast_menu,
  dinner_menu,
} from "../../assets/staticData/meals_data";
import { addFoodToCustomer } from "../../feature/customerSlice";
import { randomInteger } from "../../utils/helpers";
import { FoodInfosContext } from "../context/FoodInfosContext";
import "./inputs_styles.scss";

export const AddFoodInput = ({
  customerFoodInput,
  id,
  setCustomerFoodInput,
  autoCompleteBorder,
}: {
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  autoCompleteBorder: string;
}) => {
  const dispatch = useDispatch();
  const {
    is_breakfast_time,
    is_dinner_time,
    is_lunch_time,
    selectedTime,
    random_id,
    lunch_menu,
  } = useContext(FoodInfosContext);
  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();

  const [value, setValue] = useState("");
  const [optionsData, setOptionsData] = useState<{ value: string }[]>([]);
  const [autoCompleteDisabled, setAutoCompleteDisabled] = useState(false);

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  const getPanelValue = (searchText: string) => {
    if (!searchText) {
      return [];
    } else {
      if (is_breakfast_time) {
        return breakfast_menu;
      } else if (is_lunch_time) {
        return lunch_menu;
      } else if (is_dinner_time) {
        return dinner_menu;
      } else {
        return [];
      }
    }
  };

  const onSelect = (data: string) => {
    // console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    // console.log("onChange", data);
    setValue(data);
  };

  let word: string = is_breakfast_time
    ? "breakfast"
    : is_lunch_time
    ? "lunch"
    : is_dinner_time
    ? "dinner"
    : "";

  return (
    <>
      <div className="customer-food-add-input-btn-container">
        <>
          {customerFoodInput && selectedTime && is_serving_time ? (
            <div className="customer-food-meal-time">
              <img
                width={`50px`}
                src={
                  is_breakfast_time
                    ? breakfast
                    : is_lunch_time
                    ? lunch
                    : is_dinner_time
                    ? dinner
                    : ""
                }
                alt=""
              />
              <span>{word} time</span>
            </div>
          ) : null}
        </>

        <div className="customer-food-add-autocomplete__and__add-btn">
          <Tooltip
            title={
              autoCompleteDisabled ? (
                <span>Click on one of the buttons above</span>
              ) : null
            }
          >
            <AutoComplete
              disabled={autoCompleteDisabled}
              className="customer-food-add-autocomplete-input"
              value={customerFoodInput}
              onChange={(value) => {
                // console.log(value, "value");
                setCustomerFoodInput(value);
                if (customerFoodInput) {
                  setInputStatus("");
                }
              }}
              options={selectedTime !== "" ? optionsData : undefined}
              style={{ width: 200, border: autoCompleteBorder }}
              onSelect={onSelect}
              onSearch={(text) => setOptionsData(getPanelValue(text))}
              status={inputStatus}
              placeholder={"Type a food item..."}
              allowClear
            />
          </Tooltip>
          <Button
            className={
              customerFoodInput
                ? "customer-food-add-btn user_is_typing"
                : "customer-food-add-btn user_is_not_typing"
            }
            onClick={() => {
              dispatch(
                addFoodToCustomer({
                  id, //this is custimer's id
                  food_element: {
                    food_value: customerFoodInput,
                    food_id:
                      customerFoodInput === `tacos`
                        ? random_id + 47
                        : customerFoodInput === `pizza`
                        ? random_id + 11
                        : randomInteger(1, 5000),

                    food_category: "",
                  },
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

        {customerFoodInput && selectedTime === "" ? (
          <div className="info__msg">
            <img width={`20px`} src={info} alt="" />
            <span>
              Select a time, so we can offer you propositions of food items and
              meals depending on that time.
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

/* this Input component has been replaced with antd AutoComplete Input */
/* <Input
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
        /> */
// const mockVal = (str: string, repeat = 1) => ({
//   value: str.repeat(repeat),
// });

// !searchText ? [] : is_breakfast_time ? breakfast_menu : [];
// const getPanelValue = (searchText: string) =>
//   !searchText
//     ? []
//     : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
