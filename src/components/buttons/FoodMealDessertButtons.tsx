import { useContext } from "react";
import { FoodInfosContext } from "../context/FoodInfosContext";
import { FoodItem } from "../lists/DraggableFoodItems";
import { TogglerButton } from "./TogglerButton";
import "./btns_styles.scss";

interface CustomerButtonsType {
  foodList: FoodItem[];
}

export function FoodMealDessertButtons({ foodList }: CustomerButtonsType) {
  const { setSelectedCategory, selectedCategory, setOptionsData } =
    useContext(FoodInfosContext);

  const filterSuggestionsByCategory = () => {
    if (selectedCategory === "All") {
      setOptionsData(foodList.map((food) => ({ value: food.food_value })));
    } else {
      const filteredFoodList = foodList.filter(
        (food) => food.food_category === selectedCategory
      );
      setOptionsData(
        filteredFoodList.map((food) => ({ value: food.food_value }))
      );
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterSuggestionsByCategory();
  };

  return (
    <div className="customer-card-btns-container">
      <TogglerButton
        onClick={() => handleCategoryChange("Meals")}
        label="Meals"
      />
      <TogglerButton
        onClick={() => handleCategoryChange("Desserts")}
        label="Desserts"
      />
      <TogglerButton onClick={() => handleCategoryChange("All")} label="All" />
    </div>
  );
}
