import { Button } from "antd";
import { useDispatch } from "react-redux";

interface CancelBtnProps {
  label: string;
  // index?: number;
  handleCancelClick: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
}

export const CancelBtn = ({ label, handleCancelClick }: CancelBtnProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={handleCancelClick} className="cancel">
        <span>{label}</span>
      </Button>
    </>
  );
};
