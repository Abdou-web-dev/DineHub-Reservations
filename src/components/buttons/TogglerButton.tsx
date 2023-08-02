import { Button } from "antd";

interface TogglerBtnProps {
  label: string;
  handleCancelClick?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
}

export const TogglerButton = ({
  label,
  handleCancelClick,
}: TogglerBtnProps) => {
  // const dispatch = useDispatch();

  return (
    <>
      <Button onClick={handleCancelClick} className="btn-toggler">
        <span>{label}</span>
      </Button>
    </>
  );
};
