import { useDispatch } from "react-redux";
import { FoodItem } from "../lists/DraggableFoodItems";
import { TogglerButton } from "./TogglerButton";
import "./btns_styles.scss";

interface CustomerButtonsType {
  foodList: FoodItem[];
}

export function FoodMealDessertButtons({
  foodList,
}: // index,
// setOpenOrderModal,
CustomerButtonsType) {
  const dispatch = useDispatch();

  return (
    <div className="customer-card-btns-container">
      <TogglerButton label="Meals" />
      <TogglerButton label="Desserts" />
      <TogglerButton label="All" />
    </div>
  );
}
