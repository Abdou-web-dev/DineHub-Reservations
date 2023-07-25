import { Button } from "antd";
import come_back from "../../assets/img/back-arrow.svg";

export const ComeBackBtn = ({
  setShowChoosenFood,
  setShowChoosenFoodInfos,
}: {
  setShowChoosenFood: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChoosenFoodInfos: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Button
        className="come-back-btn"
        onClick={() => {
          setShowChoosenFood(false);
          setShowChoosenFoodInfos(false);
        }}
        icon={
          <>
            <img width={`40px`} src={come_back} alt="" />
          </>
        }
      ></Button>
    </>
  );
};
