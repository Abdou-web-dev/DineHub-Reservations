import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../feature/customerSlice";
import "./btns_styles.scss";

interface CustomerButtonsType {
  foodList: [
    {
      food_value: string;
      food_id: number;
    }
  ];
  index: number;
  setOpenOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomerButtons({
  foodList,
  index,
  setOpenOrderModal,
}: CustomerButtonsType) {
  const dispatch = useDispatch();
  console.log(foodList.length);
  // each customer card has a unique index key obtained with this line of code:
  //  customers.map((customer: Customer, index: number) => { return <CustomerCard .../>}
  function handleOrder() {
    setOpenOrderModal(true);
  }

  return (
    <div className="customer-card-btns-container">
      <Button
        onClick={() => dispatch(deleteCustomer(index))}
        className="cancel"
      >
        <span>Cancel</span>
      </Button>
      <Button
        disabled={
          // meaning when the array is empty
          foodList.length === 1 && foodList[0].food_value === "" ? true : false
        }
        className="order"
        onClick={handleOrder}
      >
        <span>Order</span>
      </Button>
    </div>
  );
}
