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
import { randomInteger } from "../../utils/helpers";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { MenusContext } from "../context/menusContextProvider";
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
    selectedCategory,
    setAutoCompleteDisabled,
    autoCompleteDisabled,
  } = useContext(FoodInfosContext);

  const {
    lunchMealMenu,
    dessertLunchMenu,
    breakfastMealMenu,
    dessertBreakfastMenu,
    dessertDinnerMenu,
    dinnerMealMenu,
  } = useContext(MenusContext);

  const [inputStatus, setInputStatus] = useState<
    "warning" | "error" | undefined | InputStatus
  >();

  let is_serving_time: boolean =
    is_breakfast_time || is_lunch_time || is_dinner_time;

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

  // optionsProp variable for initial options of the dropdown
  let initialOptions = is_lunch_time
    ? selectedCategory === "Meals"
      ? lunchMealMenu // Provide lunch meal options
      : selectedCategory === "Desserts"
      ? dessertLunchMenu // Provide lunch dessert options
      : dessertLunchMenu.concat(lunchMealMenu) // Combine dessert and lunch meal options for other categories during lunch time
    : is_dinner_time
    ? selectedCategory === "Meals"
      ? dinnerMealMenu
      : selectedCategory === "Desserts"
      ? dessertDinnerMenu
      : dinnerMealMenu.concat(dessertDinnerMenu) // Combine dessert and dinner meal options for other categories during dinner time
    : is_breakfast_time
    ? selectedCategory === "Meals"
      ? breakfastMealMenu
      : selectedCategory === "Desserts"
      ? dessertBreakfastMenu
      : breakfastMealMenu.concat(dessertBreakfastMenu)
    : []; // Handle other time cases here

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
  >(initialOptions);

  // Absolutely, choosing the simpler and more straightforward approach is often a good decision, especially if it meets your requirements. If the version you mentioned works for your needs and is easier to maintain and understand, then it's a perfectly valid choice.
  // Remember, the goal is to have code that is clear, maintainable, and functional. If a more complex approach doesn't significantly improve the code's quality or usability, sticking with the simpler version is a reasonable decision.

  const handleChange = (data: string) => {
    setCustomerFoodInput(data);
    setInputStatus(data.trim() !== "" ? "" : "error");

    if (is_serving_time) {
      const matchedOptions = initialOptions.filter((option) =>
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
          newOptionsData =
            selectedCategory === "Meals"
              ? lunchMealMenu
              : selectedCategory === `Dessert`
              ? dessertLunchMenu
              : dessertLunchMenu.concat(lunchMealMenu);
        } else if (is_dinner_time) {
          newOptionsData =
            selectedCategory === "Meals"
              ? dinnerMealMenu
              : selectedCategory === `Dessert`
              ? dessertDinnerMenu
              : dinnerMealMenu.concat(dessertDinnerMenu);
        } else if (is_breakfast_time) {
          newOptionsData =
            selectedCategory === "Meals"
              ? breakfastMealMenu
              : selectedCategory === `Dessert`
              ? dessertBreakfastMenu
              : breakfastMealMenu.concat(dessertBreakfastMenu);
        }
        setOptionsData(newOptionsData);
      }
    } else {
      setOptionsData([]);
    }
  };

  function handleAutoCompleteSearch(text: string) {
    if (is_serving_time) {
      // optionsProp must be used here
      // option.value.toLowerCase().includes(text.toLowerCase()) is used to check if a given text (usually the user's input) is included in the value property of an option object, regardless of the letter casing.
      // Here's a breakdown of what it does:
      // option.value: This refers to the value of the current option in consideration. For example, if the option is { value: "Pizza", disabled: false }, then option.value is "Pizza".
      const matchedOptions = initialOptions //highlighting cuntionality
        .map((option) => {
          let option_elem = {
            ...option,
            className: classNames({
              "highlighted-option":
                option.value
                  .toString()
                  .toLowerCase()
                  .includes(customerFoodInput.toLowerCase()) &&
                customerFoodInput.trim() !== "",
            }),
          };
          // console.log(option_elem);
          return option_elem;
        })
        //filtering functionality
        .filter((option) =>
          option.value.toLowerCase().includes(text.toLowerCase())
        );

      if (matchedOptions.length > 0) {
        setOptionsData(matchedOptions);
      } else if (text.trim() !== "") {
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
          newOptionsData = selectedCategory === "Meals" ? lunchMealMenu : [];
        } else if (is_dinner_time) {
          newOptionsData = selectedCategory === "Meals" ? [] : [];
        }
        setOptionsData(newOptionsData);
      }
    } else {
      setOptionsData([]);
    }
  }

  // this code ensure that the dropdown options are visible only when a category and time have been selected
  useEffect(() => {
    let newOptionsData: {
      value: string;
      disabled: boolean;
    }[] = [];
    if (is_lunch_time) {
      newOptionsData =
        selectedCategory === "Meals"
          ? lunchMealMenu
          : selectedCategory === "Desserts"
          ? dessertLunchMenu
          : lunchMealMenu.concat(dessertLunchMenu);
    } else if (is_dinner_time) {
      newOptionsData =
        selectedCategory === "Meals"
          ? dinnerMealMenu
          : selectedCategory === "Desserts"
          ? dessertDinnerMenu
          : dinnerMealMenu.concat(dessertDinnerMenu);
    } else if (is_breakfast_time) {
      newOptionsData =
        selectedCategory === "Meals"
          ? breakfastMealMenu
          : selectedCategory === "Desserts"
          ? dessertBreakfastMenu
          : breakfastMealMenu.concat(dessertBreakfastMenu);
    }
    setOptionsData(newOptionsData);
  }, [is_lunch_time, is_dinner_time, is_breakfast_time, selectedCategory]);

  useEffect(() => {
    if (!is_serving_time) setAutoCompleteDisabled(true);
  }, [is_serving_time]);

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
              options={optionsData}
              //In this code snippet, you are modifying the optionsData array to include an additional property called className for each option. This className property will be used to conditionally apply a CSS class to the autocomplete options, which will in turn control the highlighting of options based on user input.
              // let option_elem = { ...option, ... }: Here, you're creating a new object option_elem based on the existing option object. This is done using the spread operator (...) to copy over all properties of the original option object.
              // By adding the className property to each option object and applying the appropriate CSS class based on the conditions, you're achieving the highlighting effect for matching options in the autocomplete dropdown.
              // Remember, this approach allows you to keep your original optionsData intact while enhancing it with the necessary highlighting information for the UI. It's a clever way to dynamically modify data to suit your UI needs without altering the core data structure
              disabled={autoCompleteDisabled}
              className="customer-food-add-autocomplete-input"
              value={customerFoodInput}
              onChange={handleChange}
              style={{ width: 200, border: autoCompleteBorder }}
              onSelect={onSelect}
              onSearch={handleAutoCompleteSearch}
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
