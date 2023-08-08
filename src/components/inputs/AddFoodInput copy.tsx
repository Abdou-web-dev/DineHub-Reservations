import { AutoComplete, Button, Tooltip } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import info from "../../assets/img/info.svg";
import breakfast from "../../assets/img/meals/breakfast.png";
import dinner from "../../assets/img/meals/dinner.png";
import lunch from "../../assets/img/meals/lunch.png";
import { addFoodToCustomer } from "../../feature/customerSlice";
import { isListContainsObject, randomInteger } from "../../utils/helpers";
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
    meridiumType,
    selectedCategory,
    // lunch_menu,
    // optionsData,
    // setOptionsData,
    // lunchMenu,
    storedItems,
  } = useContext(FoodInfosContext);

  // console.log("Selected Category:", selectedCategory);
  const lunchMealMenu = [
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    {
      value: "Tacos",
      disabled: isListContainsObject({ food_value: "Tacos" }, storedItems),
    },
    {
      value: "Tajine",
      disabled: isListContainsObject({ food_value: "Tajine" }, storedItems),
    },
    // ... add other meal items
  ];

  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();

  const [value, setValue] = useState("");
  const [autoCompleteDisabled, setAutoCompleteDisabled] = useState(false);

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  // ******************
  // a function that returns a dynamic menu
  const getPanelValue = (searchText: string) => {
    if (!searchText) {
      return [];
    } else {
      // return lunchMenu.filter((option) => option.value.includes(searchText));
    }
  };

  const onSelect = (data: string) => {
    // console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  let word: string = is_breakfast_time
    ? "breakfast"
    : is_lunch_time
    ? "lunch"
    : is_dinner_time
    ? "dinner"
    : "";

  let optionsProp = is_lunch_time
    ? selectedCategory === "Meals"
      ? lunchMealMenu // Provide lunch meal options
      : selectedCategory === "Desserts"
      ? [] // Provide lunch dessert options
      : [] // Empty array for other categories during lunch time
    : is_dinner_time
    ? selectedCategory === "Meals"
      ? [] // Provide dinner meal options
      : selectedCategory === "Desserts"
      ? [] // Provide dinner dessert options
      : [] // Empty array for other categories during dinner time
    : []; // ... handle other time cases here

  // const [optionsData, setOptionsData] = useState(optionsProp);

  // Initialize optionsData based on selected time and category
  const [optionsData, setOptionsData] = useState<
    {
      value: string;
      disabled: boolean;
    }[]
  >([]);

  useEffect(() => {
    let newOptionsData: {
      value: string;
      disabled: boolean;
    }[] = [];
    if (is_lunch_time) {
      newOptionsData = selectedCategory === "Meals" ? lunchMealMenu : [];
    } else if (is_dinner_time) {
      newOptionsData = selectedCategory === "Meals" ? [] : [];
    }
    setOptionsData(newOptionsData);
  }, [is_lunch_time, is_dinner_time, selectedCategory]);

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
              // options={selectedTime !== "" ? optionsData : undefined}
              // options={optionsData}
              options={optionsData}
              disabled={autoCompleteDisabled}
              className="customer-food-add-autocomplete-input"
              value={customerFoodInput}
              onChange={(value) => {
                setCustomerFoodInput(value);
                if (customerFoodInput) {
                  setInputStatus("");
                }
              }}
              style={{ width: 200, border: autoCompleteBorder }}
              onSelect={onSelect}
              onSearch={(text) => {
                const exactMatch = optionsProp.find(
                  (option) => option.value === text
                );

                if (exactMatch) {
                  setOptionsData(
                    optionsProp.filter((option) => option.value === text)
                  );
                } else {
                  setOptionsData([]);
                }
              }}
              //  onSearch={(text) => {
              //   const filteredOptions = optionsData.filter((option) =>
              //     option.value.toLowerCase().includes(text.toLowerCase())
              //   );

              //   // Exclude exact match
              //   const exactMatch = optionsData.find(
              //     (option) => option.value.toLowerCase() === text.toLowerCase()
              //   );

              //   if (exactMatch) {
              //     const index = filteredOptions.findIndex(
              //       (option) =>
              //         option.value.toLowerCase() === text.toLowerCase()
              //     );
              //     if (index !== -1) {
              //       filteredOptions.splice(index, 1);
              //     }
              //   }

              //   setOptionsData(filteredOptions);
              // }}
              // onSearch={(text: string) => {
              //   const filteredOptions = getPanelValue(text).filter((option) => {
              //     // Modify this condition based on your logic
              //     if (selectedCategory === "Meals") {
              //       return option.value.includes("meal");
              //     } else if (selectedCategory === "Desserts") {
              //       return option.value.includes("dessert");
              //     } else {
              //       return true; // Show all options for "All" category
              //     }
              //   });
              //   // setOptionsData(getPanelValue(text));
              //   setOptionsData(filteredOptions);
              //   console.log("optionsData:", optionsData); // Add this line
              // }}
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
                    food_id: randomInteger(1, 5000),
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
// a function that returns a static menu
// const getPanelValue = (searchText: string) => {
//   if (!searchText) {
//     return [];
//   } else {
//     if (is_breakfast_time) {
//       return breakfast_menu;
//     } else if (is_lunch_time) {
//       return lunch_menu;
//     } else if (is_dinner_time) {
//       return dinner_menu;
//     } else {
//       return [];
//     }
//   }
// };
