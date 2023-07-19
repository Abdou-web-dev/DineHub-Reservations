import { useDispatch } from "react-redux";
import { addFoodToCustomer } from "../../feature/customerSlice";

export const AddFoodInput = ({
  customerFoodInput,
  id,
  // food,
  setCustomerFoodInput,
}: {
  customerFoodInput: string;
  setCustomerFoodInput: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  // food: string[];
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="customer-food-input-container">
        <input
          value={customerFoodInput}
          onChange={(e) => setCustomerFoodInput(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(
              addFoodToCustomer({
                id,
                food: customerFoodInput,
              })
            );
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};
