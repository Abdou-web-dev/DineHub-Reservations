import { useContext, useEffect, useState } from "react";
import { FoodChoiceItemBtn } from "../buttons/FoodChoiceItemBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { randomInteger } from "../inputs/AddFoodInput";
import "./modal_styles.scss";

export const FoodChoiceModalContent = ({
  foodItem,
}: {
  foodItem: {
    food_value: string;
    food_id: number;
  };
}) => {
  const [choosenTacos, setChoosenTacos] = useState("");
  let description: string =
    foodItem.food_value === `tacos`
      ? choosenTacos === `chicken`
        ? `Here at MAYSSAM, we can’t get enough of tacos in every shape and form. When we’re looking for something simple to load up with all of our favorite toppings, we turn to these simple chicken tacos. While far from being authentic, these Americanized tacos load up corn tortillas with seasoned chicken and any variety of toppings to make your perfect taco. Pair with a classic margarita, and your Taco Tuesday (or Wednesday, or Thursday…) will be more than complete. `
        : choosenTacos === `beef`
        ? `Ground beef tacos are delicious, authentic, and so easy to make. This traditional Mexican dish is packed with well-seasoned ground beef tacos, wrapped in soft flour tortillas, and topped with tomatoes, onions, and cheese. It's garnished with fresh cilantro, sour cream, and freshly-squeezed lime juice for the best balance of flavors. It's savory, spicy, creamy, and fresh. These tacos are the perfect item for a Mexican fiesta, to celebrate Cinco de Mayo, or for any time of year. Either way, these are always a big hit.      `
        : choosenTacos === `Shrimp`
        ? `A traditional taco from Mexico’s Pacific coast, camarones (or shrimp tacos) are made with flavorful shrimp and fresh toppings. It’s perfect for a healthy, quick-cooking, weeknight dinner.`
        : choosenTacos === `Pescado`
        ? `Take a drive along Mexico’s Baja California coast and you’ll likely come across multiple carts serving fresh fish tacos. Whether you get them fried or grilled, the flaky white fish is typically topped with shredded cabbage, pico de gallo, or sour cream. Perfect for eating beachside!`
        : ""
      : "";

  // when the user clicks on a given meal btn, a loading spinner first appears, it lasts for 1 second,
  // then the description text appears with a smooth animation from animate.css

  const { newFoodItem, setNewFoodItem, setnewFoodItems, newFoodItems } =
    useContext(FoodInfosContext);

  let items_names: string[] = [
    `chicken tacos`,
    `Ground beef tacos`,
    `Shrimp Tacos`,
    `Tacos de Pescado`,
  ];

  function generate_optional_meal_object(option: string) {
    return {
      key: option,
      newFoodHandler: () => {
        setChoosenTacos(`chicken`);
        setNewFoodItem({
          food_id: randomInteger(1, 5000),
          food_value: option,
          food_category: "",
        });
      },
    };
  }
  // foodItem.food_value === `tacos`;

  function generate_optional_food_items_array([
    opt1,
    opt2,
    opt3,
    opt4,
  ]: string[]) {
    let optional_food_items_array = [
      generate_optional_meal_object(opt1),
      generate_optional_meal_object(opt2),
      generate_optional_meal_object(opt3),
      generate_optional_meal_object(opt4),
    ];
    return optional_food_items_array;
  }

  let newFoodItemsArray: {
    key: string;
    newFoodHandler: () => void;
  }[] = [
    {
      key: `chicken tacos`,
      // key:    foodItem.food_value === `tacos`?      `chicken tacos`:     foodItem.food_value === `tacos`?'pizza':''      ,
      newFoodHandler: () => {
        setChoosenTacos(`chicken`);
        setNewFoodItem({
          food_id: randomInteger(1, 5000),
          food_value: "chicken tacos",
          food_category: "",
        });
      },
    },
    {
      key: `Ground beef tacos`,
      newFoodHandler: () => {
        setChoosenTacos(`beef`);
        setNewFoodItem({
          food_id: randomInteger(1, 5000),
          food_value: "Ground beef tacos",
          food_category: "",
        });
      },
    },
    {
      key: `Shrimp tacos`,
      newFoodHandler: () => {
        setChoosenTacos(`Shrimp`);
        setNewFoodItem({
          food_id: randomInteger(1, 5000),
          food_value: "Shrimp tacos",
          food_category: "",
        });
      },
    },
    {
      key: `Tacos de Pescado`,
      newFoodHandler: () => {
        setChoosenTacos(`Pescado`);
        setNewFoodItem({
          food_id: randomInteger(1, 5000),
          food_value: "Tacos de Pescado",
          food_category: "",
        });
      },
    },
  ];

  let id_categ_object = {
    food_id: randomInteger(1, 5000),
    food_category: "",
  };

  let optionalFoodArray =
    foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `pizza`
      ? [`chicken pizza`, `Ground beef pizza`, `Shrimp pizza`, `pizzoooo`]
      : foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : [``];

  useEffect(() => {
    if (newFoodItem) {
      // let newItems =
      setStoredItems([...storedItems, newFoodItem]);
      // setnewFoodItems
    }
  }, [newFoodItem]);

  return (
    <>
      <div className="food-choice-modal-content-container">
        <div className="items-btns">
          {Array.isArray(generate_optional_food_items_array(optionalFoodArray))
            ? generate_optional_food_items_array(optionalFoodArray)?.map(
                (option_food) => {
                  return (
                    <FoodChoiceItemBtn
                      key={option_food.key}
                      itemName={option_food.key}
                      handleFoodChoiceClick={option_food.newFoodHandler}
                    />
                  );
                }
              )
            : null}
        </div>

        <div>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};
