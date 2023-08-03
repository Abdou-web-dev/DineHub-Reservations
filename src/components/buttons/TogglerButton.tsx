import { Button } from "antd";

interface TogglerBtnProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
}

export const TogglerButton = ({ label, onClick }: TogglerBtnProps) => {
  // const dispatch = useDispatch();

  return (
    <>
      <Button onClick={onClick} className="btn-toggler">
        <span>{label}</span>
      </Button>
    </>
  );
};
