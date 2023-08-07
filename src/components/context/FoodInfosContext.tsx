import * as React from "react";
import { createContext, useState } from "react";
import { Customer, FoodItem } from "../../types/Types";
import { randomInteger } from "../../utils/helpers";
// import { FoodItem } from "../lists/DraggableFoodItems";
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
  autoCompleteDisabled: boolean;
  setAutoCompleteDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  customer: Customer;
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
  autoCompleteDisabled: false,
  setAutoCompleteDisabled: () => {},
  customer: {
    food: [
      {
        food_value: "",
        food_id: 0,
        food_category: "",
      },
    ],
    id: "",
    name: "",
    guestsNumber: 0,
    orderDate: "",
    orderTime: "",
    restauLocation: "",
  },
});

export const FoodInfosContextProvider = ({
  children,
  customer,
}: // foodElement,
{
  children: React.ReactNode | JSX.Element | JSX.Element[];
  customer: Customer;
  // foodElement: FoodItem;
}) => {
  const [newFoodItem, setNewFoodItem] = useState<FoodItem>({
    food_id: 0,
    food_value: "",
    food_category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [autoCompleteDisabled, setAutoCompleteDisabled] = useState(false);

  const [storedItems, setStoredItems] = useState<FoodItem[]>([]);
  const [optionsData, setOptionsData] = useState<{ value: string }[]>([]);

  const [openFoodChoiceModal, setOpenFoodChoiceModal] = useState(false);

  const [selectedTime, setSelectedTime] = useState("");
  const [meridiumType, setMeridiumType] = useState("");

  const [newFoodItems, setNewFoodItems] = useState<FoodItem[]>([]);
  const [customerFoodInput, setCustomerFoodInput] = useState("");

  let id = randomInteger(1, 5000);

  const [random_id, setRandomId] = useState<number>(id);

  // let is_time_between_06_and_11: boolean =
  //   selectedTime === `06` ||
  //   selectedTime === `07` ||
  //   selectedTime === `08` ||
  //   selectedTime === `09` ||
  //   selectedTime === `10` ||
  //   selectedTime === `11`;

  // This alternative code snippet first converts the selectedTime string to a number using parseInt with base 10, and then performs a numeric comparison to check if the selected hour is between 6 and 11 (inclusive). This approach is more scalable and easier to maintain if you need to modify the time range in the future.

  const selectedHour: number = parseInt(selectedTime, 10);
  const is_time_between_06_and_11: boolean =
    selectedHour >= 6 && selectedHour <= 11;

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
        autoCompleteDisabled,
        setAutoCompleteDisabled,
        customer,
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
