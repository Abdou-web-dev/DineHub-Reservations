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

export const breakfastMealMenuItems: string[] = [
  "Buttered Croissant",
  "Belgian Waffles",
  "Fruit Salad",
  "Coffee",
  "Tea",
  "Smoky Bacon, Potato and Cheddar Hash",
  "Baked Eggs with Swiss Chard and Green Olives",
  "Almond Butter Toast With Bananas And Toasted Coconut",
  "Raspberry Breakfast Bar",
  "Jam Dot Oat Scones",
  "Coffee Cinnamon Rolls with Maple Cream Cheese Icing",
  "Dairy Free Cinnamon Rolls",
  "Cardamom Rolls with Almond Glaze",
  "Almond Poppyseed Pancakes with Cherry Syrup",
  "Coconut French Toast with Apples and Pecans",
  "Baked French Toast",
  "Gingerbread loaf",
  "Sour Cream Coffee Cake",
  "Norwegian Risgrøt Rice Porridge",
  "Nuts and Seeds Granola",
  "Apple and Maple Baked Oatmeal",
  "Granola with Figs, Almonds and Coconut",
  "Avocado, Chèvre and Bacon Omelette",
  "Shirred Eggs with Leeks",
  // "",
];

export const dessertBreakfastMenuItems: string[] = [
  "Red Velvet Cinnamon Rolls",
  "Bananas Foster Baked French Toast",
  "Frosted Pumpkin Doughnuts",
  "Chocolate Cinnamon Rolls with Icing",
  "German Chocolate Ring",
  "Cinnamon-Walnut Sticky Buns",
  "Upside-Down Banana Monkey Bread",
  "Birthday Cake Pancakes",
  "Cranberry Cream Cheese French Toast",
  "Toffee Apple Cinnamon Buns",
  "Dulce de Leche French Toast Bake",
  "Cranberry-Pistachio Sticky Buns",
  `Apples 'n' Cream Pancake`,
  "Red Velvet Pancakes",
  "Mini Nutella Doughnuts",
  "Birthday Cake Waffles",
  // "",
];

export const lunchMealMenuItems = [
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

export const dessertLunchMenuItems = [
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

export const dinnerMealMenuItems = [
  "Soup",
  "Pad Thai",
  "Skillet Chili & Meatballs",
  "Chicken Nugget Parm Casserole",
  "French Onion Baked Potatoes",
  "Instant Pot Jambalaya",
  "Sloppy Joe Meatball Bake",
  "Tricolore Skillet Lasagna",
  "Big Mac Crunchwrap",
  "Chili Cheese Sweet Potato Casserole",
  "Salmon & Potato Skillet",
  "One-Pan Salsa Verde Shrimp & Rice",
  "Creamy Steak Fettuccine",
  "Baked Risotto with Lemon, Peas & Parmesan",
  "One-Pan Coconut-Lime Chicken",
  "Mexican Beef 'N' Rice Skillet",
  "Classic Stuffed Peppers",
  "Black Bean Tostadas",
  "Cabbage Schnitzel",
];

export const dessertDinnerMenuItems: string[] = [
  "Lemon posset",
  "Classic creme brûlée",
  "Cherry clafoutis",
  "Affogato chocolate mousse",
  "Lime cheesecake",
  "Raspberry chocolate pots",
  "Classic banana split",
  "Chocolate torte",
  "Brioche ice crea",
  "Espresso martini cheesecake",
  "Warm molten chocolate and salted caramel tarts",
  "Easy treacle tart",
  "Butterscotch budino",
  "Nutmeg custard tart",
  "Clementine posset",
  "Boozy knickerbocker glory",
  "Cranachan",
  "Amaretto baked figs",
  "Healthy apple crumble",
  "Salted caramel and pecan cheesecake pots",
  "Cheat's ginger, salted caramel and rum cake,'Blueberry and mascarpone slice",
  "Chocolate orange pots",
  "Lemon self-saucing pudding (Lemon surprise pudding)",
  "Chocolate sponge cake",
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

  const breakfastMealMenu: MenuItem[] = generateMenu(
    breakfastMealMenuItems,
    storedItems
  );

  const dessertBreakfastMenu: MenuItem[] = generateMenu(
    dessertBreakfastMenuItems,
    storedItems
  );
  const lunchMealMenu: MenuItem[] = generateMenu(
    lunchMealMenuItems,
    storedItems
  );
  const dessertLunchMenu: MenuItem[] = generateMenu(
    dessertLunchMenuItems,
    storedItems
  );
  //
  const dinnerMealMenu: MenuItem[] = generateMenu(
    dinnerMealMenuItems,
    storedItems
  );
  const dessertDinnerMenu: MenuItem[] = generateMenu(
    dessertDinnerMenuItems,
    storedItems
  );

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
