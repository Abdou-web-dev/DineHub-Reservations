import { useState } from "react";
import { OrderTimeTable } from "../collapse/OrderTime";
import { GuestsCounter } from "../counters/GuestsCounter";
import { AddFoodInput } from "../inputs/AddFoodInput";
import { DateInput } from "../inputs/DateInput";
import { Selectedfood } from "../lists/SelectedFood";
import { LocationSelect } from "../selects/LocationSelect";
import "./card_styles.scss";

interface CustomerCardType {
  id: string;
  name: string;
  foodList: string[];
  index: number;
  restauLocation: string | undefined;
  // guestsNumber: string | number;
}

function CustomerCard({
  id,
  name,
  foodList,
  restauLocation,
}: CustomerCardType) {
  const [customerFoodInput, setCustomerFoodInput] = useState("");
  // const dispatch = useDispatch();

  return (
    <div className="customer-infos-card-container">
      <h5>{name}</h5>
      <div className="customer-infos-wrapper">
        <div className="customer-infos-wrapper-grp1">
          <div className="guests-comp">
            <GuestsCounter />
          </div>
          <div className="location-comp">
            {/* https://rsuitejs.com/components/select-picker/ */}
            <LocationSelect {...{ restauLocation, id }} />
          </div>
          <div className="date-comp">
            <DateInput />
          </div>
        </div>
        <div className="customer-infos-wrapper-grp2">
          <div className="time-comp">
            <OrderTimeTable />
          </div>

          <div className="add-food-input-and-list-comps">
            <AddFoodInput
              {...{ id, customerFoodInput, setCustomerFoodInput }}
            />
            <Selectedfood {...{ id, foodList }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
