import { useState } from "react";
import { FoodChoiceItemBtn } from "../buttons/FoodChoiceItemBtn";
import "./modal_styles.scss";
export const FoodChoiceModalContent = ({
  foodItem,
}: {
  foodItem: {
    food_value: string;
    food_id: number;
  };
}) => {
  function handleFoodChoiceClick(): void {
    // throw new Error("Function not implemented.");
  }
  const [choosenTacos, setChoosenTacos] = useState("");
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

  // when the user clicks on a given meal btn, a loading spinner first appears, it lasts for 1 second,
  // then the description text appears with a smooth animation from animate.css

  return (
    <>
      <div className="food-choice-modal-content-container">
        <div className="items-btns">
          <FoodChoiceItemBtn
            itemName="chicken tacos"
            // {...{ handleFoodChoiceClick }}
            handleFoodChoiceClick={() => setChoosenTacos(`chicken`)}
          />
          <FoodChoiceItemBtn
            itemName="Ground beef tacos"
            handleFoodChoiceClick={() => setChoosenTacos(`beef`)}
          />
          <FoodChoiceItemBtn
            itemName="Shrimp Tacos"
            handleFoodChoiceClick={() => setChoosenTacos(`Shrimp`)}
          />
          <FoodChoiceItemBtn
            itemName="Tacos de Pescado"
            handleFoodChoiceClick={() => setChoosenTacos(`Pescado`)}
          />
        </div>

        <div>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};
