import { Button } from "antd";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSpecificFoodItem } from "../../feature/customerSlice";
import { FoodChoiceItemBtn } from "../buttons/FoodChoiceItemBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { randomInteger } from "../inputs/AddFoodInput";
import { FoodItem, replace } from "../lists/SelectedfoodHorizontalDrag";
import "./modal_styles.scss";

export const FoodChoiceModalContent = ({
  foodItem,
  openFoodChoiceModal,
  setOpenFoodChoiceModal,
  id,
  index,
}: {
  foodItem: {
    food_value: string;
    food_id?: number | any;
  };
  openFoodChoiceModal: boolean;
  setOpenFoodChoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  index: number;
}) => {
  const dispatch = useDispatch();
  const [choosenTacos, setChoosenTacos] = useState("");
  const [iterator, setIterator] = useState<string>("");
  let description: string =
    choosenTacos === `chicken`
      ? `Here at MAYSSAM, we can’t get enough of tacos in every shape and form. When we’re looking for something simple to load up with all of our favorite toppings, we turn to these simple chicken tacos. While far from being authentic, these Americanized tacos load up corn tortillas with seasoned chicken and any variety of toppings to make your perfect taco. Pair with a classic margarita, and your Taco Tuesday (or Wednesday, or Thursday…) will be more than complete. `
      : choosenTacos === `beef`
      ? `Ground beef tacos are delicious, authentic, and so easy to make. This traditional Mexican dish is packed with well-seasoned ground beef tacos, wrapped in soft flour tortillas, and topped with tomatoes, onions, and cheese. It's garnished with fresh cilantro, sour cream, and freshly-squeezed lime juice for the best balance of flavors. It's savory, spicy, creamy, and fresh. These tacos are the perfect item for a Mexican fiesta, to celebrate Cinco de Mayo, or for any time of year. Either way, these are always a big hit.      `
      : choosenTacos === `Shrimp`
      ? `A traditional taco from Mexico’s Pacific coast, camarones (or shrimp tacos) are made with flavorful shrimp and fresh toppings. It’s perfect for a healthy, quick-cooking, weeknight dinner.`
      : choosenTacos === `Pescado`
      ? `Take a drive along Mexico’s Baja California coast and you’ll likely come across multiple carts serving fresh fish tacos. Whether you get them fried or grilled, the flaky white fish is typically topped with shredded cabbage, pico de gallo, or sour cream. Perfect for eating beachside!`
      : "";
  let description_2: string =
    foodItem.food_value === "tacos"
      ? iterator === `0`
        ? `Here at MAYSSAM, we can’t get enough of tacos in every shape and form. When we’re looking for something simple to load up with all of our favorite toppings, we turn to these simple chicken tacos. While far from being authentic, these Americanized tacos load up corn tortillas with seasoned chicken and any variety of toppings to make your perfect taco. Pair with a classic margarita, and your Taco Tuesday (or Wednesday, or Thursday…) will be more than complete. `
        : iterator === `1`
        ? `Ground beef tacos are delicious, authentic, and so easy to make. This traditional Mexican dish is packed with well-seasoned ground beef tacos, wrapped in soft flour tortillas, and topped with tomatoes, onions, and cheese. It's garnished with fresh cilantro, sour cream, and freshly-squeezed lime juice for the best balance of flavors. It's savory, spicy, creamy, and fresh. These tacos are the perfect item for a Mexican fiesta, to celebrate Cinco de Mayo, or for any time of year. Either way, these are always a big hit.      `
        : iterator === `2`
        ? `A traditional taco from Mexico’s Pacific coast, camarones (or shrimp tacos) are made with flavorful shrimp and fresh toppings. It’s perfect for a healthy, quick-cooking, weeknight dinner.`
        : iterator === `3`
        ? `Take a drive along Mexico’s Baja California coast and you’ll likely come across multiple carts serving fresh fish tacos. Whether you get them fried or grilled, the flaky white fish is typically topped with shredded cabbage, pico de gallo, or sour cream. Perfect for eating beachside!`
        : ""
      : foodItem.food_value === "pizza"
      ? iterator === `0`
        ? `pizza1`
        : iterator === `1`
        ? `pizza2`
        : iterator === `2`
        ? `pizza3`
        : iterator === `3`
        ? `pizza4`
        : ""
      : foodItem.food_value === "food3"
      ? iterator === `0`
        ? ``
        : iterator === `1`
        ? ``
        : iterator === `2`
        ? ``
        : iterator === `3`
        ? ``
        : ""
      : "";

  // when the user clicks on a given meal btn, a loading spinner first appears, it lasts for 1 second,
  // then the description text appears with a smooth animation from animate.css

  const {
    newFoodItem,
    setNewFoodItem,
    setNewFoodItems,
    newFoodItems,
    storedItems,
    setStoredItems,
    random_id,
    customerFoodInput,
  } = useContext(FoodInfosContext);

  let items_names: string[] = [
    `chicken tacos`,
    `Ground beef tacos`,
    `Shrimp Tacos`,
    `Tacos de Pescado`,
  ];

  let newFoodList: FoodItem[] = replace(newFoodItem, storedItems);
  let is_tacos_option: boolean =
    choosenTacos === `chicken` ||
    choosenTacos === `beef` ||
    choosenTacos === `Shrimp` ||
    choosenTacos === `Pescado`;

  function generate_optional_meal_object(option: string) {
    // if (option)
    return {
      key: option,
      newFoodHandler: () => {
        setChoosenTacos(
          iterator === "0"
            ? `chicken`
            : iterator === "1"
            ? `beef`
            : iterator === "2"
            ? `Shrimp`
            : iterator === "3"
            ? `Pescado`
            : "chicken"
        );

        setNewFoodItem({
          food_id:
            foodItem.food_value === "tacos"
              ? random_id + 47
              : foodItem.food_value === `pizza`
              ? random_id + 11
              : randomInteger(1, 5000),
          food_value: option,
          // food_value: !openFoodChoiceModal ? foodItem.food_value : option,
          // food_category: "",
        });
        // setStoredItems(newFoodList);
        // newFoodItems.push(newFoodItem);
        // console.log(newFoodItems, "newFoodItems");
        // setOpenFoodChoiceModal(false);
      },
    };
  }

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

  let optionalFoodArray =
    foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp Tacos`,
          `Tacos de Pescado`,
        ]
      : foodItem.food_value === `pizza`
      ? [`chicken pizza`, `Ground beef pizza`, `Shrimp pizza`, `Tuna Pizza`]
      : foodItem.food_value === `tajine`
      ? [
          `tajine option 1`,
          `tajine option 2`,
          `tajine option 3`,
          `tajine option 4`,
        ]
      : [``];

  // useEffect(() => {
  //   if (newFoodItem) {
  //     newFoodItems.push(newFoodItem);
  //   }
  // }, [newFoodItem]);

  let option_array = [
    `chicken tacos`,
    `Ground beef tacos`,
    `Shrimp Tacos`,
    `Tacos de Pescado`,
  ];

  return (
    <>
      <div className="food-choice-modal-content-container">
        <div className="items-btns">
          {Array.isArray(generate_optional_food_items_array(optionalFoodArray))
            ? generate_optional_food_items_array(optionalFoodArray)?.map(
                (option_food, i) => {
                  return (
                    option_food && (
                      <FoodChoiceItemBtn
                        key={i}
                        itemName={option_food.key}
                        handleFoodChoiceClick={() => {
                          option_food.newFoodHandler();
                          if (i === 0) setIterator("0");
                          else if (i === 1) setIterator("1");
                          else if (i === 2) setIterator("2");
                          else if (i === 3) setIterator("3");
                        }}
                      />
                    )
                  );
                }
              )
            : null}
        </div>

        <div>
          <Button
            onClick={() => {
              dispatch(
                updateSpecificFoodItem({
                  id: id, //customer's id
                  index: index, //food item index
                  new_food_item: {
                    food_value: newFoodItem.food_value,
                    food_id: newFoodItem.food_id,
                  },
                })
              );
              setOpenFoodChoiceModal(false);
            }}
          >
            CHOOSE
          </Button>
          <p className="description">{description_2}</p>
          <span>{iterator}</span>
          <span>newfood value : {newFoodItem.food_value}</span>
        </div>
      </div>
    </>
  );
};
