import { Button } from "antd";
import { MouseEvent } from "react";
import closeIcon from "../../assets/img/close.svg";

export const CloseX = () => {
  return (
    <>
      <img src={closeIcon} alt="" style={{ width: "30px", height: "30px" }} />
    </>
  );
};

export const CloseXIconBtn = ({
  handleCloseClick,
}: {
  // handleCloseClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCloseClick: (
    event: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>> | any
  ) => void;
}) => {
  return (
    <>
      <Button onClick={handleCloseClick}>
        <img src={closeIcon} alt="" style={{ width: "30px", height: "30px" }} />
      </Button>
    </>
  );
};
