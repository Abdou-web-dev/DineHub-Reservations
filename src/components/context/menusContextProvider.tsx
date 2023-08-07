import { createContext, useContext } from "react";
import { FoodItem } from "../../types/Types";
import { isListContainsObject } from "../../utils/helpers";
import { FoodInfosContext } from "./FoodInfosContext";

type MenuItem = {
  value: string;
  disabled: boolean;
};

function generateMenu(
  menuItems: string[],
  storedItems: FoodItem[]
): MenuItem[] {
  return menuItems?.map((item: string) => ({
    value: item,
    disabled: isListContainsObject({ food_value: item }, storedItems),
  }));
}

const lunchMealMenuItems = [
  "Burger",
  "Tacos",
  "Tajine",
  "Pizza",
  "Sandwich",
  "Shawarma",
  `Wraps`,
  `Wings`,
  "Lasagne",
  "Bowl",
  "Salad",
  `Roasted veg and salmon tart`,
  "Slow-braised beef in red wine",
  "Lemon Herb Mediterranean Pasta Salad",
  "Meal-Prep Pesto Chicken & Veggies",
  "Garlic Chicken and Veggie Pasta",
  "Slow-roasted beef with mustard potatoes",
  // "",
  // ... add more items
];

const dessertLunchMenuItems = [
  "Strawberry and rhubarb cobbler",
  "Andrew McConnell's rustic rhubarb tarts",
  "Jamie Oliver's rice pudding",
  "Muhallabia (Middle Eastern milk pudding)",
  "Chocolate, coconut and cherry sponge",
  "Frozen caramel slice",
  "Chocolate mousse with cherry ripe truffles",
  "Melt-and-mix white chocolate and ginger mud cake",
  "Easy lemon meringue pie",
  "Baked ricotta cake",
  "Sticky ginger pudding",
  "Ice Cream",
  "Chocolate mousse with salted caramel and mochi",
  "Pecan chocolate bread and butter pudding",
  "Cake",
];

// Define other menu item arrays for dinner, dessert, breakfast, etc.

const menuItemInitializer = {
  value: "",
  disabled: false,
};

export interface menusInfosContextType {
  lunchMealMenu: MenuItem[];
  dessertLunchMenu: MenuItem[];
  dinnerMealMenu: MenuItem[];
  dessertDinnerMenu: MenuItem[];
  breakfastMealMenu: MenuItem[];
  dessertBreakfastMenu: MenuItem[];
}

export const MenusContext = createContext<menusInfosContextType>({
  lunchMealMenu: [menuItemInitializer],
  dessertLunchMenu: [menuItemInitializer],
  dinnerMealMenu: [menuItemInitializer],
  dessertDinnerMenu: [menuItemInitializer],
  breakfastMealMenu: [menuItemInitializer],
  dessertBreakfastMenu: [menuItemInitializer],
});

