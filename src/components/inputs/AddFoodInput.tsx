import { AutoComplete, Button, Tooltip } from "antd";
// import "antd/dist/antd.css";
import { InputStatus } from "antd/es/_util/statusUtils";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
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
    // meridiumType,
    selectedCategory,
    // lunch_menu,
    // optionsData,
    // setOptionsData,
    // lunchMenu,
    storedItems,
    setAutoCompleteDisabled,
    autoCompleteDisabled,
  } = useContext(FoodInfosContext);

  // console.log("Selected Category:", selectedCategory);
  const lunchMealMenu = [
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    {
      value: "Tacos pizza",
      disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
    },
    {
      value: "pi",
      disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
    },
    {
      value: "piz",
      disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
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

  // const [autoCompleteDisabled, setAutoCompleteDisabled] = useState(false);

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

  // ******************

  const onSelect = (data: string) => {
    // console.log("onSelect", data);
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

  // Initialize optionsData based on selected time and category
  const [optionsData, setOptionsData] = useState<
    (
      | {
          value: string;
          disabled: boolean;
        }
      | {
          value: JSX.Element;
          disabled: boolean;
        }
    )[]
  >(optionsProp);

  // this code ensure that the dropdown options are visible only when a category and time have been selected
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

  const handleChange = (data: string) => {
    setCustomerFoodInput(data);
    setInputStatus(data.trim() !== "" ? "" : "error");

    if (is_serving_time) {
      const matchedOptions = optionsProp.filter((option) =>
        option.value.toLowerCase().includes(data.toLowerCase())
      );

      if (matchedOptions.length > 0) {
        setOptionsData(matchedOptions);
      } else if (data.trim() !== "") {
        setOptionsData([
          {
            value:
              "The menu item you're looking for is not available at our restaurant. Check back again later!",
            disabled: true,
          },
        ]);
      } else {
        // When the input field is empty, show the appropriate options based on selected time and category
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
      }
    } else {
      setOptionsData([]);
    }
  };

  const handleAutoCompleteChange = (data: string) => {
    setCustomerFoodInput(data);
    if (customerFoodInput) {
      setInputStatus("");
    }
    // Check if the input matches any available option
    const matchedOptions: (
      | {
          value: string;
          disabled: boolean;
        }
      | {
          value: JSX.Element;
          disabled: boolean;
        }
    )[] = optionsProp.map((option) => {
      if (
        is_serving_time &&
        selectedCategory &&
        option.value.toLowerCase().includes(data.toLowerCase())
      ) {
        return {
          ...option,
          value: (
            <span style={{ backgroundColor: "lightgray" }}>{option.value}</span>
          ),
        };
      } else {
        return option;
      }
    });

    if (matchedOptions.length > 0) {
      setOptionsData(matchedOptions);
    } else {
      // If no matches found, display the "unavailable" message
      setOptionsData([
        {
          value:
            "The menu item you're looking for is not available at our restaurant. Check back again later!",
          disabled: true,
        },
      ]);
    }
  };

  useEffect(() => {
    if (!is_serving_time) setAutoCompleteDisabled(true);
  }, [is_serving_time]);

  // const renderDropdown = (menu: React.ReactNode, parts: string[]) => (
  //   <div>
  //     {menu}
  //     {is_serving_time && selectedCategory && (
  //       <div className="autocomplete-msg">
  //         {parts.map((part, index) =>
  //           part.toLowerCase() === customerFoodInput.toLowerCase() ? (
  //             <span key={index} style={{ backgroundColor: "lightgray" }}>
  //               {part}
  //             </span>
  //           ) : (
  //             part
  //           )
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );

  // const renderDropdown = (menu: React.ReactElement) => {
  //   if (is_serving_time && selectedCategory && customerFoodInput) {
  //     return (
  //       <div>
  //         {menu}
  //         <div className="autocomplete-msg">
  //           {optionsProp.map((option, index) =>
  //             option.value
  //               .toLowerCase()
  //               .includes(customerFoodInput.toLowerCase()) ? (
  //               <span key={index} style={{ backgroundColor: "lightgray" }}>
  //                 {option.value}
  //               </span>
  //             ) : (
  //               option.value
  //             )
  //           )}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return menu;
  //   }
  // };

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
              // dropdownRender={(menu) => renderDropdown(menu, parts)}
              // dropdownRender={renderDropdown}
              // options={is_serving_time ? optionsData : []}
              // options={optionsData}
              options={optionsData.map((option) => ({
                ...option,
                className: classNames({
                  "highlighted-option":
                    option.value
                      .toString()
                      .toLowerCase()
                      .includes(customerFoodInput.toLowerCase()) &&
                    customerFoodInput.trim() !== "",
                }),
              }))}
              disabled={autoCompleteDisabled}
              className="customer-food-add-autocomplete-input"
              value={customerFoodInput}
              onChange={handleChange}
              style={{ width: 200, border: autoCompleteBorder }}
              onSelect={onSelect}
              onSearch={(text) => {
                if (is_serving_time) {
                  // optionsProp must be used here
                  const matchedOptions = optionsProp.filter((option) =>
                    option.value.toLowerCase().includes(text.toLowerCase())
                  );
                  // option.value.toLowerCase().includes(text.toLowerCase()) is used to check if a given text (usually the user's input) is included in the value property of an option object, regardless of the letter casing.
                  // Here's a breakdown of what it does:
                  // option.value: This refers to the value of the current option in consideration. For example, if the option is { value: "Pizza", disabled: false }, then option.value is "Pizza".

                  if (matchedOptions.length > 0) {
                    setOptionsData(matchedOptions);
                  } else if (
                    matchedOptions.length === 0 &&
                    text.trim() !== ""
                  ) {
                    // this condition is used to determine whether the user has typed something meaningful into the input field. If the user has entered a non-empty input (excluding whitespace), the condition evaluates to true, and the code inside the if block will be executed. If the user input is empty (or only consists of whitespace), the condition evaluates to false, and the code inside the else block will be executed.
                    //  In summary, this condition helps ensure that the "not available" message is displayed only when the user has typed a non-empty input, indicating a search attempt. If the user hasn't typed anything (or only entered whitespace), the message won't be displayed.
                    setOptionsData([
                      {
                        value:
                          "The menu item you're looking for is not available at our restaurant. Check back again later!",
                        disabled: true,
                      },
                    ]);
                  } else {
                    // When the input field is empty, show the appropriate options based on selected time and category
                    // If the user hasn't typed anything (or only entered whitespace), the message won't be displayed.
                    //and the  menu will be displayed accordingly to selectTime and category
                    let newOptionsData: {
                      value: string;
                      disabled: boolean;
                    }[] = [];
                    if (is_lunch_time) {
                      newOptionsData =
                        selectedCategory === "Meals" ? lunchMealMenu : [];
                    } else if (is_dinner_time) {
                      newOptionsData = selectedCategory === "Meals" ? [] : [];
                    }
                    setOptionsData(newOptionsData);
                  }
                } else {
                  setOptionsData([]);
                }
              }}
              status={inputStatus}
              placeholder={"Type a food item..."}
              allowClear
            >
              {/* {optionsData.map((option) => (
                <AutoComplete.Option key={option.value} value={option.value}>
                  {option.value}
                </AutoComplete.Option>
              ))} */}
            </AutoComplete>
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
// By using the optionsProp variable for initial options and the optionsData state variable for dynamic filtering, you should be able to achieve the behavior you're looking for.
// It looks like the issue you're facing might be related to the way you're using the optionsProp variable and the optionsData state variable together. If you want to use the optionsProp variable to dynamically generate the initial options when the component mounts or when the selected time and category change, while still using the optionsData state variable for dynamic filtering as the user types, you can modify the onChange and onSearch functions as follows:
// **************
// Dynamic filtering refers to the process of narrowing down a set of items based on certain criteria or user input. In your case, you want to dynamically filter the list of food options as the user types in the input field. Here's how it works:
// Initial Options (optionsProp): When the component mounts or when the selected time and category change, you generate an initial set of options (optionsProp) based on the selected time and category. These options are all the available food items for the given time and category.
// User Input (onChange): As the user starts typing in the input field, the onChange event handler is triggered. Here, you take the user's input and filter the optionsProp list to find any options that match the input, regardless of letter casing. These matching options are stored in the optionsData state variable, which is then used to populate the dropdown menu.
// Unavailable Message (onSearch): If the user input doesn't match any available options, you display a message indicating that the menu item is not available. This message is added to the optionsData list, and it will be displayed as a dropdown option when there are no matching options.
// Clearing the Input (onChange and onSearch): If the user clears the input field, you revert to the behavior of step 1: you show the initial set of options (optionsProp) based on the selected time and category. This ensures that when the input field is empty, the dropdown menu displays the appropriate options based on the current time and category.
// The goal of this dynamic filtering is to provide the user with relevant options as they type, and to give them feedback if their input doesn't match any available options. By combining the optionsProp variable for initial options and the optionsData state variable for dynamic filtering, you create a flexible system that adapts to the user's input and selections.
