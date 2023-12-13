// types.ts

// import { FoodItem } from "../components/lists/DraggableFoodItems";

export type OptionValue = string | JSX.Element;

export type OptionsDataType =
  | Array<{ value: OptionValue; disabled: boolean }>
  | JSX.Element[];

type OptionsData = Array<{
  value: OptionValue;
  disabled: boolean;
}>;
export interface FoodItem {
  food_value: string;
  food_id?: number;
  food_category?: string;
}
export interface MenuItem {
  value: string;
  disabled: boolean;
}

// export type OptionsDataType = OptionsData | JSX.Element[];
export interface Customer {
  id: string;
  name: string;
  food: [FoodItem];
  //the new 4 props
  guestsNumber?: number | string;
  restauLocation?: string;
  orderDate?: string;
  orderTime?: string;
}
