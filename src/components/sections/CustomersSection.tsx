import { Customer, FoodItem } from "../../types/Types";
import CustomerCard from "../cards/CustomerCard";
import { FoodInfosContextProvider } from "../context/FoodInfosContext";
// import { FoodItem } from "../lists/DraggableFoodItems";

// https://www.reddit.com/r/reactjs/comments/we08mw/comment/iiywd82/

let foodElement_initilizer: FoodItem = {
  food_value: "",
  food_id: 0,
  food_category: "",
};
export const CustomersSection = ({ customers }: { customers: Customer[] }) => {
  // const [foodElement, setfoodElement] = useState(foodElement_initilizer);
  return (
    <>
      <div className="customers-section-container">
        <>
          {customers?.length ? (
            <div className="customers-section-h1-wrapper">
              <h1>Orders :</h1>
            </div>
          ) : null}
        </>
        <div className="customers-section-customers__list">
          {/* I can use context api here to pass the customer object down to nested components, instead of props drilling */}
          {customers.map((customer: Customer, index: number) => {
            return (
              <FoodInfosContextProvider {...{ customer }} key={customer.id}>
                <CustomerCard
                  id={customer.id}
                  name={customer.name}
                  foodList={customer.food}
                  {...{ index }}
                  restauLocation={customer.restauLocation}
                />
              </FoodInfosContextProvider>
            );
          })}
        </div>
      </div>
    </>
  );
};
// let customersFoodList = customer.food;
// let elements: string[] = customersFoodList.map((elem) => {
//   return elem.food_value;
// });
// for (let index = 0; index < customersFoodList.length; index++) {
//   const element = customersFoodList[index];
//   // setfoodElement(element);
// }
