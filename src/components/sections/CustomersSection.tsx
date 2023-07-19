import { Customer } from "../../feature/customerSlice";
import CustomerCard from "../cards/CustomerCard";

export const CustomersSection = ({ customers }: { customers: Customer[] }) => {
  return (
    <>
      <div>
        <>
          {customers?.length ? (
            <div>
              <h1>Orders :</h1>
            </div>
          ) : null}
        </>
        <div className="">
          {customers.map((customer: Customer) => {
            return (
              <CustomerCard
                id={customer.id}
                name={customer.name}
                food={customer.food}
                key={customer.id}
                guestsNumber={customer.guestsNumber}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
