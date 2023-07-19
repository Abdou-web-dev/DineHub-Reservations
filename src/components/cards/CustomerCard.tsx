import { useState } from "react";
import { useDispatch } from "react-redux";
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
  food: string[];
  guestsNumber: string | number;
}

function CustomerCard({ id, name, food, guestsNumber }: CustomerCardType) {
  const [customerFoodInput, setCustomerFoodInput] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="customer-infos-card-container">
      <h5>{name}</h5>
      <div className="customer-infos-wrapper">
        <div className="customer-infos-wrapper-grp1">
          <div className="guests-comp">
            <GuestsCounter {...{ guestsNumber }} />
          </div>
          <div className="location-comp">
            {/* https://rsuitejs.com/components/select-picker/ */}
            <LocationSelect />
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
            <Selectedfood {...{ food }} />
          </div>
          {/* <div className="food-comp"> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
