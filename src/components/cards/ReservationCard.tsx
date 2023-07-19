import { Button } from "antd";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import arrow_right from "../../assets/img/arrow_right.svg";
import delete_icon from "../../assets/img/delete_icon.svg";
import { addCustomer } from "../../feature/customerSlice";
import { removeReservation } from "../../feature/reservationSlice";

interface ReservationCardType {
  name: string;
  index: number;
}

// https://www.exploretock.com/commanderspalace

function ReservationCard({ name, index }: ReservationCardType) {
  const dispatch = useDispatch();
  return (
    <div className="reservation-card-container">
      <span>{index + 1}</span>
      <div className="reservation-card-inner">
        <p>- {name}</p>
        <div className="reservation-card-buttons">
          <Button
            className="arrow-btn"
            onClick={() => {
              dispatch(removeReservation(index));
              dispatch(
                addCustomer({
                  id: uuid(),
                  name: name,
                  food: [],
                })
              );
            }}
          >
            <img
              className="arrow-icon"
              height={`25px`}
              src={arrow_right}
              width={`30px`}
              alt=""
            />
          </Button>
          <Button
            className="delete-btn"
            onClick={() => {
              dispatch(removeReservation(index));
            }}
          >
            <img
              className="delete-icon"
              height={`25px`}
              src={delete_icon}
              width={`30px`}
              alt=""
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
