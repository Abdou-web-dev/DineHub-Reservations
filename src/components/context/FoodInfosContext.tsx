import * as React from "react";
import { createContext, useState } from "react";
import { isListContainsObject, randomInteger } from "../../utils/helpers";
import { FoodItem } from "../lists/DraggableFoodItems";
// https://stackoverflow.com/questions/71333605/how-can-i-correctly-initialize-the-type-dispatchsetstateactionstring-as-a

export interface FoodInfosContext {
  is_breakfast_time: boolean;
  is_lunch_time: boolean;
  is_dinner_time: boolean;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>; //optional prop
  meridiumType: string;
  setMeridiumType: React.Dispatch<React.SetStateAction<string>>; //optional prop
  newFoodItem: FoodItem;
  newFoodItems: FoodItem[];
  setNewFoodItem: React.Dispatch<React.SetStateAction<FoodItem>>;
  setNewFoodItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  storedItems: FoodItem[];
  setStoredItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  random_id: number;
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  openFoodChoiceModal: boolean;
  setOpenFoodChoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  optionsData: { value: string }[];
  setOptionsData: React.Dispatch<React.SetStateAction<{ value: string }[]>>;
  // setOptionsData: React.Dispatch<React.SetStateAction<{ value: string }[]>>;
  lunchMenu: {
    value: string;
    disabled?: boolean | undefined;
  }[];
  setLunchMenu: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        disabled?: boolean | undefined;
      }[]
    >
  >;
  autoCompleteDisabled: boolean;
  setAutoCompleteDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  // lunch_menu: (
  //   | {
  //       value: string;
  //       disabled?: undefined;
  //     }
  //   | {
  //       value: string;
  //       disabled: boolean;
  //     }
  // )[];
}

// export const MusicContext = createContext<IMusicContext>(undefined as any);
// export const useMusicContext = () => useContext(MusicContext);

export const FoodInfosContext = createContext<FoodInfosContext>({
  is_breakfast_time: false,
  is_dinner_time: false,
  is_lunch_time: false,
  meridiumType: "",
  selectedTime: "",
  newFoodItem: { food_id: 0, food_value: "" },
  storedItems: [{ food_id: 0, food_value: "" }],
  newFoodItems: [{ food_id: 0, food_value: "" }],
  random_id: 0,
  customerFoodInput: "",
  openFoodChoiceModal: false,
  // lunch_menu: [{ value: "", disabled: false }],
  selectedCategory: "",
  setSelectedCategory: () => {}, // Initialize with an empty function
  setNewFoodItem: () => {},
  setNewFoodItems: () => {},
  setOpenFoodChoiceModal: () => {},
  setSelectedTime: () => {},
  setMeridiumType: () => {},
  setStoredItems: () => {},
  setCustomerFoodInput: () => {},
  optionsData: [],
  setOptionsData: () => {},
  lunchMenu: [
    {
      value: "",
      disabled: false,
    },
  ],
  setLunchMenu: () => {},
  autoCompleteDisabled: false,
  setAutoCompleteDisabled: () => {},
});

