import { Button } from "antd";
import { v4 as uuid } from "uuid";
import ReservationCard from "../cards/ReservationCard";
import "./section_styles.scss";

export const ReservationsSection = ({
  reservations,
  reservationNameInput,
  setReservationNameInput,
  handleAddReservations,
}: {
  reservations: string[];
  reservationNameInput: string;
  setReservationNameInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddReservations: () => void;
}) => {
  return (
    <>
      <div className="reservations-section">
        <div className="reservation-input-container">
          <h5 className="reservation-header">Reservations</h5>
          <input
            value={reservationNameInput}
            onChange={(e) => {
              setReservationNameInput(e.target.value);
            }}
            type="text"
            placeholder="Add a reservation..."
          />
          <Button
            className={
              reservationNameInput ? "add-btn user__typing" : "add-btn"
            }
            disabled={!reservationNameInput}
            onClick={handleAddReservations}
          >
            <span>Add</span>
          </Button>
        </div>

        <div className="reservation-cards-list">
          <div
            className={
              reservations?.length > 6
                ? "reservation-cards-inner more_than_6_reservations"
                : "reservation-cards-inner"
            }
            style={{
              paddingTop:
                reservations?.length > 6
                  ? `calc(50px * ${reservations?.length})`
                  : "",
            }}
            // paddingTop: `calc(50px * ${reservations?.length} - 20px )`,
          >
            {reservations.map((name, index) => {
              return <ReservationCard key={uuid()} name={name} index={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
