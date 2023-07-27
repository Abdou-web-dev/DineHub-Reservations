import { Customer } from "../../feature/customerSlice";
import CustomerCard from "../cards/CustomerCard";
import { FoodInfosContextProvider } from "../context/FoodInfosContext";

// https://www.reddit.com/r/reactjs/comments/we08mw/comment/iiywd82/

export const CustomersSection = ({ customers }: { customers: Customer[] }) => {
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
              <FoodInfosContextProvider key={customer.id}>
                <CustomerCard
                  id={customer.id}
                  name={customer.name}
                  foodList={customer.food}
                  {...{ index }}
                  restauLocation={customer.restauLocation}
                  // guestsNumber={customer.guestsNumber}
                />
              </FoodInfosContextProvider>
            );
          })}
        </div>
      </div>
    </>
  );
};