export const FoodInfosContextProvider = ({
  children,
}: // foodElement,
{
  children: React.ReactNode | JSX.Element | JSX.Element[];
  // foodElement: FoodItem;
}) => {
  // console.log(foodElement, "");
  const [newFoodItem, setNewFoodItem] = useState<FoodItem>({
    food_id: 0,
    food_value: "",
    food_category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [autoCompleteDisabled, setAutoCompleteDisabled] = useState(false);

  const [storedItems, setStoredItems] = useState<FoodItem[]>([]);
  const [optionsData, setOptionsData] = useState<{ value: string }[]>([]);

  // arrays of data :
  const [openFoodChoiceModal, setOpenFoodChoiceModal] = useState(false);
  // lunchMealMenu
  const lunchMealMenu = [
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    // ... add other meal items
  ];

  const dessertLunchMenu = [
    {
      value: "Cake",
      disabled: isListContainsObject({ food_value: "Cake" }, storedItems),
    },
    {
      value: "Ice Cream",
      disabled: isListContainsObject({ food_value: "Ice Cream" }, storedItems),
    },
    {
      value: "Pie",
      disabled: isListContainsObject({ food_value: "Pie" }, storedItems),
    },
    // ... add other dessert items
  ];

  // dynamic menus
  const generateLunchMenu = (
    selectedCategory: string,
    storedItems: FoodItem[]
  ) => {
    const menu: { value: string; disabled?: boolean }[] = [];
    const mealItems = storedItems.filter(
      (item) => item.food_category === "meal"
    );

    if (selectedCategory === "Meals") {
      menu.push(
        {
          value: "tacos",
          disabled: isListContainsObject({ food_value: "tacos" }, storedItems),
        },
        {
          value: "pizza",
          disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
        }
        // ... add other meal items
      );
    } else if (selectedCategory === "Desserts") {
      menu.push(
        {
          value: "ice cream",
          disabled: isListContainsObject(
            { food_value: "ice cream" },
            storedItems
          ),
        },
        {
          value: "cake",
          disabled: isListContainsObject({ food_value: "cake" }, storedItems),
        }
        // ... add other dessert items
      );
    } else {
      // Show all options for "All" category
      menu.push(
        {
          value: "tacos",
          disabled: isListContainsObject({ food_value: "tacos" }, storedItems),
        },
        {
          value: "pizza",
          disabled: isListContainsObject({ food_value: "pizza" }, storedItems),
        },
        // ... add other meal items
        {
          value: "ice cream",
          disabled: isListContainsObject(
            { food_value: "ice cream" },
            storedItems
          ),
        },
        {
          value: "cake_all",
          disabled: isListContainsObject({ food_value: "cake" }, storedItems),
        }
        // ... add other dessert items
      );
    }

    return menu;
  };
  // dynamic menus
  const generateLunchMenu_2 = (
    selectedCategory: string,
    storedItems: FoodItem[]
  ) => {
    const menu: { value: string; disabled?: boolean }[] = [];

    if (selectedCategory === "Meals") {
      const mealItems = storedItems.filter(
        (item) => item.food_category === "meal"
      );
      mealItems.forEach((item) => {
        menu.push({
          value: item.food_value,
          disabled: isListContainsObject(
            { food_value: item.food_value },
            storedItems
          ),
        });
      });
    } else if (selectedCategory === "Desserts") {
      const dessertItems = storedItems.filter(
        (item) => item.food_category === "dessert"
      );
      dessertItems.forEach((item) => {
        menu.push({
          value: item.food_value,
          disabled: isListContainsObject(
            { food_value: item.food_value },
            storedItems
          ),
        });
      });
    }

    return menu;
  };

  const [lunchMenu, setLunchMenu] = useState<
    { value: string; disabled?: boolean }[]
  >(generateLunchMenu(selectedCategory, storedItems));

  const [selectedTime, setSelectedTime] = useState("");
  const [meridiumType, setMeridiumType] = useState("");

  const [newFoodItems, setNewFoodItems] = useState<FoodItem[]>([]);
  const [customerFoodInput, setCustomerFoodInput] = useState("");

  let id = randomInteger(1, 5000);

  const [random_id, setRandomId] = useState<number>(id);

  let is_time_between_06_and_11: boolean =
    selectedTime === `06` ||
    selectedTime === `07` ||
    selectedTime === `08` ||
    selectedTime === `09` ||
    selectedTime === `10` ||
    selectedTime === `11`;
  let is_time_between_01_and_06: boolean =
    selectedTime === `01` ||
    selectedTime === `02` ||
    selectedTime === `03` ||
    selectedTime === `04` ||
    selectedTime === `05` ||
    selectedTime === `06`;
  //
  let is_breakfast_time: boolean =
    (is_time_between_06_and_11 && meridiumType === "AM") ||
    (selectedTime === `12` && meridiumType === "PM");

  const currentHour = new Date().getHours();
  const is_breakfast_time_equivalent: boolean =
    currentHour >= 6 && currentHour <= 11;

  //
  let is_lunch_time: boolean =
    is_time_between_01_and_06 && meridiumType === "PM";
  //
  let is_dinner_time: boolean =
    (is_time_between_06_and_11 && meridiumType === "PM") ||
    (selectedTime === `12` && meridiumType === "AM");

  React.useEffect(() => {
    setLunchMenu(generateLunchMenu(selectedCategory, storedItems));
  }, [selectedCategory, storedItems]);

  return (
    <FoodInfosContext.Provider
      value={{
        is_breakfast_time,
        is_lunch_time,
        is_dinner_time,
        selectedTime,
        setSelectedTime,
        meridiumType,
        setMeridiumType,
        newFoodItem,
        setNewFoodItem,
        storedItems,
        setStoredItems,
        newFoodItems,
        setNewFoodItems,
        random_id,
        customerFoodInput,
        setCustomerFoodInput,
        openFoodChoiceModal,
        setOpenFoodChoiceModal,
        selectedCategory,
        setSelectedCategory,
        optionsData,
        setOptionsData,
        lunchMenu,
        setLunchMenu,
        autoCompleteDisabled,
        setAutoCompleteDisabled,
      }}
    >
      {children}
    </FoodInfosContext.Provider>
  );
};

// export const FoodInfosContext = createContext<FoodInfosContext>(undefined as any); generated this error :
// TypeError: Cannot destructure property 'meridiumType' of 'Object(...)(...)' as it is undefined.
// solution : initilize the context with initial values
// createContext<FoodInfosContext>({
//   is_breakfast_time: false,
//   is_dinner_time: false,
//   is_lunch_time: false,
//   is_time_between_01_and_06: false,
//   is_time_between_06_and_11: false,
//   meridiumType: "",
//   selectedTime: "",
// });
// Yes, you can have as many global variables (context values) in a context file as you need. However, keep in mind that having too many context values might lead to more complex management and potential performance issues. It's generally a good practice to group related state variables together in a single context if possible.

// By placing this useEffect inside the FoodInfosContextProvider, you ensure that the lunchMenu state is updated whenever the selectedCategory or storedItems change. This will keep the lunch menu in sync with the user's selections and provide accurate autocomplete suggestions based on the selected category and stored items.
