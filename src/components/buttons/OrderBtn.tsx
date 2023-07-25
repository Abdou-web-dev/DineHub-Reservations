import { Button } from "antd";

interface OrderBtnProps {
  label: string;
  foodList?:
    | [
        {
          food_value: string;
          food_id: number;
        }
      ]
    | any;
  handleOrder: () => void;
  setAutoCompleteBorder?: React.Dispatch<React.SetStateAction<string>> | any;
}

export const OrderBtn = ({
  label,
  foodList,
  handleOrder,
  setAutoCompleteBorder,
}: OrderBtnProps) => {
  return (
    <>
      <Button
        // disabled={
        //   // meaning when the array is empty
        //   foodList?.length === 1 && foodList[0]?.food_value === ""
        //     ? true
        //     : false
        // }
        className="order"
        onClick={handleOrder}
        onMouseOver={() => {
          if (foodList?.length === 1 && foodList[0]?.food_value === "")
            setAutoCompleteBorder("1px solid red");
        }}
        onMouseLeave={() => {
          if (foodList?.length === 1 && foodList[0]?.food_value === "")
            setAutoCompleteBorder("");
        }}
      >
        <span>{label}</span>
      </Button>
    </>
  );
};