export const MenusContextProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const { storedItems } = useContext(FoodInfosContext);

  const lunchMealMenu: MenuItem[] = generateMenu(
    lunchMealMenuItems,
    storedItems
  );
  const dessertLunchMenu: MenuItem[] = generateMenu(
    dessertLunchMenuItems,
    storedItems
  );

  const lunchMenuMeals = [
    {
      value: "Pizza",
      disabled: isListContainsObject({ food_value: "Pizza" }, storedItems),
    },
    {
      value: "Sandwich",
      disabled: isListContainsObject({ food_value: "Sandwich" }, storedItems),
    },
    {
      value: "Shawarma",
      disabled: isListContainsObject({ food_value: "Shawarma" }, storedItems),
    },
    {
      value: "Burger",
      disabled: isListContainsObject({ food_value: "Burger" }, storedItems),
    },
    {
      value: "Tacos",
      disabled: isListContainsObject({ food_value: "Tacos" }, storedItems),
    },
    {
      value: "Tajine",
      disabled: isListContainsObject({ food_value: "Tajine" }, storedItems),
    },
    {
      value: "Slow-roasted beef with mustard potatoes",
      disabled: isListContainsObject(
        { food_value: "roasted potatoes" },
        storedItems
      ),
    },
    {
      value: "Salad",
      disabled: isListContainsObject({ food_value: "Salad" }, storedItems),
    },
    {
      value: "Bowl",
      disabled: isListContainsObject({ food_value: "Bowl" }, storedItems),
    },
    {
      value: "Garlic Chicken and Veggie Pasta",
      disabled: isListContainsObject(
        { food_value: "Garlic Chicken and Veggie Pasta" },
        storedItems
      ),
    },
    {
      value: "Meal-Prep Pesto Chicken & Veggies",
      disabled: isListContainsObject(
        { food_value: "Meal-Prep Pesto Chicken & Veggies" },
        storedItems
      ),
    },
    {
      value: "Lemon Herb Mediterranean Pasta Salad",
      disabled: isListContainsObject(
        { food_value: "Lemon Herb Mediterranean Pasta Salad" },
        storedItems
      ),
    },
    {
      value: "Lasagne",
      disabled: isListContainsObject({ food_value: "Lasagne" }, storedItems),
    },
    {
      value: "Slow-braised beef in red wine",
      disabled: isListContainsObject(
        { food_value: "Slow-braised beef in red wine" },
        storedItems
      ),
    },
    {
      value: "Wings",
      disabled: isListContainsObject({ food_value: "Wings" }, storedItems),
    },
    {
      value: "Wraps",
      disabled: isListContainsObject({ food_value: "Wraps" }, storedItems),
    },
    {
      value: "Roasted veg and salmon tart",
      disabled: isListContainsObject(
        { food_value: "Roasted veg and salmon tart" },
        storedItems
      ),
    },
    // {
    //   value: "Bowl",
    //   disabled: isListContainsObject({ food_value: "Bowl" }, storedItems),
    // },
  ];

  const dessertLunchMenu_2 = [
    {
      value: "Cake",
      disabled: isListContainsObject({ food_value: "Cake" }, storedItems),
    },
    {
      value: "Ice Cream",
      disabled: isListContainsObject({ food_value: "Ice Cream" }, storedItems),
    },
    {
      value: "Chocolate mousse with salted caramel and mochi",
      disabled: isListContainsObject(
        { food_value: "Chocolate mousse with salted caramel and mochi" },
        storedItems
      ),
    },
    {
      value: "Pecan chocolate bread and butter pudding",
      disabled: isListContainsObject(
        { food_value: "Pecan chocolate bread and butter pudding" },
        storedItems
      ),
    },
    {
      value: "Chocolate mousse with cherry ripe truffles",
      disabled: isListContainsObject(
        { food_value: "Chocolate mousse with cherry ripe truffles" },
        storedItems
      ),
    },
    {
      value: "Melt-and-mix white chocolate and ginger mud cake",
      disabled: isListContainsObject(
        { food_value: "Melt-and-mix white chocolate and ginger mud cake" },
        storedItems
      ),
    },
    {
      value: "Easy lemon meringue pie",
      disabled: isListContainsObject(
        { food_value: "Easy lemon meringue pie" },
        storedItems
      ),
    },
    {
      value: "Baked ricotta cake",
      disabled: isListContainsObject(
        { food_value: "Baked ricotta cake" },
        storedItems
      ),
    },
    {
      value: "Sticky ginger pudding",
      disabled: isListContainsObject(
        { food_value: "Sticky ginger pudding" },
        storedItems
      ),
    },
    {
      value: "Jamie Oliver's rice pudding",
      disabled: isListContainsObject(
        { food_value: "Jamie Oliver's rice pudding" },
        storedItems
      ),
    },
    {
      value: "Muhallabia (Middle Eastern milk pudding)",
      disabled: isListContainsObject(
        { food_value: "Muhallabia (Middle Eastern milk pudding)" },
        storedItems
      ),
    },
    {
      value: "Chocolate, coconut and cherry sponge",
      disabled: isListContainsObject(
        { food_value: "Chocolate, coconut and cherry sponge" },
        storedItems
      ),
    },
    {
      value: "Frozen caramel slice",
      disabled: isListContainsObject(
        { food_value: "Frozen caramel slice" },
        storedItems
      ),
    },
    {
      value: "Strawberry and rhubarb cobbler",
      disabled: isListContainsObject(
        { food_value: "Strawberry and rhubarb cobbler" },
        storedItems
      ),
    },
    {
      value: "Andrew McConnell's rustic rhubarb tarts",
      disabled: isListContainsObject(
        { food_value: "Andrew McConnell's rustic rhubarb tarts" },
        storedItems
      ),
    },
  ];

  const dinnerMealMenu = [
    {
      value: "Mexican Beef 'N' Rice Skillet",
      disabled: isListContainsObject(
        { food_value: "Mexican Beef 'N' Rice Skillet" },
        storedItems
      ),
    },
    {
      value: "Classic Stuffed Peppers",
      disabled: isListContainsObject(
        { food_value: "Classic Stuffed Peppers" },
        storedItems
      ),
    },
    {
      value: "Black Bean Tostadas",
      disabled: isListContainsObject(
        { food_value: "Black Bean Tostadas" },
        storedItems
      ),
    },
    {
      value: "Cabbage Schnitzel",
      disabled: isListContainsObject(
        { food_value: "Cabbage Schnitzel" },
        storedItems
      ),
    },
    {
      value: "One-Pan Salsa Verde Shrimp & Rice",
      disabled: isListContainsObject(
        { food_value: "One-Pan Salsa Verde Shrimp & Rice" },
        storedItems
      ),
    },
    {
      value: "Creamy Steak Fettuccine",
      disabled: isListContainsObject(
        { food_value: "Creamy Steak Fettuccine" },
        storedItems
      ),
    },
    {
      value: "Baked Risotto with Lemon, Peas & Parmesan",
      disabled: isListContainsObject(
        { food_value: "Baked Risotto with Lemon, Peas & Parmesan" },
        storedItems
      ),
    },
    {
      value: "One-Pan Coconut-Lime Chicken",
      disabled: isListContainsObject(
        { food_value: "One-Pan Coconut-Lime Chicken" },
        storedItems
      ),
    },
    {
      value: "Soup",
      disabled: isListContainsObject({ food_value: "Soup" }, storedItems),
    },
    {
      value: "Tricolore Skillet Lasagna",
      disabled: isListContainsObject(
        { food_value: "Tricolore Skillet Lasagna" },
        storedItems
      ),
    },
    {
      value: "Big Mac Crunchwrap",
      disabled: isListContainsObject(
        { food_value: "Big Mac Crunchwrap" },
        storedItems
      ),
    },
    {
      value: "Chili Cheese Sweet Potato Casserole",
      disabled: isListContainsObject(
        { food_value: "Chili Cheese Sweet Potato Casserole" },
        storedItems
      ),
    },
    {
      value: "Salmon & Potato Skillet",
      disabled: isListContainsObject(
        { food_value: "Salmon & Potato Skillet" },
        storedItems
      ),
    },
    {
      value: "Chicken Nugget Parm Casserole",
      disabled: isListContainsObject(
        { food_value: "Chicken Nugget Parm Casserole" },
        storedItems
      ),
    },
    {
      value: "French Onion Baked Potatoes",
      disabled: isListContainsObject(
        { food_value: "French Onion Baked Potatoes" },
        storedItems
      ),
    },
    {
      value: "Instant Pot Jambalaya",
      disabled: isListContainsObject(
        { food_value: "Instant Pot Jambalaya" },
        storedItems
      ),
    },
    {
      value: "Sloppy Joe Meatball Bake",
      disabled: isListContainsObject(
        { food_value: "Sloppy Joe Meatball Bake" },
        storedItems
      ),
    },
    {
      value: "Skillet Chili & Meatballs",
      disabled: isListContainsObject(
        { food_value: "Skillet Chili & Meatballs" },
        storedItems
      ),
    },
    {
      value: "Pad Thai",
      disabled: isListContainsObject({ food_value: "Pad Thai" }, storedItems),
    },
  ];

  const dessertDinnerMenu = [
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
  ];

  const dessertBreakfastMenu = [
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
  ];

  const breakfastMealMenu = [
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
    {
      value: "",
      disabled: isListContainsObject({ food_value: "" }, storedItems),
    },
  ];

  return (
    <MenusContext.Provider
      value={{
        lunchMealMenu,
        dessertLunchMenu,
        dessertDinnerMenu,
        dinnerMealMenu,
        breakfastMealMenu,
        dessertBreakfastMenu,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};

// Now, you have defined the menusInfosContextType interface correctly with MenuItem[] for lunchMealMenu and dessertLunchMenu. You can use this context to provide and consume the menu arrays in your components. Make sure to import and use MenusInfosContext where you want to provide or consume these menu arrays.
