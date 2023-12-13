import { useContext } from "react";
import { FoodInfosContext } from "../context/FoodInfosContext";
// import { FoodItem } from "../lists/DraggableFoodItems";
import { FoodItem } from "../../types/Types";
import { TogglerButton } from "./TogglerButton";
import "./btns_styles.scss";

interface CustomerButtonsType {
  foodList: FoodItem[];
}

export function FoodMealDessertButtons({ foodList }: CustomerButtonsType) {
  const {
    setSelectedCategory,
    selectedCategory,
    setOptionsData,
    setAutoCompleteDisabled,
  } = useContext(FoodInfosContext);

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
        onClick={() => {
          handleCategoryChange("Meals");
          filterSuggestionsByCategory();
          setAutoCompleteDisabled(false);
        }}
        label="Meals"
      />
      <TogglerButton
        onClick={() => {
          handleCategoryChange("Desserts");
          filterSuggestionsByCategory();
          setAutoCompleteDisabled(false);
        }}
        label="Desserts"
      />
      <TogglerButton
        onClick={() => {
          handleCategoryChange("All");
          filterSuggestionsByCategory();
          setAutoCompleteDisabled(false);
        }}
        label="All"
      />
    </div>
  );
}
