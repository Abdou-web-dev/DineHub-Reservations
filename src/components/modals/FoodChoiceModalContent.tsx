import { Button } from "antd";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSpecificFoodItem } from "../../feature/customerSlice";
import { randomInteger } from "../../utils/helpers";
import { FoodChoiceItemBtn } from "../buttons/FoodChoiceItemBtn";
import { FoodInfosContext } from "../context/FoodInfosContext";
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

  let meal_description: string =
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
      : foodItem.food_value === `rice`
      ? iterator === `0`
        ? `Frequently served with refried beans at Tex-Mex restaurants, Mexican rice can often be pushed to the side (literally). Here at Delish, we think that’s criminal—when made right, Mexican rice can be a fluffy, flavor-packed side that upgrades everything it’s added to, from burrito bowls to taco dinners and everything in between.`
        : iterator === `1`
        ? `The rice here reminds us of the cheesy and creamy filling for a burrito, made weeknight-friendly. The green chiles add a slight pickled flavor to the dish, making it bright and kind of tangy. It’s a great meal when you're feeling lazy but craving something cozy and flavorful`
        : iterator === `2`
        ? `Crisping rice in a little olive oil adds a beautiful textural contrast and additional flavor to steamed rice, especially when it turns into a crust that cradles a really delicious cheesy chorizo and chickpea filling. Once you've got the technique down, use it for anything and everything you can imagine`
        : iterator === `3`
        ? `Unlike many yellow rice recipes, this one — influenced by Spain’s colonization of the Philippines — is a main course, similar to paella. I usually make it with jasmine rice, which is all about texture (slightly sticky and soft, yet firm enough to hold its shape) and smell (slight, but distinct floral notes). That said, I have substituted extra-long grain rice, the classic choice for Mexican- and Puerto Rican-style yellow rice, with good results. The shrimp and/or chorizo can be swapped with other quick-cooking proteins or vegetables. Use only vegetables and vegetable stock if you want to make the dish vegetarian`
        : ""
      : "";

  // when the user clicks on a given meal btn, a loading spinner first appears, it lasts for 1 second,
  // then the description text appears with a smooth animation from animate.css

  const { newFoodItem, setNewFoodItem, random_id } =
    useContext(FoodInfosContext);

  let is_tacos_option: boolean =
    choosenTacos === `chicken` ||
    choosenTacos === `beef` ||
    choosenTacos === `Shrimp` ||
    choosenTacos === `Pescado`;

  function generate_optional_meal_object(option: string) {
    // if (option)
    return {
      key: option,
      // newFoodHandler: (foodId: number) => {
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
        });
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

  let foodArrayOptions =
    foodItem.food_value === `tacos`
      ? [
          `chicken tacos`,
          `Ground beef tacos`,
          `Shrimp tacos`,
          `tacos de Pescado`,
        ]
      : foodItem.food_value === `pizza`
      ? [`chicken pizza`, `Ground beef pizza`, `Shrimp pizza`, `Tuna pizza`]
      : foodItem.food_value === `tajine`
      ? [
          `tajine with chicken, lemon and olives`,
          `fish tajine`,
          `tajine with lamb and caramelized quince`,
          `lamb tajine with raisins, almonds and honey (Mrouzia)`,
        ]
      : foodItem.food_value === `Shawarma`
      ? [``, ``, ``, ``]
      : foodItem.food_value === `sandwich`
      ? [
          `Tuna sandwich`,
          `Vegetable sandwich`,
          `cheese sandwich`,
          `Meatball sandwich`,
        ]
      : foodItem.food_value === `salad`
      ? [
          `Seafood salad`,
          `Bean salad	`,
          `Niçoise salad`,
          `Lettuce, Anchovy, Egg and Crouton salad`,
        ]
      : foodItem.food_value === `burger`
      ? [`hamburger`, `Veggie burger`, `Wild salmon burger`, `Cheeseburger`]
      : foodItem.food_value === `rice`
      ? [
          `Mexican rice`,
          `One-Pan Green Chile Chicken & rice`,
          `Cheesy Chorizo, Chickpea & Crispy rice Skillet`,
          `Filipino Yellow rice with Shrimp and Chorizo`,
        ]
      : foodItem.food_value === `bowl`
      ? [
          `Chicken burrito bowl`,
          `Aubergine teriyaki bowls`,
          `Mango and prawn noodle salad bowl`,
          `Blackened Shrimp bowls`,
        ]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : foodItem.food_value === ``
      ? [``, ``, ``, ``]
      : [];

  // # Todo7: on hovering on each food item option button, the descirption will appear below , preceded by a spinner

  return (
    <>
      <div className="food-choice-modal-content-container">
        <div className="items-btns">
          {Array.isArray(generate_optional_food_items_array(foodArrayOptions))
            ? generate_optional_food_items_array(foodArrayOptions)?.map(
                (option_food, i) => {
                  return (
                    option_food && (
                      <FoodChoiceItemBtn
                        key={i}
                        itemName={option_food.key}
                        handleFoodChoiceClick={() => {
                          option_food.newFoodHandler();
                          // option_food.newFoodHandler(foodItem.food_id);
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
            Choose
          </Button>
          <p className="description">{meal_description}</p>
          {/* <span>{iterator}</span> */}
        </div>
      </div>
    </>
  );
};
